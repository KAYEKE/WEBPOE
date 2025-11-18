/**
 * WEDE5020POE - Green Cape Town
 * Main JavaScript File
 * Includes: Form Validation, Animations, Mobile Menu, Counter Animation
 * Author: Green Cape Town Team
 * Last Updated: November 2025
 */

// ===============================
// Mobile Menu Toggle
// ===============================
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (mobileMenuToggle && navList) {
    mobileMenuToggle.addEventListener('click', function() {
      navList.classList.toggle('active');
      const isExpanded = navList.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking on a link
    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!mobileMenuToggle.contains(event.target) && !navList.contains(event.target)) {
        navList.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});

// ===============================
// Counter Animation
// ===============================
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, duration / steps);
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      animateCounter(entry.target);
      entry.target.classList.add('counted');
    }
  });
}, { threshold: 0.5 });

// Observe all counter elements
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => counterObserver.observe(counter));
});

// ===============================
// Form Validation Functions
// ===============================

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validates phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validatePhone(phone) {
  const re = /^[0-9\s\-\+\(\)]{10,}$/;
  return re.test(phone);
}

/**
 * Validates name (minimum 2 characters, letters and spaces only)
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateName(name) {
  return name.trim().length >= 2;
}

/**
 * Shows error message for a form field
 * @param {HTMLElement} input - Input element
 * @param {string} message - Error message to display
 */
function showError(input, message) {
  const errorElement = document.getElementById(`${input.id}-error`);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
  input.setAttribute('aria-invalid', 'true');
  input.style.borderColor = '#ff6f61';
}

/**
 * Clears error message for a form field
 * @param {HTMLElement} input - Input element
 */
function clearError(input) {
  const errorElement = document.getElementById(`${input.id}-error`);
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
  input.removeAttribute('aria-invalid');
  input.style.borderColor = '';
}

/**
 * Shows form status message
 * @param {string} elementId - ID of status element
 * @param {string} message - Message to display
 * @param {boolean} isSuccess - Whether message is success or error
 */
function showFormStatus(elementId, message, isSuccess) {
  const statusElement = document.getElementById(elementId);
  if (statusElement) {
    statusElement.textContent = message;
    statusElement.className = isSuccess ? 'form-success' : 'form-error';
    statusElement.style.display = 'block';
    
    // Scroll to status message
    statusElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide after 5 seconds
    setTimeout(() => {
      statusElement.style.display = 'none';
    }, 5000);
  }
}

// ===============================
// Quick Volunteer Form Validation (Homepage)
// ===============================
document.addEventListener('DOMContentLoaded', function() {
  const quickVolunteerForm = document.getElementById('quick-volunteer-form');
  
  if (quickVolunteerForm) {
    quickVolunteerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // Get form fields
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      
      // Clear previous errors
      clearError(nameInput);
      clearError(emailInput);
      
      // Validate name
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Please enter your full name');
        isValid = false;
      } else if (!validateName(nameInput.value)) {
        showError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
      }
      
      // Validate email
      if (!emailInput.value.trim()) {
        showError(emailInput, 'Please enter your email address');
        isValid = false;
      } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }
      
      // If form is valid, submit
      if (isValid) {
        // Simulate form submission
        showFormStatus('form-status', 'Thank you for signing up! We\'ll be in touch soon.', true);
        quickVolunteerForm.reset();
        
        // In a real application, you would send the data to a server here
        // Example: fetch('/api/volunteer', { method: 'POST', body: formData })
      }
    });
    
    // Real-time validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    
    if (nameInput) {
      nameInput.addEventListener('blur', function() {
        if (this.value.trim() && !validateName(this.value)) {
          showError(this, 'Name must be at least 2 characters');
        } else if (this.value.trim()) {
          clearError(this);
        }
      });
    }
    
    if (emailInput) {
      emailInput.addEventListener('blur', function() {
        if (this.value.trim() && !validateEmail(this.value)) {
          showError(this, 'Please enter a valid email address');
        } else if (this.value.trim()) {
          clearError(this);
        }
      });
    }
  }
});

// ===============================
// Full Enquiry Form Validation (Enquiry Page)
// ===============================
document.addEventListener('DOMContentLoaded', function() {
  const enquiryForm = document.getElementById('enquiry-form');
  
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // Get form fields
      const fullNameInput = document.getElementById('full-name');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
      const ageInput = document.getElementById('age');
      const interestInput = document.getElementById('interest');
      const messageInput = document.getElementById('message');
      const termsInput = document.getElementById('terms');
      
      // Clear previous errors
      clearError(fullNameInput);
      clearError(emailInput);
      clearError(phoneInput);
      clearError(ageInput);
      clearError(interestInput);
      clearError(messageInput);
      clearError(termsInput);
      
      // Validate full name
      if (!fullNameInput.value.trim()) {
        showError(fullNameInput, 'Please enter your full name');
        isValid = false;
      } else if (!validateName(fullNameInput.value)) {
        showError(fullNameInput, 'Name must be at least 2 characters');
        isValid = false;
      }
      
      // Validate email
      if (!emailInput.value.trim()) {
        showError(emailInput, 'Please enter your email address');
        isValid = false;
      } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate phone
      if (!phoneInput.value.trim()) {
        showError(phoneInput, 'Please enter your phone number');
        isValid = false;
      } else if (!validatePhone(phoneInput.value)) {
        showError(phoneInput, 'Please enter a valid phone number (at least 10 digits)');
        isValid = false;
      }
      
      // Validate age group
      if (!ageInput.value) {
        showError(ageInput, 'Please select your age group');
        isValid = false;
      }
      
      // Validate interest
      if (!interestInput.value) {
        showError(interestInput, 'Please select how you\'d like to get involved');
        isValid = false;
      }
      
      // Validate message
      if (!messageInput.value.trim()) {
        showError(messageInput, 'Please enter a message');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
      }
      
      // Validate terms checkbox
      if (!termsInput.checked) {
        showError(termsInput, 'You must agree to the Privacy Policy and Terms of Use');
        isValid = false;
      }
      
      // If form is valid, submit
      if (isValid) {
        // Add loading state
        const submitButton = enquiryForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        // Simulate form submission delay
        setTimeout(() => {
          showFormStatus('form-status', 'Thank you for your enquiry! We\'ll respond within 48 hours.', true);
          enquiryForm.reset();
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          
          // In a real application, you would send the data to a server here
        }, 1500);
      } else {
        showFormStatus('form-status', 'Please correct the errors above and try again.', false);
      }
    });
    
    // Real-time validation for enquiry form
    const fullNameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    
    if (fullNameInput) {
      fullNameInput.addEventListener('blur', function() {
        if (this.value.trim() && !validateName(this.value)) {
          showError(this, 'Name must be at least 2 characters');
        } else if (this.value.trim()) {
          clearError(this);
        }
      });
    }
    
    if (emailInput) {
      emailInput.addEventListener('blur', function() {
        if (this.value.trim() && !validateEmail(this.value)) {
          showError(this, 'Please enter a valid email address');
        } else if (this.value.trim()) {
          clearError(this);
        }
      });
    }
    
    if (phoneInput) {
      phoneInput.addEventListener('blur', function() {
        if (this.value.trim() && !validatePhone(this.value)) {
          showError(this, 'Please enter a valid phone number (at least 10 digits)');
        } else if (this.value.trim()) {
          clearError(this);
        }
      });
    }
    
    if (messageInput) {
      messageInput.addEventListener('blur', function() {
        if (this.value.trim() && this.value.trim().length < 10) {
          showError(this, 'Message must be at least 10 characters');
        } else if (this.value.trim()) {
          clearError(this);
        }
      });
    }
  }
});

// ===============================
// Contact Form Validation (Contact Page)
// ===============================
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // Get form fields
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');
      
      // Clear previous errors
      clearError(nameInput);
      clearError(emailInput);
      clearError(subjectInput);
      clearError(messageInput);
      
      // Validate name
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Please enter your name');
        isValid = false;
      } else if (!validateName(nameInput.value)) {
        showError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
      }
      
      // Validate email
      if (!emailInput.value.trim()) {
        showError(emailInput, 'Please enter your email address');
        isValid = false;
      } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate subject
      if (!subjectInput.value.trim()) {
        showError(subjectInput, 'Please enter a subject');
        isValid = false;
      } else if (subjectInput.value.trim().length < 3) {
        showError(subjectInput, 'Subject must be at least 3 characters');
        isValid = false;
      }
      
      // Validate message
      if (!messageInput.value.trim()) {
        showError(messageInput, 'Please enter a message');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
      }
      
      // If form is valid, submit
      if (isValid) {
        // Add loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission delay
        setTimeout(() => {
          showFormStatus('contact-form-status', 'Message sent successfully! We\'ll get back to you within 24 hours.', true);
          contactForm.reset();
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }, 1500);
      }
    });
    
    // Real-time validation
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    
    if (nameInput) {
      nameInput.addEventListener('blur', function() {
        if (this.value.trim() && !validateName(this.value)) {
          showError(this, 'Name must be at least 2 characters');
        } else if (this.value.trim()) {
          clearError(this);
        }
      });
    }
    
    if (emailInput) {
      emailInput.addEventListener('blur', function() {
        if (this.value.trim() && !validateEmail(this.value)) {
          showError(this, 'Please enter a valid email address');
        } else if (this.value.trim()) {
          clearError(this);
        }
      });
    }
    
    if (subjectInput) {
      subjectInput.addEventListener('blur', function() {
        if (this.value.trim() && this.value.trim().length < 3) {
          showError(this, 'Subject must be at least 3 characters');
        } else if (this.value.trim()) {
          clearError(this);
        }
      });
    }
    
    if (messageInput) {
      messageInput.addEventListener('blur', function() {
        if (this.value.trim() && this.value.trim().length < 10) {
          showError(this, 'Message must be at least 10 characters');
        } else if (this.value.trim()) {
          clearError(this);
        }
      });
    }
  }
});

// ===============================
// Smooth Scroll Enhancement
// ===============================
document.addEventListener('DOMContentLoaded', function() {
  // Handle smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or empty
      if (href === '#' || href === '') return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        }
        
        // Focus on target element for accessibility
        targetElement.focus();
      }
    });
  });
});

// ===============================
// Scroll Animations
// ===============================
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe cards and sections for fade-in animation
  const cardsToAnimate = document.querySelectorAll('.card, .mvv-card, .involvement-card, .team-member');
  cardsToAnimate.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(card);
  });
});

// ===============================
// Console Log - Project Info
// ===============================
console.log('%c Green Cape Town Website ', 'background: #2ecc71; color: #fff; font-size: 16px; padding: 10px;');
console.log('%c WEDE5020POE Project ', 'background: #1b5e20; color: #fff; font-size: 12px; padding: 5px;');
console.log('Planting the future, one tree at a time. 🌱');