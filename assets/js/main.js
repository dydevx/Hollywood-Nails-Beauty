document.documentElement.classList.add('js');
const header=document.querySelector('#header');
const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('.mobile-nav');
const syncHeader=()=>header.classList.toggle('scrolled',window.scrollY>24);
syncHeader();
const headerObserver=new IntersectionObserver(syncHeader,{threshold:1});
headerObserver.observe(document.querySelector('.hero'));
document.addEventListener('scrollend',syncHeader,{passive:true});
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));menu.classList.toggle('open',!open);menu.inert=open;document.body.classList.toggle('menu-open',!open)});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{toggle.setAttribute('aria-expanded','false');menu.classList.remove('open');menu.inert=true;document.body.classList.remove('menu-open')}));
const reveals=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');reveals.unobserve(entry.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>reveals.observe(el));
const dialog=document.querySelector('.lightbox');
const dialogImage=dialog.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{dialogImage.src=item.dataset.image;dialogImage.alt=item.querySelector('img').alt;dialog.showModal()}));
dialog.querySelector('button').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});

const progress=document.querySelector('.scroll-progress');
let progressFrame=0;
const updateProgress=()=>{
  const distance=document.documentElement.scrollHeight-window.innerHeight;
  const value=distance>0?Math.min(window.scrollY/distance,1):0;
  progress.style.transform=`scaleX(${value})`;
  progressFrame=0;
};
window.addEventListener('scroll',()=>{if(!progressFrame)progressFrame=requestAnimationFrame(updateProgress)},{passive:true});
updateProgress();

document.querySelectorAll('.service-mosaic .reveal,.price-columns .reveal,.massage-list .reveal,.gallery-grid .reveal').forEach((item,index)=>{
  item.style.setProperty('--reveal-order',String(index%6));
});

const sectionLinks=[...document.querySelectorAll('.desktop-nav a[href^="#"],.mobile-nav-links a[href^="#"]')];
const trackedSections=[...new Set(sectionLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean))];
const sectionObserver=new IntersectionObserver(entries=>{
  const current=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(!current)return;
  sectionLinks.forEach(link=>{
    const active=link.getAttribute('href')===`#${current.target.id}`;
    link.classList.toggle('active',active);
    if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
  });
},{rootMargin:'-25% 0px -60% 0px',threshold:[0,.15,.4]});
trackedSections.forEach(section=>sectionObserver.observe(section));
