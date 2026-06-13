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
  const webhookUrl = 'https://services.leadconnectorhq.com/hooks/uuikz5o30GCTN8DGz5yy/webhook-trigger/914e2601-b5fe-4975-98ac-4096b76f3d1e';
  const getThankYouUrl = () => window.location.protocol === 'file:' ? 'thank-you.html' : 'thank-you';

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('btn-submit-form');
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';
      
      const nameVal = document.getElementById('user-name').value;
      const emailVal = document.getElementById('user-email').value;
      const phoneVal = document.getElementById('user-phone') ? document.getElementById('user-phone').value : '';
      const subjectVal = document.getElementById('user-subject') ? document.getElementById('user-subject').value : '';
      const courseVal = document.getElementById('user-course') ? document.getElementById('user-course').value : '';
      const messageVal = document.getElementById('user-message') ? document.getElementById('user-message').value : '';

      const payload = {
        formType: 'Contact Form',
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        subject: subjectVal,
        course: courseVal,
        message: messageVal,
        pageUrl: window.location.href
      };

      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .catch(err => console.error('Webhook error:', err))
      .finally(() => {
        window.location.href = `${getThankYouUrl()}?name=${encodeURIComponent(nameVal)}&email=${encodeURIComponent(emailVal)}&whatsapp=${encodeURIComponent(phoneVal)}`;
      });
    });
  }

  // Handle pricing contact form
  const pricingForm = document.getElementById('pricing-contact-form');
  if (pricingForm) {
    pricingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = pricingForm.querySelector('button[type="submit"]');
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      
      const nameVal = pricingForm.querySelector('input[placeholder="Name"]').value;
      const emailVal = pricingForm.querySelector('input[placeholder="Email"]').value;
      const phoneVal = pricingForm.querySelector('input[placeholder="Phone / WhatsApp"]') ? pricingForm.querySelector('input[placeholder="Phone / WhatsApp"]').value : '';
      
      const payload = {
        formType: 'Pricing Contact Form',
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        pageUrl: window.location.href
      };

      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .catch(err => console.error('Webhook error:', err))
      .finally(() => {
        window.location.href = `${getThankYouUrl()}?name=${encodeURIComponent(nameVal)}&email=${encodeURIComponent(emailVal)}&whatsapp=${encodeURIComponent(phoneVal)}`;
      });
    });
  }

  // Handle trial booking forms on course pages
  const trialForm = document.getElementById('nazara-trial-form') || document.getElementById('hadith-trial-form');
  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('btn-submit-trial');
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
      
      const nameVal = document.getElementById('trial-name').value;
      const emailVal = document.getElementById('trial-email').value;
      const phoneVal = document.getElementById('trial-phone') ? document.getElementById('trial-phone').value : '';
      
      const payload = {
        formType: 'Trial Booking Form',
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        pageUrl: window.location.href
      };

      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .catch(err => console.error('Webhook error:', err))
      .finally(() => {
        window.location.href = `${getThankYouUrl()}?name=${encodeURIComponent(nameVal)}&email=${encodeURIComponent(emailVal)}&whatsapp=${encodeURIComponent(phoneVal)}`;
      });
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
      
      const applicantFname = document.getElementById('applicant-fname') ? document.getElementById('applicant-fname').value : '';
      const applicantLname = document.getElementById('applicant-lname') ? document.getElementById('applicant-lname').value : '';
      const applicantPhone = document.getElementById('applicant-phone') ? document.getElementById('applicant-phone').value : '';
      const applicantEmail = document.getElementById('applicant-email') ? document.getElementById('applicant-email').value : '';
      const applicantQual = document.getElementById('applicant-qualification') ? document.getElementById('applicant-qualification').value : '';
      const applicantExp = document.getElementById('applicant-experience') ? document.getElementById('applicant-experience').value : '';

      const payload = {
        formType: 'Career Application Form',
        firstName: applicantFname,
        lastName: applicantLname,
        email: applicantEmail,
        phone: applicantPhone,
        qualification: applicantQual,
        experience: applicantExp,
        cvName: selectedCVFile ? selectedCVFile.name : '',
        cvSize: selectedCVFile ? selectedCVFile.size : 0,
        pageUrl: window.location.href
      };

      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .catch(err => console.error('Webhook error:', err))
      .finally(() => {
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
      });
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

  // 4. Local File Protocol Link Resolver
  if (window.location.protocol === 'file:') {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('#') && href !== '/') {
        const parts = href.split('/');
        const lastPart = parts[parts.length - 1];
        if (lastPart && !lastPart.includes('.') && !lastPart.includes('#')) {
          link.setAttribute('href', href + '.html');
        } else if (lastPart && !lastPart.includes('.') && lastPart.includes('#')) {
          const subparts = lastPart.split('#');
          link.setAttribute('href', href.replace('#' + subparts[1], '.html#' + subparts[1]));
        }
      } else if (href === '/') {
        link.setAttribute('href', 'index.html');
      }
    });
  }

  // 5. Dynamic Active Page Underline Highlight & Global WhatsApp / Tutor Styles
  const activeStyle = document.createElement('style');
  activeStyle.innerHTML = `
    .nav-links > li > a.active {
      color: var(--primary) !important;
    }
    .nav-links > li > a.active::after {
      width: 100% !important;
    }

    /* Fix mobile dropdown shift/cutoff */
    @media (max-width: 992px) {
      .dropdown:hover .dropdown-menu,
      .dropdown.open-mobile .dropdown-menu {
        transform: none !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
      .dropdown-menu {
        transform: none !important;
      }
      .nav-links .btn {
        justify-content: center !important;
        padding: 12px 28px !important;
      }
      /* Fix mobile grid-column span overflow issues */
      .why-grid-3x2, .why-learn-grid, .why-grid-3, .services-grid-3x2 {
        grid-template-columns: 1fr !important;
      }
      .why-grid-3x2 > *, .why-learn-grid > *, .why-grid-3 > *, .services-grid-3x2 > * {
        grid-column: span 1 !important;
      }
      /* Fix mobile trial form 2-column squeeze */
      .form-grid, .about-grid {
        grid-template-columns: 1fr !important;
      }
      .contact-form-container .form-grid > div {
        padding: 30px 20px !important;
      }
      /* Fix inline style grids in sections on mobile */
      .section .container > div[style*="grid-template-columns"],
      .section .container > div[style*="display: grid"],
      .section .container > div[style*="display:grid"] {
        display: flex !important;
        flex-direction: column !important;
        gap: 30px !important;
      }
    }




    /* WhatsApp CTA Styles */
    .btn-whatsapp {
      background-color: #25d366 !important;
      color: white !important;
      border-color: transparent !important;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.2);
    }
    .btn-whatsapp:hover {
      background-color: #128c7e !important;
      box-shadow: 0 8px 20px rgba(18, 140, 126, 0.3) !important;
      transform: translateY(-2px);
      color: white !important;
    }
    .btn-whatsapp i {
      font-size: 1.1em;
    }

    /* Tutor Section Better Qualifications Styles */
    .tutor-stats {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background-color: var(--secondary-light);
      border: 1px solid rgba(16, 185, 129, 0.15);
      border-radius: var(--radius-sm);
      padding: 12px 16px;
      margin: 14px auto;
      max-width: 230px;
      text-align: left;
    }
    .tutor-stat-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13.5px;
      color: var(--primary);
      font-weight: 600;
      font-family: var(--font-title);
    }
    .tutor-stat-item i {
      color: var(--secondary);
      font-size: 14px;
      width: 16px;
      text-align: center;
    }

    /* Floating WhatsApp Button */
    .whatsapp-float-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background-color: #25d366;
      color: white !important;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
      z-index: 9999;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-decoration: none;
    }
    .whatsapp-float-btn:hover {
      background-color: #128c7e;
      transform: scale(1.1) translateY(-3px);
      box-shadow: 0 6px 18px rgba(18, 140, 126, 0.4);
    }
    .whatsapp-float-btn::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid #25d366;
      animation: pulse-ring-whatsapp 2s infinite;
      box-sizing: border-box;
      opacity: 0.7;
    }
    @keyframes pulse-ring-whatsapp {
      0% { transform: scale(1); opacity: 0.7; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    /* Tooltip for Floating WhatsApp */
    .whatsapp-tooltip {
      position: fixed;
      bottom: 40px;
      right: 105px;
      background-color: var(--dark);
      color: white;
      padding: 8px 16px;
      border-radius: 30px;
      font-size: 13.5px;
      font-weight: 600;
      font-family: var(--font-title);
      box-shadow: var(--shadow-md);
      z-index: 9998;
      opacity: 0;
      transform: translateX(10px);
      transition: all 0.3s ease;
      pointer-events: none;
      white-space: nowrap;
    }
    .whatsapp-tooltip.visible {
      opacity: 1;
      transform: translateX(0);
    }
    .whatsapp-tooltip::after {
      content: '';
      position: absolute;
      right: -6px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      width: 12px;
      height: 12px;
      background-color: var(--dark);
    }
  `;
  document.head.appendChild(activeStyle);

  const currentPath = window.location.pathname;
  const cleanPath = currentPath.replace(/^\/|\.html$/g, '').split('/').pop() || 'index';

  document.querySelectorAll('.nav-links > li').forEach(li => {
    const trigger = li.querySelector('.dropdown-trigger');
    const links = li.querySelectorAll('a');
    let isChildActive = false;
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        const cleanHref = href.replace(/^\/|\.html$/g, '').split('/').pop();
        if (cleanHref && (cleanHref === cleanPath || (cleanPath === 'index' && cleanHref === '/'))) {
          if (!link.classList.contains('dropdown-trigger')) {
            link.classList.add('active');
            isChildActive = true;
          }
        }
      }
    });
    
    if (isChildActive && trigger) {
      trigger.classList.add('active');
    }
  });

  // 6. Floating WhatsApp Button Injection
  const waBtn = document.createElement('a');
  waBtn.href = "https://wa.me/447864710821?text=Salam,%20I'm%20interested%20in%20online%20Quran%20classes.%20Can%20I%20book%20a%20free%20trial%3F";
  waBtn.target = "_blank";
  waBtn.className = "whatsapp-float-btn";
  waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
  waBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';

  const waTooltip = document.createElement('div');
  waTooltip.className = "whatsapp-tooltip";
  waTooltip.innerText = "Message Us on WhatsApp";

  document.body.appendChild(waTooltip);
  document.body.appendChild(waBtn);

  // Show tooltip after 3 seconds, then hide after 8 seconds
  setTimeout(() => {
    waTooltip.classList.add('visible');
    setTimeout(() => {
      waTooltip.classList.remove('visible');
    }, 8000);
  }, 3000);

  // Toggle tooltip on hover
  waBtn.addEventListener('mouseenter', () => waTooltip.classList.add('visible'));
  waBtn.addEventListener('mouseleave', () => waTooltip.classList.remove('visible'));

  // 7. Global CTA button link and text overrides (Point to contact form/page)
  const headerCta = document.getElementById('btn-header-cta');
  if (headerCta) {
    headerCta.href = window.location.protocol === 'file:' ? 'contact.html' : 'contact';
    headerCta.target = "_self";
    headerCta.innerText = 'Register Now';
  }

  const mobileCtaLink = document.querySelector('.mobile-cta-only a');
  if (mobileCtaLink) {
    mobileCtaLink.href = window.location.protocol === 'file:' ? 'contact.html' : 'contact';
    mobileCtaLink.target = "_self";
    mobileCtaLink.innerText = 'Register Now';
  }

});



