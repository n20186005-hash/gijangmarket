(() => {
  const key = 'gijangmarket_cookie_preferences', deniedKey = 'gijangmarket_analytics_denied', gaId = 'G-HXM22WWPKP';
  const messages = {
    on: '이 탭에서 Google Analytics가 켜져 있습니다.', off: '이 탭에서 Google Analytics가 꺼져 있습니다.',
    session: '분석이 이 탭에서 꺼졌으며 페이지 이동과 새로고침에도 유지됩니다. 영구 선택을 저장하지 못해 저장된 허용이 남아 다른 탭에서 사용될 수 있습니다. 브라우저 설정에서 사이트 데이터를 삭제해 저장된 허용을 제거하세요.',
    page: '분석이 이 페이지에서 꺼졌습니다. 저장된 허용이 남아 다른 탭에서 사용될 수 있습니다. 저장소를 확인할 수 없으므로 이동하거나 새로고침하기 전에 브라우저 설정에서 사이트 데이터를 삭제하세요.',
    rollback: '분석이 이 탭에서 꺼졌습니다. 허용을 확인하지 못해 저장된 허용을 거부하거나 제거했습니다. 설정을 확인한 뒤 다시 허용하세요.'
  };
  function read() {
    try {
      const raw = JSON.parse(localStorage.getItem(key) || 'null');
      const denied = window.__gijangmarketDenied || sessionStorage.getItem(deniedKey) === '1';
      return { analytics: !denied && raw?.analytics === true, decided: denied || typeof raw?.analytics === 'boolean' };
    } catch { return { analytics: false, decided: false }; }
  }
  function denySession() {
    window.__gijangmarketDenied = true; window['ga-disable-' + gaId] = true;
    try { sessionStorage.setItem(deniedKey, '1'); return sessionStorage.getItem(deniedKey) === '1'; } catch { return false; }
  }
  let active = false;
  function apply(allowed) {
    active = allowed === true; window['ga-disable-' + gaId] = !active;
    if (!active) {
      if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: 'denied' });
      try {
        for (const part of document.cookie.split(';')) {
          const name = part.split('=')[0].trim();
          if (/^_ga(?:_|$)/.test(name)) for (const domain of ['', '; domain=' + location.hostname, '; domain=.gijangmarket.com']) document.cookie = name + '=; Max-Age=0; path=/' + domain;
        }
      } catch { /* Cookie access may be blocked; the measurement ID is already disabled. */ }
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    if (!window.__gijangmarketLoaded) window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    // Regrant must update an already loaded library before the one-loader guard.
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    if (window.__gijangmarketLoaded) return;
    window.__gijangmarketLoaded = true;
    window.gtag('js', new Date()); window.gtag('config', gaId, { allow_google_signals: false, allow_ad_personalization_signals: false });
    const script = document.createElement('script'); script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId; document.head.appendChild(script);
  }
  const stateText = () => active ? messages.on : messages.off;
  function sync(message) {
    const checkbox = document.getElementById('analytics'); if (checkbox) checkbox.checked = active;
    if (message !== undefined) document.querySelectorAll('[data-consent-status]').forEach(node => { node.textContent = message; });
  }
  function save(value) {
    value = value === true; let sessionDenied = false, saved = false, grantCleared = false;
    if (!value) { sessionDenied = denySession(); apply(false); }
    try {
      if (value) {
        // Clear and verify the tab veto before publishing any shared allow value.
        sessionStorage.removeItem(deniedKey);
        if (sessionStorage.getItem(deniedKey) === '1') throw Error('Tab refusal remains');
        localStorage.getItem(key);
      }
      localStorage.setItem(key, JSON.stringify({ analytics: value }));
      if (JSON.parse(localStorage.getItem(key) || 'null')?.analytics !== value) throw Error('Choice could not be confirmed');
      if (value) window.__gijangmarketDenied = false;
      apply(value); saved = true;
    } catch {
      // Best-effort rollback after an unconfirmed grant, including failed refusal writes.
      try {
        localStorage.setItem(key, JSON.stringify({ analytics: false }));
        if (value) grantCleared = JSON.parse(localStorage.getItem(key) || 'null')?.analytics === false;
      } catch {}
      if (value && !grantCleared) {
        try { localStorage.removeItem(key); grantCleared = localStorage.getItem(key) === null; } catch {}
      }
      sessionDenied = denySession() || sessionDenied; apply(false);
    }
    const result = { saved, analytics: active, message: saved ? '선택을 저장했습니다. ' + stateText() : (grantCleared ? messages.rollback : sessionDenied ? messages.session : messages.page) };
    sync(result.message);
    if (saved) document.getElementById('cookie-banner')?.classList.add('hidden');
    return result;
  }
  window.GijangmarketConsent = { read, save };
  const initial = read(); apply(initial.analytics); sync();
  if (!initial.decided) document.getElementById('cookie-banner')?.classList.remove('hidden');
  document.getElementById('analytics')?.addEventListener('change', () => {
    document.querySelectorAll('[data-consent-status]').forEach(node => { node.textContent = ''; });
  });
  document.querySelectorAll('[data-cookie-accept]').forEach(node => node.addEventListener('click', () => save(true)));
  document.querySelectorAll('[data-cookie-reject]').forEach(node => node.addEventListener('click', () => save(false)));
  document.getElementById('cookie-settings')?.addEventListener('submit', event => { event.preventDefault(); save(document.getElementById('analytics')?.checked === true); });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    let grant = false; try { grant = JSON.parse(event.newValue || 'null')?.analytics === true; } catch {}
    if (!grant) denySession();
    apply(read().analytics); sync(stateText());
  });
})();
