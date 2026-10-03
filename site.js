/* Paulo Xavier · Psicólogo · scripts do sítio
 * 1. Navegação: seção atual, barra de progresso, botão de topo.
 * 2. Links externos: aviso de nova aba para leitores de tela.
 * 3. Paulus, o mascote.
 * 4. Modo offline e atualização automática (sw.js).
 * 5. Resumo do currículo em PDF (impressão).
 */

/* 1. Navegação */
(function(){
  'use strict';
  document.body.classList.remove('sem-js');
  var topo=document.querySelector('header.topo'),
      nav=topo?topo.querySelector('nav'):null,
      paginas=[].slice.call(document.querySelectorAll('section.pagina')),
      links=[].slice.call(document.querySelectorAll('header.topo nav a')),
      subir=document.getElementById('subir'),prog=document.getElementById('prog'),
      atual='',espera=false;
  function altura(){document.documentElement.style.setProperty('--hh',(topo?topo.offsetHeight:64)+'px')}
  altura();window.addEventListener('resize',altura);
  function marcar(){
    var h=document.documentElement,y=(topo?topo.offsetHeight:64)+90,at=paginas[0].id;
    paginas.forEach(function(s){if(s.getBoundingClientRect().top<y)at=s.id});
    if(h.scrollTop+h.clientHeight>=h.scrollHeight-4)at=paginas[paginas.length-1].id;
    if(at===atual)return;
    atual=at;
    links.forEach(function(a){
      if(a.getAttribute('href')==='#'+at){
        a.setAttribute('aria-current','location');
        if(nav&&nav.scrollWidth>nav.clientWidth){
          var ra=a.getBoundingClientRect(),rn=nav.getBoundingClientRect();
          nav.scrollTo({left:nav.scrollLeft+(ra.left-rn.left)-(rn.width-ra.width)/2,behavior:'smooth'});
        }
      }else a.removeAttribute('aria-current');
    });
    document.body.setAttribute('data-pagina',at);
    window.dispatchEvent(new Event('secao'));
  }
  function atualizar(){
    espera=false;
    var h=document.documentElement,m=h.scrollHeight-h.clientHeight;
    if(prog)prog.style.width=(m>0?h.scrollTop/m*100:0)+'%';
    if(subir)subir.classList.toggle('vis',h.scrollTop>500);
    if(topo)topo.classList.toggle('rolou',h.scrollTop>10);
    marcar();
  }
  window.addEventListener('scroll',function(){if(!espera){espera=true;requestAnimationFrame(atualizar)}},{passive:true});
  atualizar();
  if(subir)subir.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
})();

/* 2. Links externos */
(function(){
  [].forEach.call(document.querySelectorAll('main a[target="_blank"],footer a[target="_blank"]'),function(a){
    var s=document.createElement('span');s.className='sr';s.textContent=' (abre em nova aba)';a.appendChild(s);
  });
})();

/* 3. /* Paulus, o mascote: apresenta o Paulo ao longo da leitura */
(function(){
  'use strict';
  var box=document.getElementById('pb'),btn=document.getElementById('pm'),txt=document.getElementById('pa-t'),
      prox=document.getElementById('pa-n'),ir=document.getElementById('pa-ir'),fechar=document.getElementById('pa-x'),
      cont=document.getElementById('pa-c');
  if(!box||!btn)return;
  var falas={
    inicio:[
      {t:'Oi! Eu sou o Paulus, o mascote do site. Hoje faço as honras e apresento o Paulo Xavier a você.'},
      {t:'Ele é psicólogo no SUAS e mestre em Antropologia Social. Enquanto você rola a página, eu conto o que há em cada parte.'},
      {t:'Vamos começar pelo caminho dele?',go:'#curriculo',l:'Ver currículo'}
    ],
    curriculo:[
      {t:'Aqui estão a formação e a trajetória do Paulo, até chegar ao CRAS. Há também o Currículo Lattes e o resumo em PDF.'},
      {t:'Se você é de outra área, as definições do CFP logo abaixo explicam o que faz o psicólogo no SUAS.'},
      {t:'No fim desta parte, o Paulo deixa sua primeira indicação: as leituras do CREPOP.',go:'#indicacoes',l:'Ver indicação'},
      {t:'Depois vem o que ele publicou.',go:'#producao',l:'Ver produção'}
    ],
    producao:[
      {t:'Agora o que o Paulo publicou: artigos, capítulos, o trabalho de conclusão de curso e a dissertação, com DOI e texto completo.'},
      {t:'Mais abaixo ficam os indicadores do Google Acadêmico e os trabalhos que citam a dissertação.',go:'#interesses',l:'Ver interesses'}
    ],
    interesses:[
      {t:'Aqui o assunto muda: em vez do que o Paulo publicou, as perguntas que guiam a pesquisa e o trabalho dele. Uma das frentes é a chegada do povo Warao a Boa Vista.'},
      {t:'Depois vem um panorama da Psicologia em Roraima, com números e as lacunas de pesquisa sobre o psicólogo no CRAS do estado.',go:'#roraima',l:'Ver Roraima'}
    ],
    roraima:[
      {t:'Esta parte reúne números sobre psicólogas(os) do Brasil a Roraima e examina o que já foi publicado sobre o trabalho no CRAS do estado. Quanto mais perto da assistência social, menos dados existem.'},
      {t:'Em seguida vêm as leituras e fontes que o Paulo indica: livros, sites científicos, sites da profissão e mapas.',go:'#leituras',l:'Ver leituras'}
    ],
    leituras:[
      {t:'Aqui estão os livros, os sites científicos e da profissão, e os mapas para consulta.'},
      {t:'Depois ficam os locais de atuação e os perfis do Paulo.',go:'#contato',l:'Ver contato'}
    ],
    contato:[
      {t:'Aqui estão os locais onde o Paulo atua, com mapa, e os perfis acadêmicos. As redes sociais ficam no rodapé.'},
      {t:'Logo abaixo ficam as referências citadas no site.',go:'#referencias',l:'Ver referências'}
    ],
    referencias:[
      {t:'Chegamos ao fim da visita! Estas são as leis, normas e artigos citados no site. Foi um prazer apresentar o Paulo. Volte quando quiser!',go:'#inicio',l:'Voltar ao início'}
    ]
  };
  var notas={
    'indicacoes':{t:'Esta é a indicação do Paulo aos colegas: as Referências Técnicas do CREPOP. A capa marcada como “Atuação de Paulo” é a do CRAS, onde ele trabalha.'},
    'livros-recomendados':{t:'Duas leituras para quem está chegando ao SUAS. A primeira tem PDF gratuito.'},
    'psicologia-roraima':{t:'Um funil com números: do Brasil a Roraima, a Boa Vista e aos CRAS. Quanto mais perto da assistência social, menos dados existem. No CRAS, praticamente só há o texto do próprio Paulo.'},
    'um-trabalho':{t:'Aqui vai um dado curioso: sobre o psicólogo no CRAS em Roraima, o único texto que o Paulo encontrou foi o dele mesmo. Por isso ele convida os colegas a escrever.'},
    'pesquisa-roraima':{t:'Ainda há muito a pesquisar sobre o trabalho do psicólogo no SUAS do estado. Veja o que já existe e que perguntas ficam abertas.'},
    'fontes-cientificas':{t:'Agora, para ir direto às fontes: três sites científicos que o Paulo recomenda. SciELO e BVS trazem muita coisa em português. Logo depois vêm dois sites da profissão, a APA e o CFP.'},
    'mapas':{t:'Para encontrar os serviços no território, o Paulo indica dois mapas: o Mapa Social, da assistência social, e a RAPS, da saúde mental.'}
  };
  var pag='inicio',i=0,fechadoPeloUsuario=false,vistas={},vistasNotas={};
  var estreito=window.matchMedia('(max-width:560px)').matches,calmo=window.matchMedia('(prefers-reduced-motion: reduce)').matches,auto=!estreito&&!calmo;
  try{fechadoPeloUsuario=sessionStorage.getItem('paulus-fechado')==='1'}catch(e){}
  function pagina(){return document.body.getAttribute('data-pagina')||'inicio'}
  function falar(){btn.classList.remove('fala');void btn.offsetWidth;btn.classList.add('fala')}
  function mostrarFala(){
    var l=falas[pag]||falas.inicio;
    if(i>=l.length)i=l.length-1;
    var f=l[i];
    txt.textContent=f.t;txt.scrollTop=0;falar();
    if(f.go){ir.href=f.go;ir.textContent=f.l;ir.hidden=false}else ir.hidden=true;
    prox.hidden=i>=l.length-1;
    cont.textContent=l.length>1?(i+1)+' de '+l.length:'';
  }
  function mostrarNota(n){
    txt.textContent=n.t;txt.scrollTop=0;falar();
    ir.hidden=true;prox.hidden=true;cont.textContent='';
  }
  function abrir(){box.hidden=false;btn.setAttribute('aria-expanded','true');mostrarFala()}
  function fecharBalao(manual){box.hidden=true;btn.setAttribute('aria-expanded','false');if(manual){fechadoPeloUsuario=true;try{sessionStorage.setItem('paulus-fechado','1')}catch(e){}}}
  btn.addEventListener('click',function(){if(box.hidden){fechadoPeloUsuario=false;try{sessionStorage.removeItem('paulus-fechado')}catch(e){}abrir()}else fecharBalao(true)});
  fechar.addEventListener('click',function(){fecharBalao(true);btn.focus()});
  prox.addEventListener('click',function(){i++;mostrarFala()});
  ir.addEventListener('click',function(){i=0});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!box.hidden){fecharBalao(true);btn.focus()}});
  window.addEventListener('secao',function(){
    var nova=pagina();if(nova===pag)return;
    pag=nova;i=0;
    if(!fechadoPeloUsuario&&auto&&!vistas[pag]){vistas[pag]=1;abrir()} else if(!box.hidden){mostrarFala()}
  });
  /* comentários do Paulus quando o visitante chega às indicações */
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return;
      var id=e.target.id;if(vistasNotas[id]||!notas[id])return;
      vistasNotas[id]=1;io.unobserve(e.target);
      if(fechadoPeloUsuario||!auto)return;
      if(box.hidden){box.hidden=false;btn.setAttribute('aria-expanded','true')}
      mostrarNota(notas[id]);
    })},{rootMargin:'0px 0px -55% 0px',threshold:0});
    Object.keys(notas).forEach(function(id){var el=document.getElementById(id);if(el)io.observe(el)});
  }
  pag=pagina();vistas[pag]=1;
  if(!fechadoPeloUsuario&&auto)setTimeout(abrir,1200);
})();

/* 4. Offline + atualização automática */
(function(){
  if(!('serviceWorker' in navigator))return;
  if(location.protocol!=='https:'&&location.hostname!=='localhost')return;
  var tinha=!!navigator.serviceWorker.controller,recarregando=false;
  navigator.serviceWorker.addEventListener('controllerchange',function(){
    if(!tinha){tinha=true;return;}
    if(recarregando)return;recarregando=true;location.reload();
  });
  window.addEventListener('load',function(){
    navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(function(reg){
      var checar=function(){reg.update().catch(function(){})};
      document.addEventListener('visibilitychange',function(){if(!document.hidden)checar()});
      window.addEventListener('online',checar);
      setInterval(checar,30*60*1000);
    }).catch(function(){});
  });
})();

/* 5. Resumo do currículo em PDF */
function baixarResumoPDF(){
  var t=document.title;
  document.title='Paulo Xavier - Resumo do curriculo';
  var volta=function(){document.title=t;window.removeEventListener('afterprint',volta)};
  window.addEventListener('afterprint',volta);
  window.print();
}
