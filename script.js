// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const problemsGrid = document.getElementById('problems-grid');
const testimonialText = document.getElementById('testimonial-text');
const testimonialAuthor = document.getElementById('testimonial-author');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const navDots = document.getElementById('nav-dots');

// State
let currentTestimonial = 0;

// Testimonials Data - TalepGetir için güncellenmiş
const testimonials = [
    {
        text: "TalepGetir sayesinde hedef müşterilerimize doğrudan ulaşabiliyoruz. Artık boşa zaman harcamıyoruz ve her lead gerçek bir fırsat.",
        author: "Mehmet Yılmaz",
        title: "İhracat Müdürü, ABC Tekstil"
    },
    {
        text: "3 ayda 15 yeni müşteri kazandık. TalepGetir'in lead kalitesi gerçekten çok yüksek. Tavsiye ederim.",
        author: "Ayşe Kaya",
        title: "Satış Direktörü, XYZ Mobilya"
    },
    {
        text: "Rakiplerimizin müşterilerine teklif verebilmek harika bir avantaj. TalepGetir ile pazarda daha güçlü olduk.",
        author: "Ali Demir",
        title: "Genel Müdür, DEF Makine"
    },
    {
        text: "Daha önce fuarlara binlerce dolar harcıyorduk. Şimdi TalepGetir ile evden çıkmadan müşteri buluyoruz.",
        author: "Fatma Özkan",
        title: "Pazarlama Müdürü, GHI Gıda"
    }
];

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

// Problem Items Hover Effects
if (problemsGrid) {
    problemsGrid.addEventListener('mouseover', (e) => {
        const problemItem = e.target.closest('.problem-item');
        if (problemItem) {
            problemItem.style.transform = 'translateY(-5px)';
            problemItem.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        }
    });

    problemsGrid.addEventListener('mouseout', (e) => {
        const problemItem = e.target.closest('.problem-item');
        if (problemItem) {
            problemItem.style.transform = 'translateY(0)';
            problemItem.style.boxShadow = 'none';
        }
    });
}

// Testimonial Carousel
function updateTestimonial() {
    if (!testimonialText || !testimonialAuthor || !navDots) {
        return;
    }
    const testimonial = testimonials[currentTestimonial];
    
    // Update text with fade effect
    testimonialText.style.opacity = '0';
    testimonialAuthor.style.opacity = '0';
    
    setTimeout(() => {
        testimonialText.textContent = testimonial.text;
        testimonialAuthor.innerHTML = `
            <div class="author-name">${testimonial.author}</div>
            <div class="author-title">${testimonial.title}</div>
        `;
        testimonialText.style.opacity = '1';
        testimonialAuthor.style.opacity = '1';
    }, 200);
    
    // Update navigation dots
    const dots = navDots.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

// Previous Testimonial
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    });
}

// Next Testimonial
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial();
    });
}

// Navigation Dots
if (navDots) {
    navDots.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-dot')) {
            const index = parseInt(e.target.dataset.index);
            currentTestimonial = index;
            updateTestimonial();
        }
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Auto-play Testimonial Carousel
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();
}, 8000); // 8 seconds

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateTestimonial();
    
    // Add transition effects to testimonial elements
    if (testimonialText) {
        testimonialText.style.transition = 'opacity 0.3s ease';
    }
    if (testimonialAuthor) {
        testimonialAuthor.style.transition = 'opacity 0.3s ease';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = 'fas fa-bars';
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

// Add loading animation to buttons
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.disabled) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        }
    });
});

// CTA Button Actions
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const buttonText = this.textContent.toLowerCase();
        
        if (buttonText.includes('hemen başla') || buttonText.includes('iletişime geç')) {
            e.preventDefault();
            window.location.href = 'iletisim.html';
        }

        if (buttonText.includes('nasıl çalıştığını gör')) {
            e.preventDefault();
            window.location.href = 'nasil-calisir.html';
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements when they come into view
document.querySelectorAll('.problem-item, .solution-item, .step-item, .result-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('🚀 TalepGetir JavaScript loaded successfully!');

// EmailJS Integration
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // EmailJS hesabınızdan public key'i buraya ekleyin
})();

const contactForm = document.getElementById('contactForm');
const formResult = document.getElementById('formResult');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        formResult.textContent = 'Gönderiliyor...';
        formResult.style.color = '#3498db';

        emailjs.sendForm('service_u7imlie', 'YOUR_TEMPLATE_ID', this)
            .then(() => {
                formResult.textContent = 'Mesajınız başarıyla gönderildi!';
                formResult.style.color = '#27ae60';
                contactForm.reset();
            }, (error) => {
                formResult.textContent = 'Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin. Hata: ' + error.text;
                formResult.style.color = '#e74c3c';
            });
    });
}

// Ripple effect for buttons
document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', function (e) {
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        let ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600); // Duration of the ripple effect
    });
});