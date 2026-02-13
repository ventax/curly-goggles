// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Music
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("music-toggle");
let isMusicPlaying = false;

// Music Toggle
musicToggle.addEventListener("click", () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.textContent = "🔇";
        isMusicPlaying = false;
    } else {
        bgMusic.play();
        musicToggle.textContent = "🔊";
        isMusicPlaying = true;
    }
});

// Floating Hearts Animation with Yellow Elements
function createFloatingHeart() {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    
    // Mix of pink hearts and yellow elements (pacar suka kuning!)
    const emojis = ["❤️", "❤️", "💛", "⭐", "✨", "🌟", "💕", "💛"];
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 5 + "s";
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    
    document.getElementById("hearts-container").appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Generate hearts periodically
setInterval(createFloatingHeart, 500);

// Click Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";
    
    // Auto play music when envelope opened
    if (!isMusicPlaying) {
        bgMusic.play().catch(() => {
            // If autoplay blocked, user can manually play
            console.log("Autoplay blocked");
        });
        isMusicPlaying = true;
        musicToggle.textContent = "🔊";
    }

    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// Logic to move the NO btn
const noSound = document.getElementById("noSound");

noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    
    // Play sound effect when hovering No button
    if (noSound) {
        noSound.currentTime = 0; // Reset to start
        noSound.play().catch(err => console.log("Sound play blocked:", err));
    }
});

// Logic to make YES btn to grow
let yesScale = 1;

yesBtn.style.position = "relative";
yesBtn.style.transformOrigin = "center center";
yesBtn.style.transition = "transform 0.3s ease";

noBtn.addEventListener("click", () => {
    yesScale += 0.3;
    
    if (yesScale > 3) yesScale = 3; // Max scale limit

    if (yesBtn.style.position !== "fixed") {
        yesBtn.style.position = "fixed";
        yesBtn.style.top = "50%";
        yesBtn.style.left = "50%";
        yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
        yesBtn.style.zIndex = "999";
    } else {
        yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
    }
    
    // Play sound effect when clicking No button
    if (noSound) {
        noSound.currentTime = 0; // Reset to start
        noSound.play().catch(err => console.log("Sound play blocked:", err));
    }
});

// Confetti Effect with Yellow!
function createConfetti() {
    // Mix pink and soft yellow colors
    const colors = [
        '#ff69b4', '#ff1493', '#ffc0cb', '#ff6b9d', // Pink tones
        '#fff9c4', '#ffe082', '#ffd54f', '#ffecb3', '#fff59d' // Soft yellow tones
    ];
    const confettiCount = 120;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// YES is clicked
yesBtn.addEventListener("click", () => {
    title.textContent = "Hallo Chitato!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    // Show message section with button
    document.getElementById("message-section").style.display = "flex";
    
    // Trigger confetti
    createConfetti();
});

// Reveal Gifts Button
const revealGiftsBtn = document.getElementById("reveal-gifts-btn");
if (revealGiftsBtn) {
    revealGiftsBtn.addEventListener("click", () => {
        // Hide message section with fade out
        const messageSection = document.getElementById("message-section");
        messageSection.style.opacity = "0";
        messageSection.style.transform = "scale(0.9)";
        
        setTimeout(() => {
            messageSection.style.display = "none";
            
            // Show mystery boxes with fade in
            const mysteryBoxes = document.getElementById("mystery-boxes");
            mysteryBoxes.style.display = "flex";
            
            setTimeout(() => {
                mysteryBoxes.style.opacity = "1";
                mysteryBoxes.style.transform = "scale(1)";
            }, 50);
        }, 400);
    });
}

// Mystery Boxes Logic - Open Popup
const photoModal = document.getElementById("photo-modal");
const modalPhoto = document.getElementById("modal-photo");
const modalCaption = document.getElementById("modal-caption");
const modalClose = document.getElementById("modal-close");

document.addEventListener("click", (e) => {
    const giftBox = e.target.closest(".gift-box");
    
    if (giftBox && !giftBox.classList.contains("opened")) {
        // Mark as opened
        giftBox.classList.add("opened");
        
        // Get photo and caption from data attributes
        const photoSrc = giftBox.getAttribute("data-photo");
        const caption = giftBox.getAttribute("data-caption");
        
        // Small delay for box opening animation
        setTimeout(() => {
            // Set modal content
            modalPhoto.src = photoSrc;
            modalCaption.textContent = caption;
            
            // Show modal
            photoModal.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent scroll
        }, 400);
        
        // Optional: Play sound effect
        // You can add a "pop" or "gift opening" sound here
    }
});

// Close Modal
function closeModal() {
    photoModal.classList.remove("active");
    document.body.style.overflow = "auto"; // Restore scroll
}

modalClose.addEventListener("click", closeModal);

// Close when clicking overlay
document.querySelector(".modal-overlay").addEventListener("click", closeModal);

// Close with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && photoModal.classList.contains("active")) {
        closeModal();
    }
});