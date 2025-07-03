document.addEventListener("DOMContentLoaded", () => {
  createParticles();

  document.getElementById("start-btn").addEventListener("click", startQuiz);
  document.getElementById("restart-btn").addEventListener("click", restartQuiz);
});

function createParticles() {
  const container = document.getElementById("particles");
  const particleCount = 30;

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

    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;

    const animationDuration = Math.random() * 30 + 10;
    particle.style.animation = `floating ${animationDuration}s ease-in-out infinite`;
    particle.style.animationDelay = `${Math.random() * 5}s`;

    container.appendChild(particle);
  }
}
const questions = [
  {
    question: "What is the primary purpose of operating system services?",
    options: [
      "To provide hardware manufacturing specifications",
      "To create an environment for program execution and provide services to programs/users",
      "To design user interface elements only",
      "To replace application programming interfaces",
    ],
    correct: "b",
  },
  {
    question:
      "Which is NOT a common type of user interface provided by operating systems?",
    options: [
      "Command-Line Interface (CLI)",
      "Graphical User Interface (GUI)",
      "Bios Interface (BI)",
      "Touchscreen Interface",
    ],
    correct: "c",
  },
  {
    question: "What is the relationship between APIs and system calls?",
    options: [
      "APIs are identical to system calls",
      "APIs provide a higher-level interface than direct system calls",
      "System calls are built on top of APIs",
      "APIs are only used in kernel mode",
    ],
    correct: "b",
  },
  {
    question:
      "Which method is commonly used for passing parameters to system calls?",
    options: [
      "Passing parameters in CPU registers",
      "Storing parameters in a memory block",
      "Pushing parameters onto the stack",
      "All of the above",
    ],
    correct: "d",
  },
  {
    question:
      "What type of system call is used for creating and managing communication connections?",
    options: [
      "Process control",
      "File management",
      "Device management",
      "Communications",
    ],
    correct: "d",
  },
  {
    question: "What is the main function of linkers and loaders?",
    options: [
      "To design user interfaces",
      "To combine object files into executables and load them into memory",
      "To implement system security protocols",
      "To manage touchscreen gestures",
    ],
    correct: "b",
  },
  {
    question: "Why are applications typically operating system specific?",
    options: [
      "Because all operating systems use the same system calls",
      "Because each OS provides unique system calls and file formats",
      "Because hardware is identical across systems",
      "Because programming languages are OS-dependent",
    ],
    correct: "b",
  },
  {
    question:
      "What is the key principle in OS design regarding policy and mechanism?",
    options: [
      "They should always be combined",
      "Policy determines what to do, mechanism determines how to do it",
      "Mechanism should dictate policy",
      "They are irrelevant to OS design",
    ],
    correct: "b",
  },
  {
    question:
      "Which language is commonly used for implementing modern operating systems?",
    options: ["Python", "HTML", "C and C++", "Java exclusively"],
    correct: "c",
  },
  {
    question: "What characterizes a monolithic kernel structure?",
    options: [
      "Minimal functionality in kernel space",
      "Separation of all components into user space",
      "Most functionality included in the kernel itself",
      "Exclusive use of message passing",
    ],
    correct: "c",
  },
  {
    question: "What is a key advantage of the microkernel approach?",
    options: [
      "Better performance due to everything in kernel space",
      "Easier portability and increased security",
      "Simpler development with no message passing",
      "Faster boot times",
    ],
    correct: "b",
  },
  {
    question: "Which OS structure uses loadable kernel modules (LKMs)?",
    options: [
      "Pure monolithic kernels only",
      "Only microkernels",
      "Layered approach exclusively",
      "Modern systems like Linux and Solaris",
    ],
    correct: "d",
  },
  {
    question: "What hybrid approach does macOS use?",
    options: [
      "Pure Windows NT kernel",
      "Linux kernel only",
      "Mach microkernel with BSD Unix parts",
      "Android runtime environment",
    ],
    correct: "c",
  },
  {
    question: "What is Darwin in the context of macOS?",
    options: [
      "The user interface layer",
      "The kernel environment combining Mach and BSD",
      "A programming language",
      "A virtualization technology",
    ],
    correct: "b",
  },
  {
    question:
      "What is the first step when power is initialized on a computer system?",
    options: [
      "Loading applications",
      "Execution starts at a fixed memory location",
      "Immediate user login",
      "Network connection establishment",
    ],
    correct: "b",
  },
  {
    question: "What is the role of the bootstrap loader?",
    options: [
      "To design GUI elements",
      "To locate and load the OS kernel into memory",
      "To manage application permissions",
      "To implement system calls",
    ],
    correct: "b",
  },
  {
    question: "What replaced BIOS in modern systems?",
    options: [
      "CLI",
      "GUI",
      "UEFI (Unified Extensible Firmware Interface)",
      "API",
    ],
    correct: "c",
  },
  {
    question: "What is Kernighan's Law related to debugging?",
    options: [
      "Debugging is easier than writing code",
      "Debugging is twice as hard as writing code",
      "Debugging should never be attempted",
      "Debugging is only for hardware issues",
    ],
    correct: "b",
  },
  {
    question: "Which tool is used for tracing system calls in Linux?",
    options: ["strace", "Photoshop", "Word processor", "Web browser"],
    correct: "a",
  },
  {
    question: "What does BCC (BPF Compiler Collection) provide in Linux?",
    options: [
      "User interface design tools",
      "Tracing and performance monitoring features",
      "Hardware manufacturing specs",
      "Cloud storage solutions",
    ],
    correct: "b",
  },
];

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

  document
    .getElementById("prev-btn")
    .addEventListener("click", goToPrevQuestion);
  document
    .getElementById("next-btn")
    .addEventListener("click", goToNextQuestion);

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
  const question = questions[currentQuestion];
  const questionElement = document.querySelector(".question");
  const optionsContainer = document.querySelector(".options");

  questionElement.innerHTML = `<span class="question-number">${
    currentQuestion + 1
  }</span> ${question.question}`;
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
    const isSelected =
      userAnswers[currentQuestion] === optionLetter.toLowerCase();

    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    if (isSelected) optionElement.classList.add("selected");
    optionElement.dataset.value = optionLetter.toLowerCase();

    optionElement.innerHTML = `
                <span class="option-letter">${optionLetter}</span>
                <span class="option-text">${option}</span>
            `;

    optionElement.addEventListener("click", selectOption);
    optionsContainer.appendChild(optionElement);
  });

  document.getElementById("prev-btn").disabled = currentQuestion === 0;
  document.getElementById("next-btn").disabled =
    userAnswers[currentQuestion] === null;

  if (currentQuestion === questions.length - 1) {
    document.getElementById("next-btn").innerHTML =
      'Submit Quiz <i class="fas fa-paper-plane"></i>';
    document.getElementById("next-btn").classList.remove("btn-next");
    document.getElementById("next-btn").classList.add("btn-submit");
  } else {
    document.getElementById("next-btn").innerHTML =
      'Next <i class="fas fa-arrow-right"></i>';
    document.getElementById("next-btn").classList.remove("btn-submit");
    document.getElementById("next-btn").classList.add("btn-next");
  }

  updateProgress();
}

function selectOption(e) {
  const selectedOption = e.currentTarget;
  const value = selectedOption.dataset.value;

  document.querySelectorAll(".option").forEach((option) => {
    option.classList.remove("selected");
  });

  selectedOption.classList.add("selected");
  userAnswers[currentQuestion] = value;
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
  score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === questions[index].correct) {
      score++;
    }
  });

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

  showAnswers();
}

function showAnswers() {
  const list = document.getElementById("answers-list");
  list.innerHTML = "";

  questions.forEach((q, i) => {
    const userAnswer = userAnswers[i];
    const correct = q.correct;
    const isCorrect = userAnswer === correct;

    const userText = userAnswer
      ? q.options[userAnswer.charCodeAt(0) - 97]
      : "N/A";
    const correctText = q.options[correct.charCodeAt(0) - 97];

    const item = document.createElement("div");
    item.classList.add("answer-item");

    item.innerHTML = `
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
            ? `
          <div class="correct-answer">
            <i class="fas fa-check"></i>
            Correct: ${correctText}
          </div>`
            : ""
        }
      </div>
    `;

    list.appendChild(item);
  });
}

function restartQuiz() {
  currentQuestion = 0;
  userAnswers = new Array(questions.length).fill(null);
  score = 0;

  document.getElementById("result-container").style.display = "none";
  document.getElementById("start-container").style.display = "block";
  document.getElementById("user-name").value = "";
}

/*----Admin Script----- */
const quizTitle = "Operating Systems - Chapter 1"; // 👈 غيرها حسب اسم الكويز
const results = JSON.parse(localStorage.getItem("quizResults")) || [];

const tbody = document.getElementById("results-body");
results.forEach((r) => {
  const tr = document.createElement("tr");
  const percent = (r.score / r.total) * 100;

  tr.innerHTML = `
        <td>${r.name}</td>
        <td>${r.score}/${r.total}</td>
        <td>${quizTitle}</td>
        <td>${new Date(r.date).toLocaleString()}</td>
        <td><span class="tag ${percent >= 50 ? "pass" : "fail"}">${
    percent >= 50 ? "Pass" : "Fail"
  }</span></td>
      `;
  tbody.appendChild(tr);
});
