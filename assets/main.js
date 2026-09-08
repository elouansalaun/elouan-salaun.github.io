/* ============================================================
   Portfolio behaviour: expandable projects, theme, equations.
   Everything degrades gracefully — without JS the panels are
   simply open (see .js rules in style.css).
   ============================================================ */

(function () {
  'use strict';

  /* ---------- expandable projects ---------- */

  var projects = Array.prototype.slice.call(document.querySelectorAll('.project'));

  projects.forEach(function (project) {
    var button = project.querySelector('.project-head');
    var panel  = project.querySelector('.panel');
    if (!button || !panel) return;

    panel.inert = true;                       // keep collapsed links out of the tab order

    button.addEventListener('click', function () {
      setOpen(project, !project.classList.contains('open'));
    });
  });

  function setOpen(project, open) {
    var button = project.querySelector('.project-head');
    var panel  = project.querySelector('.panel');

    project.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
    panel.inert = !open;

    // Keep the URL shareable: /#p-forecasting opens that project directly.
    if (open && project.id) {
      history.replaceState(null, '', '#' + project.id);
    } else if (!open && location.hash === '#' + project.id) {
      history.replaceState(null, '', location.pathname + location.search);
    }
  }

  function openFromHash() {
    var id = location.hash.slice(1);
    if (!id) return;
    var target = document.getElementById(id);
    if (target && target.classList.contains('project') && !target.classList.contains('open')) {
      setOpen(target, true);
      target.scrollIntoView({ block: 'start' });
    }
  }

  window.addEventListener('hashchange', openFromHash);

  /* ---------- theme ---------- */

  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var root = document.documentElement;
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var current = root.getAttribute('data-theme') || (systemDark ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';

      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- misc ---------- */

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Highlight the section currently in view in the nav.
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- LaTeX ---------- */

  function renderMath() {
    if (typeof renderMathInElement !== 'function') return;
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { renderMath(); openFromHash(); });
  } else {
    renderMath();
    openFromHash();
  }
})();
