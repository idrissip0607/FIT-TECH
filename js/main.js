/**
 * Main JavaScript file for TIF-TECH website
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // DOM Elements
  const header = document.getElementById('header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const themeToggle = document.getElementById('theme-toggle');
  const backToTop = document.querySelector('.back-to-top');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  
  // Initialization
  initTheme();
  setupEventListeners();
  activateMenuItemOnScroll();

  /**
   * Initialize theme based on user preference
   */
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
  }

  /**
   * Setup all event listeners
   */
  function setupEventListeners() {
    // Header scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', smoothScroll);
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }

  /**
   * Handle scroll events
   */
  function handleScroll() {
    // Header sticky effect
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (window.scrollY > 500) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
    
    // Update active menu item based on scroll position
    activateMenuItemOnScroll();
  }

  /**
   * Toggle mobile menu
   */
  function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mobileMenuBtn.classList.contains('active')) {
      spans[0].style.transform = 'translateY(8px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }

  /**
   * Toggle between light and dark theme
   */
  function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  /**
   * Smooth scroll to element when clicking a navigation link
   * @param {Event} e - Click event
   */
  function smoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetPosition = document.querySelector(targetId).offsetTop - 80;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  /**
   * Activate menu item based on scroll position
   */
  function activateMenuItemOnScroll() {
    const scrollPosition = window.scrollY;
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to corresponding links
        document.querySelectorAll(`a[href="#${sectionId}"]`).forEach(link => {
          link.classList.add('active');
        });
      }
    });
  }

  // Project filtering functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
});