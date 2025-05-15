/**
 * Animations for TIF-TECH website
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Intersection Observer for fade-in animations
  const fadeElements = document.querySelectorAll('.section-header, .hero-content, .hero-image, .about-image, .about-text, .service-card, .project-card, .blog-card, .contact-info, .contact-form-container');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateElement(entry.target);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
  });
  
  /**
   * Animate element when it comes into view
   * @param {HTMLElement} element - Element to animate
   */
  function animateElement(element) {
    // Add delay for staggered effect based on element type
    let delay = 0;
    
    if (element.classList.contains('hero-image')) {
      delay = 300;
    } else if (element.classList.contains('service-card')) {
      const index = Array.from(document.querySelectorAll('.service-card')).indexOf(element);
      delay = index * 100;
    } else if (element.classList.contains('project-card')) {
      const index = Array.from(document.querySelectorAll('.project-card')).indexOf(element);
      delay = index * 100;
    } else if (element.classList.contains('blog-card')) {
      const index = Array.from(document.querySelectorAll('.blog-card')).indexOf(element);
      delay = index * 100;
    }
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  }
  
  // Counter animation for stats (can be added later)
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = Math.ceil(target / (duration / 16));
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      element.textContent = current;
      
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  }
  
  // Parallax effect for hero section
  const heroSection = document.querySelector('.hero');
  
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollValue = window.scrollY;
      
      if (scrollValue < 600) {
        // Parallax effect for background elements
        heroSection.style.backgroundPosition = `center ${scrollValue * 0.5}px`;
      }
    });
  }
  
  // Animate service cards on hover
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.service-icon');
      
      // Subtle bounce animation for the icon
      icon.style.transform = 'scale(1.1)';
      icon.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      
      setTimeout(() => {
        icon.style.transform = 'scale(1)';
      }, 300);
    });
  });
  
  // Add micro-interactions for buttons
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-text');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'scale(0.95)';
    });
    
    btn.addEventListener('mouseup', () => {
      btn.style.transform = '';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
});