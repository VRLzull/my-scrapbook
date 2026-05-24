document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       1. CORE STATE & LOCAL STORAGE LOADER
       ========================================== */
    let scrapbookData = {
        name: 'Acha',
        year: '2026'
    };

    if (localStorage.getItem('scrapbook_data')) {
        try {
            scrapbookData = JSON.parse(localStorage.getItem('scrapbook_data'));
        } catch (e) {
            console.error('Error parsing scrapbook data', e);
        }
    }

    function applyScrapbookData() {
        document.querySelectorAll('.name-placeholder').forEach(el => {
            el.textContent = scrapbookData.name;
        });
        
        document.querySelectorAll('.year-stamp').forEach(el => {
            el.textContent = `Est. ${scrapbookData.year}`;
        });

        const inputName = document.getElementById('input-name');
        const inputYear = document.getElementById('input-year');
        if (inputName) inputName.value = scrapbookData.name;
        if (inputYear) inputYear.value = scrapbookData.year;
    }

    applyScrapbookData();

    /* ==========================================
       2. CONFIGURATION MODAL (EASTER EGG EDITOR)
       ========================================== */
    const configModal = document.getElementById('config-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const saveConfigBtn = document.getElementById('save-config');

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('name-placeholder') || e.target.classList.contains('year-stamp')) {
            configModal.classList.add('show');
        }
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            configModal.classList.remove('show');
        });
    }

    if (saveConfigBtn) {
        saveConfigBtn.addEventListener('click', () => {
            const newName = document.getElementById('input-name').value.trim();
            const newYear = document.getElementById('input-year').value.trim();

            if (newName) scrapbookData.name = newName;
            if (newYear) scrapbookData.year = newYear;

            localStorage.setItem('scrapbook_data', JSON.stringify(scrapbookData));
            applyScrapbookData();
            
            configModal.classList.remove('show');
            createHeartShower(15);
        });
    }

    if (configModal) {
        configModal.addEventListener('click', (e) => {
            if (e.target === configModal) {
                configModal.classList.remove('show');
            }
        });
    }

    /* ==========================================
       3. AMBIENT PARTICLES GENERATOR
       ========================================== */
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    if (particlesContainer) {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 6 + 3;
            const left = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 12 + 10;
            const opacity = Math.random() * 0.4 + 0.1;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.opacity = opacity;

            particlesContainer.appendChild(particle);
        }
    }

    /* ==========================================
       4. AUDIO PLAYER CONTROLLER
       ========================================== */
    const bgAudio = document.getElementById('bg-audio');
    const musicBtn = document.getElementById('music-btn');
    const musicContainer = musicBtn ? musicBtn.parentElement : null;
    let isMusicInitiated = false;

    function togglePlay() {
        if (!bgAudio) return;
        if (bgAudio.paused) {
            bgAudio.play().then(() => {
                if (musicContainer) musicContainer.classList.add('playing');
                if (musicBtn) musicBtn.setAttribute('title', 'Matikan Musik 🎵');
            }).catch(err => console.log("Audio play blocked", err));
        } else {
            bgAudio.pause();
            if (musicContainer) musicContainer.classList.remove('playing');
            if (musicBtn) musicBtn.setAttribute('title', 'Nyalakan Musik 🎵');
        }
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', togglePlay);
    }



    function initiateAudio() {
    if (!bgAudio || isMusicInitiated) return;
    // Mark as initiated to prevent further attempts regardless of outcome
    isMusicInitiated = true;
    bgAudio.play().then(() => {
        if (musicContainer) musicContainer.classList.add('playing');
    }).catch(err => console.log('Audio play blocked or failed', err));
}

    /* ==========================================
       5. 3D BOOK & MOBILE FLAT TRANSITIONS NAVIGATION
       ========================================== */
    const paperSheets = document.querySelectorAll('.paper-sheet');
    const totalSheets = paperSheets.length;
    let currentSheetIndex = 0; // For Desktop (Sheet 0 to totalSheets)

    let mobilePages = []; 
    let totalPagesMobile = 0;
    let currentMobilePageIndex = 0;

    function populateMobilePages() {
        mobilePages = [];
        const sheets = document.querySelectorAll('.paper-sheet');
        sheets.forEach(sheet => {
            const front = sheet.querySelector('.front-side');
            const back = sheet.querySelector('.back-side');
            if (front) mobilePages.push(front);
            if (back) mobilePages.push(back);
        });
        
        if (mobilePages.length === 0) {
            document.querySelectorAll('.page-side').forEach(page => {
                mobilePages.push(page);
            });
        }
        totalPagesMobile = mobilePages.length;
    }
    
    populateMobilePages();
    
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const mobileDotsContainer = document.getElementById('mobile-dots');

    function isMobile() {
        return window.matchMedia("(max-width: 768px)").matches;
    }

    function initBook() {
        if (mobilePages.length === 0) populateMobilePages();
        
        if (isMobile()) {
            // Mobile: handle page visibility and sheet stacking
            mobilePages.forEach((page, idx) => {
                page.classList.remove('active-mobile', 'flipped-mobile');
                if (idx === currentMobilePageIndex) {
                    page.classList.add('active-mobile');
                    if (page.parentElement) {
                        page.parentElement.style.zIndex = "10";
                    }
                } else if (idx < currentMobilePageIndex) {
                    page.classList.add('flipped-mobile');
                    if (page.parentElement) {
                        page.parentElement.style.zIndex = "1";
                    }
                } else {
                    if (page.parentElement) {
                        page.parentElement.style.zIndex = "1";
                    }
                }
            });

            // Generate dots
            if (mobileDotsContainer && totalPagesMobile > 0) {
                mobileDotsContainer.innerHTML = '';
                for (let i = 0; i < totalPagesMobile; i++) {
                    const dot = document.createElement('span');
                    dot.classList.add('dot');
                    if (i === currentMobilePageIndex) dot.classList.add('active');
                    
                    dot.addEventListener('click', () => {
                        goToMobilePage(i);
                    });
                    mobileDotsContainer.appendChild(dot);
                }
            }
        } else {
            // Desktop z-indices stacking
            updateZIndices();
        }
        updateNavButtons();
    }

    function updateZIndices() {
        paperSheets.forEach((sheet, idx) => {
            if (idx < currentSheetIndex) {
                sheet.classList.add('flipped');
                sheet.style.zIndex = idx + 1;
            } else {
                sheet.classList.remove('flipped');
                sheet.style.zIndex = totalSheets - idx;
            }
        });
    }

    function updateNavButtons() {
        if (isMobile()) {
            if (prevBtn) prevBtn.disabled = currentMobilePageIndex === 0;
            if (nextBtn) nextBtn.disabled = currentMobilePageIndex === totalPagesMobile - 1;
        } else {
            if (prevBtn) prevBtn.disabled = currentSheetIndex === 0;
            if (nextBtn) nextBtn.disabled = currentSheetIndex === totalSheets;
        }
    }

    function goNext() {
        initiateAudio();
        
        if (isMobile()) {
            if (currentMobilePageIndex < totalPagesMobile - 1) {
                currentMobilePageIndex++;
                initBook(); // Use initBook to ensure all states (classes, z-index, dots) are updated
            }
        } else {
            if (currentSheetIndex < totalSheets - 1) {
                const currentSheet = document.getElementById(`sheet-${currentSheetIndex}`);
                if (currentSheet) currentSheet.classList.add('flipped');
                currentSheetIndex++;
                updateZIndices();
            }
        }
        updateNavButtons();
    }

    function goPrev() {
        initiateAudio();

        if (isMobile()) {
            if (currentMobilePageIndex > 0) {
                currentMobilePageIndex--;
                initBook(); // Use initBook to ensure all states (classes, z-index, dots) are updated
            }
        } else {
            if (currentSheetIndex > 0) {
                currentSheetIndex--;
                const currentSheet = document.getElementById(`sheet-${currentSheetIndex}`);
                if (currentSheet) currentSheet.classList.remove('flipped');
                updateZIndices();
            }
        }
        updateNavButtons();
    }

    function goToMobilePage(targetIndex) {
        initiateAudio();
        if (targetIndex === currentMobilePageIndex) return;
        
        mobilePages.forEach((page, idx) => {
            page.classList.remove('active-mobile', 'flipped-mobile');
            if (idx === targetIndex) {
                page.classList.add('active-mobile');
            } else if (idx < targetIndex) {
                page.classList.add('flipped-mobile');
            }
        });
        
        currentMobilePageIndex = targetIndex;
        updateMobileDots();
        updateNavButtons();
    }

    function updateMobileDots() {
        if (!mobileDotsContainer) return;
        const dots = mobileDotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            dot.classList.remove('active');
            if (idx === currentMobilePageIndex) dot.classList.add('active');
        });
    }

    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    if (nextBtn) nextBtn.addEventListener('click', goNext);

    window.addEventListener('resize', () => {
        if (isMobile()) {
            currentMobilePageIndex = Math.min(currentSheetIndex * 2, totalPagesMobile - 1);
        } else {
            currentSheetIndex = Math.ceil(currentMobilePageIndex / 2);
        }
        initBook();
    });

    initBook();

    /* ==========================================
       6. SWIPE GESTURES FOR MOBILE SCREEN
       ========================================== */
    let touchStartX = 0;
    let touchEndX = 0;

    const bookArea = document.querySelector('.scrapbook-perspective');

    if (bookArea) {
        bookArea.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        bookArea.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        }, { passive: true });
    }

    function handleSwipeGesture() {
        const swipeDistance = touchStartX - touchEndX;
        const minimumSwipe = 50;

        if (swipeDistance > minimumSwipe) {
            goNext();
        } else if (swipeDistance < -minimumSwipe) {
            goPrev();
        }
    }

    /* ==========================================
       7. COVER INTERACTIVE ENVELOPE (TRIGGER OPEN)
       ========================================== */
    const envelopeTrigger = document.getElementById('envelope-trigger');

    if (envelopeTrigger) {
        envelopeTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            initiateAudio();
            
            envelopeTrigger.classList.add('open');
            
            setTimeout(() => {
                goNext();
            }, 1200);
        });
    }

    /* ==========================================
       8. INTERACTIVE POLAROIDS (HALAMAN 2 & 3)
       ========================================== */
    const polaroidCards = document.querySelectorAll('.polaroid-card');

    polaroidCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            initiateAudio();
            
            const isFlipped = card.classList.contains('flipped');
            polaroidCards.forEach(c => c.classList.remove('flipped'));
            
            if (!isFlipped) {
                card.classList.add('flipped');
                createHeartShower(4, card);
            }
        });
    });

    /* ==========================================
       9. RETRO VIDEO CANVAS SIMULATOR (MOVING MEMORIES)
       ========================================== */
    const videoCanvas = document.getElementById('video-canvas');
    const videoPlayBtn = document.getElementById('video-play-btn');
    const videoBox = document.getElementById('video-box');
    let videoPlaying = false;
    let canvasAnimFrame = null;

    if (videoCanvas && videoPlayBtn) {
        const ctx = videoCanvas.getContext('2d');
        
        function resizeCanvas() {
            videoCanvas.width = videoCanvas.parentElement.clientWidth;
            videoCanvas.height = videoCanvas.parentElement.clientHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Particles for retro film look
        const filmParticles = [];
        for (let i = 0; i < 25; i++) {
            filmParticles.push({
                x: Math.random() * 320,
                y: Math.random() * 180,
                size: Math.random() * 2 + 1,
                speedY: Math.random() * 0.5 + 0.2,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        // Slow cinematic color sweep variables
        let hueSweep = 0;

        function renderVideo() {
            if (!videoPlaying) return;
            
            const w = videoCanvas.width;
            const h = videoCanvas.height;
            
            // 1. Draw cozy warm background vignette
            hueSweep = (hueSweep + 0.2) % 360;
            const gradient = ctx.createRadialGradient(w/2, h/2, 10, w/2, h/2, w/2);
            gradient.addColorStop(0, `hsla(${hueSweep + 340}, 35%, 15%, 0.9)`);
            gradient.addColorStop(0.5, `hsla(${hueSweep}, 30%, 8%, 0.95)`);
            gradient.addColorStop(1, '#08080a');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);

            // 2. Draw retro noise and dust particles
            ctx.fillStyle = 'rgba(224, 168, 153, 0.3)';
            filmParticles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x * (w/320), p.y * (h/180), p.size, 0, Math.PI * 2);
                ctx.globalAlpha = p.opacity;
                ctx.fill();
                
                // Move
                p.y -= p.speedY;
                if (p.y < -5) {
                    p.y = 185;
                    p.x = Math.random() * 320;
                }
            });
            ctx.globalAlpha = 1.0;

            // 3. Draw flickering retro light stripes
            if (Math.random() < 0.08) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
                ctx.lineWidth = Math.random() * 2;
                ctx.beginPath();
                const scratchX = Math.random() * w;
                ctx.moveTo(scratchX, 0);
                ctx.lineTo(scratchX + (Math.random() * 20 - 10), h);
                ctx.stroke();
            }

            // 4. Paint cozy lofi messages dynamically
            ctx.font = '22px "Cormorant Garamond", serif';
            ctx.fillStyle = 'rgba(235, 211, 168, 0.8)';
            ctx.textAlign = 'center';
            ctx.fillText('our moving story', w / 2, h / 2 - 10);

            ctx.font = 'italic 12px "Plus Jakarta Sans", sans-serif';
            ctx.fillStyle = 'rgba(224, 168, 153, 0.6)';
            ctx.fillText('memutarkan kembali tawa kita...', w / 2, h / 2 + 20);

            // 5. Update light leak positions in CSS
            if (videoBox && Math.random() < 0.03) {
                videoBox.style.setProperty('--leak-x', `${Math.random() * 100}%`);
                videoBox.style.setProperty('--leak-y', `${Math.random() * 100}%`);
            }

            canvasAnimFrame = requestAnimationFrame(renderVideo);
        }

        videoPlayBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            initiateAudio();
            
            videoPlaying = true;
            if (videoBox) videoBox.classList.add('playing');
            resizeCanvas();
            renderVideo();
            createHeartShower(10, videoPlayBtn);
        });
    }

    /* ==========================================
       10. TIMELINE INTERACTION & LETUSAN EMOJI (OUR STORY)
       ========================================== */
    const timelineNodes = document.querySelectorAll('.timeline-node');

    timelineNodes.forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            initiateAudio();
            
            const emoji = node.getAttribute('data-emoji') || '❤️';
            const bullet = node.querySelector('.node-bullet');
            
            // Spawn flying emojis from bullet point
            if (bullet) {
                const rect = bullet.getBoundingClientRect();
                for (let i = 0; i < 6; i++) {
                    const flyingEmoji = document.createElement('div');
                    flyingEmoji.classList.add('shower-heart');
                    flyingEmoji.textContent = emoji;
                    flyingEmoji.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
                    flyingEmoji.style.top = `${rect.top + rect.height / 2 + window.scrollY}px`;
                    flyingEmoji.style.position = 'absolute';
                    
                    const scale = Math.random() * 1.2 + 0.6;
                    const drift = Math.random() * 120 - 60;
                    const rotation = Math.random() * 180 - 90;
                    flyingEmoji.style.setProperty('--scale', scale);
                    flyingEmoji.style.setProperty('--drift', `${drift}px`);
                    flyingEmoji.style.setProperty('--rotation', `${rotation}deg`);
                    
                    flyingEmoji.style.animation = 'heartFly 1.2s forwards ease-out';
                    document.body.appendChild(flyingEmoji);
                    
                    setTimeout(() => flyingEmoji.remove(), 1200);
                }
            }
        });
    });

    /* ==========================================
       11. TOGA / CONFETTI CELEBRATION (GRADUATION PAGE)
       ========================================== */
    const togaBtn = document.getElementById('toga-btn');

    if (togaBtn) {
        togaBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            initiateAudio();
            
            createHeartShower(25); // Sparkles across screen
            
            // Spawn mortarboards (toga caps) flying up!
            const caps = ['🎓', '✨', '⭐', '🎉', '🤍'];
            const btnRect = togaBtn.getBoundingClientRect();
            
            for (let i = 0; i < 15; i++) {
                const cap = document.createElement('div');
                cap.classList.add('toga-cap-confetti');
                cap.textContent = caps[Math.floor(Math.random() * caps.length)];
                cap.style.left = `${btnRect.left + btnRect.width / 2 + (Math.random() * 80 - 40) + window.scrollX}px`;
                cap.style.top = `${btnRect.top + window.scrollY}px`;
                
                const height = Math.random() * 200 + 150; // rise height
                cap.style.setProperty('--height', `-${height}px`);
                
                document.body.appendChild(cap);
                setTimeout(() => cap.remove(), 2500);
            }
        });
    }

    /* ==========================================
       12. INTERACTIVE LETTERS WAX SEAL (SOMETHING HONEST)
       ========================================== */
    const honestLetterBox = document.getElementById('honest-letter-box');
    const honestSeal = document.getElementById('honest-seal');
    const closeLetterBtn = document.getElementById('close-letter-btn');

    if (honestSeal && honestLetterBox) {
        honestSeal.addEventListener('click', (e) => {
            e.stopPropagation();
            initiateAudio();
            honestLetterBox.classList.add('open');
            createHeartShower(8, honestSeal);
        });
    }

    if (closeLetterBtn && honestLetterBox) {
        closeLetterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            honestLetterBox.classList.remove('open');
        });
    }

    /* ==========================================
       13. SECRET LETTER OVERLAY (ONE LAST THING)
       ========================================== */
    const lockBtn = document.getElementById('lock-btn');
    const cinematicOverlay = document.getElementById('cinematic-overlay');
    const closeCinematicBtn = document.getElementById('close-cinematic-btn');

    if (lockBtn && cinematicOverlay) {
        lockBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            initiateAudio();
            cinematicOverlay.classList.add('show');
            createHeartShower(15, lockBtn);
        });
    }

    if (closeCinematicBtn && cinematicOverlay) {
        closeCinematicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            cinematicOverlay.classList.remove('show');
        });
    }

    /* ==========================================
       14. HINDIA VINYL PLAYER INTEGRATION
       ========================================== */
    const vinylDisc = document.getElementById('vinyl-disc');
    const vinylNeedle = document.getElementById('vinyl-needle');
    const trackItems = document.querySelectorAll('.track-item');
    const vinylLyricsText = document.getElementById('vinyl-lyrics-text');
    let lyricInterval = null;

    function typewriteLyric(text) {
        if (!vinylLyricsText) return;
        clearInterval(lyricInterval);
        vinylLyricsText.innerHTML = '';
        let i = 0;
        
        lyricInterval = setInterval(() => {
            if (i < text.length) {
                vinylLyricsText.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(lyricInterval);
            }
        }, 50);
    }

    trackItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            initiateAudio();
            
            const audioSrc = item.getAttribute('data-audio');
            const lyric = item.getAttribute('data-lyric');

            // 1. Reset selection styling
            trackItems.forEach(t => t.classList.remove('active'));
            item.classList.add('active');

            // 2. Animate mechanical tonearm needle and disc spin
            const wrapper = vinylDisc ? vinylDisc.parentElement : null;
            if (wrapper) wrapper.classList.remove('active-needle');
            if (vinylDisc) vinylDisc.classList.remove('spinning');
            
            setTimeout(() => {
                if (wrapper) wrapper.classList.add('active-needle');
                if (vinylDisc) vinylDisc.classList.add('spinning');
                
                // 3. Audio Crossfade
                if (bgAudio) {
                    const originalVolume = bgAudio.volume;
                    const fadeOut = setInterval(() => {
                        if (bgAudio.volume > 0.1) {
                            bgAudio.volume -= 0.1;
                        } else {
                            clearInterval(fadeOut);
                            bgAudio.pause();
                            bgAudio.src = audioSrc;
                            // Attempt to play new track
                            bgAudio.play().then(() => {
                                bgAudio.volume = originalVolume;
                                if (musicContainer) musicContainer.classList.add('playing');
                            }).catch(err => {
                                console.warn('Failed to play selected track', err);
                                // No fallback to avoid NotSupportedError
                            });
                        }
                    }, 50);
                }
            }, 50);

            // 4. Trigger typwriter lyric rendering
            typewriteLyric(lyric);
            createHeartShower(8, item);
        });
    });

    /* ==========================================
       15. CELEBRATORY CONFETTI HEART SHOWER
       ========================================== */
    const heartShowerBtn = document.getElementById('heart-btn');
    const showerContainer = document.getElementById('heart-shower-container');

    function createHeartShower(count, sourceElement = null) {
        if (!showerContainer) return;
        const hearts = ['❤️', '💖', '🎓', '✨', '🌸', '🌻', '💫', '💝', '🤍'];
        const containerWidth = window.innerWidth;

        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.classList.add('shower-heart');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            
            const scale = Math.random() * 1.5 + 0.8;
            const duration = Math.random() * 3 + 2; 
            const rotation = Math.random() * 360;
            const drift = Math.random() * 200 - 100;

            heart.style.setProperty('--scale', scale);
            heart.style.setProperty('--drift', `${drift}px`);
            heart.style.setProperty('--rotation', `${rotation}deg`);
            heart.style.animationDuration = `${duration}s`;
            
            if (sourceElement) {
                const rect = sourceElement.getBoundingClientRect();
                heart.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
                heart.style.top = `${rect.top + rect.height / 2 + window.scrollY}px`;
                heart.style.position = 'absolute';
                heart.style.animation = 'heartFly 1.5s forwards ease-out';
                document.body.appendChild(heart);
                
                setTimeout(() => heart.remove(), 1500);
            } else {
                const startX = Math.random() * containerWidth;
                heart.style.left = `${startX}px`;
                heart.style.bottom = `-50px`;
                showerContainer.appendChild(heart);
                
                setTimeout(() => heart.remove(), duration * 1000);
            }
        }
    }

    if (heartShowerBtn) {
        heartShowerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            initiateAudio();
            createHeartShower(40);
        });
    }

    // Global fallback: initiate audio on first user interaction anywhere on the page

});
