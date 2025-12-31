let timeLeft = 150; // Total time 2.5 minutes (150 seconds)

const memories = [
    { url: 'IMAGES/20241201_163811(1).jpg', msg: "Starting with our best memories... ❤️" },
    { url: 'IMAGES/20251212_160540.jpg', msg: "I love this picture of us!" },
    { url: 'IMAGES/20251212_195520.jpg', msg: "Grateful for every moment." },
    { url: 'IMAGES/20251213_092653.jpg', msg: "You are my everything." },
    { url: 'IMAGES/20251213_093322.jpg', msg: "You make me so happy!" },
    { url: 'IMAGES/20251213_095207.jpg', msg: "Can't wait for 2026 with you." }
];

let currentIndex = 0;
const bgMusic = document.getElementById('bg-music');

document.getElementById('start-btn').onclick = () => {
    document.getElementById('overlay').style.display = 'none';
    if(bgMusic) bgMusic.play();
    startSurprise();
};

function startSurprise() {
    // 1. Photo Gallery (Har 5 second mein photo badlegi)
    const galleryInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % memories.length;
        const img = document.getElementById('display-img');
        const msg = document.getElementById('love-message');
        if(img) {
            img.style.opacity = 0;
            setTimeout(() => {
                img.src = memories[currentIndex].url;
                msg.innerText = memories[currentIndex].msg;
                img.style.opacity = 1;
            }, 1000);
        }
    }, 5000);

    // 2. Timer Logic
    const timerInterval = setInterval(() => {
        timeLeft--;

        // Top bar mein 2:30 se countdown dikhega
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        const timerEl = document.getElementById('small-timer');
        if(timerEl) timerEl.innerText = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;

        // --- SPECIAL TRIGGER: Jab sirf 10 seconds bache hon ---
        if (timeLeft <= 10 && timeLeft > 0) {
            const countdownOverlay = document.getElementById('countdown-30s');
            const bigNum = document.getElementById('big-num');
            
            if (countdownOverlay) {
                countdownOverlay.style.display = 'flex'; // Bada countdown show karna
                bigNum.innerText = timeLeft; // 10, 9, 8...
                
                const pTag = countdownOverlay.querySelector('p');
                if(pTag) pTag.innerText = "HOLD MY HANDS... ❤️"; 
            }
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearInterval(galleryInterval);
            celebrate();
        }
    }, 1000);
}

function celebrate() {
    document.getElementById('countdown-30s').style.display = 'none';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('midnight-screen').style.display = 'flex';
    
    const end = Date.now() + (60 * 1000);
    (function frame() {
        confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}


