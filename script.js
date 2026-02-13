const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionContainer = document.getElementById('question-container');
const successContainer = document.getElementById('success-container');

// New elements for the loop image
const noMsgContainer = document.getElementById('no-msg-container');
const loopImg = document.getElementById('loop-img');
let loopImgScale = 0.5;

let yesScale = 1;
let noScale = 1;

noBtn.addEventListener('click', () => {
    // Decrease No button size
    noScale -= 0.1;
    if (noScale < 0) noScale = 0; // Prevent negative scale
    noBtn.style.transform = `scale(${noScale})`;

    // Increase Yes button size
    yesScale += 0.5;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Optional: Move No button slightly to make it chaotic/fun
    const randomX = (Math.random() - 0.5) * 50;
    const randomY = (Math.random() - 0.5) * 50;
    noBtn.style.transform += ` translate(${randomX}px, ${randomY}px)`;

    // Logic for IMG_7819.JPG
    if (noMsgContainer.classList.contains('hidden')) {
        noMsgContainer.classList.remove('hidden');
    }
    loopImgScale += 0.2;
    loopImg.style.transform = `translate(-50%, -50%) scale(${loopImgScale})`;
});

yesBtn.addEventListener('click', () => {
    questionContainer.classList.add('hidden');
    successContainer.classList.remove('hidden');

    // Hide the loop image container if it's visible
    if (!noMsgContainer.classList.contains('hidden')) {
        noMsgContainer.classList.add('hidden');
    }

    // Trigger confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Continuous confetti for a few seconds
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // Trigger Image Flood
    // using the user's provided image
    const floodImageSrc = './IMG_7050.jpg';

    // 1. Flash the image big in the center
    // Create a container for the flash image to ensure centering
    const flashContainer = document.createElement('div');
    flashContainer.classList.add('flash-container');

    const flashImg = document.createElement('img');
    flashImg.src = floodImageSrc;
    flashImg.classList.add('flash-image');

    flashContainer.appendChild(flashImg);
    document.body.appendChild(flashContainer);

    // Remove flash container after animation
    setTimeout(() => {
        flashContainer.remove();
    }, 3000);

    // 2. Start the flood after the flash settles (e.g., 2 seconds in)
    setTimeout(() => {
        for (let i = 0; i < 50; i++) {
            createFloodImage(floodImageSrc);
        }
    }, 2000);
});

function createFloodImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('flood-image');

    // Random position and size
    const left = Math.random() * 100;
    const size = Math.random() * 100 + 50; // 50px to 150px
    const duration = Math.random() * 3 + 2; // 2s to 5s
    const delay = Math.random() * 2; // 0s to 2s

    img.style.left = `${left}vw`;
    img.style.width = `${size}px`;
    img.style.height = `${size}px`;
    img.style.animationDuration = `${duration}s`;
    img.style.animationDelay = `${delay}s`;

    document.body.appendChild(img);

    // Remove after animation
    setTimeout(() => {
        img.remove();
    }, (duration + delay) * 1000);
}

// Background Music Logic
const audio = document.getElementById('bg-music');
audio.volume = 0.5; // Set volume to 50%

// Attempt to autoplay
const playAudio = () => {
    audio.play().catch(error => {
        console.log("Autoplay blocked, waiting for interaction.");
    });
};

// Play on load
playAudio();

// Play on first interaction if blocked
// We listen to multiple events to catch the earliest possible interaction
const startMusic = () => {
    playAudio();
    // Remove listeners once played
    document.body.removeEventListener('click', startMusic);
    document.body.removeEventListener('touchstart', startMusic);
    document.body.removeEventListener('keydown', startMusic);
    document.body.removeEventListener('scroll', startMusic);
};

document.body.addEventListener('click', startMusic, { once: true });
document.body.addEventListener('touchstart', startMusic, { once: true });
document.body.addEventListener('keydown', startMusic, { once: true });
document.body.addEventListener('scroll', startMusic, { once: true });
