const audio = document.getElementById('bg-audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');

function initAudio() {
    audio.volume = 0.5;
    
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    audio.addEventListener('play', () => {
        playPauseBtn.classList.remove('fa-play');
        playPauseBtn.classList.add('fa-pause');
    });

    audio.addEventListener('pause', () => {
        playPauseBtn.classList.remove('fa-pause');
        playPauseBtn.classList.add('fa-play');
    });

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        
        if (duration > 0) {
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            currentTimeEl.textContent = formatTime(currentTime);
            totalTimeEl.textContent = formatTime(duration);
        }
    });

    // Handle initial duration if already loaded
    audio.addEventListener('loadedmetadata', () => {
        totalTimeEl.textContent = formatTime(audio.duration);
    });
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Add glow effect and tilt to cards
document.addEventListener('DOMContentLoaded', () => {
    initAudio();
    
    // --- Camada de Proteção Máxima (Extreme Anti-Tamper) ---
    
    // Desabilita o console
    Object.defineProperty(window, 'console', {
        value: Object.freeze({
            log: () => {},
            info: () => {},
            warn: () => {},
            error: () => {},
            debug: () => {},
            dir: () => {},
            table: () => {}
        }),
        writable: false,
        configurable: false
    });

    // Bloqueia clique direito
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Bloqueia atalhos de teclado avançados
    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'F12' || 
            e.keyCode === 123 ||
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // I, J, C
            (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83 || e.keyCode === 80 || e.keyCode === 65)) // U, S, P, A
        ) {
            e.preventDefault();
            return false;
        }
    });

    // Bloqueia arrastar qualquer coisa
    document.addEventListener('dragstart', (e) => e.preventDefault());

    // Detecção agressiva de DevTools
    const detectDevTools = () => {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            // Se o DevTools for detectado pelo redimensionamento, limpa a página
            document.body.innerHTML = "<h1>Proteção Ativada</h1>";
            window.location.reload();
        }
    };
    
    setInterval(detectDevTools, 1000);

    // Trap infinita para debugger
    (function() {
        const block = function() {
            setInterval(function() {
                debugger;
            }, 50);
        };
        try {
            block();
        } catch (err) {}
    })();

    // --- Fim da Proteção ---

    const socialIcons = document.querySelectorAll('.social-icons a i');
    const cards = document.querySelectorAll('.glass-card, .music-player-card');
    const enterOverlay = document.getElementById('enter-overlay');

    enterOverlay.addEventListener('click', () => {
        enterOverlay.classList.add('hidden');
        audio.play().catch(error => {
            console.log("Autoplay prevented:", error);
        });
    });

    // Discord Copy Logic
    const discordBtn = document.getElementById('discord-btn');
    const discordTooltip = document.getElementById('discord-tooltip');
    const discordUser = "9wh4";

    if (discordBtn) {
        discordBtn.addEventListener('click', (e) => {
            e.preventDefault();
            copyToClipboard(discordUser, discordTooltip);
        });
    }

    // Spotify Copy Logic
    const spotifyBtn = document.getElementById('spotify-btn');
    const spotifyTooltip = document.getElementById('spotify-tooltip');
    const spotifyLink = "https://open.spotify.com/user/31astyys3grboybsnkc7lkls4gl4?si=a96937729af344dc";

    if (spotifyBtn) {
        spotifyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            copyToClipboard(spotifyLink, spotifyTooltip);
        });
    }

    // TikTok Copy Logic
    const tiktokBtn = document.getElementById('tiktok-btn');
    const tiktokTooltip = document.getElementById('tiktok-tooltip');
    const tiktokLink = "https://www.tiktok.com/@z9du7";

    if (tiktokBtn) {
        tiktokBtn.addEventListener('click', (e) => {
            e.preventDefault();
            copyToClipboard(tiktokLink, tiktokTooltip);
        });
    }

    // Instagram Copy Logic
    const instagramBtn = document.getElementById('instagram-btn');
    const instagramTooltip = document.getElementById('instagram-tooltip');
    const instagramLink = "https://www.instagram.com/qjapa7/"; // Seu novo link do Instagram

    if (instagramBtn) {
        instagramBtn.addEventListener('click', (e) => {
            e.preventDefault();
            copyToClipboard(instagramLink, instagramTooltip);
        });
    }

    function copyToClipboard(text, tooltip) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = tooltip.textContent;
            tooltip.textContent = "Copied!";
            tooltip.classList.add('copied');
            
            setTimeout(() => {
                tooltip.textContent = originalText;
                tooltip.classList.remove('copied');
            }, 2000);
        });
    }

    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.textShadow = '0 0 25px var(--glow-color), 0 0 35px var(--glow-color)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.textShadow = '0 0 15px var(--glow-color)';
        });
    });

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
});