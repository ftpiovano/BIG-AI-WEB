// Aurora Borealis Video Background Handling
window.addEventListener('load', () => {
    const mainVideo = document.querySelector('.bg-video__media');
    
    if (mainVideo) {
        mainVideo.muted = true;
        mainVideo.defaultMuted = true;
        mainVideo.setAttribute('muted', '');
        mainVideo.setAttribute('playsinline', '');
        mainVideo.setAttribute('autoplay', '');

        const tryPlay = () => mainVideo.play();
        const playPromise = tryPlay();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log("Video playing successfully");
            }).catch(error => {
                console.error("Video playback failed:", error);
                
                const playOnInteraction = () => {
                    tryPlay().then(() => {
                        document.removeEventListener('click', playOnInteraction);
                        document.removeEventListener('touchstart', playOnInteraction);
                        document.removeEventListener('keydown', playOnInteraction);
                    });
                };
                document.addEventListener('click', playOnInteraction);
                document.addEventListener('touchstart', playOnInteraction, { passive: true });
                document.addEventListener('keydown', playOnInteraction);
            });
        }
    }
});
