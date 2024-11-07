// Select your video element
const video = document.getElementById("assets/I.S.A.A.C_rings_03.mp4");

// Set up the loop
video.addEventListener('ended', () => {
    video.currentTime = 0;  // Reset to the beginning
    video.play();  // Start playing again
}, false);
