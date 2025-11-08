// Variabili globali
let currentQuiz = {
    mode: 'custom', // 'tournament' o 'custom'
    category: 'all',
    numQuestions: 10,
    questionType: 'ingredients',
    playerName: '',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    startTime: 0,
    totalTime: 0
};

let timer = {
    interval: null,
    secondsLeft: 10,
    totalSeconds: 10
};

// Dark Mode
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    document.body.classList.add('dark-mode');
}

// Elementi DOM
const setupScreen = document.getElementById('setup-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

// Mode selection elements
const tournamentModeCard = document.getElementById('tournament-mode-card');
const customModeCard = document.getElementById('custom-mode-card');
const tournamentSettings = document.getElementById('tournament-settings');
const customSettings = document.getElementById('custom-settings');

// Tournament elements
const tournamentPlayerName = document.getElementById('tournament-player-name');
const startTournamentBtn = document.getElementById('start-tournament-btn');
const backFromTournamentBtn = document.getElementById('back-from-tournament-btn');

// Custom elements
const customCategory = document.getElementById('custom-category');
const customNumQuestions = document.getElementById('custom-num-questions');
const customQuestionType = document.getElementById('custom-question-type');
const customTimerSeconds = document.getElementById('custom-timer-seconds');
const customPlayerName = document.getElementById('custom-player-name');
const startCustomBtn = document.getElementById('start-custom-btn');
const backFromCustomBtn = document.getElementById('back-from-custom-btn');

// Home leaderboard
const tournamentLeaderboardContainer = document.getElementById('tournament-leaderboard-container');
const customGamesContainer = document.getElementById('custom-games-container');
const categoryTabs = document.querySelectorAll('.category-tab');

// Search elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const clearSearchBtn = document.getElementById('clear-search-btn');
const searchResultsContainer = document.getElementById('search-results-container');

let selectedCategory = 'all'; // For tournament leaderboard filtering

const timerText = document.getElementById('timer-text');
const timerProgress = document.getElementById('timer-progress');
const progressFill = document.getElementById('progress-fill');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const nextBtnMobile = document.getElementById('next-btn-mobile');
const prevBtn = document.getElementById('prev-btn');

const finalScore = document.getElementById('final-score');
const scorePercentage = document.getElementById('score-percentage');
const scoreMessage = document.getElementById('score-message');
const totalTimeDisplay = document.getElementById('total-time');
const recordMessage = document.getElementById('record-message');
const leaderboard = document.getElementById('leaderboard');
const answersReview = document.getElementById('answers-review');
const retryBtn = document.getElementById('retry-btn');
const newQuizBtn = document.getElementById('new-quiz-btn');
const shareBtn = document.getElementById('share-btn');

// Event Listeners
// Dark mode toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    themeIcon.textContent = isDark ? '☀️' : '🌙';
});

// Set initial icon
themeIcon.textContent = isDarkMode ? '☀️' : '🌙';

// Mode selection
tournamentModeCard.addEventListener('click', () => showModeSettings('tournament'));
customModeCard.addEventListener('click', () => showModeSettings('custom'));
backFromTournamentBtn.addEventListener('click', () => showModeSelection());
backFromCustomBtn.addEventListener('click', () => showModeSelection());

// Start quiz
startTournamentBtn.addEventListener('click', startTournamentQuiz);
startCustomBtn.addEventListener('click', startCustomQuiz);

// Quiz navigation
nextBtn.addEventListener('click', nextQuestion);
nextBtnMobile.addEventListener('click', nextQuestion);

// Results
retryBtn.addEventListener('click', retryQuiz);
newQuizBtn.addEventListener('click', newQuiz);
shareBtn.addEventListener('click', shareResults);

// Search
searchBtn.addEventListener('click', performSearch);
clearSearchBtn.addEventListener('click', clearSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

// Category tabs
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        selectedCategory = tab.dataset.category;
        displayTournamentLeaderboard();
    });
});

// Carica la classifica nella home all'avvio
window.addEventListener('DOMContentLoaded', () => {
    displayTournamentLeaderboard();
    displayCustomGames();
});

// Funzione per mostrare la selezione modalità
function showModeSelection() {
    document.querySelector('.mode-selection').style.display = 'grid';
    tournamentSettings.style.display = 'none';
    customSettings.style.display = 'none';
}

// Funzione per mostrare le impostazioni di una modalità
function showModeSettings(mode) {
    document.querySelector('.mode-selection').style.display = 'none';
    
    if (mode === 'tournament') {
        tournamentSettings.style.display = 'block';
        customSettings.style.display = 'none';
    } else {
        customSettings.style.display = 'block';
        tournamentSettings.style.display = 'none';
    }
}

// Funzione per iniziare il quiz torneo
function startTournamentQuiz() {
    const playerName = tournamentPlayerName.value.trim();
    if (!playerName) {
        alert('Inserisci il tuo nome per partecipare al torneo!');
        return;
    }
    
    currentQuiz.mode = 'tournament';
    currentQuiz.category = 'all'; // Sempre tutte le pizze
    currentQuiz.numQuestions = 15;
    currentQuiz.questionType = 'mixed';
    currentQuiz.playerName = playerName;
    currentQuiz.currentQuestionIndex = 0;
    currentQuiz.score = 0;
    currentQuiz.answers = [];
    currentQuiz.startTime = Date.now();
    
    // Timer infinito per torneo
    timer.totalSeconds = 0;

    // Genera le domande
    currentQuiz.questions = generateQuestions(
        currentQuiz.category,
        currentQuiz.numQuestions,
        currentQuiz.questionType
    );

    // Mostra lo schermo del quiz
    showScreen('quiz');
    displayQuestion();
}

// Funzione per iniziare il quiz custom
function startCustomQuiz() {
    currentQuiz.mode = 'custom';
    currentQuiz.category = customCategory.value;
    currentQuiz.numQuestions = parseInt(customNumQuestions.value);
    currentQuiz.questionType = customQuestionType.value;
    currentQuiz.playerName = customPlayerName.value.trim() || 'Anonimo';
    currentQuiz.currentQuestionIndex = 0;
    currentQuiz.score = 0;
    currentQuiz.answers = [];
    currentQuiz.startTime = Date.now();
    
    // Imposta il tempo del timer
    timer.totalSeconds = parseInt(customTimerSeconds.value);

    // Genera le domande
    currentQuiz.questions = generateQuestions(
        currentQuiz.category,
        currentQuiz.numQuestions,
        currentQuiz.questionType
    );

    // Mostra lo schermo del quiz
    showScreen('quiz');
    displayQuestion();
}

// Funzione per generare le domande
function generateQuestions(category, numQuestions, questionType) {
    const pizzas = getPizzas(category);
    const questions = [];
    
    // Crea una copia dell'array per non modificare l'originale
    const availablePizzas = [...pizzas];
    
    // Mescola l'array
    shuffleArray(availablePizzas);
    
    // Prendi solo il numero richiesto di pizze
    const selectedPizzas = availablePizzas.slice(0, Math.min(numQuestions, availablePizzas.length));
    
    selectedPizzas.forEach(pizza => {
        // Salta le pizze speciali senza ingredienti specifici
        if (pizza.ingredients.includes("specialità della casa") || 
            pizza.ingredients.includes("specialità del pizzaiolo")) {
            return;
        }

        let type = questionType;
        if (questionType === 'mixed') {
            const types = ['ingredients', 'pizza', 'confusing'];
            type = types[Math.floor(Math.random() * types.length)];
        }

        if (type === 'ingredients') {
            // Domanda: Quali sono gli ingredienti di questa pizza?
            questions.push({
                type: 'ingredients',
                pizza: pizza,
                question: `Quali sono gli ingredienti della pizza "${pizza.name}"?`,
                correctAnswer: pizza.ingredients.join(', '),
                options: generateIngredientOptions(pizza, pizzas)
            });
        } else if (type === 'confusing') {
            // Domanda confusionaria: Trova l'ingrediente sbagliato
            questions.push({
                type: 'confusing',
                pizza: pizza,
                question: `Ingredienti della ${pizza.name}? (UNA opzione contiene un ingrediente SBAGLIATO)`,
                correctAnswer: pizza.ingredients.join(', '),
                options: generateConfusingOptions(pizza, pizzas)
            });
        } else {
            // Domanda: Quale pizza ha questi ingredienti?
            questions.push({
                type: 'pizza',
                pizza: pizza,
                question: `Quale pizza contiene: ${pizza.ingredients.join(', ')}?`,
                correctAnswer: pizza.name,
                options: generatePizzaOptions(pizza, pizzas)
            });
        }
    });

    return questions;
}

// Funzione per generare opzioni di ingredienti
function generateIngredientOptions(correctPizza, allPizzas) {
    const options = [correctPizza.ingredients.join(', ')];
    
    // Filtra pizze con ingredienti diversi e non speciali
    const otherPizzas = allPizzas.filter(p => 
        p.name !== correctPizza.name && 
        !p.ingredients.includes("specialità della casa") &&
        !p.ingredients.includes("specialità del pizzaiolo")
    );
    
    // Aggiungi 3 opzioni sbagliate
    while (options.length < 4 && otherPizzas.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherPizzas.length);
        const randomPizza = otherPizzas[randomIndex];
        const ingredientsStr = randomPizza.ingredients.join(', ');
        
        if (!options.includes(ingredientsStr)) {
            options.push(ingredientsStr);
        }
        
        otherPizzas.splice(randomIndex, 1);
    }
    
    shuffleArray(options);
    return options;
}

// Funzione per generare opzioni confusionarie (3 sbagliate con 1 ingrediente sostituito, 1 corretta)
function generateConfusingOptions(correctPizza, allPizzas) {
    const correctIngredients = [...correctPizza.ingredients];
    const options = [correctIngredients.join(', ')]; // Opzione corretta
    
    // Raccogli tutti gli ingredienti possibili
    const allIngredients = new Set();
    allPizzas.forEach(p => {
        p.ingredients.forEach(ing => allIngredients.add(ing));
    });
    const ingredientsArray = Array.from(allIngredients).filter(ing => 
        !correctIngredients.includes(ing) &&
        ing !== "specialità della casa" &&
        ing !== "specialità del pizzaiolo"
    );
    
    // Genera 3 opzioni sbagliate sostituendo un ingrediente casuale
    for (let i = 0; i < 3; i++) {
        const wrongIngredients = [...correctIngredients];
        const indexToReplace = Math.floor(Math.random() * wrongIngredients.length);
        const wrongIngredient = ingredientsArray[Math.floor(Math.random() * ingredientsArray.length)];
        wrongIngredients[indexToReplace] = wrongIngredient;
        options.push(wrongIngredients.join(', '));
    }
    
    shuffleArray(options);
    return options;
}

// Funzione per generare opzioni di nomi di pizze
function generatePizzaOptions(correctPizza, allPizzas) {
    const options = [correctPizza.name];
    
    // Filtra altre pizze
    const otherPizzas = allPizzas.filter(p => 
        p.name !== correctPizza.name &&
        !p.ingredients.includes("specialità della casa") &&
        !p.ingredients.includes("specialità del pizzaiolo")
    );
    
    // Aggiungi 3 opzioni sbagliate
    while (options.length < 4 && otherPizzas.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherPizzas.length);
        const randomPizza = otherPizzas[randomIndex];
        
        if (!options.includes(randomPizza.name)) {
            options.push(randomPizza.name);
        }
        
        otherPizzas.splice(randomIndex, 1);
    }
    
    shuffleArray(options);
    return options;
}

// Funzione per mescolare un array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Funzione per visualizzare una domanda
function displayQuestion() {
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    
    // Aggiorna il contatore e la barra di progresso
    questionCounter.textContent = `Domanda ${currentQuiz.currentQuestionIndex + 1} di ${currentQuiz.questions.length}`;
    const progress = ((currentQuiz.currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Aggiorna il punteggio
    scoreDisplay.textContent = `Punteggio: ${currentQuiz.score}`;
    
    // Mostra la domanda
    questionText.textContent = question.question;
    
    // Mostra le opzioni
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Nascondi il pulsante "Prossima Domanda"
    nextBtn.style.display = 'none';
    nextBtnMobile.style.display = 'none';
    
    // Avvia il timer
    startTimer();
}

// Funzione per avviare il timer
function startTimer() {
    timer.secondsLeft = timer.totalSeconds;
    
    // Se il timer è 0, non mostrare il timer
    if (timer.totalSeconds === 0) {
        timerText.textContent = '∞';
        timerProgress.style.strokeDashoffset = 0;
        return;
    }
    
    updateTimerDisplay();
    
    if (timer.interval) {
        clearInterval(timer.interval);
    }
    
    timer.interval = setInterval(() => {
        timer.secondsLeft--;
        updateTimerDisplay();
        
        if (timer.secondsLeft <= 0) {
            clearInterval(timer.interval);
            handleTimeOut();
        }
    }, 1000);
}

// Funzione per aggiornare la visualizzazione del timer
function updateTimerDisplay() {
    timerText.textContent = timer.secondsLeft;
    
    // Calcola il progresso del cerchio
    const progress = (timer.secondsLeft / timer.totalSeconds) * 283;
    timerProgress.style.strokeDashoffset = 283 - progress;
    
    // Cambia colore in base al tempo rimasto
    timerText.className = 'timer-text';
    timerProgress.className = 'timer-progress';
    
    if (timer.secondsLeft <= 3) {
        timerText.classList.add('danger');
        timerProgress.classList.add('danger');
    } else if (timer.secondsLeft <= 5) {
        timerText.classList.add('warning');
        timerProgress.classList.add('warning');
    }
}

// Funzione per gestire il timeout
function handleTimeOut() {
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    const options = optionsContainer.querySelectorAll('.option');
    
    // Disabilita tutte le opzioni
    options.forEach(option => {
        option.classList.add('disabled');
        option.style.pointerEvents = 'none';
    });
    
    // Trova e mostra la risposta corretta
    const correctIndex = question.options.indexOf(question.correctAnswer);
    options[correctIndex].classList.add('correct');
    
    // Salva la risposta come sbagliata
    currentQuiz.answers.push({
        question: question.question,
        userAnswer: '⏰ Tempo scaduto',
        correctAnswer: question.correctAnswer,
        isCorrect: false
    });
    
    // Passa automaticamente alla prossima domanda dopo 2 secondi
    setTimeout(() => {
        nextQuestion();
    }, 2000);
}

// Funzione per fermare il timer
function stopTimer() {
    if (timer.interval) {
        clearInterval(timer.interval);
        timer.interval = null;
    }
}

// Funzione per selezionare un'opzione
function selectOption(selectedIndex) {
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    const options = optionsContainer.querySelectorAll('.option');
    
    // Ferma il timer
    stopTimer();
    
    // Disabilita tutte le opzioni
    options.forEach(option => {
        option.classList.add('disabled');
        option.style.pointerEvents = 'none';
    });
    
    // Trova l'indice della risposta corretta
    const correctIndex = question.options.indexOf(question.correctAnswer);
    
    // Verifica se la risposta è corretta
    const isCorrect = selectedIndex === correctIndex;
    
    // Aggiungi le classi appropriate
    options[selectedIndex].classList.add(isCorrect ? 'correct' : 'incorrect');
    
    // Mostra sempre la risposta corretta se l'utente ha sbagliato
    if (!isCorrect) {
        options[correctIndex].classList.add('correct');
    }
    
    // Aggiorna il punteggio
    if (isCorrect) {
        currentQuiz.score++;
        scoreDisplay.textContent = `Punteggio: ${currentQuiz.score}`;
    }
    
    // Salva la risposta
    currentQuiz.answers.push({
        question: question.question,
        userAnswer: question.options[selectedIndex],
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect
    });
    
    // Mostra il pulsante "Prossima Domanda"
    nextBtn.style.display = 'flex';
    nextBtnMobile.style.display = 'block';
}

// Funzione per passare alla prossima domanda
function nextQuestion() {
    stopTimer();
    currentQuiz.currentQuestionIndex++;
    
    if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length) {
        displayQuestion();
    } else {
        currentQuiz.totalTime = Math.floor((Date.now() - currentQuiz.startTime) / 1000);
        showResults();
    }
}

// Funzione per mostrare i risultati
function showResults() {
    showScreen('results');
    
    const totalQuestions = currentQuiz.questions.length;
    const percentage = Math.round((currentQuiz.score / totalQuestions) * 100);
    
    finalScore.textContent = `${currentQuiz.score}/${totalQuestions}`;
    scorePercentage.textContent = `${percentage}%`;
    totalTimeDisplay.textContent = currentQuiz.totalTime;
    
    // Aggiorna il titolo della classifica
    const leaderboardTitle = document.getElementById('results-leaderboard-title');
    if (currentQuiz.mode === 'tournament') {
        leaderboardTitle.textContent = '🏆 Classifica Torneo';
    } else {
        leaderboardTitle.textContent = '⚙️ Sessione Custom';
    }
    
    // Salva il record
    const isNewRecord = saveRecord();
    
    // Mostra messaggio record
    if (isNewRecord) {
        recordMessage.textContent = '🎉 NUOVO RECORD! 🎉';
        recordMessage.className = 'record-message new-record';
    } else {
        const currentRecord = getBestRecord(currentQuiz.numQuestions, currentQuiz.category);
        if (currentRecord) {
            recordMessage.textContent = `Record attuale: ${currentRecord.score}/${totalQuestions} in ${currentRecord.time}s da ${currentRecord.player}`;
            recordMessage.className = 'record-message';
        } else {
            recordMessage.textContent = '';
        }
    }
    
    // Mostra la classifica
    displayLeaderboard();
    
    // Messaggio in base al punteggio
    let message = '';
    let messageClass = '';
    
    if (percentage >= 90) {
        message = '🌟 Eccellente! Sei un vero esperto delle pizze Desideria!';
        messageClass = 'excellent';
    } else if (percentage >= 70) {
        message = '👏 Molto bene! Conosci bene il menu!';
        messageClass = 'good';
    } else if (percentage >= 50) {
        message = '📚 Non male! Continua a studiare il menu!';
        messageClass = 'average';
    } else {
        message = '💪 Dai, riprova! Con un po\' di pratica migliorerai!';
        messageClass = 'poor';
    }
    
    scoreMessage.textContent = message;
    scoreMessage.className = `score-message ${messageClass}`;
    
    // Mostra il riepilogo delle risposte
    answersReview.innerHTML = '';
    currentQuiz.answers.forEach((answer, index) => {
        const answerItem = document.createElement('div');
        answerItem.className = `answer-item ${answer.isCorrect ? 'correct-answer' : 'incorrect-answer'}`;
        
        let answerHTML = `
            <div class="answer-item-question">${index + 1}. ${answer.question}</div>
            <div class="answer-item-response">
                ${answer.isCorrect ? '✅' : '❌'} La tua risposta: ${answer.userAnswer}
            </div>
        `;
        
        if (!answer.isCorrect) {
            answerHTML += `
                <div class="answer-item-correct">
                    ✓ Risposta corretta: ${answer.correctAnswer}
                </div>
            `;
        }
        
        answerItem.innerHTML = answerHTML;
        answersReview.appendChild(answerItem);
    });
}

// Funzione per salvare i record nel localStorage
function saveRecord() {
    const newRecord = {
        player: currentQuiz.playerName,
        score: currentQuiz.score,
        totalQuestions: currentQuiz.questions.length,
        time: currentQuiz.totalTime,
        date: new Date().toISOString(),
        category: currentQuiz.category,
        numQuestions: currentQuiz.numQuestions,
        mode: currentQuiz.mode
    };
    
    // Salva anche nei CSV
    saveToCSV(newRecord, currentQuiz.mode);
    
    if (currentQuiz.mode === 'tournament') {
        // Salva nei record torneo
        const tournamentRecords = getTournamentRecords();
        const categoryKey = currentQuiz.category;
        
        if (!tournamentRecords[categoryKey]) {
            tournamentRecords[categoryKey] = [];
        }
        
        tournamentRecords[categoryKey].push(newRecord);
        
        // Ordina per punteggio (decrescente) e poi per tempo (crescente)
        tournamentRecords[categoryKey].sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return a.time - b.time;
        });
        
        // Mantieni solo i top 10
        tournamentRecords[categoryKey] = tournamentRecords[categoryKey].slice(0, 10);
        
        localStorage.setItem('pizzaQuizTournamentRecords', JSON.stringify(tournamentRecords));
        
        // Controlla se è un nuovo record
        return tournamentRecords[categoryKey][0].player === newRecord.player && 
               tournamentRecords[categoryKey][0].date === newRecord.date;
    } else {
        // Salva nei record custom (cronologia)
        const customGames = getCustomGames();
        customGames.unshift(newRecord); // Aggiungi all'inizio
        
        // Mantieni solo le ultime 50 partite
        if (customGames.length > 50) {
            customGames.length = 50;
        }
        
        localStorage.setItem('pizzaQuizCustomGames', JSON.stringify(customGames));
        
        return false; // Custom non ha "record"
    }
}

// Funzione per ottenere tutti i record
function getRecords() {
    const recordsStr = localStorage.getItem('pizzaQuizRecords');
    return recordsStr ? JSON.parse(recordsStr) : {};
}

// Funzione per ottenere i record torneo
function getTournamentRecords() {
    const recordsStr = localStorage.getItem('pizzaQuizTournamentRecords');
    return recordsStr ? JSON.parse(recordsStr) : {};
}

// Funzione per ottenere le partite custom
function getCustomGames() {
    const gamesStr = localStorage.getItem('pizzaQuizCustomGames');
    return gamesStr ? JSON.parse(gamesStr) : [];
}

// Funzione per ottenere il miglior record per una categoria
function getBestRecord(numQuestions, category) {
    const records = getRecords();
    const quizKey = `${numQuestions}q_${category}`;
    
    if (records[quizKey] && records[quizKey].length > 0) {
        return records[quizKey][0];
    }
    return null;
}

// Funzione per visualizzare la classifica
function displayLeaderboard() {
    if (currentQuiz.mode === 'tournament') {
        const tournamentRecords = getTournamentRecords();
        const categoryKey = currentQuiz.category;
        const leaderboardData = tournamentRecords[categoryKey] || [];
        
        if (leaderboardData.length === 0) {
            leaderboard.innerHTML = '<p style="text-align: center; color: #999;">Nessun record ancora registrato.</p>';
            return;
        }
        
        leaderboard.innerHTML = '';
        leaderboardData.forEach((record, index) => {
            const item = document.createElement('div');
            item.className = `leaderboard-item ${index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : ''}`;
            
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
            const date = new Date(record.date).toLocaleDateString('it-IT');
            
            item.innerHTML = `
                <span class="leaderboard-rank">${medal}</span>
                <span class="leaderboard-name">${record.player}</span>
                <div class="leaderboard-stats">
                    <div class="leaderboard-score">${record.score}/${record.totalQuestions}</div>
                    <div>${record.time}s - ${date}</div>
                </div>
            `;
            
            leaderboard.appendChild(item);
        });
    } else {
        // Per custom, mostra un messaggio diverso
        leaderboard.innerHTML = '<p style="text-align: center; color: #667eea; font-weight: 600;">Modalità Custom - Allenamento completato! ✅</p>';
    }
}

// Funzione per scaricare i record come CSV
function downloadRecordsCSV() {
    const records = getRecords();
    let csv = 'Categoria,Numero Domande,Giocatore,Punteggio,Tempo (s),Data\n';
    
    Object.keys(records).forEach(key => {
        records[key].forEach(record => {
            const date = new Date(record.date).toLocaleString('it-IT');
            const categoryName = getCategoryName(record.category);
            csv += `"${categoryName}",${record.numQuestions},"${record.player}",${record.score}/${record.totalQuestions},${record.time},"${date}"\n`;
        });
    });
    
    // Crea il blob e scarica
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `quiz_pizze_desideria_record_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Funzione per condividere i risultati
function shareResults() {
    const totalQuestions = currentQuiz.questions.length;
    const percentage = Math.round((currentQuiz.score / totalQuestions) * 100);
    const categoryName = getCategoryName(currentQuiz.category);
    
    // Conta risposte corrette e sbagliate
    const correct = currentQuiz.score;
    const wrong = totalQuestions - currentQuiz.score;
    
    // Crea il testo da condividere
    let shareText = `🍕 Quiz Pizze Desideria 🍕\n\n`;
    shareText += `📊 Risultato:\n`;
    shareText += `✅ Risposte corrette: ${correct}/${totalQuestions}\n`;
    shareText += `❌ Risposte sbagliate: ${wrong}/${totalQuestions}\n`;
    shareText += `📈 Percentuale: ${percentage}%\n`;
    shareText += `⏱️ Tempo totale: ${currentQuiz.totalTime} secondi\n\n`;
    shareText += `🎯 Categoria: ${categoryName}\n`;
    shareText += `❓ Domande: ${totalQuestions}\n\n`;
    
    // Aggiungi emoji in base al risultato
    if (percentage >= 90) {
        shareText += `🌟 Eccellente! Esperto delle pizze!\n\n`;
    } else if (percentage >= 70) {
        shareText += `👏 Molto bene!\n\n`;
    } else if (percentage >= 50) {
        shareText += `📚 Buon tentativo!\n\n`;
    } else {
        shareText += `💪 Continua ad allenarti!\n\n`;
    }
    
    shareText += `Metti alla prova le tue abilità!\n`;
    shareText += `🔗 https://f3rryx.github.io/Desideria/`;
    
    // Copia negli appunti
    navigator.clipboard.writeText(shareText).then(() => {
        // Cambia temporaneamente il testo del pulsante
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = '✅ Copiato negli appunti!';
        shareBtn.style.background = '#28a745';
        
        setTimeout(() => {
            shareBtn.innerHTML = originalText;
            shareBtn.style.background = '';
        }, 2000);
    }).catch(err => {
        alert('Errore nella copia: ' + err);
    });
}

// Funzione per riprovare lo stesso quiz
function retryQuiz() {
    currentQuiz.currentQuestionIndex = 0;
    currentQuiz.score = 0;
    currentQuiz.answers = [];
    currentQuiz.startTime = Date.now();
    
    // Rigenera le domande
    currentQuiz.questions = generateQuestions(
        currentQuiz.category,
        currentQuiz.numQuestions,
        currentQuiz.questionType
    );
    
    showScreen('quiz');
    displayQuestion();
}

// Funzione per creare un nuovo quiz
function newQuiz() {
    stopTimer();
    displayTournamentLeaderboard(); // Aggiorna la classifica quando si torna alla home
    displayCustomGames(); // Aggiorna la cronologia custom
    showModeSelection(); // Mostra la selezione modalità
    showScreen('setup');
}

// Funzione per visualizzare la classifica nella home (migliori tempi per quiz perfetti)
function displayHomeLeaderboard() {
    const records = getRecords();
    const perfectRecords = [];
    
    // Trova tutti i record con punteggio perfetto (100%)
    Object.keys(records).forEach(key => {
        records[key].forEach(record => {
            if (record.score === record.totalQuestions) {
                perfectRecords.push({
                    ...record,
                    quizKey: key
                });
            }
        });
    });
    
    // Ordina per tempo (più veloce prima)
    perfectRecords.sort((a, b) => a.time - b.time);
    
    // Prendi solo i top 5
    const topRecords = perfectRecords.slice(0, 5);
    
    if (topRecords.length === 0) {
        homeLeaderboardContainer.innerHTML = '<p class="no-records">Nessun quiz perfetto completato ancora. Inizia a giocare!</p>';
        return;
    }
    
    homeLeaderboardContainer.innerHTML = '';
    topRecords.forEach((record, index) => {
        const item = document.createElement('div');
        item.className = `home-record-item ${index === 0 ? 'fastest' : ''}`;
        
        const medal = index === 0 ? '⚡' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
        const categoryName = getCategoryName(record.category);
        
        item.innerHTML = `
            <span style="font-size: 1.5rem; margin-right: 10px;">${medal}</span>
            <div class="home-record-config">
                <strong>${record.numQuestions} domande</strong> - ${categoryName}
            </div>
            <div class="home-record-stats">
                <div class="home-record-time">⏱️ ${record.time}s</div>
                <div class="home-record-player">${record.player}</div>
            </div>
        `;
        
        homeLeaderboardContainer.appendChild(item);
    });
}

// Funzione per visualizzare la classifica torneo
function displayTournamentLeaderboard() {
    const tournamentRecords = getTournamentRecords();
    const categoryRecords = tournamentRecords[selectedCategory] || [];
    
    if (categoryRecords.length === 0) {
        tournamentLeaderboardContainer.innerHTML = `<p class="no-records">Nessun torneo completato in questa categoria. Inizia a giocare!</p>`;
        return;
    }
    
    tournamentLeaderboardContainer.innerHTML = '';
    categoryRecords.forEach((record, index) => {
        const item = document.createElement('div');
        item.className = `leaderboard-item ${index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : ''}`;
        
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
        const date = new Date(record.date).toLocaleDateString('it-IT');
        const percentage = Math.round((record.score / record.totalQuestions) * 100);
        
        item.innerHTML = `
            <span class="leaderboard-rank">${medal}</span>
            <span class="leaderboard-name">${record.player}</span>
            <div class="leaderboard-stats">
                <div class="leaderboard-score">${record.score}/${record.totalQuestions} (${percentage}%)</div>
                <div>⏱️ ${record.time}s - ${date}</div>
            </div>
        `;
        
        tournamentLeaderboardContainer.appendChild(item);
    });
}

// Funzione per visualizzare le partite custom
function displayCustomGames() {
    const customGames = getCustomGames();
    
    if (customGames.length === 0) {
        customGamesContainer.innerHTML = '<p class="no-records">Nessuna partita custom ancora giocata. Inizia ad allenarti!</p>';
        return;
    }
    
    customGamesContainer.innerHTML = '';
    // Mostra solo le ultime 10
    const recentGames = customGames.slice(0, 10);
    
    recentGames.forEach(game => {
        const item = document.createElement('div');
        item.className = 'custom-game-item';
        
        const date = new Date(game.date).toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        const categoryName = getCategoryName(game.category);
        const percentage = Math.round((game.score / game.totalQuestions) * 100);
        
        item.innerHTML = `
            <div class="custom-game-info">
                <strong>${game.numQuestions} domande</strong> - ${categoryName}<br>
                <span style="font-size: 0.85rem; color: #888;">${game.player}</span>
            </div>
            <div class="custom-game-stats">
                <div class="custom-game-score">${game.score}/${game.totalQuestions} (${percentage}%)</div>
                <div class="custom-game-date">⏱️ ${game.time}s - ${date}</div>
            </div>
        `;
        
        customGamesContainer.appendChild(item);
    });
}

// Funzione per mostrare uno schermo
function showScreen(screen) {
    setupScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultsScreen.classList.remove('active');
    
    if (screen === 'setup') {
        setupScreen.classList.add('active');
    } else if (screen === 'quiz') {
        quizScreen.classList.add('active');
    } else if (screen === 'results') {
        resultsScreen.classList.add('active');
    }
}

// ========== CSV MANAGEMENT ==========

// Funzione per salvare nei file CSV
async function saveToCSV(record, mode) {
    try {
        const percentage = Math.round((record.score / record.totalQuestions) * 100);
        const timePerQuestion = record.totalQuestions > 0 ? 
            (record.time / record.totalQuestions).toFixed(2) : '0.00';
        
        const csvLine = `${record.player};${record.time};${record.score}/${record.totalQuestions};${percentage}%;${new Date(record.date).toLocaleString('it-IT')};${record.totalQuestions};${timePerQuestion}`;
        
        // Salva in Tutte.csv (tutte le partite)
        await appendToCSV('CSV/Tutte.csv', csvLine);
        
        if (mode === 'tournament') {
            // Per il torneo, controlla se è il miglior tempo
            const existingRecords = await loadCSV('CSV/Torneo.csv');
            const playerRecords = existingRecords.filter(r => r.Nome === record.player);
            
            if (playerRecords.length === 0) {
                // Nessun record esistente, salva questo
                await appendToCSV('CSV/Torneo.csv', csvLine);
            } else {
                // Controlla se questo tempo è migliore
                const bestTime = Math.min(...playerRecords.map(r => parseFloat(r.Tempo)));
                if (record.time < bestTime) {
                    // Nuovo record! Rimuovi il vecchio e aggiungi il nuovo
                    await replaceRecordInCSV('CSV/Torneo.csv', record.player, csvLine);
                }
            }
        } else {
            // Custom: salva tutte le partite
            await appendToCSV('CSV/Custom.csv', csvLine);
        }
    } catch (error) {
        console.error('Errore nel salvataggio CSV:', error);
    }
}

// Funzione per caricare un CSV
async function loadCSV(filename) {
    try {
        const response = await fetch(filename);
        const text = await response.text();
        const lines = text.trim().split('\n');
        
        if (lines.length <= 1) return []; // Solo header o vuoto
        
        const headers = lines[0].split(';');
        const records = [];
        
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(';');
            const record = {};
            headers.forEach((header, index) => {
                record[header] = values[index] || '';
            });
            records.push(record);
        }
        
        return records;
    } catch (error) {
        console.error('Errore nel caricamento CSV:', error);
        return [];
    }
}

// Funzione per aggiungere una riga al CSV
async function appendToCSV(filename, line) {
    // Nota: Questa è una simulazione - in un ambiente reale serve un backend
    // Per ora salviamo nel localStorage come backup
    const key = `csv_${filename}`;
    const existing = localStorage.getItem(key) || '';
    localStorage.setItem(key, existing + line + '\n');
    console.log(`Salvato in ${filename}:`, line);
}

// Funzione per sostituire un record nel CSV (per il torneo)
async function replaceRecordInCSV(filename, playerName, newLine) {
    const key = `csv_${filename}`;
    const existing = localStorage.getItem(key) || '';
    const lines = existing.split('\n').filter(l => l.trim());
    
    // Rimuovi tutte le righe del giocatore
    const filtered = lines.filter(line => !line.startsWith(playerName + ';'));
    
    // Aggiungi la nuova riga
    filtered.push(newLine);
    
    localStorage.setItem(key, filtered.join('\n') + '\n');
    console.log(`Aggiornato record in ${filename} per ${playerName}`);
}

// Funzione di ricerca
function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        alert('Inserisci un nome da cercare!');
        return;
    }
    
    searchResultsContainer.innerHTML = '<div class="loading">🔍 Ricerca in corso...</div>';
    
    setTimeout(() => {
        // Carica i dati da Tutte.csv (dal localStorage per ora)
        const allGamesKey = 'csv_CSV/Tutte.csv';
        const csvData = localStorage.getItem(allGamesKey) || '';
        
        if (!csvData) {
            searchResultsContainer.innerHTML = '<div class="no-results">Nessuna partita trovata nel database.</div>';
            return;
        }
        
        const lines = csvData.split('\n').filter(l => l.trim());
        const results = lines.filter(line => {
            const playerName = line.split(';')[0].toLowerCase();
            return playerName.includes(query);
        });
        
        if (results.length === 0) {
            searchResultsContainer.innerHTML = `<div class="no-results">Nessun risultato trovato per "${query}"</div>`;
            return;
        }
        
        displaySearchResults(results);
    }, 300);
}

// Funzione per visualizzare i risultati della ricerca
function displaySearchResults(results) {
    searchResultsContainer.innerHTML = '';
    
    results.forEach(line => {
        const parts = line.split(';');
        const [nome, tempo, corrette, percentuale, data, domande, tempoPerDomanda] = parts;
        
        // Determina se è torneo o custom (dal localStorage separato)
        const tournamentKey = 'csv_CSV/Torneo.csv';
        const tournamentData = localStorage.getItem(tournamentKey) || '';
        const isTournament = tournamentData.includes(line);
        
        const item = document.createElement('div');
        item.className = 'search-result-item';
        
        item.innerHTML = `
            <div class="search-result-header">
                <span class="search-result-name">${nome}</span>
                <span class="search-result-mode ${isTournament ? 'tournament' : 'custom'}">
                    ${isTournament ? '🏆 Torneo' : '⚙️ Custom'}
                </span>
            </div>
            <div class="search-result-stats">
                <span>📊 ${corrette} (${percentuale})</span>
                <span>⏱️ ${tempo}s</span>
                <span>📝 ${domande} domande</span>
                <span>📅 ${data}</span>
            </div>
        `;
        
        searchResultsContainer.appendChild(item);
    });
    
    const resultCount = document.createElement('p');
    resultCount.style.textAlign = 'center';
    resultCount.style.marginTop = '15px';
    resultCount.style.fontWeight = 'bold';
    resultCount.style.color = 'var(--button-primary-bg)';
    resultCount.textContent = `${results.length} risultat${results.length === 1 ? 'o' : 'i'} trovat${results.length === 1 ? 'o' : 'i'}`;
    searchResultsContainer.insertBefore(resultCount, searchResultsContainer.firstChild);
}

// Funzione per pulire la ricerca
function clearSearch() {
    searchInput.value = '';
    searchResultsContainer.innerHTML = '';
}

