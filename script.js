// Total time 150 seconds (2.5 minutes)
let timeLeft = 20; 

// Aapki photos ke sahi naam (Inhe check kar lena)
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

// Jab button click hoga tabhi sab shuru hoga
document.getElementById('start-btn').onclick = function() {
    document.getElementById('overlay').style.display = 'none';
    if(bgMusic) {
        bgMusic.play().catch(e => console.log("Music play error:", e));
    }
    startSurprise();
};

function startSurprise() {
    // 1. Photos change karne ka logic
    const galleryInterval = setInterval(function() {
        currentIndex = (currentIndex + 1) % memories.length;
        const img = document.getElementById('display-img');
        const msg = document.getElementById('love-message');
        if(img) {
            img.style.opacity = 0;
            setTimeout(function() {
                img.src = memories[currentIndex].url;
                msg.innerText = memories[currentIndex].msg;
                img.style.opacity = 1;
            }, 1000);
        }
    }, 5000);

    // 2. Countdown logic
    const timerInterval = setInterval(function() {
        timeLeft--;

        // Top timer bar update
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        const timerEl = document.getElementById('small-timer');
        if(timerEl) {
            timerEl.innerText = m.toString().padStart(2,'0') + ":" + s.toString().padStart(2,'0');
        }

        // --- 10 Seconds bache par "HOLD MY HANDS" ---
        if (timeLeft <= 10 && timeLeft > 0) {
            const countdownOverlay = document.getElementById('countdown-30s');
            const bigNum = document.getElementById('big-num');
            
            if (countdownOverlay) {
                countdownOverlay.style.display = 'flex'; 
                bigNum.innerText = timeLeft; 
                
                const pTag = countdownOverlay.querySelector('p');
                if(pTag) pTag.innerText = "HOLD MY HANDS... ❤️"; 
            }
        }

        // --- Timer khatam hone par Celebration ---
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearInterval(galleryInterval);
            celebrate();
        }
    }, 1000);
}

function celebrate() {
    // Sab kuch chhupa kar final screen dikhana
    document.getElementById('countdown-30s').style.display = 'none';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('midnight-screen').style.display = 'flex';
    
    // Fireworks chalu karna
    const end = Date.now() + (60 * 1000);
    (function frame() {
        confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}


