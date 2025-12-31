let countdownStarted = false;
let timeLeft = 150; // 2.5 minute = 150 seconds

const memories = [
    { url: 'IMAGES/20241201_163811(1).jpg', msg: "Starting with my favorite memory... ❤️" },
    { url: 'IMAGES/20251212_160540.jpg', msg: "Remember this beautiful day?" },
    { url: 'IMAGES/20251212_195520.jpg', msg: "I'm so grateful for you." },
    { url: 'IMAGES/20251213_092653.jpg', msg: "Every day is better with you." },
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
    // 1. Start Photo Gallery
    setInterval(() => {
        currentIndex = (currentIndex + 1) % memories.length;
        const img = document.getElementById('display-img');
        const msg = document.getElementById('love-message');
        img.style.opacity = 0;
        setTimeout(() => {
            img.src = memories[currentIndex].url;
            msg.innerText = memories[currentIndex].msg;
            img.style.opacity = 1;
        }, 1000);
    }, 5000);

    // 2. Start 2.5 Minute Countdown
    const timerInterval = setInterval(() => {
        timeLeft--;

        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        
        // Top bar timer update
        document.getElementById('small-timer').innerText = 
            `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;

        // Last 30 seconds big countdown
        if (timeLeft <= 30 && timeLeft > 0) {
            document.getElementById('countdown-30s').style.display = 'flex';
            document.getElementById('big-num').innerText = s;
        }

        // Countdown Finished
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
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
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}
