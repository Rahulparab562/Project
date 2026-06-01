
const birthday=new Date('2026-06-02T00:00:00').getTime();

function updateCountdown(){
const now=new Date().getTime();
const d=birthday-now;


if(d<=0){
document.getElementById('countdown').innerHTML='🎉 Happy Birthday! 🎂';
return;
}

const days=Math.floor(d/(1000*60*60*24));
const hours=Math.floor((d%(1000*60*60*24))/(1000*60*60));
const mins=Math.floor((d%(1000*60*60))/(1000*60));
const secs=Math.floor((d%(1000*60))/1000);


document.getElementById('countdown').innerHTML=
`${days}d ${hours}h ${mins}m ${secs}s`;
}

setInterval(updateCountdown,1000);
updateCountdown();

// autoplay background song with fallback to user interaction if blocked
// updated to match actual file in music/ (song.mpeg)
const bgAudio = new Audio('music/song.mpeg');
bgAudio.preload = 'auto';
bgAudio.loop = true;
bgAudio.volume = 0.9;
bgAudio.muted = false;

// expose for console debugging and provide a helper
window.bgAudio = bgAudio;
window.tryPlayAudio = function(){
	return bgAudio.play()
		.then(()=>console.log('bgAudio playing'))
		.catch(e=>{console.error('bgAudio play failed', e); throw e;});
};

// require a single user click to start audio (avoids autoplay attempts)
const startAudioOnClick = () => {
	const resume = () => {
		bgAudio.play()
			.then(()=>console.log('Playback started after user click'))
			.catch(e=>console.error('Playback failed after user click', e));
		document.removeEventListener('click', resume);
	};
	document.addEventListener('click', resume, {once:true});
	// show a console hint
	console.log('Waiting for one user click to start audio. Click anywhere on the page.');
};

startAudioOnClick();

const photos=[
	'photos/photo1.jpeg',
	'photos/photo2.jpeg',
	'photos/photo3.jpeg'
];

const img = document.getElementById('slideshow');
let current = 0;

function showNextPhoto(){
	// fade out
	img.style.opacity = 0;
	// after fade-out, swap src and fade back in
	setTimeout(()=>{
		current = (current + 1) % photos.length;
		img.src = photos[current];
		img.style.opacity = 1;
	}, 600); // match CSS transition duration
}

// start slideshow
setInterval(showNextPhoto, 3500);

document.getElementById('surpriseBtn').onclick=()=>{
document.getElementById('letterSection').classList.remove('hidden');
};

for(let i=0;i<20;i++){
const h=document.createElement('div');
h.innerHTML='❤️';
h.className='heart';
h.style.left=Math.random()*100+'vw';
h.style.animationDelay=Math.random()*8+'s';
document.getElementById('hearts').appendChild(h);
}
