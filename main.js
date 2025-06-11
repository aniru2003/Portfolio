document.addEventListener('DOMContentLoaded', function() {
  // Typewriter Effect
  const typingText = document.getElementById('typing-text');
  const words = ["Developer", "Foodie", "Engineer", "Creator"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    typingText.textContent = currentChar;

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(type, 150);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(type, 100);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 1200);
    }
  }

  // Start typewriter effect after 1 second
  setTimeout(type, 1000);

  // Navbar Scroll Effect
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
  });

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // CV Download Function
  function downloadCV() {
    try {
      const link = document.createElement('a');
      link.href = './assets/Morishetty-Anirudh-Resume.pdf';
      link.download = 'Anirudh-Morishetty-Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CV:', error);
      window.open('./assets/Morishetty-Anirudh-Resume.pdf', '_blank');
    }
  }

  // Assign downloadCV function to button
  const downloadBtn = document.querySelector('.primary-btn.pulse');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadCV);
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = this.querySelector('input[name="name"]');
      const email = this.querySelector('input[name="email"]');
      const message = this.querySelector('textarea[name="message"]');
      let isValid = true;

      // Reset error states
      this.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
      });

      // Validate name (minimum 3 characters)
      if (name.value.trim().length < 3) {
        name.nextElementSibling.style.display = 'block';
        isValid = false;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.nextElementSibling.style.display = 'block';
        isValid = false;
      }

      // Validate message (minimum 10 characters)
      if (message.value.trim().length < 10) {
        message.nextElementSibling.style.display = 'block';
        isValid = false;
      }

      if (isValid) {
        // If using Formspree, the form will submit normally
        // Show success message
        const successMsg = document.getElementById('formSuccess');
        if (successMsg) {
          successMsg.style.display = 'block';
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 3000);
        }
        
        // Reset form
        this.reset();
      }
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
    });
  });
});
function scrollToProjects() {
  const projectsSection = document.getElementById('projects');
  if (projectsSection) {
    projectsSection.scrollIntoView({
      behavior: 'smooth'
    });
  }
}
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      
      // Simple validation
      const inputs = this.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.boxShadow = '0 0 0 2px #ff6b6b';
        } else {
          input.style.boxShadow = '';
        }
      });
      
      if (isValid) {
        // Change button text during submission
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Submit to Formspree
        fetch(this.action, {
          method: 'POST',
          body: new FormData(this),
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            // Show success message
            const successMsg = document.getElementById('formSuccess');
            successMsg.style.display = 'block';
            this.reset();
            
            // Hide after 5 seconds
            setTimeout(() => {
              successMsg.style.display = 'none';
            }, 5000);
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(error => {
          alert('There was an error sending your message. Please try again later.');
          console.error('Error:', error);
        })
        .finally(() => {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        });
      }
    });
    
    // Remove error styles when typing
    contactForm.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', function() {
        if (this.value.trim()) {
          this.style.boxShadow = '';
        }
      });
    });
  }
});
