// Epic Early 2000s Retro Animation Script
// Inspired by the golden age of web animations

// Initialize all animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    initStars();
    initMatrixRain();
    addRetroSounds();
    initFloatingElements();
    initColorCycle();
});

// Create twinkling stars background
function initStars() {
    const starsContainer = document.getElementById('starsContainer');
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 3 + 1) + 's';
        starsContainer.appendChild(star);
    }
}

// Matrix rain effect (classic hacker aesthetic)
function initMatrixRain() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Matrix characters
    const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?";
    const chars = matrixChars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array to track drop positions
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function drawMatrix() {
        // Semi-transparent black background for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Green text
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = chars[Math.floor(Math.random() * chars.length)];
            
            // Draw character
            ctx.fillStyle = '#0f0';
            if (Math.random() > 0.98) {
                ctx.fillStyle = '#fff'; // Occasional white char for effect
            }
            
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Reset drop to top randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    // Start matrix animation
    setInterval(drawMatrix, 50);
    
    // Resize handler
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Add retro sound effects (using Web Audio API)
function addRetroSounds() {
    // Create audio context for retro beeps
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        function playRetroBeep(frequency = 800, duration = 200) {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration / 1000);
        }
        
        // Add sound effects to buttons
        const buttons = document.querySelectorAll('.retro-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => playRetroBeep(600, 100));
            button.addEventListener('click', () => playRetroBeep(800, 200));
        });
        
    } catch (e) {
        console.log('Audio not supported, continuing without sound effects');
    }
}

// Create floating geometric shapes
function initFloatingElements() {
    const shapes = ['🔺', '🔻', '🔸', '🔹', '⬛', '⬜', '🟢', '🔴', '🟡', '🔵'];
    
    function createFloatingShape() {
        const shape = document.createElement('div');
        shape.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
        shape.style.position = 'absolute';
        shape.style.fontSize = Math.random() * 20 + 10 + 'px';
        shape.style.left = Math.random() * window.innerWidth + 'px';
        shape.style.top = window.innerHeight + 'px';
        shape.style.pointerEvents = 'none';
        shape.style.zIndex = '1';
        shape.style.opacity = '0.7';
        
        // Animation properties
        const duration = Math.random() * 10000 + 5000;
        const rotateAngle = Math.random() * 720 - 360;
        const horizontalDrift = Math.random() * 200 - 100;
        
        shape.style.animation = `
            floatUp ${duration}ms linear forwards,
            floatRotate ${duration}ms linear infinite
        `;
        
        // Add CSS for float animation
        if (!document.getElementById('floatStyles')) {
            const style = document.createElement('style');
            style.id = 'floatStyles';
            style.textContent = `
                @keyframes floatUp {
                    0% { transform: translateY(0) translateX(0); }
                    100% { transform: translateY(-${window.innerHeight + 100}px) translateX(${horizontalDrift}px); }
                }
                @keyframes floatRotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(${rotateAngle}deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(shape);
        
        // Remove element after animation
        setTimeout(() => {
            if (shape.parentNode) {
                shape.parentNode.removeChild(shape);
            }
        }, duration);
    }
    
    // Create floating shapes periodically
    setInterval(createFloatingShape, 2000);
}

// Rainbow color cycling for dynamic elements
function initColorCycle() {
    const rainbowColors = [
        '#ff0000', '#ff7f00', '#ffff00', '#00ff00', 
        '#0000ff', '#4b0082', '#9400d3', '#ff1493'
    ];
    
    let colorIndex = 0;
    
    setInterval(() => {
        colorIndex = (colorIndex + 1) % rainbowColors.length;
        
        // Update spinning logo border color
        const logo = document.querySelector('.spinning-logo');
        if (logo) {
            logo.style.borderColor = rainbowColors[colorIndex];
        }
        
        // Update marquee background
        const marqueeContainer = document.querySelector('.marquee-container');
        if (marqueeContainer) {
            marqueeContainer.style.borderColor = rainbowColors[colorIndex];
        }
        
    }, 500);
}

// Konami Code Easter Egg (classic 2000s feature)
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateKonamiMode();
        konamiCode = [];
    }
});

function activateKonamiMode() {
    // Epic transformation when Konami code is entered
    document.body.style.animation = 'rainbowShift 0.5s ease infinite';
    
    // Add extra spinning elements
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const spinner = document.createElement('div');
            spinner.innerHTML = '⭐';
            spinner.style.position = 'absolute';
            spinner.style.fontSize = '2rem';
            spinner.style.left = Math.random() * window.innerWidth + 'px';
            spinner.style.top = Math.random() * window.innerHeight + 'px';
            spinner.style.animation = 'spin 1s linear infinite';
            spinner.style.pointerEvents = 'none';
            spinner.style.zIndex = '1000';
            document.body.appendChild(spinner);
            
            setTimeout(() => {
                if (spinner.parentNode) {
                    spinner.parentNode.removeChild(spinner);
                }
            }, 3000);
        }, i * 200);
    }
    
    // Show epic message
    alert('🎉 KONAMI CODE ACTIVATED! 🎉\nYou have unlocked the secret retro mode!');
    
    // Reset body animation after effect
    setTimeout(() => {
        document.body.style.animation = '';
    }, 3000);
}

// Mouse trail effect (classic 2000s cursor effect)
const trail = [];
const trailLength = 20;

document.addEventListener('mousemove', function(e) {
    trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (trail.length > trailLength) {
        trail.shift();
    }
    
    // Create trailing sparkles
    if (Math.random() > 0.8) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '1rem';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        
        // Add sparkle animation if not exists
        if (!document.getElementById('sparkleStyles')) {
            const style = document.createElement('style');
            style.id = 'sparkleStyles';
            style.textContent = `
                @keyframes sparkle {
                    0% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0.5) translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
});

// Add random glitch effects
setInterval(() => {
    const glitchElements = document.querySelectorAll('.neon-title, .rainbow-text');
    glitchElements.forEach(element => {
        if (Math.random() > 0.95) {
            element.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg)';
            setTimeout(() => {
                element.style.filter = '';
            }, 200);
        }
    });
}, 1000);

// Welcome message (classic early 2000s popup)
setTimeout(() => {
    if (confirm('🌟 Welcome to CYBERSPACE! 🌟\n\nWould you like to enable EPIC MODE for maximum retro experience?')) {
        document.body.classList.add('epic-mode');
        
        // Add extra visual effects for epic mode
        const style = document.createElement('style');
        style.textContent = `
            .epic-mode .neon-title {
                animation-duration: 0.5s;
            }
            .epic-mode .spinning-logo {
                animation-duration: 1s;
            }
            .epic-mode .flying-emoji {
                animation-duration: 4s;
            }
        `;
        document.head.appendChild(style);
        
        alert('🎊 EPIC MODE ACTIVATED! 🎊\nEnjoy the ultimate retro experience!');
    }
}, 2000);

// ENTER PORTAL - Epic gaming portal with retro games
function enterPortal() {
    // Epic entrance animation
    document.body.style.filter = 'brightness(0)';
    document.body.style.transition = 'filter 0.5s';
    
    setTimeout(() => {
        document.body.style.filter = 'brightness(1) hue-rotate(180deg)';
        
        // Create portal effect
        const portal = document.createElement('div');
        portal.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 300px;
                height: 300px;
                border: 5px solid #0ff;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(0,255,255,0.1), rgba(255,0,255,0.1));
                animation: portalSpin 2s linear infinite, portalPulse 1s ease-in-out infinite;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-family: 'Orbitron', monospace;
                color: #0ff;
                text-align: center;
                box-shadow: 0 0 50px #0ff;
            ">
                <h2 style="margin-bottom: 20px; text-shadow: 0 0 10px #0ff;">🎮 GAME PORTAL 🎮</h2>
                <button onclick="playSnake()" style="
                    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                    border: 2px solid #fff;
                    color: white;
                    padding: 10px 20px;
                    margin: 5px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                ">🐍 SNAKE GAME</button>
                <button onclick="playPong()" style="
                    background: linear-gradient(45deg, #4ecdc4, #45b7d1);
                    border: 2px solid #fff;
                    color: white;
                    padding: 10px 20px;
                    margin: 5px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                ">🏓 PONG CLASSIC</button>
                <button onclick="closePortal()" style="
                    background: linear-gradient(45deg, #ff4757, #ff6b6b);
                    border: 2px solid #fff;
                    color: white;
                    padding: 10px 20px;
                    margin: 5px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                ">❌ EXIT PORTAL</button>
            </div>
        `;
        
        // Add portal animations
        const portalStyle = document.createElement('style');
        portalStyle.textContent = `
            @keyframes portalSpin {
                0% { transform: translate(-50%, -50%) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(360deg); }
            }
            @keyframes portalPulse {
                0%, 100% { box-shadow: 0 0 50px #0ff; }
                50% { box-shadow: 0 0 80px #0ff, 0 0 100px #ff00ff; }
            }
        `;
        document.head.appendChild(portalStyle);
        
        document.body.appendChild(portal);
        
    }, 500);
}

function closePortal() {
    const portal = document.querySelector('div[style*="position: fixed"]');
    if (portal) {
        portal.remove();
    }
    document.body.style.filter = '';
}

// CYBER MAIL - Retro email interface
function openCyberMail() {
    // Mail opening animation
    document.body.style.filter = 'sepia(1) hue-rotate(60deg)';
    document.body.style.transition = 'filter 0.5s';
    
    setTimeout(() => {
        const mailInterface = document.createElement('div');
        mailInterface.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 600px;
                height: 400px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: 3px solid #fff;
                border-radius: 10px;
                z-index: 10000;
                font-family: 'Comic Neue', cursive;
                color: white;
                padding: 20px;
                box-shadow: 0 0 30px rgba(0,0,0,0.8);
                animation: mailSlideIn 0.5s ease-out;
            ">
                <div style="
                    background: rgba(0,0,0,0.3);
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 15px;
                    border-left: 5px solid #0ff;
                ">
                    <h2 style="margin: 0 0 10px 0; color: #0ff;">📧 YOU'VE GOT MAIL! 📧</h2>
                    <p style="margin: 5px 0;"><strong>From:</strong> admin@cyberspace.net</p>
                    <p style="margin: 5px 0;"><strong>Subject:</strong> Welcome to the Digital Frontier!</p>
                    <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div style="
                    background: rgba(255,255,255,0.1);
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 15px;
                    height: 200px;
                    overflow-y: auto;
                    font-size: 14px;
                    line-height: 1.6;
                ">
                    <p>Greetings, Cyber Warrior!</p>
                    <p>🌟 Welcome to the most radical corner of the internet! 🌟</p>
                    <p>You have successfully entered CYBERSPACE, where the impossible becomes possible and the digital dreams come true!</p>
                    <p>✨ Features unlocked:</p>
                    <ul>
                        <li>🚀 Warp-speed browsing</li>
                        <li>🎮 Classic arcade games</li>
                        <li>🌈 Rainbow-powered animations</li>
                        <li>⭐ Unlimited cool points</li>
                    </ul>
                    <p>Remember: In cyberspace, you're not just browsing - you're SURFING THE INFORMATION SUPERHIGHWAY!</p>
                    <p>Stay radical!</p>
                    <p>- The Cyberspace Admin Team</p>
                </div>
                <div style="text-align: center;">
                    <button onclick="sendReply()" style="
                        background: linear-gradient(45deg, #4ecdc4, #44a08d);
                        border: 2px solid #fff;
                        color: white;
                        padding: 10px 20px;
                        margin: 5px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                    ">📝 REPLY</button>
                    <button onclick="closeMail()" style="
                        background: linear-gradient(45deg, #ff6b6b, #ff4757);
                        border: 2px solid #fff;
                        color: white;
                        padding: 10px 20px;
                        margin: 5px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                    ">❌ CLOSE</button>
                </div>
            </div>
        `;
        
        // Add mail animation
        const mailStyle = document.createElement('style');
        mailStyle.textContent = `
            @keyframes mailSlideIn {
                0% { transform: translate(-50%, -100%); opacity: 0; }
                100% { transform: translate(-50%, -50%); opacity: 1; }
            }
        `;
        document.head.appendChild(mailStyle);
        
        document.body.appendChild(mailInterface);
    }, 300);
}

function sendReply() {
    alert('📧 Reply sent to cyberspace! 📧\n\nYour message has been transmitted through the digital void!');
}

function closeMail() {
    const mail = document.querySelector('div[style*="position: fixed"]');
    if (mail) {
        mail.remove();
    }
    document.body.style.filter = '';
}

// WEB RING - Classic 2000s web directory
function openWebRing() {
    // Web ring opening effect
    document.body.style.filter = 'contrast(1.5) saturate(1.5)';
    document.body.style.transition = 'filter 0.5s';
    
    setTimeout(() => {
        const webRing = document.createElement('div');
        webRing.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 700px;
                height: 500px;
                background: linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7);
                background-size: 300% 300%;
                animation: webRingGradient 3s ease infinite;
                border: 5px solid #fff;
                border-radius: 15px;
                z-index: 10000;
                font-family: 'Comic Neue', cursive;
                color: white;
                padding: 20px;
                box-shadow: 0 0 50px rgba(0,0,0,0.8);
                overflow-y: auto;
            ">
                <h2 style="
                    text-align: center;
                    margin-bottom: 20px;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                    font-size: 2rem;
                ">🌐 CYBER WEB RING 🌐</h2>
                <div style="
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin-bottom: 20px;
                ">
                    <div onclick="visitSite('GeoCities')" style="
                        background: rgba(255,255,255,0.2);
                        padding: 15px;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: transform 0.3s;
                        border: 2px solid transparent;
                    " onmouseover="this.style.transform='scale(1.05)'; this.style.borderColor='#fff';" onmouseout="this.style.transform='scale(1)'; this.style.borderColor='transparent';">
                        <h3>🏠 GeoCities Neighborhood</h3>
                        <p>Visit rad personal homepages!</p>
                    </div>
                    <div onclick="visitSite('Angelfire')" style="
                        background: rgba(255,255,255,0.2);
                        padding: 15px;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: transform 0.3s;
                        border: 2px solid transparent;
                    " onmouseover="this.style.transform='scale(1.05)'; this.style.borderColor='#fff';" onmouseout="this.style.transform='scale(1)'; this.style.borderColor='transparent';">
                        <h3>🔥 Angelfire Zone</h3>
                        <p>Hot sites with cool graphics!</p>
                    </div>
                    <div onclick="visitSite('Flash Portal')" style="
                        background: rgba(255,255,255,0.2);
                        padding: 15px;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: transform 0.3s;
                        border: 2px solid transparent;
                    " onmouseover="this.style.transform='scale(1.05)'; this.style.borderColor='#fff';" onmouseout="this.style.transform='scale(1)'; this.style.borderColor='transparent';">
                        <h3>⚡ Flash Portal</h3>
                        <p>Interactive animations galore!</p>
                    </div>
                    <div onclick="visitSite('Retro Gaming')" style="
                        background: rgba(255,255,255,0.2);
                        padding: 15px;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: transform 0.3s;
                        border: 2px solid transparent;
                    " onmouseover="this.style.transform='scale(1.05)'; this.style.borderColor='#fff';" onmouseout="this.style.transform='scale(1)'; this.style.borderColor='transparent';">
                        <h3>🎮 Retro Gaming Hub</h3>
                        <p>Classic games and cheats!</p>
                    </div>
                    <div onclick="visitSite('Web Rings')" style="
                        background: rgba(255,255,255,0.2);
                        padding: 15px;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: transform 0.3s;
                        border: 2px solid transparent;
                    " onmouseover="this.style.transform='scale(1.05)'; this.style.borderColor='#fff';" onmouseout="this.style.transform='scale(1)'; this.style.borderColor='transparent';">
                        <h3>🔗 Web Rings Central</h3>
                        <p>Join the coolest web rings!</p>
                    </div>
                    <div onclick="visitSite('Chat Rooms')" style="
                        background: rgba(255,255,255,0.2);
                        padding: 15px;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: transform 0.3s;
                        border: 2px solid transparent;
                    " onmouseover="this.style.transform='scale(1.05)'; this.style.borderColor='#fff';" onmouseout="this.style.transform='scale(1)'; this.style.borderColor='transparent';">
                        <h3>💬 Chat Rooms</h3>
                        <p>Meet cool people online!</p>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button onclick="randomSite()" style="
                        background: linear-gradient(45deg, #667eea, #764ba2);
                        border: 2px solid #fff;
                        color: white;
                        padding: 12px 25px;
                        margin: 5px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                        font-size: 1.1rem;
                    ">🎲 RANDOM SITE</button>
                    <button onclick="closeWebRing()" style="
                        background: linear-gradient(45deg, #ff6b6b, #ff4757);
                        border: 2px solid #fff;
                        color: white;
                        padding: 12px 25px;
                        margin: 5px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                        font-size: 1.1rem;
                    ">❌ EXIT RING</button>
                </div>
            </div>
        `;
        
        // Add web ring animation
        const webRingStyle = document.createElement('style');
        webRingStyle.textContent = `
            @keyframes webRingGradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(webRingStyle);
        
        document.body.appendChild(webRing);
    }, 300);
}

function visitSite(siteName) {
    const messages = {
        'GeoCities': '🏠 Entering GeoCities...\nWelcome to the neighborhood! Under construction since 1999! 🚧',
        'Angelfire': '🔥 Accessing Angelfire...\nHot site detected! Downloading animated GIFs... 📡',
        'Flash Portal': '⚡ Loading Flash Portal...\nAdobe Flash Player required! Click here to download! 🔄',
        'Retro Gaming': '🎮 Connecting to Gaming Hub...\nCheat codes: ↑↑↓↓←→←→BA START 🕹️',
        'Web Rings': '🔗 Joining Web Ring...\nYou are visitor #999,999! Sign our guestbook! 📝',
        'Chat Rooms': '💬 Entering Chat Room...\nA/S/L? Welcome to #CyberCafe! 👋'
    };
    
    alert(messages[siteName] || 'Surfing the web like it\'s 1999! 🏄‍♂️');
}

function randomSite() {
    const sites = ['GeoCities', 'Angelfire', 'Flash Portal', 'Retro Gaming', 'Web Rings', 'Chat Rooms'];
    const randomSite = sites[Math.floor(Math.random() * sites.length)];
    visitSite(randomSite);
}

function closeWebRing() {
    const webRing = document.querySelector('div[style*="position: fixed"]');
    if (webRing) {
        webRing.remove();
    }
    document.body.style.filter = '';
}

// Mini Games for the Portal
function playSnake() {
    closePortal();
    alert('🐍 SNAKE GAME LOADING... 🐍\n\nUse arrow keys to control the snake!\nEat the apples to grow!\n\n(This would open a full Snake game in a real implementation)');
    
    // Simple snake game placeholder - in a real implementation this would be a full game
    const gameArea = document.createElement('div');
    gameArea.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 400px;
            background: #000;
            border: 3px solid #0f0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0f0;
            font-family: monospace;
            font-size: 1.5rem;
            text-align: center;
        ">
            🐍 SNAKE GAME 🐍<br><br>
            Coming Soon!<br><br>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #0f0;
                color: #000;
                border: none;
                padding: 10px 20px;
                font-weight: bold;
                cursor: pointer;
            ">BACK TO PORTAL</button>
        </div>
    `;
    document.body.appendChild(gameArea);
}

function playPong() {
    closePortal();
    alert('🏓 PONG CLASSIC LOADING... 🏓\n\nClassic arcade action!\nFirst to 10 points wins!\n\n(This would open a full Pong game in a real implementation)');
    
    // Simple pong game placeholder
    const gameArea = document.createElement('div');
    gameArea.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 600px;
            height: 400px;
            background: #000;
            border: 3px solid #fff;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-family: monospace;
            font-size: 1.5rem;
            text-align: center;
        ">
            🏓 PONG CLASSIC 🏓<br><br>
            Coming Soon!<br><br>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #fff;
                color: #000;
                border: none;
                padding: 10px 20px;
                font-weight: bold;
                cursor: pointer;
            ">BACK TO PORTAL</button>
        </div>
    `;
    document.body.appendChild(gameArea);
} 