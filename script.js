let timeLeft = 150; // 2.5 Minutes

const memories = [
    { url: 'IMAGES/20241201_163811(1).jpg', msg: "I remember this day so clearly... ❤️" },
    { url: 'IMAGES/20251212_160540.jpg', msg: "You look so beautiful here." },
    { url: 'IMAGES/20251212_195520.jpg', msg: "I am so lucky to have you." },
    { url: 'IMAGES/20251213_092653.jpg', msg: "Let's make more memories like this." },
    { url: 'IMAGES/20251213_093322.jpg', msg: "Every second with you is a gift." },
    { url: 'IMAGES/20251213_095207.jpg', msg: "2026 is ours! ❤️" }
];

let currentIndex = 0;
const bgMusic = document.getElementById('bg-music');

document.getElementById('start-btn').onclick = function() {
    document.getElementById('overlay').style.display = 'none';
    if(bgMusic) bgMusic.play();
    startApp();
};

function startApp() {
    // 1. Photo Cycle
    setInterval(function() {
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

    // 2. Countdown Timer
    const timer = setInterval(function() {
        timeLeft--;
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        document.getElementById('small-timer').innerText = m.toString().padStart(2,'0') + ":" + s.toString().padStart(2,'0');

        // Trigger: Jab 10 seconds bache hon
        if (timeLeft <= 10 && timeLeft > 0) {
            document.getElementById('countdown-30s').style.display = 'flex';
            document.getElementById('big-num').innerText = timeLeft;
        }

        // Trigger: Countdown Khatam
        if (timeLeft <= 0) {
            clearInterval(timer);
            showFireworks();
        }
    }, 1000);
}

function showFireworks() {
    document.getElementById('countdown-30s').style.display = 'none';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('midnight-screen').style.display = 'flex';
    
    const duration = 60 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}
