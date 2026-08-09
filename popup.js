let lastHostname = null;
let lastBypassed = false;
let lastProxyOn = false;
let lastHasHost = false;

function setLoading(loading) {
    document.body.classList.toggle("loading", loading);
}

function updateStatusUI(on) {
    const dot = document.querySelector("#statusDot");
    const text = document.querySelector("#statusText");
    dot.classList.toggle("on", on);
    dot.classList.toggle("off", !on);
    text.textContent = on ? t("proxy_on") : t("proxy_off");
}

function renderBypassButton(bypassed) {
    lastBypassed = bypassed;
    const btn = document.querySelector("#bypassBtn");
    const badge = document.querySelector("#bypassBadge");
    if (bypassed) {
        btn.textContent = t("bypass_btn_remove");
        btn.classList.add("active");
        badge.textContent = t("badge_bypassed");
        badge.classList.add("bypassed");
    } else {
        btn.textContent = t("bypass_btn_add");
        btn.classList.remove("active");
        badge.textContent = t("badge_via_vpn");
        badge.classList.remove("bypassed");
    }
}

// Re-renders anything that's set via JS (not covered by data-i18n) whenever
// the language is switched.
function onLangChanged() {
    updateStatusUI(lastProxyOn);
    if (lastHasHost) {
        renderBypassButton(lastBypassed);
    } else {
        document.querySelector("#currentDomain").textContent = t("domain_not_bypassable");
        document.querySelector("#bypassBadge").textContent = t("badge_unsupported");
    }
}

async function init() {
    wireLangSwitcher();
    await initLang();

    let hostname = null;
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab && tab.url) {
            const u = new URL(tab.url);
            if (u.protocol === "http:" || u.protocol === "https:") {
                hostname = u.hostname;
            }
        }
    } catch (e) {
        hostname = null;
    }
    lastHostname = hostname;
    lastHasHost = !!hostname;

    const s = await getStorage(["socks5switch", "socks5server", "bypassdomain"]);
    const proxyOn = (s.socks5switch || "on") === "on";
    const server = s.socks5server || "";
    const bypassdomain = s.bypassdomain || DEFAULT_BYPASS_DOMAIN_TEXT;

    lastProxyOn = proxyOn;
    document.querySelector("#proxySwitch").checked = proxyOn;
    document.querySelector("#serverAddr").textContent = server || t("server_not_set");
    updateStatusUI(proxyOn);

    const domainSection = document.querySelector("#domainSection");
    const bypassBtn = document.querySelector("#bypassBtn");

    if (hostname) {
        document.querySelector("#currentDomain").textContent = hostname;
        document.querySelector("#currentDomain").title = hostname;
        renderBypassButton(isHostBypassed(hostname, bypassdomain));
    } else {
        domainSection.classList.add("disabled");
        document.querySelector("#currentDomain").textContent = t("domain_not_bypassable");
        document.querySelector("#bypassBadge").textContent = t("badge_unsupported");
        bypassBtn.disabled = true;
    }

    document.querySelector("#proxySwitch").addEventListener("change", async (e) => {
        const checked = e.target.checked;
        lastProxyOn = checked;
        setLoading(true);
        await setStorage({ socks5switch: checked ? "on" : "off" });
        updateStatusUI(checked);
        await applyProxyFromStorage();
        setLoading(false);
    });

    bypassBtn.addEventListener("click", async () => {
        if (!hostname) return;
        setLoading(true);
        const bypassed = await toggleBypassForHost(hostname);
        renderBypassButton(bypassed);
        setLoading(false);
    });

    document.querySelector("#openOptions").addEventListener("click", () => {
        chrome.runtime.openOptionsPage();
    });
    document.querySelector("#openOptions2").addEventListener("click", () => {
        chrome.runtime.openOptionsPage();
    });
}

init();
