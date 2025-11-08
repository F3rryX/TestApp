// Variabili globali
let currentQuiz = {
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

// Elementi DOM
const setupScreen = document.getElementById('setup-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

const categorySelect = document.getElementById('category-select');
const numQuestionsInput = document.getElementById('num-questions');
const questionTypeSelect = document.getElementById('question-type');
const playerNameInput = document.getElementById('player-name');
const startBtn = document.getElementById('start-btn');

const timerText = document.getElementById('timer-text');
const timerProgress = document.getElementById('timer-progress');
const progressFill = document.getElementById('progress-fill');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');

const finalScore = document.getElementById('final-score');
const scorePercentage = document.getElementById('score-percentage');
const scoreMessage = document.getElementById('score-message');
const totalTimeDisplay = document.getElementById('total-time');
const recordMessage = document.getElementById('record-message');
const leaderboard = document.getElementById('leaderboard');
const answersReview = document.getElementById('answers-review');
const retryBtn = document.getElementById('retry-btn');
const newQuizBtn = document.getElementById('new-quiz-btn');
const downloadRecordsBtn = document.getElementById('download-records-btn');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
retryBtn.addEventListener('click', retryQuiz);
newQuizBtn.addEventListener('click', newQuiz);
downloadRecordsBtn.addEventListener('click', downloadRecordsCSV);

// Funzione per iniziare il quiz
function startQuiz() {
    currentQuiz.category = categorySelect.value;
    currentQuiz.numQuestions = parseInt(numQuestionsInput.value);
    currentQuiz.questionType = questionTypeSelect.value;
    currentQuiz.playerName = playerNameInput.value.trim() || 'Anonimo';
    currentQuiz.currentQuestionIndex = 0;
    currentQuiz.score = 0;
    currentQuiz.answers = [];
    currentQuiz.startTime = Date.now();

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
        if (pizza.ingredients.includes("Specialità della casa") || 
            pizza.ingredients.includes("Specialità del Pizzaiolo")) {
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
        !p.ingredients.includes("Specialità della casa") &&
        !p.ingredients.includes("Specialità del Pizzaiolo")
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
        ing !== "Specialità della casa" &&
        ing !== "Specialità del Pizzaiolo"
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
        !p.ingredients.includes("Specialità della casa") &&
        !p.ingredients.includes("Specialità del Pizzaiolo")
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
    
    // Avvia il timer
    startTimer();
}

// Funzione per avviare il timer
function startTimer() {
    timer.secondsLeft = 10;
    timer.totalSeconds = 10;
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
    nextBtn.style.display = 'block';
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
    const records = getRecords();
    const quizKey = `${currentQuiz.numQuestions}q_${currentQuiz.category}`;
    
    const newRecord = {
        player: currentQuiz.playerName,
        score: currentQuiz.score,
        totalQuestions: currentQuiz.questions.length,
        time: currentQuiz.totalTime,
        date: new Date().toISOString(),
        category: currentQuiz.category,
        numQuestions: currentQuiz.numQuestions
    };
    
    if (!records[quizKey]) {
        records[quizKey] = [];
    }
    
    records[quizKey].push(newRecord);
    
    // Ordina per punteggio (decrescente) e poi per tempo (crescente)
    records[quizKey].sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return a.time - b.time;
    });
    
    // Mantieni solo i top 10
    records[quizKey] = records[quizKey].slice(0, 10);
    
    localStorage.setItem('pizzaQuizRecords', JSON.stringify(records));
    
    // Controlla se è un nuovo record (prima posizione)
    return records[quizKey][0].player === newRecord.player && 
           records[quizKey][0].date === newRecord.date;
}

// Funzione per ottenere tutti i record
function getRecords() {
    const recordsStr = localStorage.getItem('pizzaQuizRecords');
    return recordsStr ? JSON.parse(recordsStr) : {};
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
    const records = getRecords();
    const quizKey = `${currentQuiz.numQuestions}q_${currentQuiz.category}`;
    const leaderboardData = records[quizKey] || [];
    
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
    showScreen('setup');
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
