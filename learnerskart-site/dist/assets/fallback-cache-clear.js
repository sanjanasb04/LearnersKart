(function() {
  console.warn('[LearnersKart] Stale script chunk requested. Purging browser cache and auto-reloading site...');
  try {
    localStorage.clear();
    sessionStorage.clear();
    if ('caches' in window) {
      caches.keys().then(function(names) {
        names.forEach(function(name) { caches.delete(name); });
      });
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(regs) {
        for (var r of regs) { r.unregister(); }
      });
    }
  } catch(e) {}
  
  if (!sessionStorage.getItem('lk_fallback_reloaded')) {
    sessionStorage.setItem('lk_fallback_reloaded', 'true');
    var sep = window.location.search ? '&' : '?';
    window.location.href = window.location.pathname + window.location.search + sep + 'cb=' + Date.now();
  }
})();
