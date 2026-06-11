document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Sticky Header Scroll Effect
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Call once on load

  // 2. Mobile Menu Toggle & Click Outside & Mobile Dropdown accordion
  const navToggle = document.getElementById('nav-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      
      const icon = navToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.querySelector('i').className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking a simple link
    const navLinks = navMenu.querySelectorAll('a:not(.dropdown-trigger)');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.querySelector('i').className = 'fa-solid fa-bars';
      });
    });

    // Mobile Dropdown accordion toggles
    const dropdowns = navMenu.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.dropdown-trigger');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          if (window.innerWidth <= 992) {
            e.preventDefault(); // Prevent navigating to services.html on first click
            e.stopPropagation();
            
            // Toggle current dropdown
            dropdown.classList.toggle('open-mobile');
            
            // Close other dropdowns
            dropdowns.forEach(other => {
              if (other !== dropdown) {
                other.classList.remove('open-mobile');
              }
            });
          }
        });
      }
    });
  }

  // 3. Form Submission Handling with Success Feedback (Contact & Careers forms)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('btn-submit-form');
      const originalContent = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';
      
      const nameVal = document.getElementById('user-name').value;
      const emailVal = document.getElementById('user-email').value;
      const phoneVal = document.getElementById('user-phone') ? document.getElementById('user-phone').value : '';
      
      setTimeout(() => {
        window.location.href = `thank-you?name=${encodeURIComponent(nameVal)}&email=${encodeURIComponent(emailVal)}&whatsapp=${encodeURIComponent(phoneVal)}`;
      }, 1000);
    });
  }

  // Handle pricing contact form
  const pricingForm = document.getElementById('pricing-contact-form');
  if (pricingForm) {
    pricingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = pricingForm.querySelector('button[type="submit"]');
      const originalContent = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      
      const nameVal = pricingForm.querySelector('input[placeholder="Name"]').value;
      const emailVal = pricingForm.querySelector('input[placeholder="Email"]').value;
      const phoneVal = pricingForm.querySelector('input[placeholder="Phone / WhatsApp"]') ? pricingForm.querySelector('input[placeholder="Phone / WhatsApp"]').value : '';
      
      setTimeout(() => {
        window.location.href = `thank-you?name=${encodeURIComponent(nameVal)}&email=${encodeURIComponent(emailVal)}&whatsapp=${encodeURIComponent(phoneVal)}`;
      }, 1000);
    });
  }

  // Handle trial booking forms on course pages
  const trialForm = document.getElementById('nazara-trial-form') || document.getElementById('hadith-trial-form');
  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('btn-submit-trial');
      const originalContent = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
      
      const nameVal = document.getElementById('trial-name').value;
      const emailVal = document.getElementById('trial-email').value;
      const phoneVal = document.getElementById('trial-phone') ? document.getElementById('trial-phone').value : '';
      
      setTimeout(() => {
        window.location.href = `thank-you?name=${encodeURIComponent(nameVal)}&email=${encodeURIComponent(emailVal)}&whatsapp=${encodeURIComponent(phoneVal)}`;
      }, 1000);
    });
  }

  const careerForm = document.getElementById('career-form');
  if (careerForm) {
    const dragDropZone = document.getElementById('drag-drop-zone');
    const cvUploadInput = document.getElementById('cv-upload');
    const btnSelectFiles = document.getElementById('btn-select-files');
    const btnCancelUploads = document.getElementById('btn-cancel-uploads');
    const btnDeleteSelected = document.getElementById('btn-delete-selected');
    const selectedFileDisplay = document.getElementById('selected-file-display');
    const fileNameSpan = document.getElementById('file-name');
    const fileSizeSpan = document.getElementById('file-size');
    const uploadErrorMsg = document.getElementById('upload-error-msg');

    let selectedCVFile = null;

    function showError(msg) {
      uploadErrorMsg.textContent = msg;
      uploadErrorMsg.style.display = 'block';
      dragDropZone.style.borderColor = '#ef4444';
    }

    function hideError() {
      uploadErrorMsg.textContent = '';
      uploadErrorMsg.style.display = 'none';
      dragDropZone.style.borderColor = '';
    }

    function updateFileState(file) {
      if (!file) {
        selectedCVFile = null;
        cvUploadInput.value = '';
        selectedFileDisplay.style.display = 'none';
        btnCancelUploads.disabled = true;
        btnDeleteSelected.disabled = true;
        return;
      }

      // Validate file type
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        showError("Invalid file type. Only PDF files are allowed.");
        updateFileState(null);
        return;
      }

      // Validate file size (976.56 KB = 999,997.44 bytes)
      const maxBytes = 976.56 * 1024;
      if (file.size > maxBytes) {
        showError(`File is too large. Max size allowed is 976.56 KB. Your file is ${(file.size / 1024).toFixed(2)} KB.`);
        updateFileState(null);
        return;
      }

      // Clear error if any
      hideError();

      selectedCVFile = file;
      fileNameSpan.textContent = file.name;
      fileSizeSpan.textContent = `${(file.size / 1024).toFixed(2)} KB`;
      selectedFileDisplay.style.display = 'block';
      btnCancelUploads.disabled = false;
      btnDeleteSelected.disabled = false;
    }

    // Connect custom buttons to file inputs and state managers
    btnSelectFiles.addEventListener('click', (e) => {
      e.stopPropagation();
      cvUploadInput.click();
    });

    cvUploadInput.addEventListener('change', () => {
      if (cvUploadInput.files.length > 0) {
        updateFileState(cvUploadInput.files[0]);
      }
    });

    btnCancelUploads.addEventListener('click', (e) => {
      e.stopPropagation();
      updateFileState(null);
      hideError();
    });

    btnDeleteSelected.addEventListener('click', (e) => {
      e.stopPropagation();
      updateFileState(null);
      hideError();
    });

    // Drag and Drop Zone Interactivity
    dragDropZone.addEventListener('click', () => {
      cvUploadInput.click();
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dragDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dragDropZone.addEventListener(eventName, () => {
        dragDropZone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dragDropZone.addEventListener(eventName, () => {
        dragDropZone.classList.remove('dragover');
      }, false);
    });

    dragDropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        updateFileState(files[0]);
      }
    }, false);

    // Submission Handler
    careerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all form fields first using HTML5 validity
      if (!careerForm.checkValidity()) {
        careerForm.reportValidity();
        return;
      }

      // Validate minimum 1 file (which is selectedCVFile)
      if (!selectedCVFile) {
        showError("Please upload your CV (PDF file is required).");
        dragDropZone.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const submitBtn = document.getElementById('btn-submit-career');
      const originalContent = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Application...';
      
      setTimeout(() => {
        submitBtn.className = 'btn btn-secondary';
        submitBtn.style.backgroundColor = '#10b981';
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Application Submitted!';
        
        // Reset form and file state
        careerForm.reset();
        updateFileState(null);
        hideError();
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalContent;
          submitBtn.style.backgroundColor = '';
        }, 4000);
        
      }, 1800);
    });
  }

  // Dynamically add reveal-on-scroll class to key layout sections across all pages
  const elementsToAnimate = [
    'section.section',
    '.hero-content',
    '.hero-illustration-wrapper',
    '.services-grid-3x2',
    '.why-grid-3x2',
    '.steps-layout-cols',
    '.testimonials-grid-3',
    '.careers-grid',
    '.packages-container',
    '.faq-section',
    '.contact-form-container',
    '.benefits-box',
    '.career-apply-card'
  ];
  
  elementsToAnimate.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (!el.classList.contains('reveal-on-scroll')) {
        el.classList.add('reveal-on-scroll');
      }
    });
  });

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length > 0) {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
  }

});
