const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const dismissLoader=()=>{const loader=$('#loader');if(!loader||loader.dataset.dismissStarted)return;loader.dataset.dismissStarted='true';setTimeout(()=>{loader.style.opacity='0';setTimeout(()=>loader.remove(),800)},250)};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',dismissLoader,{once:true});else dismissLoader();window.addEventListener('load',dismissLoader,{once:true});setTimeout(dismissLoader,2500);

/* AUDIO */
let audioCtx=null,soundOn=false;
function tone(freq=440,dur=.08,type='sine'){if(!soundOn)return;if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(.025,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+dur);o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+dur)}
const motionFilm=$('.motion-film-video'),fullFilmDialog=$('#motionFilmDialog'),fullFilmVideo=$('#motionFilmPlayer'),filmWatchButton=$('#watchFilm');function syncSoundControls(){const label=soundOn?'◉ SOUND ON':'○ SOUND OFF';$('#sound').textContent=label;$('#sound').classList.toggle('on',soundOn)}function setSoundEnabled(enabled){soundOn=enabled;document.querySelectorAll('.hero-media video,.motion-film-video,.motion-film-player-video').forEach(video=>{video.muted=!soundOn;if(video===motionFilm||video===fullFilmVideo)video.volume=.65;if(soundOn)video.play().catch(()=>{video.muted=true})});window.MECDEXAudio?.setEnabled(soundOn);syncSoundControls();if(soundOn)tone(660,.12)}filmWatchButton?.addEventListener('click',()=>{motionFilm.pause();fullFilmVideo.currentTime=0;fullFilmVideo.volume=.65;fullFilmVideo.muted=false;fullFilmDialog.showModal();soundOn=true;syncSoundControls();window.MECDEXAudio?.setEnabled(true);fullFilmVideo.play().catch(()=>{fullFilmVideo.muted=true;setSoundEnabled(false)})});function closeFilmPlayer(){fullFilmVideo.pause();if(fullFilmDialog.open)fullFilmDialog.close();setSoundEnabled(false);motionFilm.muted=true;motionFilm.play().catch(()=>{})}$('#closeMotionFilm')?.addEventListener('click',closeFilmPlayer);fullFilmDialog?.addEventListener('cancel',event=>{event.preventDefault();closeFilmPlayer()});fullFilmDialog?.addEventListener('click',event=>{if(event.target===fullFilmDialog)closeFilmPlayer()});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&fullFilmDialog?.open){event.preventDefault();closeFilmPlayer()}},true);const motionFilmSection=motionFilm?.closest('.video-section');if(motionFilmSection){const filmVisibility=new IntersectionObserver(entries=>{if(document.visibilityState!=='visible'){motionFilm.pause();return}if(entries[0]?.isIntersecting)motionFilm.play().catch(()=>{});else motionFilm.pause()},{threshold:.12});filmVisibility.observe(motionFilmSection);document.addEventListener('visibilitychange',()=>{if(document.hidden){motionFilm.pause();return}const rect=motionFilmSection.getBoundingClientRect();if(rect.bottom>0&&rect.top<innerHeight)motionFilm.play().catch(()=>{})})}$('#sound').onclick=()=>setSoundEnabled(!soundOn);$('#sound').onclick=()=>setSoundEnabled(!soundOn);
/* CURSOR + POINTER LIGHT */
const cursor=document.createElement('div');cursor.className='cursor-orb';document.body.appendChild(cursor);
const cursorDot=document.createElement('div');cursorDot.className='cursor-dot';document.body.appendChild(cursorDot);
let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;document.documentElement.style.setProperty('--mx',mx+'px');document.documentElement.style.setProperty('--my',my+'px')});
(function cursorLoop(){cx+=(mx-cx)*.16;cy+=(my-cy)*.16;cursor.style.transform=`translate3d(${cx-22}px,${cy-22}px,0)`;cursorDot.style.transform=`translate3d(${mx-3}px,${my-3}px,0)`;requestAnimationFrame(cursorLoop)})();
$$('a,button,.model-card,.hotspot').forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'))});

/* UNIVERSAL 3D TILT */
$$('.model-card,.btn,.spec-chip,.play,.choice,.swatch').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.setProperty('--rx',(-y*8)+'deg');el.style.setProperty('--ry',(x*10)+'deg');el.style.setProperty('--px',(x*100)+'%');el.style.setProperty('--py',(y*100)+'%');el.classList.add('tilting')});el.addEventListener('pointerleave',()=>{el.classList.remove('tilting');el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')})});

/* BUTTON MICRO SOUND */
$$('.btn,.model-card,.choice,.swatch,.play,.hotspot').forEach(x=>x.addEventListener('click',()=>tone(420,.055,'triangle')));

/* COLLECTION */
const configuratorModels={'Apex X1':{label:'APEX X1 · ELECTRIC GRAND TOURER',power:'620 HP',image:'/assets/cars/album-mec-webp/pexels-hemant-singh-297238136-30923396.webp'},'Veloce R':{label:'VELOCE R · TRACK COUPE',power:'710 HP',image:'/assets/cars/album-mec-webp/pexels-bradikan-30806975.webp'},'Noir GT':{label:'NOIR GT · EXECUTIVE PERFORMANCE',power:'580 HP',image:'/assets/cars/album-mec-webp/pexels-freestockpro-8197399.webp'}};function selectConfiguratorModel(name){const model=configuratorModels[name];if(!model)return;const image=$('#configCar');image.src=model.image;image.alt=`${model.label} — ảnh minh họa`;image.style.transform=`perspective(1000px) scale(1.02) rotateY(${rot}deg)`;$('#configModelLabel').textContent=model.label;$('#power').textContent=model.power;$('.spec-chip span').textContent=name.toUpperCase()}
$$('.model-card').forEach(card=>card.onclick=()=>{$$('.model-card').forEach(item=>item.classList.remove('active'));card.classList.add('active');selectConfiguratorModel(card.dataset.model);toast(card.querySelector('h3').textContent+' selected')});
/* CONFIGURATOR */
$$('.swatch').forEach(s=>s.onclick=()=>{$$('.swatch').forEach(x=>x.classList.remove('active'));s.classList.add('active');$$('.swatch').forEach(x=>x.setAttribute('aria-pressed',String(x===s)));$('#configCar').dataset.color=s.dataset.color;tone(520,.07)});
$$('.choice').forEach(s=>s.onclick=()=>{const group=s.parentElement;group.querySelectorAll('.choice').forEach(x=>x.classList.remove('active'));s.classList.add('active');tone(480,.06)});
let rot=0,drag=false,lastX=0;$('#configurator').addEventListener('pointerdown',e=>{if(e.target.closest('.controls'))return;drag=true;lastX=e.clientX;$('#configurator').classList.add('dragging')});addEventListener('pointerup',()=>{drag=false;$('#configurator').classList.remove('dragging')});addEventListener('pointermove',e=>{if(!drag)return;rot+=(e.clientX-lastX)*.7;lastX=e.clientX;$('#configCar').style.transform=`scale(1.05) rotateY(${rot}deg)`;$('#rotationValue').textContent=Math.round(((rot%360)+360)%360)+'°'});

/* 360 STUDIO */
let sx=0,studioDrag=false;const viewport=$('#studioViewport');viewport.addEventListener('pointerdown',e=>{studioDrag=true;sx=e.clientX;viewport.classList.add('dragging')});addEventListener('pointerup',()=>{studioDrag=false;viewport.classList.remove('dragging')});addEventListener('pointermove',e=>{if(!studioDrag)return;const dx=e.clientX-sx;sx=e.clientX;const current=parseFloat($('#studioAngle').dataset.angle||'0');const angle=(current+dx*.7+360)%360;$('#studioAngle').dataset.angle=angle;$('#studioRoom').style.transform=`rotateY(${angle-180}deg) scale(1.12)`;$('#studioAngle').textContent=String(Math.round(angle)).padStart(3,'0')+'°'});
$('#open360').onclick=()=>{viewport.scrollIntoView({behavior:'smooth',block:'center'});toast('360° Studio activated — drag to explore')};

/* DEPTH PARALLAX + HERO CAMERA */
let sy=0;addEventListener('scroll',()=>{sy=scrollY;const y=Math.min(sy*.08,90);$('.hero-copy').style.transform=`translate3d(0,${Math.min(sy*.12,90)}px,0)`;$('.car-visual').style.transform=`translate3d(0,calc(-35% + ${y}px),0) perspective(900px) rotateY(${-13+sy*.015}deg)`;document.documentElement.style.setProperty('--scroll-depth',sy*.002)});

/* POINTER DEPTH FIELD */
const field=document.createElement('canvas');field.className='pointer-field';$('.hero').appendChild(field);const ctx=field.getContext('2d');let W,H,particles=[];function resize(){W=field.width=innerWidth;H=field.height=innerHeight;particles=Array.from({length:75},()=>({x:Math.random()*W,y:Math.random()*H,z:.3+Math.random()*1.3,s:Math.random()*1.7+.3}))}resize();addEventListener('resize',resize);function draw(){ctx.clearRect(0,0,W,H);for(const p of particles){const dx=(mx-W/2)*.0004*p.z,dy=(my-H/2)*.0004*p.z;p.x+=dx;p.y+=dy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.s*p.z,0,Math.PI*2);ctx.fillStyle=`rgba(210,255,70,${.08*p.z})`;ctx.fill()}requestAnimationFrame(draw)}draw();

/* MAGNETIC BUTTONS */
$$('.btn,.play,.sound').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.12}px) rotateX(${-(e.clientY-r.top-r.height/2)*.03}deg) rotateY(${(e.clientX-r.left-r.width/2)*.04}deg)`});el.addEventListener('pointerleave',()=>el.style.transform='')});

/* REVEAL ON SCROLL */
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');reveal.unobserve(e.target)}}),{threshold:.12});$$('.section-head,.model-card,.config-wrap,.studio-copy,.studio-viewport,.video-content,.drive-panel').forEach(e=>{e.classList.add('reveal');reveal.observe(e)});

function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove('show'),2200)}
$('#closeFilm').onclick=()=>$('#film').classList.remove('open');
const sessionKey=localStorage.getItem('mecdes-session')||crypto.randomUUID();localStorage.setItem('mecdes-session',sessionKey);
$('#saveBuild').onclick=async()=>{const activeColor=$('.swatch.active')?.dataset.color||'silver',choices=$$('.controls .choice'),payload={model_slug:($('.spec-chip span')?.textContent||'APEX X1').toLowerCase().replace(/\\s+/g,'-'),body_color:activeColor,wheels:choices[0]?.textContent||'AERO 21',interior:choices[2]?.textContent||'CARBON'};try{const r=await fetch('/api/configurations',{method:'POST',headers:{'Content-Type':'application/json','x-mecdes-session':sessionKey},body:JSON.stringify(payload)});if(!r.ok)throw new Error();toast('Configuration saved · MECDEX Garage');}catch(e){toast('Could not save configuration')}};
const driveForm=$('#driveForm');
const driveDate=driveForm.querySelector('[name="date"]');
const driveButton=driveForm.querySelector('[type="submit"]');
const driveStatus=$('#driveStatus');
const driveFields=[...driveForm.querySelectorAll('input[name],select[name]')];
let driveSubmitAttempted=false;
const localDateValue=(date=new Date())=>{const local=new Date(date.getTime()-date.getTimezoneOffset()*60000);return local.toISOString().slice(0,10)};
driveDate.min=localDateValue();
function driveFieldError(field){
  const value=field.value.trim();
  if(field.name==='name')return value.length<2?'Vui lòng nhập họ tên có ít nhất 2 ký tự.':value.length>120?'Họ tên không được dài quá 120 ký tự.':'';
  if(field.name==='phone'){
    if(!value)return 'Vui lòng nhập số điện thoại.';
    if(!/^[+\d\s().-]+$/.test(value))return 'Chỉ nhập chữ số, dấu +, khoảng trắng, dấu chấm hoặc dấu ngoặc.';
    const digits=value.replace(/\D/g,'');
    return digits.length<9||digits.length>15?'Số điện thoại cần có từ 9 đến 15 chữ số.':'';
  }
  if(field.name==='date')return !value?'Vui lòng chọn ngày lái thử.':value<driveDate.min?'Ngày lái thử không được ở trong quá khứ.':'';
  if(field.name==='time')return !value?'Vui lòng chọn giờ lái thử.':'';
  if(field.name==='model')return !value?'Vui lòng chọn mẫu xe.':'';
  if(field.name==='showroom')return !value?'Vui lòng chọn showroom.':'';
  return '';
}
function validateDriveField(field){
  const message=driveFieldError(field);
  const error=document.getElementById(field.getAttribute('aria-describedby'));
  field.setAttribute('aria-invalid',String(Boolean(message)));
  if(error){error.textContent=message;error.hidden=!message}
  return !message;
}
function setDriveStatus(message,state){
  driveStatus.textContent=message;
  driveStatus.dataset.state=state;
  driveStatus.hidden=false;
  if(innerWidth<=760)driveStatus.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
}
function clearDriveStatus(){driveStatus.hidden=true;driveStatus.textContent='';delete driveStatus.dataset.state}
function validateDriveForm(){return driveFields.filter(field=>!validateDriveField(field))}
function onDriveFieldEdit(event){
  if(!event.target.matches('input[name],select[name]'))return;
  if(driveSubmitAttempted)validateDriveField(event.target);
  if(!driveStatus.hidden)clearDriveStatus();
}
driveForm.addEventListener('input',onDriveFieldEdit);
driveForm.addEventListener('change',onDriveFieldEdit);
driveForm.addEventListener('submit',async event=>{
  event.preventDefault();
  driveSubmitAttempted=true;
  clearDriveStatus();
  const invalidFields=validateDriveForm();
  if(invalidFields.length){invalidFields[0].focus({preventScroll:true});invalidFields[0].scrollIntoView({behavior:'smooth',block:'center'});return}
  const payload=Object.fromEntries(new FormData(driveForm).entries());
  payload.name=payload.name.trim();
  payload.phone=payload.phone.replace(/\D/g,'');
  const buttonLabel=driveButton.querySelector('span');
  const originalLabel=buttonLabel?.textContent||'';
  driveButton.disabled=true;
  if(buttonLabel)buttonLabel.textContent='ĐANG GỬI...';
  try{
    const response=await fetch('/api/test-drive',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(data.error||'Không thể gửi yêu cầu. Vui lòng thử lại.');
    if(!data.booking)throw new Error('Phản hồi từ máy chủ không hợp lệ. Vui lòng thử lại.');
    const booking=data.booking;
    setDriveStatus(`Đã nhận yêu cầu lái thử ${booking.model} tại ${booking.showroom} ngày ${booking.drive_date}, ${booking.drive_time}. Lịch chưa được xác nhận; tư vấn viên sẽ liên hệ với bạn.`, 'success');
    tone(660,.18,'triangle');
    driveForm.reset();
    driveSubmitAttempted=false;
  }catch(error){
    const message=error instanceof TypeError?'Không thể kết nối máy chủ. Vui lòng kiểm tra mạng và thử lại.':error.message||'Không thể gửi yêu cầu. Vui lòng thử lại.';
    setDriveStatus(message,'error');
  }finally{
    driveButton.disabled=false;
    if(buttonLabel)buttonLabel.textContent=originalLabel;
  }
});
let lastEvent='';function track(type,payload={}){if(type===lastEvent)return;lastEvent=type;fetch('/api/event',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event_type:type,payload})}).catch(()=>{})}
track('experience_view');
$$('.hotspot').forEach((h,i)=>h.onclick=()=>toast(i?'Interior materials / Carbon cockpit':'Active 360° hotspot'));