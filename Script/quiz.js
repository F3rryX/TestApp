// Stato del quiz
let currentQuiz = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    timePerQuestion: 15,
    timer: null,
    timeRemaining: 0,
    answers: [],
    mode: 'normal'
};

// Elementi DOM
let screens = {};

// Funzioni di navigazione
function showScreen(screenName) {
    if (!screens || !screens[screenName]) {
        console.error('Screens not initialized or invalid screen name:', screenName);
        return;
    }
    Object.values(screens).forEach(screen => {
        if (screen) screen.classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

function selectMode(mode) {
    currentQuiz.mode = mode;
    
    if (mode === 'pizzeria') {
        // Modalità pizzeria: 15 domande, 15 secondi, tutte le difficoltà
        startQuiz({
            numQuestions: 15,
            timePerQuestion: 15,
            difficulties: { easy: true, medium: true, hard: true },
            includeCalzoni: false,
            includeDrinks: false
        });
    } else if (mode === 'ristorante') {
        // Modalità ristorante: Work in Progress
        alert('🚧 Modalità Ristorante - Work in Progress!\n\nProssimamente includerà:\n• Domande sui calzoni\n• Domande sulle bevande\n• Menu completo del ristorante');
    } else {
        // Modalità custom: mostra schermata impostazioni
        showScreen('custom');
    }
}

function startCustomQuiz() {
    const numQuestions = parseInt(document.getElementById('num-questions').value);
    const timePerQuestion = parseInt(document.getElementById('time-per-question').value);
    const difficulties = {
        easy: document.getElementById('difficulty-easy').checked,
        medium: document.getElementById('difficulty-medium').checked,
        hard: document.getElementById('difficulty-hard').checked
    };
    const includeCalzoni = document.getElementById('include-calzoni').checked;
    const includeDrinks = document.getElementById('include-drinks').checked;
    
    // Validazione
    if (!difficulties.easy && !difficulties.medium && !difficulties.hard && !includeCalzoni && !includeDrinks) {
        alert('Seleziona almeno una categoria!');
        return;
    }
    
    startQuiz({ numQuestions, timePerQuestion, difficulties, includeCalzoni, includeDrinks });
}

function backToHome() {
    showScreen('home');
    resetQuiz();
}

function restartQuiz() {
    if (currentQuiz.mode === 'pizzeria') {
        startQuiz({
            numQuestions: 15,
            timePerQuestion: 15,
            difficulties: { easy: true, medium: true, hard: true },
            includeCalzoni: false,
            includeDrinks: false
        });
    } else {
        showScreen('custom');
    }
}

// Funzioni quiz
function startQuiz(config) {
    resetQuiz();
    
    try {
        currentQuiz.questions = generateQuestions(config);
        
        if (!currentQuiz.questions || currentQuiz.questions.length === 0) {
            alert('Errore: impossibile generare le domande. Verifica le impostazioni.');
            showScreen('home');
            return;
        }
        
        currentQuiz.timePerQuestion = config.timePerQuestion;
        currentQuiz.currentQuestionIndex = 0;
        currentQuiz.score = 0;
        currentQuiz.answers = [];
        
        showScreen('quiz');
        displayQuestion();
    } catch (error) {
        console.error('Errore durante l\'avvio del quiz:', error);
        alert('Errore durante l\'avvio del quiz. Riprova.');
        showScreen('home');
    }
}

function resetQuiz() {
    if (currentQuiz.timer) {
        clearInterval(currentQuiz.timer);
        currentQuiz.timer = null;
    }
    currentQuiz.currentQuestionIndex = 0;
    currentQuiz.score = 0;
    currentQuiz.answers = [];
    currentQuiz.questions = [];
}

function displayQuestion() {
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    
    // Aggiorna contatore domande
    document.getElementById('question-counter').textContent = 
        `Domanda ${currentQuiz.currentQuestionIndex + 1}/${currentQuiz.questions.length}`;
    
    // Aggiorna punteggio
    document.getElementById('score').textContent = `Punteggio: ${currentQuiz.score}`;
    
    // Mostra domanda
    document.getElementById('question-text').textContent = question.question;
    
    // Nascondi feedback
    const feedbackContainer = document.getElementById('feedback-container');
    feedbackContainer.classList.remove('show', 'correct', 'wrong');
    
    // Genera pulsanti risposte
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = option;
        button.onclick = () => selectAnswer(option, button);
        answersContainer.appendChild(button);
    });
    
    // Avvia timer
    startTimer();
}

function startTimer() {
    currentQuiz.timeRemaining = currentQuiz.timePerQuestion;
    updateTimerDisplay();
    
    if (currentQuiz.timer) {
        clearInterval(currentQuiz.timer);
    }
    
    currentQuiz.timer = setInterval(() => {
        currentQuiz.timeRemaining--;
        updateTimerDisplay();
        
        if (currentQuiz.timeRemaining <= 0) {
            clearInterval(currentQuiz.timer);
            handleTimeout();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerText = document.getElementById('timer-text');
    const timerFill = document.getElementById('timer-fill');
    
    timerText.textContent = `${currentQuiz.timeRemaining}s`;
    
    const percentage = (currentQuiz.timeRemaining / currentQuiz.timePerQuestion) * 100;
    timerFill.style.width = `${percentage}%`;
    
    // Cambia colore in base al tempo rimanente
    timerFill.classList.remove('warning', 'danger');
    if (percentage <= 30) {
        timerFill.classList.add('danger');
    } else if (percentage <= 50) {
        timerFill.classList.add('warning');
    }
}

function selectAnswer(selectedAnswer, button) {
    // Ferma il timer
    clearInterval(currentQuiz.timer);
    
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    // Salva risposta
    currentQuiz.answers.push({
        question: question.question,
        selectedAnswer: selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect,
        timeRemaining: currentQuiz.timeRemaining
    });
    
    // Aggiorna punteggio
    if (isCorrect) {
        currentQuiz.score++;
        button.classList.add('correct');
        showFeedback(true, question.isTrick);
    } else {
        button.classList.add('wrong');
        // Mostra risposta corretta
        highlightCorrectAnswer(question.correctAnswer);
        showFeedback(false, question.isTrick);
    }
    
    // Disabilita tutti i pulsanti
    const allButtons = document.querySelectorAll('.answer-btn');
    allButtons.forEach(btn => btn.classList.add('disabled'));
    
    // Vai alla prossima domanda dopo 2 secondi
    setTimeout(() => {
        nextQuestion();
    }, 2500);
}

function highlightCorrectAnswer(correctAnswer) {
    const allButtons = document.querySelectorAll('.answer-btn');
    allButtons.forEach(btn => {
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        }
    });
}

function showFeedback(isCorrect, isTrick) {
    const feedbackContainer = document.getElementById('feedback-container');
    feedbackContainer.classList.add('show');
    
    if (isCorrect) {
        feedbackContainer.classList.add('correct');
        if (isTrick) {
            feedbackContainer.innerHTML = '🎉 Corretto! Ottimo, non ti sei fatto ingannare!';
        } else {
            const messages = ['✅ Esatto!', '🍕 Corretto!', '👍 Perfetto!', '⭐ Ottimo!'];
            feedbackContainer.innerHTML = messages[Math.floor(Math.random() * messages.length)];
        }
    } else {
        feedbackContainer.classList.add('wrong');
        if (isTrick) {
            feedbackContainer.innerHTML = '❌ Sbagliato! Era una domanda trabocchetto!';
        } else {
            const messages = ['❌ Sbagliato!', '😢 Non è corretto!', '🤔 Ops, riprova!'];
            feedbackContainer.innerHTML = messages[Math.floor(Math.random() * messages.length)];
        }
    }
}

function handleTimeout() {
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    
    // Salva risposta (timeout)
    currentQuiz.answers.push({
        question: question.question,
        selectedAnswer: null,
        correctAnswer: question.correctAnswer,
        isCorrect: false,
        timeRemaining: 0
    });
    
    // Mostra risposta corretta
    highlightCorrectAnswer(question.correctAnswer);
    
    // Mostra feedback
    const feedbackContainer = document.getElementById('feedback-container');
    feedbackContainer.classList.add('show', 'wrong');
    feedbackContainer.innerHTML = '⏰ Tempo scaduto!';
    
    // Disabilita tutti i pulsanti
    const allButtons = document.querySelectorAll('.answer-btn');
    allButtons.forEach(btn => btn.classList.add('disabled'));
    
    // Vai alla prossima domanda
    setTimeout(() => {
        nextQuestion();
    }, 2500);
}

function nextQuestion() {
    currentQuiz.currentQuestionIndex++;
    
    if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    clearInterval(currentQuiz.timer);
    
    const totalQuestions = currentQuiz.questions.length;
    const correctAnswers = currentQuiz.score;
    const wrongAnswers = totalQuestions - correctAnswers;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Aggiorna display
    document.getElementById('final-score').textContent = correctAnswers;
    document.getElementById('total-questions').textContent = totalQuestions;
    document.getElementById('correct-answers').textContent = correctAnswers;
    document.getElementById('wrong-answers').textContent = wrongAnswers;
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    
    // Messaggio basato sul punteggio
    const scoreMessage = document.getElementById('score-message');
    if (accuracy >= 90) {
        scoreMessage.textContent = '🏆 Eccezionale! Sei un vero esperto di pizze Desideria!';
    } else if (accuracy >= 70) {
        scoreMessage.textContent = '🍕 Molto bene! Conosci bene le nostre pizze!';
    } else if (accuracy >= 50) {
        scoreMessage.textContent = '👍 Buon lavoro! Continua così!';
    } else {
        scoreMessage.textContent = '📚 Continua a studiare il menu, puoi fare meglio!';
    }
    
    showScreen('results');
}

// Inizializzazione
// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
    // Inizializza elementi DOM
    screens = {
        home: document.getElementById('home-screen'),
        custom: document.getElementById('custom-screen'),
        quiz: document.getElementById('quiz-screen'),
        results: document.getElementById('results-screen')
    };
    
    showScreen('home');
});
