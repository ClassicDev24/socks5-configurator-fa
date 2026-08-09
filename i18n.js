// Simple FA/EN i18n shared by popup.html and options.html.
// Load order required: common.js -> i18n.js -> (popup.js | options.js)

const I18N = {
    fa: {
        settings_tooltip: "تنظیمات پیشرفته",
        proxy_on: "پراکسی فعال است",
        proxy_off: "پراکسی غیرفعال است",
        server_not_set: "آدرس تنظیم نشده",
        current_site_label: "سایت فعلی",
        badge_via_vpn: "از طریق وی‌پی‌ان باز می‌شود",
        badge_bypassed: "بایپس شده — بدون وی‌پی‌ان باز می‌شود",
        badge_unsupported: "این نوع صفحه پشتیبانی نمی‌شود",
        domain_not_bypassable: "قابل بایپس نیست",
        bypass_btn_add: "⚡ بایپس کردن این سایت",
        bypass_btn_remove: "❌ حذف بایپس این سایت",
        hint_text: "با بایپس کردن، این سایت مستقیم و بدون وی‌پی‌ان باز می‌شود؛ لازم نیست هر بار وی‌پی‌ان را خاموش/روشن کنید.",
        manage_full_list: "مدیریت کامل لیست بایپس",

        brand_sub: "تنظیمات پیشرفته",
        hint_banner: "⚡ برای روشن/خاموش کردن سریع پراکسی یا بایپس کردن یک سایت با یک کلیک، لازم نیست این صفحه را باز کنید — فقط روی آیکون افزونه در نوار ابزار کلیک کنید.",
        proxy_card_title: "پراکسی Socks5",
        proxy_card_desc: "آدرس سرور Socks5 که ترافیک کروم از طریق آن عبور می‌کند.",
        server_placeholder: "مثال: 127.0.0.1:1080 یا [::1]:1080",
        bypass_card_title: "لیست بایپس",
        bypass_card_desc_html: "دامنه‌هایی که باید بدون عبور از پراکسی، مستقیم باز شوند — هر دامنه در یک خط (مثلاً <code dir=\"ltr\">divar.ir</code>). با کلیک روی آیکون افزونه هم می‌توانید یک‌کلیکی سایت جاری را به این لیست اضافه یا از آن حذف کنید.",
        save_btn: "ذخیره تغییرات",
        saving_text: "در حال ذخیره…",
        saved_tick: "✓ ذخیره شد",
        error_invalid_address: "آدرس Socks5 نامعتبر است — مثل 127.0.0.1:1080 وارد کنید.",
        brook_html: "اگر پراکسی Socks5 نداری، می‌تونی با <a href=\"https://github.com/txthinking/brook#readme\" target=\"_blank\" rel=\"noopener\">Brook</a> یکی راه‌اندازی کنی.",
        shiliew_html: "اگر نمی‌خوای یا نمی‌تونی خودت راه‌اندازی کنی، می‌تونی <a href=\"https://www.txthinking.com/shiliew.html\" target=\"_blank\" rel=\"noopener\">Shiliew</a> رو انتخاب کنی.",
        footer_credit_html: "A project by <a href=\"https://www.txthinking.com\" target=\"_blank\" rel=\"noopener\">txthinking</a>",
    },
    en: {
        settings_tooltip: "Advanced settings",
        proxy_on: "Proxy is on",
        proxy_off: "Proxy is off",
        server_not_set: "Address not set",
        current_site_label: "Current site",
        badge_via_vpn: "Opens through VPN",
        badge_bypassed: "Bypassed — opens without VPN",
        badge_unsupported: "This page type isn't supported",
        domain_not_bypassable: "Can't be bypassed",
        bypass_btn_add: "⚡ Bypass this site",
        bypass_btn_remove: "❌ Remove bypass",
        hint_text: "Bypassing opens this site directly, without the VPN — no need to switch the VPN off and on every time.",
        manage_full_list: "Manage full bypass list",

        brand_sub: "Advanced settings",
        hint_banner: "⚡ To quickly turn the proxy on/off or bypass a site with one click, you don't need this page — just click the extension icon in the toolbar.",
        proxy_card_title: "Socks5 Proxy",
        proxy_card_desc: "The Socks5 server address that Chrome's traffic will go through.",
        server_placeholder: "Example: 127.0.0.1:1080 or [::1]:1080",
        bypass_card_title: "Bypass List",
        bypass_card_desc_html: "Domains that should open directly, without going through the proxy — one per line (e.g. <code dir=\"ltr\">example.com</code>). You can also bypass the current tab's site with one click from the extension icon.",
        save_btn: "Save changes",
        saving_text: "Saving…",
        saved_tick: "✓ Saved",
        error_invalid_address: "Invalid Socks5 address — enter something like 127.0.0.1:1080.",
        brook_html: "If you don't have a Socks5 proxy, you can deploy one with <a href=\"https://github.com/txthinking/brook#readme\" target=\"_blank\" rel=\"noopener\">Brook</a>.",
        shiliew_html: "If you can't or don't want to deploy your own, you can choose <a href=\"https://www.txthinking.com/shiliew.html\" target=\"_blank\" rel=\"noopener\">Shiliew</a>.",
        footer_credit_html: "A project by <a href=\"https://www.txthinking.com\" target=\"_blank\" rel=\"noopener\">txthinking</a>",
    },
};

let currentLang = "fa";

function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || key;
}

// Reads the saved language (or guesses from browser locale) and applies it.
async function initLang() {
    const s = await getStorage(["uiLang"]);
    currentLang = s.uiLang || (navigator.language.toLowerCase().startsWith("fa") ? "fa" : "en");
    applyLang();
}

function applyLang() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "fa" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
        el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
        el.title = t(el.getAttribute("data-i18n-title"));
    });
    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });

    // Let the page re-render any JS-computed text (status labels, badges…)
    if (typeof onLangChanged === "function") {
        onLangChanged();
    }
}

async function setLang(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    await setStorage({ uiLang: lang });
    applyLang();
}

function wireLangSwitcher() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
}
