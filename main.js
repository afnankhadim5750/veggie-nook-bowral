// Veggie Nook — mobile menu, scroll-spy, tabs, lightbox, contact form
(function(){
  var toggle=document.querySelector('[data-menu-toggle]');
  var nav=document.querySelector('[data-mobile-menu]');
  if(toggle&&nav){
    toggle.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded',open?'true':'false');
      toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');});
    });
  }
  var links=nav?Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]')):[];
  var map={};
  links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a;});
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        links.forEach(function(a){a.classList.remove('active');});
        var l=map[e.target.id]; if(l) l.classList.add('active');
      }
    });
  },{rootMargin:'-40% 0px -55% 0px'});
  ['menu','story','gallery','visit','faq','contact'].forEach(function(id){
    var el=document.getElementById(id); if(el) obs.observe(el);
  });
  // Tabs
  var tabs=Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  tabs.forEach(function(tab){
    tab.addEventListener('click',function(){
      tabs.forEach(function(t){
        t.setAttribute('aria-selected','false');
        document.getElementById(t.getAttribute('aria-controls')).hidden=true;
      });
      tab.setAttribute('aria-selected','true');
      document.getElementById(tab.getAttribute('aria-controls')).hidden=false;
    });
  });
  // Lightbox
  var lb=document.getElementById('lightbox'), lbImg=document.getElementById('lb-img');
  document.querySelectorAll('.b-item').forEach(function(btn){
    btn.addEventListener('click',function(){
      lbImg.src=btn.getAttribute('data-full'); lbImg.alt=btn.querySelector('img').alt;
      lb.hidden=false; document.querySelector('.lb-close').focus();
    });
  });
  function closeLb(){lb.hidden=true;lbImg.src='';}
  document.querySelector('.lb-close').addEventListener('click',closeLb);
  lb.addEventListener('click',function(e){if(e.target===lb) closeLb();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!lb.hidden) closeLb();});
  // Contact form -> email
  var form=document.getElementById('contact-form');
  if(form){form.addEventListener('submit',function(e){
    e.preventDefault();
    var name=document.getElementById('cf-name').value;
    var msg=document.getElementById('cf-msg').value;
    var subject=encodeURIComponent('Veggie Nook enquiry from '+name);
    var body=encodeURIComponent(msg+'\n\nFrom: '+name);
    window.location.href='mailto:fantashnickfoods@gmail.com?subject='+subject+'&body='+body;
  });}
})();
