// script.js

// ===================================
//         THEME SYSTEM
// ===================================

// Daftar tema yang valid
const VALID_THEMES = ['purple-phantom', 'nature-breeze', 'rose-petal', 'ocean-steel', 'neon-crypto'];
const DEFAULT_THEME = 'purple-phantom';

/**
 * Terapkan tema berdasarkan nilai dari Supabase (kolom 'theme' di tabel 'profile').
 * Nilai yang valid: purple-phantom, nature-breeze, rose-petal, ocean-steel, neon-crypto
 */
function applyTheme(themeName) {
    const theme = VALID_THEMES.includes(themeName) ? themeName : DEFAULT_THEME;
    document.documentElement.setAttribute('data-theme', theme);
}


// ===================================
//         RENDER FUNCTIONS
// ===================================

function renderProfile(data) {
    if (!data) return;

    const userNameElement = document.getElementById('user-name');
    userNameElement.textContent = data.name;

    // Terapkan tema dari database
    if (data.theme) {
        applyTheme(data.theme);
    }

    if (data.profile_image_url) {
        const hintIconHTML = `
            <i class="fa-regular fa-image name-hint-icon"></i>
        `;
        const photoHTML = `
            <img src="${data.profile_image_url}" alt="Profile Photo" class="profile-photo-popup">
        `;
        userNameElement.insertAdjacentHTML('beforeend', hintIconHTML);
        userNameElement.insertAdjacentHTML('afterend', photoHTML);
    }

    document.getElementById('user-address').textContent = data.address || '';
    
    if (data.cv_url) {
        document.getElementById('user-cv').href = data.cv_url;
    }
    if (data.position) {
        document.getElementById('user-position').textContent = data.position;
    }
    if (data.introduction) {
        document.getElementById('user-introduction').textContent = data.introduction;
    }
    if (data.web_name) {
        document.title = data.web_name;
    }
    if (data.web_icon) {
        const iconLink = document.getElementById('web-icon');
        iconLink.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${data.web_icon}</text></svg>`;
    }
    if (data.footer_year) {
        document.getElementById('footer-year').textContent = data.footer_year;
    }
    if (data.footer_text) {
        document.getElementById('footer-text').innerHTML = data.footer_text;
    }
}

function renderSocialLinks(data) {
    const container = document.querySelector('.social-links');
    if (!data) return;

    container.innerHTML = data.map(link => {
        let href = link.url;
        let target = 'target="_blank" rel="noopener noreferrer"';

        if (link.name.toLowerCase() === 'email' && link.email_subject && link.email_body) {
            const to = link.url;
            const subject = link.email_subject;
            const body = link.email_body.replace(/\\n/g, '\n');
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            href = gmailUrl;
        }
        
        return `
            <a href="${href}" ${target} aria-label="${link.name}">
                <i class="${link.icon_class}"></i>
            </a>
        `;
    }).join('');
}

function renderSkills(data) {
    const container = document.querySelector('#skillset .skills-grid');
    if (!data) return;

    container.innerHTML = data.map(skill => {
        let iconContent = '';
        if (skill.icon_svg) {
            iconContent = skill.icon_svg;
        } else {
            iconContent = `<i class="${skill.icon_class}"></i>`;
        }

        const detailsHtml = skill.description 
            ? `<div class="skill-details"><p>${skill.description}</p></div>` 
            : '';

        return `
            <div class="skill-card hidden">
                ${detailsHtml}
                ${iconContent}
                <span>${skill.name}</span>
            </div>
        `;
    }).join('');
}

function formatDate(dateString) {
    if (!dateString) return '';
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return `${day} ${months[monthIndex]} ${year}`;
}

function renderTimeline(selector, data) {
    const container = document.querySelector(selector);
    if (!data || data.length === 0) {
        const section = container.closest('section');
        if (section) section.style.display = 'none';
        return;
    }
    container.innerHTML = data.map(item => {
        const startDateFormatted = formatDate(item.start_date);
        const endDateFormatted = item.end_date ? formatDate(item.end_date) : 'Present';

        const title = item.role 
            ? `${item.role} at ${item.company}` 
            : (item.degree ? `${item.degree} — ${item.institution}` : item.company || item.institution || '');

        return `
            <div class="timeline-item hidden">
                <h3>${title}</h3>
                <p><em>${startDateFormatted} - ${endDateFormatted}</em></p>
                <p>${item.description || ''}</p>
            </div>
        `;
    }).join('');
}

function renderGrid(selector, data, isProject) {
    const container = document.querySelector(selector);
    if (!data || data.length === 0) {
        const section = container.closest('section');
        if (section) section.style.display = 'none';
        return;
    }

    container.innerHTML = data.map(item => {
        if (isProject) {
            const hasPreview = item.preview_gif_url;
            const previewElement = hasPreview 
                ? `
                <div class="project-preview-button">
                    <i class="fa-solid fa-play"></i>
                    <div class="project-preview-gif-wrapper">
                        <img src="${item.preview_gif_url}" alt="Preview of ${item.name}" loading="lazy">
                    </div>
                </div>
                ` 
                : '';

            return `
                <div class="card hidden">
                    <div class="card-header">
                        <h3>${item.name}</h3>
                        ${previewElement}
                    </div>
                    <p>${item.description}</p>
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer">View Project →</a>
                </div>
            `;
        } else {
            return `
                <div class="card hidden">
                    <h3>${item.name}</h3>
                    <p>Issued by: ${item.issuer}</p>
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer">View Certificate →</a>
                </div>
            `;
        }
    }).join('');
}


// ===================================
//      SCROLL ANIMATIONS
// ===================================

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
}


// ===================================
//        QUICK NAVIGATION
// ===================================

function setupQuickNav() {
    const navUp = document.getElementById('nav-up');
    const navDown = document.getElementById('nav-down');
    const sections = document.querySelectorAll('main section');

    function handleNavVisibility() {
        const scrollY = window.scrollY;
        const screenHeight = window.innerHeight;
        const docHeight = document.body.offsetHeight;

        if (scrollY > screenHeight * 0.5) {
            navUp.classList.add('visible');
        } else {
            navUp.classList.remove('visible');
        }

        if (scrollY + screenHeight >= docHeight - 100) {
            navDown.classList.remove('visible');
        } else {
            navDown.classList.add('visible');
        }
    }

    navUp.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    navDown.addEventListener('click', () => {
        const currentScroll = window.scrollY;
        let nextSection = null;

        for (const section of sections) {
            if (section.style.display === 'none') continue;
            if (section.offsetTop > currentScroll + 50) {
                nextSection = section;
                break;
            }
        }

        if (nextSection) {
            window.scrollTo({ top: nextSection.offsetTop, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });

    window.addEventListener('scroll', handleNavVisibility);
    handleNavVisibility();
}


// ===================================
//     SKILL CARD INTERACTIONS
// ===================================

function setupSkillsetInteractions() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('click', (event) => {
            event.stopPropagation();
            const isAlreadyActive = card.classList.contains('is-active');
            skillCards.forEach(c => c.classList.remove('is-active'));
            if (!isAlreadyActive) {
                card.classList.add('is-active');
            }
        });
    });

    document.body.addEventListener('click', () => {
        skillCards.forEach(card => card.classList.remove('is-active'));
    });
}


// ===================================
//      MAIN FETCH & RENDER
// ===================================

async function fetchAndRenderPortfolio() {
    try {
        const response = await fetch('/api/portfolio-data');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        renderProfile(data.profile);
        renderSocialLinks(data.social_links);
        renderSkills(data.skillset);
        renderTimeline('#education .timeline', data.education);
        renderTimeline('#work-experience .timeline', data.work_experience);
        renderTimeline('#internship .timeline', data.internship);
        renderGrid('#projects-grid', data.projects, true);
        renderGrid('#certificates-grid', data.certificates, false);

        setupScrollAnimations();
        setupSkillsetInteractions();

    } catch (error) {
        console.error("Could not fetch portfolio data:", error);
        document.querySelector('main').innerHTML = '<p style="text-align:center; padding:40px; color:var(--accent-grad-1);">Gagal memuat data. Silakan coba lagi nanti.</p>';
    }
}


// ===================================
//          INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    setupQuickNav();
    fetchAndRenderPortfolio();
});
