// Shared logic between popup.html and options.html
// Keeps proxy-apply / bypass-list logic in one place so the quick popup
// toggle and the full options page never get out of sync.

const DEFAULT_BYPASS_STATIC = [
    "10.0.0.0/8",
    "127.0.0.0/8",
    "169.254.0.0/16",
    "172.16.0.0/12",
    "192.168.0.0/16",
    "224.0.0.0/4",
    "::/127",
    "<local>",
    "<localhost>",
    "*.local",
];

const DEFAULT_BYPASS_DOMAIN_TEXT = "cn\napple.com";

function getStorage(keys) {
    return new Promise((resolve) => chrome.storage.local.get(keys, resolve));
}

function setStorage(obj) {
    return new Promise((resolve) => chrome.storage.local.set(obj, resolve));
}

function parseBypassDomains(text) {
    return (text || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
}

// Most people type "example.com" (not "www.example.com") into the bypass
// list, so when we auto-add a domain from the current tab we strip a
// leading "www." to match that convention.
function normalizeHost(hostname) {
    return (hostname || "").replace(/^www\./i, "");
}

// Applies whatever is currently in chrome.storage.local to chrome.proxy.
async function applyProxyFromStorage() {
    const s = await getStorage([
        "socks5switch",
        "socks5server",
        "bypassswitch",
        "bypassdomain",
    ]);
    const socks5switch = s.socks5switch || "on";
    const socks5server = s.socks5server || "";
    const bypassswitch = s.bypassswitch || "on";
    const bypassdomain = s.bypassdomain || DEFAULT_BYPASS_DOMAIN_TEXT;

    if (socks5switch !== "on" || !socks5server) {
        return new Promise((resolve) => {
            chrome.proxy.settings.set({ value: { mode: "system" } }, resolve);
        });
    }

    const host = socks5server
        .substring(0, socks5server.lastIndexOf(":"))
        .replace("[", "")
        .replace("]", "");
    const port = socks5server.substring(socks5server.lastIndexOf(":") + 1);

    const list = [...DEFAULT_BYPASS_STATIC];
    if (bypassswitch === "on") {
        parseBypassDomains(bypassdomain).forEach((d) => {
            list.push(d);
            list.push("*." + d);
        });
    }

    return new Promise((resolve) => {
        chrome.proxy.settings.set(
            {
                value: {
                    mode: "fixed_servers",
                    rules: {
                        singleProxy: {
                            scheme: "socks5",
                            host: host,
                            port: parseInt(port, 10),
                        },
                        bypassList: list,
                    },
                },
            },
            resolve
        );
    });
}

function isHostBypassed(hostname, bypassdomainText) {
    const domains = parseBypassDomains(bypassdomainText);
    const norm = normalizeHost(hostname).toLowerCase();
    const full = (hostname || "").toLowerCase();
    return domains.some((d) => {
        const dn = d.toLowerCase();
        return norm === dn || full === dn || norm.endsWith("." + dn) || full.endsWith("." + dn);
    });
}

// Adds or removes hostname from the stored bypass list and immediately
// re-applies the proxy settings. Returns the new bypassed state (bool).
//
// Important: whether a host counts as "bypassed" is decided by
// isHostBypassed(), which matches on exact domain, the un-normalized
// hostname, AND parent-domain suffixes (e.g. "apple.com" in the list also
// covers "developer.apple.com"). If this function only removed an exact
// string match, clicking "remove bypass" on a subdomain wouldn't find
// anything to remove (since only the parent domain is listed) and would
// instead add a redundant new entry - leaving the popup UI and the actual
// proxy bypass state out of sync. So we use the same matching rule here to
// decide what "currently bypassed" means, and remove every list entry that
// is actually causing the match.
async function toggleBypassForHost(hostname) {
    const s = await getStorage(["bypassdomain"]);
    const bypassdomainText = s.bypassdomain || DEFAULT_BYPASS_DOMAIN_TEXT;
    const domains = parseBypassDomains(bypassdomainText);
    const norm = normalizeHost(hostname).toLowerCase();
    const full = (hostname || "").toLowerCase();
    const currentlyBypassed = isHostBypassed(hostname, bypassdomainText);

    let bypassed;
    let newDomains;
    if (currentlyBypassed) {
        // Remove every entry that causes this host to match (exact,
        // un-normalized, or parent-domain suffix) - not just an
        // exact-string match on the normalized hostname.
        newDomains = domains.filter((d) => {
            const dn = d.toLowerCase();
            const matches =
                norm === dn || full === dn || norm.endsWith("." + dn) || full.endsWith("." + dn);
            return !matches;
        });
        bypassed = false;
    } else {
        newDomains = [...domains, norm];
        bypassed = true;
    }

    await setStorage({ bypassdomain: newDomains.join("\n") });
    // make sure bypass list is actually being honored
    const bs = await getStorage(["bypassswitch"]);
    if ((bs.bypassswitch || "on") !== "on") {
        await setStorage({ bypassswitch: "on" });
    }
    await applyProxyFromStorage();
    return bypassed;
}
