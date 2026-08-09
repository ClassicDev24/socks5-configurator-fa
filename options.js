async function loadForm() {
    const s = await getStorage(['socks5switch', 'socks5server', 'bypassswitch', 'bypassdomain']);
    document.querySelector('#socks5switch').checked = (s.socks5switch || 'on') === 'on';
    document.querySelector('#socks5server').value = s.socks5server || '';
    document.querySelector('#bypassswitch').checked = (s.bypassswitch || 'on') === 'on';
    document.querySelector('#bypassdomain').value = s.bypassdomain || DEFAULT_BYPASS_DOMAIN_TEXT;
}

function setSaving(saving) {
    document.querySelector('#save').style.display = saving ? 'none' : 'inline-block';
    document.querySelector('#ing').style.display = saving ? 'flex' : 'none';
    if (saving) {
        document.querySelector('#savedTick').style.display = 'none';
    }
}

function showSavedTick() {
    const tick = document.querySelector('#savedTick');
    tick.style.display = 'inline';
    setTimeout(() => { tick.style.display = 'none'; }, 2000);
}

function setError(msg) {
    document.querySelector('#serverError').textContent = msg || '';
}

// Re-apply the currently-set error message (if any) in the new language.
let hasError = false;
function onLangChanged() {
    setError(hasError ? t('error_invalid_address') : '');
}

document.querySelector('#save').addEventListener('click', async () => {
    hasError = false;
    setError('');

    const socks5switch = document.querySelector('#socks5switch').checked;
    const socks5server = document.querySelector('#socks5server').value.trim();
    const bypassswitch = document.querySelector('#bypassswitch').checked;
    const bypassdomain = document.querySelector('#bypassdomain').value;

    if (socks5switch && !/.+:\d+/.test(socks5server)) {
        hasError = true;
        setError(t('error_invalid_address'));
        return;
    }

    setSaving(true);

    await setStorage({ socks5switch: socks5switch ? 'on' : 'off' });
    await setStorage({ socks5server: socks5server });
    await setStorage({ bypassswitch: bypassswitch ? 'on' : 'off' });
    await setStorage({ bypassdomain: bypassdomain });

    await applyProxyFromStorage();

    setTimeout(() => {
        setSaving(false);
        showSavedTick();
    }, socks5switch ? 500 : 1200);
});

(async () => {
    wireLangSwitcher();
    await initLang();
    await loadForm();
})();
