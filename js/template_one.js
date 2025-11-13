(function () {
  // Aguarda DOM pronto por segurança
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    smoothScroll();
    progressBar();
    navbarOnScroll();
    revealOnView();
  }

  // Rolagem suave para âncoras
  function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // Barra de progresso no topo
  function progressBar() {
    var bar = document.getElementById('progressBar');
    if (!bar) return;
    var update = function () {
      var docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
      if (docHeight <= 0) { bar.style.width = '0%'; return; }
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      var pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // Mudança de fundo da navbar ao rolar
  function navbarOnScroll() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;
    var apply = function () {
      navbar.style.background = (window.scrollY > 50)
        ? 'rgba(26, 26, 46, 0.98)'
        : 'rgba(26, 26, 46, 0.95)';
    };
    window.addEventListener('scroll', apply, { passive: true });
    apply();
  }

  // Revela cards ao entrar na viewport
  function revealOnView() {
    var cards = document.querySelectorAll('.concept-card, .method-card, .concept-card-flex, .method-card-flex');
    if (!cards.length) return;

    // Fallback se IntersectionObserver não for suportado
    if (typeof IntersectionObserver === 'undefined') {
      cards.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    cards.forEach(function (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }
})();
