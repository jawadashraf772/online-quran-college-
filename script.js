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
            e.preventDefault(); // Prevent navigating to services.html / lms.html on first click
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
      
      setTimeout(() => {
        submitBtn.className = 'btn btn-secondary';
        submitBtn.style.backgroundColor = '#10b981';
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent Successfully!';
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalContent;
          submitBtn.style.backgroundColor = '';
        }, 4000);
        
      }, 1500);
    });
  }

  const careerForm = document.getElementById('career-form');
  if (careerForm) {
    careerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('btn-submit-career');
      const originalContent = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Application...';
      
      setTimeout(() => {
        submitBtn.className = 'btn btn-secondary';
        submitBtn.style.backgroundColor = '#10b981';
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Application Submitted!';
        careerForm.reset();
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalContent;
          submitBtn.style.backgroundColor = '';
        }, 4000);
        
      }, 1800);
    });
  }

  // 4. Interactive Quiz Logic
  const quizBox = document.getElementById('quiz-box');
  const welcomePanel = document.getElementById('quiz-welcome-panel');
  const resultsPanel = document.getElementById('quiz-results-panel');
  
  if (quizBox && welcomePanel && resultsPanel) {
    const startBtn = document.getElementById('btn-start-quiz');
    const quizSubject = document.getElementById('quiz-subject');
    const studentNameInput = document.getElementById('student-name');
    
    const questionText = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    const nextBtn = document.getElementById('btn-next-question');
    
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');
    const timerDisplay = document.getElementById('timer-count');
    
    const scoreNum = document.getElementById('score-num');
    const certName = document.getElementById('cert-name');
    const certSubject = document.getElementById('cert-subject');
    const certDate = document.getElementById('cert-date');
    const btnRestart = document.getElementById('btn-restart-quiz');
    
    // Quiz Questions Data
    const quizData = {
      tajweed: [
        {
          q: "What is the literal meaning of 'Tajweed'?",
          options: ["To memorize", "To make beautiful/better", "To read fast", "To write in cursive"],
          correct: 1
        },
        {
          q: "How many Harakat (vocal movements) is a Madd Tabee'ee prolonged?",
          options: ["1 Harakah", "2 Harakat", "4 Harakat", "6 Harakat"],
          correct: 1
        },
        {
          q: "Which letter is NOT a Qalqalah (echoing/bouncing sound) letter?",
          options: ["ق (Qaf)", "ط (Ta)", "ب (Ba)", "س (Seen)"],
          correct: 3
        },
        {
          q: "What is 'Ghunnah'?",
          options: ["A sound made from the throat", "A sound made from the nasal cavity", "A heavy whispering sound", "A stopping rule"],
          correct: 1
        },
        {
          q: "Which rule applies when a Nun Sakinah or Tanween is followed by the letter 'Ba' (ب)?",
          options: ["Izhar (Clarification)", "Idgham (Merging)", "Iqlab (Conversion to Meem)", "Ikhfa (Hiding)"],
          correct: 2
        }
      ],
      islamic: [
        {
          q: "How many pillars of Islam are there?",
          options: ["Three", "Four", "Five", "Six"],
          correct: 2
        },
        {
          q: "In which Islamic month was the Holy Quran first revealed?",
          options: ["Rajab", "Ramadan", "Dhul-Hijjah", "Muharram"],
          correct: 1
        },
        {
          q: "Which prophet was swallowed by a large whale?",
          options: ["Prophet Musa (AS)", "Prophet Yunus (AS)", "Prophet Ibrahim (AS)", "Prophet Isa (AS)"],
          correct: 1
        },
        {
          q: "How many daily obligatory prayers (Salah) are performed by Muslims?",
          options: ["3 prayers", "5 prayers", "6 prayers", "7 prayers"],
          correct: 1
        },
        {
          q: "What is the name of the holy well located near the Kaaba in Mecca?",
          options: ["Zamzam", "Kauthar", "Salsabeel", "Tasneem"],
          correct: 0
        }
      ],
      arabic: [
        {
          q: "What does the word 'Kitab' (كِتَاب) mean in English?",
          options: ["Pen", "Desk", "Book", "Teacher"],
          correct: 2
        },
        {
          q: "What is the opposite of 'Jameel' (جَمِيل - Beautiful)?",
          options: ["Kabeer (Large)", "Qabeeh (Ugly)", "Sagheer (Small)", "Tayyib (Good)"],
          correct: 1
        },
        {
          q: "What does 'Madrasah' (مَدْرَسَة) translate to?",
          options: ["Library", "Mosque", "School", "House"],
          correct: 2
        },
        {
          q: "Which word means 'Morning' in Arabic?",
          options: ["Masaa (مَسَاء)", "Layl (لَيْل)", "Nahar (نَهَار)", "Sabah (صَبَاح)"],
          correct: 3
        },
        {
          q: "What is the plural of 'Walad' (وَلَد - Boy/Child)?",
          options: ["Awlad (أَوْلاد)", "Rijal (رِجَال)", "Nisaa (نِسَاء)", "Banaat (بَنَات)"],
          correct: 0
        }
      ]
    };
    
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let timerInterval;
    let timeLeft = 15;
    let selectedOptionIndex = null;
    let studentName = "Learner";
    let selectedSubject = "tajweed";
    
    // Check URL parameters for subject type
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    if (typeParam && quizData[typeParam]) {
      quizSubject.value = typeParam;
    }
    
    // Start Quiz Button Click
    startBtn.addEventListener('click', () => {
      studentName = studentNameInput.value.trim() || "Learner";
      selectedSubject = quizSubject.value;
      
      currentQuestions = quizData[selectedSubject];
      currentQuestionIndex = 0;
      score = 0;
      
      welcomePanel.style.display = 'none';
      quizBox.style.display = 'block';
      resultsPanel.style.display = 'none';
      
      loadQuestion();
    });
    
    function loadQuestion() {
      clearInterval(timerInterval);
      timeLeft = 15;
      timerDisplay.textContent = timeLeft;
      selectedOptionIndex = null;
      nextBtn.disabled = true;
      nextBtn.innerHTML = 'Next Question <i class="fa-solid fa-arrow-right"></i>';
      
      const currentQ = currentQuestions[currentQuestionIndex];
      const totalQ = currentQuestions.length;
      progressText.textContent = `Question ${currentQuestionIndex + 1} of ${totalQ}`;
      progressBar.style.width = `${((currentQuestionIndex + 1) / totalQ) * 100}%`;
      
      questionText.textContent = currentQ.q;
      
      optionsList.innerHTML = '';
      currentQ.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'quiz-option';
        optionBtn.innerHTML = `
          <span>${option}</span>
          <div class="quiz-option-status-icon"></div>
        `;
        optionBtn.addEventListener('click', () => selectOption(index, optionBtn));
        optionsList.appendChild(optionBtn);
      });
      
      timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          revealAnswers(null);
          nextBtn.disabled = false;
        }
      }, 1000);
    }
    
    function selectOption(index, btnElement) {
      if (selectedOptionIndex !== null) return;
      clearInterval(timerInterval);
      selectedOptionIndex = index;
      
      revealAnswers(index);
      
      const currentQ = currentQuestions[currentQuestionIndex];
      if (index === currentQ.correct) {
        score++;
      }
      
      nextBtn.disabled = false;
    }
    
    function revealAnswers(selectedIndex) {
      const currentQ = currentQuestions[currentQuestionIndex];
      const optionButtons = optionsList.querySelectorAll('.quiz-option');
      
      optionButtons.forEach((btn, index) => {
        if (index === currentQ.correct) {
          btn.classList.add('correct');
          btn.querySelector('.quiz-option-status-icon').innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        } else if (index === selectedIndex) {
          btn.classList.add('incorrect');
          btn.querySelector('.quiz-option-status-icon').innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
        }
      });
    }
    
    nextBtn.addEventListener('click', () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
      } else {
        showResults();
      }
    });
    
    function showResults() {
      quizBox.style.display = 'none';
      resultsPanel.style.display = 'block';
      
      scoreNum.textContent = `${score}/${currentQuestions.length}`;
      certName.textContent = studentName;
      
      let displaySubject = "Quran Nazara Course";
      if (selectedSubject === "islamic") displaySubject = "Islamic General Knowledge";
      if (selectedSubject === "arabic") displaySubject = "Quranic Arabic Vocabulary";
      certSubject.textContent = displaySubject;
      
      const today = new Date();
      certDate.textContent = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    btnRestart.addEventListener('click', () => {
      welcomePanel.style.display = 'block';
      resultsPanel.style.display = 'none';
      quizBox.style.display = 'none';
    });
  }
  
});
