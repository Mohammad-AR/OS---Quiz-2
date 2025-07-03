// =========================
// Fenix Quiz Engine - Fixed JS
// =========================

document.addEventListener("DOMContentLoaded", () => {
  createParticles();

  const startBtn = document.getElementById("start-btn");
  const restartBtn = document.getElementById("restart-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (startBtn) startBtn.addEventListener("click", startQuiz);
  if (restartBtn) restartBtn.addEventListener("click", restartQuiz);
  if (prevBtn) prevBtn.addEventListener("click", goToPrevQuestion);
  if (nextBtn) nextBtn.addEventListener("click", goToNextQuestion);
});

function createParticles() {
  const container = document.getElementById("particles");
  const particleCount = 30;
  if (!container) return;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("phoenix-particle");
    const size = Math.random() * 100 + 20;
    const colors = [
      "rgba(244, 107, 69, 0.3)",
      "rgba(238, 168, 73, 0.3)",
      "rgba(212, 70, 56, 0.3)",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animation = `floating ${
      Math.random() * 30 + 10
    }s ease-in-out infinite`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(particle);
  }
}

// === Quiz Questions (unchanged) ===

const questions = [
  {
    question: "What are the four components of a computer system?",
    options: [
      "CPU, OS, Applications, Users",
      "CPU, Memory, I/O devices, Network",
      "Hardware, Operating System, Application Programs, Users",
      "Kernel, Compiler, Assembler, Users",
    ],
    correct: "c",
  },
  {
    question:
      "Which component controls and coordinates hardware use among various applications?",
    options: [
      "Application Programs",
      "Users",
      "Device Drivers",
      "Operating System",
    ],
    correct: "d",
  },
  {
    question:
      "From the user's point of view, what do they expect from an operating system?",
    options: [
      "Convenience, ease of use, and good performance",
      "Efficient resource allocation",
      "Security and protection",
      "Full hardware control",
    ],
    correct: "a",
  },
  {
    question: "Which of the following is NOT a part of system software?",
    options: ["Compiler", "Text Editor", "Video Game", "Assembler"],
    correct: "c",
  },
  {
    question: "What does the kernel do?",
    options: [
      "Compiles user applications",
      "Provides a GUI interface",
      "Runs at all times and manages resources",
      "Acts as antivirus software",
    ],
    correct: "c",
  },
  {
    question: "What is the role of device controllers?",
    options: [
      "Manage memory access",
      "Control execution of CPU",
      "Manage specific I/O devices",
      "Run application programs",
    ],
    correct: "c",
  },
  {
    question: "What causes an interrupt in a computer system?",
    options: [
      "Only hardware failures",
      "User pressing a key",
      "Completion of I/O operation or software errors",
      "Loading an application",
    ],
    correct: "c",
  },
  {
    question: "Which of these is considered volatile memory?",
    options: ["Hard disk", "NVM", "DRAM", "SSD"],
    correct: "c",
  },
  {
    question: "What is caching in the context of storage hierarchy?",
    options: [
      "Copying from faster to slower storage",
      "Encrypting memory data",
      "Copying frequently accessed data to faster storage",
      "Compressing storage files",
    ],
    correct: "c",
  },
  {
    question: "What is the role of a device driver?",
    options: [
      "Provides interface between OS and device controller",
      "Stores data permanently",
      "Optimizes file systems",
      "Connects computer to internet",
    ],
    correct: "a",
  },
  {
    question: "What is Direct Memory Access (DMA)?",
    options: [
      "CPU transfers data directly",
      "Device controller transfers data to memory without CPU",
      "Memory access from cache",
      "User input processed by OS",
    ],
    correct: "b",
  },
  {
    question:
      "Which of the following is an advantage of multiprocessor systems?",
    options: [
      "Decreased reliability",
      "Higher power consumption",
      "Graceful degradation",
      "Single tasking",
    ],
    correct: "c",
  },
  {
    question: "What is a bootstrap program?",
    options: [
      "User application",
      "Program that compiles code",
      "Program that initializes the system",
      "File manager",
    ],
    correct: "c",
  },
  {
    question: "What is dual-mode operation?",
    options: [
      "Supports gaming and office use",
      "Distinguishes between user and kernel code",
      "Runs two OSes at once",
      "Shares hardware with cloud",
    ],
    correct: "b",
  },
  {
    question: "How does OS prevent infinite loops in user programs?",
    options: [
      "Using firewalls",
      "System log files",
      "By setting a timer interrupt",
      "Code signing",
    ],
    correct: "c",
  },
  {
    question: "What is protection in operating systems?",
    options: [
      "Backing up data",
      "Limiting access to resources",
      "Antivirus scanning",
      "Firewall configuration",
    ],
    correct: "b",
  },
  {
    question: "What is virtualization?",
    options: [
      "Running multiple tasks at once",
      "Allowing one OS to run applications inside another",
      "Running only native apps",
      "Disabling hardware access",
    ],
    correct: "b",
  },
  {
    question: "Privilege escalation allows user to:",
    options: [
      "determine access control",
      "change to effective ID with more rights",
      "defined and controls managed",
      "to determine who can do what",
    ],
    correct: "b",
  },
  {
    question: "Network Operating System is:",
    options: [
      "Collection of separate, possibly heterogeneous, systems networked together",
      "Distinguishes between user and kernel code",
      "provides features between systems across network",
      "Optimizes file systems ",
    ],
    correct: "c",
  },
  {
    question:
      "Which network type connects systems over large geographical areas?",
    options: ["LAN", "MAN", "WAN", "PAN"],
    correct: "c",
  },
]; // ← حط هون المصفوفة نفسها بدون ما تغير فيها شي

let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let score = 0;
let userName = "";

function startQuiz() {
  userName = document.getElementById("user-name").value.trim();
  const nameError = document.getElementById("name-error");
  if (!userName) {
    nameError.style.display = "block";
    return;
  }
  nameError.style.display = "none";
  document.getElementById("start-container").style.display = "none";
  document.getElementById("progress-container").style.display = "block";
  document.getElementById("quiz-container").style.display = "block";
  updateProgress();
  renderQuestion();
}

function updateProgress() {
  const progressText = document.getElementById("progress-text");
  const progressFill = document.getElementById("progress-fill");
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressText.textContent = `${currentQuestion + 1}/${questions.length}`;
  progressFill.style.width = `${progress}%`;
}

function renderQuestion() {
  const q = questions[currentQuestion];
  const questionElement = document.querySelector(".question");
  const optionsContainer = document.querySelector(".options");
  questionElement.innerHTML = `<span class="question-number">${
    currentQuestion + 1
  }</span> ${q.question}`;
  optionsContainer.innerHTML = "";
  q.options.forEach((option, index) => {
    const letter = String.fromCharCode(65 + index);
    const selected = userAnswers[currentQuestion] === letter.toLowerCase();
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("option");
    if (selected) optionDiv.classList.add("selected");
    optionDiv.dataset.value = letter.toLowerCase();
    optionDiv.innerHTML = `
      <span class="option-letter">${letter}</span>
      <span class="option-text">${option}</span>
    `;
    optionDiv.addEventListener("click", selectOption);
    optionsContainer.appendChild(optionDiv);
  });
  document.getElementById("prev-btn").disabled = currentQuestion === 0;
  document.getElementById("next-btn").disabled =
    userAnswers[currentQuestion] === null;
  const nextBtn = document.getElementById("next-btn");
  if (currentQuestion === questions.length - 1) {
    nextBtn.innerHTML = 'Submit Quiz <i class="fas fa-paper-plane"></i>';
    nextBtn.classList.replace("btn-next", "btn-submit");
  } else {
    nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
    nextBtn.classList.replace("btn-submit", "btn-next");
  }
  updateProgress();
}

function selectOption(e) {
  document
    .querySelectorAll(".option")
    .forEach((o) => o.classList.remove("selected"));
  const selected = e.currentTarget;
  selected.classList.add("selected");
  userAnswers[currentQuestion] = selected.dataset.value;
  document.getElementById("next-btn").disabled = false;
}

function goToPrevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function goToNextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    submitQuiz();
  }
}

function submitQuiz() {
  score = userAnswers.reduce(
    (s, ans, i) => (ans === questions[i].correct ? s + 1 : s),
    0
  );
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("progress-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";
  document.getElementById(
    "final-score"
  ).textContent = `${score}/${questions.length}`;
  document.getElementById(
    "user-greeting"
  ).textContent = `Well done, ${userName}!`;
  const resultMessage = document.getElementById("result-message");
  const percentage = (score / questions.length) * 100;
  if (percentage >= 90) {
    resultMessage.textContent =
      "Excellent! Your OS knowledge is as complete as a phoenix's cycle!";
    resultMessage.style.color = "#2ecc71";
  } else if (percentage >= 70) {
    resultMessage.textContent =
      "Great job! You have a strong understanding of core OS concepts.";
    resultMessage.style.color = "#27ae60";
  } else if (percentage >= 50) {
    resultMessage.textContent =
      "Not bad! Keep learning to improve your OS knowledge.";
    resultMessage.style.color = "#f1c40f";
  } else {
    resultMessage.textContent =
      "Your knowledge needs improvement. Keep learning and you'll rise like a phoenix from the ashes!";
    resultMessage.style.color = "#e74c3c";
  }
  saveResult();
  showAnswers();
}

function showAnswers() {
  const list = document.getElementById("answers-list");
  list.innerHTML = "";
  questions.forEach((q, i) => {
    const ua = userAnswers[i];
    const ca = q.correct;
    const isCorrect = ua === ca;
    const userText = ua ? q.options[ua.charCodeAt(0) - 97] : "N/A";
    const correctText = q.options[ca.charCodeAt(0) - 97];
    const div = document.createElement("div");
    div.classList.add("answer-item");
    div.innerHTML = `
      <div class="answer-question">
        <span class="question-number">${i + 1}.</span> ${q.question}
      </div>
      <div class="answer-info">
        <div class="user-answer ${isCorrect ? "correct" : "incorrect"}">
          <i class="fas ${isCorrect ? "fa-check" : "fa-times"}"></i>
          Your answer: ${userText}
        </div>
        ${
          !isCorrect
            ? `<div class="correct-answer">
          <i class="fas fa-check"></i>
          Correct: ${correctText}
        </div>`
            : ""
        }
      </div>
    `;
    list.appendChild(div);
  });
}

function saveResult() {
  const prev = JSON.parse(localStorage.getItem("quizResults") || "[]");
  const newRecord = {
    name: userName,
    score,
    total: questions.length,
    date: new Date().toISOString(),
  };
  prev.push(newRecord);
  localStorage.setItem("quizResults", JSON.stringify(prev));
}

function restartQuiz() {
  currentQuestion = 0;
  userAnswers = new Array(questions.length).fill(null);
  score = 0;
  document.getElementById("result-container").style.display = "none";
  document.getElementById("start-container").style.display = "block";
  document.getElementById("user-name").value = "";
}
