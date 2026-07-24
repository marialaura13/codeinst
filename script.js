const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const header=$('#header'), progress=$('.progress'), menu=$('.menu-toggle'), nav=$('#nav');
const updateScroll=()=>{const y=scrollY, max=document.documentElement.scrollHeight-innerHeight;header.classList.toggle('scrolled',y>20);progress.style.width=`${max?y/max*100:0}%`};
addEventListener('scroll',updateScroll,{passive:true});updateScroll();
menu.addEventListener('click',()=>{const open=menu.classList.toggle('active');nav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});
$$('.nav a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('active');nav.classList.remove('open');document.body.classList.remove('menu-open');menu.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(entries=>entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),Math.min(i*70,280));observer.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));
if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  const glow=$('.cursor-glow');addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
  $$('[data-tilt]').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-3px)`});card.addEventListener('pointerleave',()=>card.style.transform='')});
  $$('.magnetic').forEach(btn=>{btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`});btn.addEventListener('pointerleave',()=>btn.style.transform='')});
}
$$('.filters button').forEach(btn=>btn.addEventListener('click',()=>{$$('.filters button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');$$('.project-card').forEach(card=>card.classList.toggle('hidden',btn.dataset.filter!=='all'&&card.dataset.category!==btn.dataset.filter))}));
const modal=$('.project-modal'), modalContent=$('.project-modal>div');
$$('.project-open').forEach(btn=>btn.addEventListener('click',()=>{const visual=btn.closest('.project-card').querySelector('.project-visual').cloneNode(true);modalContent.replaceChildren(visual);modal.classList.add('open');document.body.style.overflow='hidden'}));
$('.project-modal>button').addEventListener('click',()=>{modal.classList.remove('open');document.body.style.overflow=''});
modal.addEventListener('click',e=>{if(e.target===modal){modal.classList.remove('open');document.body.style.overflow=''}});
addEventListener('keydown',e=>{if(e.key==='Escape'){modal.classList.remove('open');document.body.style.overflow=''}});
$$('.accordion details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)$$('.accordion details').forEach(other=>{if(other!==detail)other.open=false})}));
const phone='5512992312472';
const form=$('#quoteForm');
form.addEventListener('submit',e=>{e.preventDefault();const fields=$$('input,select,textarea',form),error=$('.form-error',form);fields.forEach(f=>f.classList.remove('invalid'));const invalid=fields.filter(f=>f.required&&!f.value.trim());if(invalid.length){invalid.forEach(f=>f.classList.add('invalid'));invalid[0].focus();error.textContent='Confira os campos destacados antes de continuar.';return}error.textContent='';const d=new FormData(form);const msg=`Olá, Codeinst! Quero solicitar um orçamento.%0A%0A*Nome:* ${d.get('nome')}%0A*Empresa:* ${d.get('empresa')||'Não informado'}%0A*Tipo de projeto:* ${d.get('tipo')}%0A%0A*Sobre o projeto:*%0A${d.get('mensagem')}`;window.open(`https://wa.me/${phone}?text=${msg}`,'_blank','noopener,noreferrer')});
