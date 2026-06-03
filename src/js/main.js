/**
 * ============================================================================
 * MAIN JAVASCRIPT ENTRY POINT
 * ============================================================================
 * Handles global state, animations, and micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Mathieu Elion Portfolio initialized.');
    initPromptMode();
    initHeroCanvas();

    // Dismiss tooltips on scroll to prevent them from persisting and overlapping layout sections (only on mobile)
    window.addEventListener('scroll', () => {
        if (window.innerWidth < 768 && document.activeElement && document.activeElement.classList.contains('prompt-badge')) {
            document.activeElement.blur();
        }
    }, { passive: true });


    
    const playgroundTrigger = document.querySelector('.playground-trigger');
    const playgroundSection = document.getElementById('playground');
    const playgroundContent = document.getElementById('playground-content');

    if (playgroundTrigger && playgroundSection && playgroundContent) {
        playgroundTrigger.addEventListener('click', () => {
            const isExpanded = playgroundContent.classList.toggle('is-expanded');
            playgroundTrigger.setAttribute('aria-expanded', isExpanded);
            playgroundContent.setAttribute('aria-hidden', !isExpanded);
            playgroundTrigger.classList.toggle('is-expanded', isExpanded);
        });
    }

    // Onboarding Guide Accordion logic
    const guideTriggers = document.querySelectorAll('.guide-trigger');
    guideTriggers.forEach(trigger => {
        const contentId = trigger.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        if (content) {
            trigger.addEventListener('click', () => {
                const isExpanded = trigger.classList.contains('is-expanded');
                
                // Collapse all other guides to act as a proper accordion
                guideTriggers.forEach(otherTrigger => {
                    if (otherTrigger !== trigger) {
                        otherTrigger.classList.remove('is-expanded');
                        otherTrigger.setAttribute('aria-expanded', 'false');
                        const otherContent = document.getElementById(otherTrigger.getAttribute('aria-controls'));
                        if (otherContent) {
                            otherContent.classList.remove('is-expanded');
                            otherContent.setAttribute('aria-hidden', 'true');
                        }
                    }
                });

                // Toggle current guide
                const newExpanded = !isExpanded;
                trigger.classList.toggle('is-expanded', newExpanded);
                trigger.setAttribute('aria-expanded', newExpanded ? 'true' : 'false');
                content.classList.toggle('is-expanded', newExpanded);
                content.setAttribute('aria-hidden', newExpanded ? 'false' : 'true');
            });
        }
    });

    // Onboarding Section Collapsible logic
    const onboardingTrigger = document.querySelector('.onboarding-trigger');
    const onboardingContent = document.getElementById('onboarding-content');
    const onboardingSection = document.getElementById('onboarding-solution');

    if (onboardingTrigger && onboardingContent && onboardingSection) {
        onboardingTrigger.addEventListener('click', () => {
            const isExpanded = onboardingContent.classList.toggle('is-expanded');
            onboardingTrigger.setAttribute('aria-expanded', isExpanded);
            onboardingContent.setAttribute('aria-hidden', !isExpanded);
            onboardingTrigger.classList.toggle('is-expanded', isExpanded);
            onboardingSection.classList.toggle('is-expanded', isExpanded);
        });
    }

    // Onboarding Smart Anchor click logic
    const problemActionLink = document.querySelector('a[href="#onboarding-solution"]');
    if (problemActionLink && onboardingTrigger) {
        problemActionLink.addEventListener('click', () => {
            const isCollapsed = onboardingTrigger.getAttribute('aria-expanded') === 'false';
            if (isCollapsed) {
                onboardingTrigger.click();
            }
        });
    }

    // Auto-expand onboarding solution if page loaded with its hash
    if (window.location.hash === '#onboarding-solution' && onboardingTrigger) {
        setTimeout(() => {
            if (onboardingTrigger.getAttribute('aria-expanded') === 'false') {
                onboardingTrigger.click();
            }
        }, 100);
    }

    // Economy Section Collapsible logic
    const economyTrigger = document.querySelector('.economy-trigger');
    const economyContent = document.getElementById('economy-content');

    if (economyTrigger && economyContent) {
        economyTrigger.addEventListener('click', () => {
            const isExpanded = economyContent.classList.toggle('is-expanded');
            economyTrigger.setAttribute('aria-expanded', isExpanded);
            economyContent.setAttribute('aria-hidden', !isExpanded);
            economyTrigger.classList.toggle('is-expanded', isExpanded);
        });
    }

    // Economy Smart Anchor click logic
    const economyActionLink = document.querySelector('a[href="#economy-solution"]');
    if (economyActionLink && economyTrigger) {
        economyActionLink.addEventListener('click', () => {
            const isCollapsed = economyTrigger.getAttribute('aria-expanded') === 'false';
            if (isCollapsed) {
                economyTrigger.click();
            }
        });
    }

    // Auto-expand economy solution if page loaded with its hash
    if (window.location.hash === '#economy-solution' && economyTrigger) {
        setTimeout(() => {
            if (economyTrigger.getAttribute('aria-expanded') === 'false') {
                economyTrigger.click();
            }
        }, 100);
    }

    // Economy Monospace Tabs logic
    const tabBtns = document.querySelectorAll('.economy-tabs .tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');
            const tabsContainer = btn.closest('.economy-tabs');
            
            // Remove active classes
            tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            tabsContainer.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            
            // Add active classes
            btn.classList.add('active');
            const targetPanel = tabsContainer.querySelector(`#${targetId}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // Playground Smart Anchor click logic
    const navPlaygroundLink = document.querySelector('.nav-link-playground');
    if (navPlaygroundLink && playgroundTrigger) {
        navPlaygroundLink.addEventListener('click', () => {
            const href = navPlaygroundLink.getAttribute('href');
            if (href.includes('#playground')) {
                const isCollapsed = playgroundTrigger.getAttribute('aria-expanded') === 'false';
                if (isCollapsed) {
                    playgroundTrigger.click();
                }
            }
        });
    }

    // Auto-expand playground if page loaded with #playground hash
    if (window.location.hash === '#playground' && playgroundTrigger) {
        setTimeout(() => {
            if (playgroundTrigger.getAttribute('aria-expanded') === 'false') {
                playgroundTrigger.click();
            }
        }, 100);
    }

    // Management Section Collapsible logic
    const managementTrigger = document.querySelector('.management-trigger');
    const managementContent = document.getElementById('management-content');

    if (managementTrigger && managementContent) {
        managementTrigger.addEventListener('click', () => {
            const isExpanded = managementContent.classList.toggle('is-expanded');
            managementTrigger.setAttribute('aria-expanded', isExpanded);
            managementContent.setAttribute('aria-hidden', !isExpanded);
            managementTrigger.classList.toggle('is-expanded', isExpanded);
        });
    }

    // Management Smart Anchor click logic
    const managementActionLink = document.querySelector('a[href="#management-solution"]');
    if (managementActionLink && managementTrigger) {
        managementActionLink.addEventListener('click', () => {
            const isCollapsed = managementTrigger.getAttribute('aria-expanded') === 'false';
            if (isCollapsed) {
                managementTrigger.click();
            }
        });
    }

    // Auto-expand management solution if page loaded with its hash
    if (window.location.hash === '#management-solution' && managementTrigger) {
        setTimeout(() => {
            if (managementTrigger.getAttribute('aria-expanded') === 'false') {
                managementTrigger.click();
            }
        }, 100);
    }

    // Management Milestones Accordion logic
    const milestoneTriggers = document.querySelectorAll('.milestone-trigger');
    milestoneTriggers.forEach(trigger => {
        const contentId = trigger.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        if (content) {
            trigger.addEventListener('click', () => {
                const isExpanded = trigger.classList.contains('is-expanded');
                
                // Collapse all other milestones to act as a proper accordion
                milestoneTriggers.forEach(otherTrigger => {
                    if (otherTrigger !== trigger) {
                        otherTrigger.classList.remove('is-expanded');
                        otherTrigger.setAttribute('aria-expanded', 'false');
                        const otherContent = document.getElementById(otherTrigger.getAttribute('aria-controls'));
                        if (otherContent) {
                            otherContent.classList.remove('is-expanded');
                            otherContent.setAttribute('aria-hidden', 'true');
                        }
                    }
                });

                // Toggle current milestone
                const newExpanded = !isExpanded;
                trigger.classList.toggle('is-expanded', newExpanded);
                trigger.setAttribute('aria-expanded', newExpanded ? 'true' : 'false');
                content.classList.toggle('is-expanded', newExpanded);
                content.setAttribute('aria-hidden', newExpanded ? 'false' : 'true');
            });
        }
    });

    // Initialize navbar dynamic features
    initHeaderBreadcrumbs();
    initNavbarClickAnimation();
    initMobileMenu();
    initTheme();
});

/**
 * ============================================================================
 * HERO INTERACTIVE CANVAS LOGIC
 * ============================================================================
 * Manages the floating dots and magnetic mouse attraction on the hero canvas.
 */
function initHeroCanvas() {
    const canvas = document.getElementById('hero-interactive-canvas');
    if (!canvas) return;

    // Disable canvas on touch/mobile devices to conserve CPU and battery
    const isTouchOrMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth < 1024);
    if (isTouchOrMobile) {
        canvas.style.display = 'none';
        return;
    }

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    // Mouse interaction variables
    let mouse = {
        x: null,
        y: null,
        radius: 150 // Radius of magnetic effect
    };

    // --- Configuration ---
    const gridSpacing = 40; // Distance between base positions
    const dotRadius = 1.5;
    // Helper to get transparent version of current CSS --color-accent dynamically
    function getAccentColor(alpha) {
        const accent = getComputedStyle(document.body).getPropertyValue('--color-accent').trim();
        if (accent.startsWith('#')) {
            const r = parseInt(accent.slice(1, 3), 16);
            const g = parseInt(accent.slice(3, 5), 16);
            const b = parseInt(accent.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        return `rgba(0, 245, 212, ${alpha})`;
    }
    const maxConnectionDistance = 60;
    
    // Smoothness parameters
    const friction = 0.85; 
    const springFactor = 0.05;

    // --- Setup & Resize ---
    function init() {
        resize();
        window.addEventListener('resize', resize);
        
        // Track mouse position - listening on the window for broader interaction area
        // if canvas is behind everything, listening on canvas might miss events
        // intercepted by foreground elements.
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            // Check if mouse is actually somewhat near/over the canvas area to avoid
            // tracking when user is far down the page.
            if (e.clientY <= rect.bottom + 100) {
                 mouse.x = e.clientX - rect.left;
                 mouse.y = e.clientY - rect.top;
            } else {
                 mouse.x = null;
                 mouse.y = null;
            }
        });

        // Reset mouse when leaving window
        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        createParticles();
        animate();
    }

    function resize() {
        // Handle Retina displays
        const dpr = window.devicePixelRatio || 1;
        
        // Get parent container dimensions
        const rect = canvas.parentElement.getBoundingClientRect();
        // Set canvas to parent element size (the hero section)
        width = window.innerWidth;
        height = rect.height;
        
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        
        // Scale context to match CSS pixels
        ctx.scale(dpr, dpr);
        
        // Ensure CSS width matches
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        
        // Recreate particles on resize to fill new area
        createParticles();
    }

    // --- Particle System ---
    class Particle {
        constructor(x, y) {
            // Original grid position
            this.baseX = x;
            this.baseY = y;
            // Current position
            this.x = x;
            this.y = y;
            // Velocity
            this.vx = 0;
            this.vy = 0;
            // Subtle idle floating offset
            this.angle = Math.random() * Math.PI * 2;
            this.speed = 0.02 + Math.random() * 0.02;
            this.radiusOffset = Math.random() * 5;
        }

        update() {
            // Calculate distance to mouse
            let dx = 0;
            let dy = 0;
            let distance = 9999;

            if (mouse.x !== null && mouse.y !== null) {
                dx = mouse.x - this.x;
                dy = mouse.y - this.y;
                distance = Math.sqrt(dx * dx + dy * dy);
            }

            // Magnetic Attraction
            if (distance < mouse.radius) {
                // Closer = stronger pull
                const force = (mouse.radius - distance) / mouse.radius;
                // Add to velocity towards mouse
                this.vx += (dx / distance) * force * 0.5;
                this.vy += (dy / distance) * force * 0.5;
            }

            // Spring back to base position (with subtle idle wobble)
            // Target position includes a small orbital movement
            const targetX = this.baseX + Math.cos(this.angle) * this.radiusOffset;
            const targetY = this.baseY + Math.sin(this.angle) * this.radiusOffset;

            this.angle += this.speed;

            // Spring force pushing towards target
            this.vx += (targetX - this.x) * springFactor;
            this.vy += (targetY - this.y) * springFactor;

            // Apply friction
            this.vx *= friction;
            this.vy *= friction;

            // Update position
            this.x += this.vx;
            this.y += this.vy;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, dotRadius, 0, Math.PI * 2);
            ctx.fillStyle = getAccentColor(0.4);
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];
        // Create a grid of particles
        for (let y = gridSpacing; y < height; y += gridSpacing) {
            for (let x = gridSpacing; x < width; x += gridSpacing) {
                particles.push(new Particle(x, y));
            }
        }
    }

    // --- Animation Loop ---
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw all particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connecting lines between nearby particles
        // Optimization: Simple nested loop (O(n^2)), okay for small number of particles.
        // For production with many dots, a spatial hash grid would be better.
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxConnectionDistance) {
                    ctx.beginPath();
                    // Alpha based on distance
                    const alpha = 1 - (distance / maxConnectionDistance);
                    ctx.strokeStyle = getAccentColor(alpha * 0.15);
                    ctx.lineWidth = 1;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    // Start everything
    init();
}



/**
 * ============================================================================
 * EASTER EGG: PROMPT MODE LOGIC
 * ============================================================================
 * Manages the floating "Behind the Scenes" button logic, including its 
 * delayed appearance, radar ping animation, and global state toggling.
 */
function initPromptMode() {
    const promptToggleBtn = document.getElementById('prompt-mode-toggle');
    if (!promptToggleBtn) {
        console.error("Initialization Error: 'prompt-mode-toggle' button not found.");
        return;
    }

    const btnTooltip = promptToggleBtn.querySelector('.btn-tooltip');
    const body = document.body;
    
    // State management
    let isPromptMode = false;
    let hasBeenClicked = false;

    // 1. DELAYED APPEARANCE & POST-APPEARANCE PING
    // Ensures the button doesn't distract the user immediately upon load
    const appearanceDelay = setTimeout(() => {
        if (!hasBeenClicked) {
            // Reveal the button smoothly
            promptToggleBtn.classList.add('visible');
            // Start the 8s continuous radar ping animation cycle
            promptToggleBtn.classList.add('show-ping');
        }
    }, 2500);

    // 2. CLICK & ACTIVE STATE MANAGEMENT
    promptToggleBtn.addEventListener('click', () => {
        // Toggle global state
        isPromptMode = !isPromptMode;
        hasBeenClicked = true;
        
        // Update accessibility pressed state
        promptToggleBtn.setAttribute('aria-pressed', isPromptMode ? 'true' : 'false');
        
        // Performance optimization: Immediately kill the background radar ping
        // so it doesn't run indefinitely while the menu is active
        promptToggleBtn.classList.remove('show-ping');
        
        // Defensive check: Ensure button is forced visible if the user somehow
        // managed to click it before the 2.5s delay completed
        promptToggleBtn.classList.add('visible');
        
        // Handle UI Updates based on state
        if (isPromptMode) {
            // Activate the global CSS variables and overlays via this class
            body.classList.add('prompt-mode-active');
            
            if (btnTooltip) {
                btnTooltip.textContent = 'Prompt Mode [ON]';
            }
            console.log('Prompt Mode Activated: Developer transparency engaged.');
        } else {
            // Revert to clean UI
            body.classList.remove('prompt-mode-active');
            
            if (btnTooltip) {
                btnTooltip.textContent = 'Behind the Scenes';
            }
            console.log('Prompt Mode Deactivated.');
        }
    });
}

/**
 * ============================================================================
 * DYNAMIC HEADER BREADCRUMB
 * ============================================================================
 * IntersectionObserver to track page sections and update the logo breadcrumb.
 */
function initHeaderBreadcrumbs() {
    const breadcrumb = document.querySelector('.site-header .nav-breadcrumb');
    if (!breadcrumb) return;

    // Check which page we are currently on to map the breadcrumbs correctly
    const isSgMarkets = document.getElementById('context') !== null;
    const isElementaryLand = document.getElementById('projet') !== null;

    let sections = [];
    let defaultLabel = '';

    if (isSgMarkets) {
        // SG Markets Page Sections
        sections = [
            { id: 'context', label: ' → SG Markets / Contexte.' },
            { id: 'interventions', label: ' → SG Markets / Interventions.' },
            { id: 'process', label: ' → SG Markets / Démarche.' },
            { id: 'conclusion', label: ' → SG Markets / Enseignements.' }
        ];
        defaultLabel = ' → SG Markets.';
    } else if (isElementaryLand) {
        // ElementaryLand Page Sections
        sections = [
            { id: 'projet', label: ' → ElementaryLand / Projet.' },
            { id: 'problemes', label: ' → ElementaryLand / Défis.' },
            { id: 'onboarding-solution', label: ' → ElementaryLand / Onboarding.' },
            { id: 'economy-solution', label: ' → ElementaryLand / Économie.' },
            { id: 'management-solution', label: ' → ElementaryLand / Organisation.' }
        ];
        defaultLabel = ' → ElementaryLand.';
    } else {
        // Homepage Sections
        sections = [
            { id: 'projects', label: ' → 01 / Projets.' },
            { id: 'playground', label: ' → 02 / Playground.' },
            { id: 'site-footer', label: ' → 03 / Contact.' }
        ];
        defaultLabel = '';
    }

    // Set initial label if any
    if (defaultLabel) {
        breadcrumb.textContent = defaultLabel;
        breadcrumb.classList.add('is-visible');
    }

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section is in the middle of the viewport
        threshold: 0
    };

    let activeSectionId = null;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeSectionId = entry.target.id;
                const section = sections.find(s => s.id === activeSectionId);
                if (section) {
                    breadcrumb.textContent = section.label;
                    breadcrumb.classList.add('is-visible');
                }
            } else if (activeSectionId === entry.target.id) {
                activeSectionId = null;
                // Check if scroll is near top
                if (window.scrollY < 200) {
                    if (defaultLabel) {
                        breadcrumb.textContent = defaultLabel;
                        breadcrumb.classList.add('is-visible');
                    } else {
                        breadcrumb.classList.remove('is-visible');
                        setTimeout(() => {
                            if (!activeSectionId && window.scrollY < 200) {
                                breadcrumb.textContent = '';
                            }
                        }, 300);
                    }
                }
            }
        });
    }, observerOptions);

    sections.forEach(s => {
        const el = document.getElementById(s.id);
        if (el) observer.observe(el);
    });

    // Reset when scrolled back to the absolute top
    window.addEventListener('scroll', () => {
        if (window.scrollY < 50) {
            activeSectionId = null;
            if (defaultLabel) {
                breadcrumb.textContent = defaultLabel;
                breadcrumb.classList.add('is-visible');
            } else {
                breadcrumb.classList.remove('is-visible');
                setTimeout(() => {
                    if (window.scrollY < 50) {
                        breadcrumb.textContent = '';
                    }
                }, 300);
            }
        }
    }, { passive: true });
}

/**
 * ============================================================================
 * INTERACTIVE NAVBAR CLICK ANIMATION
 * ============================================================================
 * Adds a transient accent underline pseudo-element expand transition on nav clicks.
 */
function initNavbarClickAnimation() {
    const links = document.querySelectorAll('.site-header nav a.nav-link, .site-header nav a.nav-link-playground');
    
    links.forEach(link => {
        link.addEventListener('click', () => {
            // Apply transient active class to reveal and scale the underline pseudo-element
            link.classList.add('is-activating');
            
            // Remove the class after the smooth scroll completes (700ms travel duration)
            setTimeout(() => {
                link.classList.remove('is-activating');
            }, 700);
        });
    });
}

/**
 * ============================================================================
 * RESPONSIVE MOBILE MENU
 * ============================================================================
 * Handles toggle, click outside and keyboard interaction for the mobile dropdown navbar menu.
 */
function initMobileMenu() {
    const toggleBtn = document.querySelector('.nav-menu-toggle');
    const linksContainer = document.querySelector('.nav-links-container');
    const header = document.getElementById('site-header');

    if (!toggleBtn || !linksContainer) return;

    // Toggle menu
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = linksContainer.classList.toggle('is-open');
        toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on any link
    const menuLinks = linksContainer.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            linksContainer.classList.remove('is-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside of the header
    document.addEventListener('click', (e) => {
        if (header && !header.contains(e.target)) {
            linksContainer.classList.remove('is-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when resizing window past mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            linksContainer.classList.remove('is-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * ============================================================================
 * DARK/LIGHT THEME SWITCHER
 * ============================================================================
 * Toggles body class and persists selection in localStorage.
 */
function initTheme() {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    let transitionTimeout = null;
    
    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            // Add transitioning class for smooth animation
            document.documentElement.classList.add('theme-transitioning');
            
            // Clear any existing timeout to handle rapid clicking
            if (transitionTimeout) {
                clearTimeout(transitionTimeout);
            }
            
            const isLight = document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            // Set accessibility attributes
            themeToggles.forEach(t => t.setAttribute('aria-pressed', isLight ? 'true' : 'false'));
            
            // Remove the transitioning class after transition completes (500ms)
            transitionTimeout = setTimeout(() => {
                document.documentElement.classList.remove('theme-transitioning');
                transitionTimeout = null;
            }, 500);
        });
        
        // Set initial accessibility state
        const isCurrentlyLight = document.body.classList.contains('light-theme');
        btn.setAttribute('aria-pressed', isCurrentlyLight ? 'true' : 'false');
    });
}
