// Lightweight UI interactions for Digits Digital — no frameworks, minimal footprint
(function(){
  'use strict';

  // Preloader: hide after window load
  function handlePreloader(){
    const pre = document.getElementById('preloader');
    if(!pre) return;
    window.addEventListener('load', function(){
      pre.classList.add('hidden');
      // remove from DOM after animation so it doesn't block interactivity
      setTimeout(()=>{ if(pre && pre.parentNode) pre.parentNode.removeChild(pre); }, 600);
    }, {once:true});
  }

  // Tagline rotator
  function taglineRotator(){
    const el = document.querySelector('.tagline-rotator');
    if(!el) return;
    const lines = [
      'Digital Marketing • Social Media • SEO',
      'Websites That Convert • UX & CRO',
      'Software & SaaS • Web Apps'
    ];
    let i = 0;
    // setup
    el.textContent = lines[0];
    el.classList.add('fade-in');

    setInterval(()=>{
      // fade out
      el.classList.remove('fade-in');
      el.classList.add('fading');
      setTimeout(()=>{
        i = (i+1) % lines.length;
        el.textContent = lines[i];
        el.classList.remove('fading');
        el.classList.add('fade-in');
      }, 240);
    }, 3000);
  }

  // Intersection observer for reveal animations and lazy iframes
  function setupObservers(){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },{threshold:0.12});

    // Reveal elements (.reveal + service cards)
    document.querySelectorAll('.reveal, .service-card, .feature-box').forEach(el=>io.observe(el));

    // Lazy-load iframe when visible
    const iframeObserver = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const ifr = e.target;
          const src = ifr.dataset && ifr.dataset.src;
          if(src && !ifr.src){
            ifr.src = src;
          }
          iframeObserver.unobserve(ifr);
        }
      });
    }, {rootMargin:'200px 0px', threshold:0.01});

    document.querySelectorAll('.lazy-iframe').forEach(iframe=>iframeObserver.observe(iframe));
  }

  // WhatsApp FAB entrance + keyboard accessibility
  function setupWhatsAppFab(){
    const fab = document.getElementById('whatsappFab');
    if(!fab) return;
    // show after short delay so it doesn't distract immediately
    setTimeout(()=>fab.classList.add('visible'), 700);
    // keyboard activation
    fab.addEventListener('keyup', function(e){ if(e.key === 'Enter' || e.key === ' ') fab.click(); });
  }

  // Respect reduced-motion preference
  function prefersReducedMotion(){
    try{
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }catch(e){ return false; }
  }

  // Lazy-set non-critical images to loading=lazy (exclude navbar and preloader)
  function lazyImages(){
    document.querySelectorAll('img:not([loading])').forEach(img=>{
      if(img.closest('.navbar-brand') || img.closest('#preloader')) return;
      img.setAttribute('loading','lazy');
    });
  }

  // Init
  document.addEventListener('DOMContentLoaded', function(){
    if(!prefersReducedMotion()){
      taglineRotator();
    }
    handlePreloader();
    setupObservers();
    setupWhatsAppFab();
    lazyImages();
  });

})();
