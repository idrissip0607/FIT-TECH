/**
 * Contact form handling for TIF-TECH website
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Input animations and validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
      // Add focus effects
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
        validateInput(input);
      });
      
      // Real-time validation
      input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
          validateInput(input);
        }
      });
    });
  }
  
  /**
   * Handle contact form submission
   * @param {Event} e - Submit event
   */
  function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formValues = Object.fromEntries(formData.entries());
    
    // Validate all inputs
    let isValid = true;
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      showFormMessage('Veuillez corriger les erreurs dans le formulaire.', 'error');
      return;
    }
    
    // Disable form during submission
    toggleFormState(true);
    showFormMessage('Envoi de votre message...', 'info');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Simulate successful submission
      console.log('Form data:', formValues);
      
      // Reset form
      contactForm.reset();
      
      // Show success message
      showFormMessage('Votre message a été envoyé avec succès. Nous vous contacterons bientôt !', 'success');
      
      // Re-enable form
      toggleFormState(false);
      
      // Clear success message after a delay
      setTimeout(() => {
        const messageElement = document.querySelector('.form-message');
        if (messageElement) {
          messageElement.remove();
        }
      }, 5000);
    }, 1500);
  }
  
  /**
   * Validate a form input
   * @param {HTMLElement} input - Input element to validate
   * @returns {boolean} - Whether the input is valid
   */
  function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove any existing error message
    const existingError = input.parentElement.querySelector('.input-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Check if required field is empty
    if (input.hasAttribute('required') && value === '') {
      isValid = false;
      errorMessage = 'Ce champ est requis';
    } 
    // Email validation
    else if (input.type === 'email' && value !== '') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        isValid = false;
        errorMessage = 'Veuillez entrer une adresse email valide';
      }
    }
    // Phone validation (optional)
    else if (input.type === 'tel' && value !== '') {
      const phonePattern = /^[\d\+\-\s\(\)]{8,20}$/;
      if (!phonePattern.test(value)) {
        isValid = false;
        errorMessage = 'Veuillez entrer un numéro de téléphone valide';
      }
    }
    
    // Show error message if invalid
    if (!isValid) {
      const errorElement = document.createElement('span');
      errorElement.className = 'input-error';
      errorElement.textContent = errorMessage;
      errorElement.style.color = 'var(--color-error)';
      errorElement.style.fontSize = '1.2rem';
      errorElement.style.marginTop = '0.5rem';
      input.parentElement.appendChild(errorElement);
      
      input.style.borderColor = 'var(--color-error)';
    } else {
      input.style.borderColor = value !== '' ? 'var(--color-success)' : 'var(--color-border)';
    }
    
    return isValid;
  }
  
  /**
   * Show a message above the form
   * @param {string} message - Message to show
   * @param {string} type - Message type (success, error, info)
   */
  function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message message-${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.padding = '1.5rem';
    messageElement.style.marginBottom = '2rem';
    messageElement.style.borderRadius = 'var(--radius-md)';
    messageElement.style.fontWeight = '500';
    
    // Set colors based on message type
    if (type === 'success') {
      messageElement.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
      messageElement.style.color = 'var(--color-success)';
      messageElement.style.border = '1px solid var(--color-success)';
    } else if (type === 'error') {
      messageElement.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
      messageElement.style.color = 'var(--color-error)';
      messageElement.style.border = '1px solid var(--color-error)';
    } else if (type === 'info') {
      messageElement.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
      messageElement.style.color = 'var(--color-accent)';
      messageElement.style.border = '1px solid var(--color-accent)';
    }
    
    // Add message to the DOM
    contactForm.parentElement.insertBefore(messageElement, contactForm);
  }
  
  /**
   * Toggle form enabled/disabled state
   * @param {boolean} disabled - Whether to disable the form
   */
  function toggleFormState(disabled) {
    const inputs = contactForm.querySelectorAll('input, textarea, button');
    
    inputs.forEach(input => {
      input.disabled = disabled;
    });
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    if (disabled) {
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
      submitButton.style.opacity = '0.7';
    } else {
      submitButton.innerHTML = 'Envoyer le message';
      submitButton.style.opacity = '1';
    }
  }
});