// Database delle pizze
const pizzaDatabase = {
    // Pizze Classiche (Facili)
    classiche: [
        { nome: "Marinara", ingredienti: ["Pomodoro", "Aglio", "Origano"] },
        { nome: "Margherita", ingredienti: ["Pomodoro", "Mozzarella"] },
        { nome: "Capricciosa", ingredienti: ["Pomodoro", "Mozzarella", "Prosciutto cotto", "Funghi", "Carciofini"] },
        { nome: "4 Stagioni", ingredienti: ["Pomodoro", "Mozzarella", "Prosciutto cotto", "Funghi", "Carciofi"] },
        { nome: "4 Formaggi", ingredienti: ["Pomodoro", "Mozzarella", "Latteria"] },
        { nome: "Napoli", ingredienti: ["Pomodoro", "Mozzarella", "Acciughe", "Origano"] },
        { nome: "Diavola", ingredienti: ["Pomodoro", "Mozzarella", "Salame piccante"] },
        { nome: "Prosciutto cotto", ingredienti: ["Pomodoro", "Mozzarella", "Prosciutto cotto"] },
        { nome: "Funghi", ingredienti: ["Pomodoro", "Mozzarella", "Funghi"] },
        { nome: "Tonno", ingredienti: ["Pomodoro", "Mozzarella", "Tonno"] },
        { nome: "Bresaola", ingredienti: ["Pomodoro", "Bufala", "Bresaola", "Rucola", "Grana"] },
        { nome: "Bufala", ingredienti: ["Pomodoro", "Bufala"] },
        { nome: "Wurstel", ingredienti: ["Pomodoro", "Mozzarella", "Wurstel"] },
        { nome: "Prosciutto Crudo", ingredienti: ["Pomodoro", "Mozzarella", "Prosciutto crudo"] },
        { nome: "Salmone", ingredienti: ["Pomodoro", "Mozzarella", "Salmone"] }
    ],

    // Pizze Bianche (Medie)
    bianche: [
        { nome: "5 Formaggi", ingredienti: ["Mozzarella", "Gorgonzola", "Grana", "Speck", "Rucola"] },
        { nome: "Crema di Pistacchio", ingredienti: ["Mozzarella", "Panna", "Grana", "Prosciutto cotto", "Crema di pistacchio"] },
        { nome: "Panna", ingredienti: ["Mozzarella", "Panna", "Prosciutto cotto", "Funghi freschi", "Grana"] },
        { nome: "Friarielli", ingredienti: ["Bufala", "Friarielli", "Salsiccia"] },
        { nome: "Crema di Zucca", ingredienti: ["Mozzarella", "Zucca", "Gorgonzola", "Grana", "Rucola"] },
        { nome: "Crema di Noci", ingredienti: ["Mozzarella", "Noci", "Panna", "Gorgonzola", "Grana", "Speck", "Radicchio"] },
        { nome: "Rucola", ingredienti: ["Mozzarella", "Gorgonzola", "Stracchino", "Grana", "Rucola"] },
        { nome: "Porcini tartufata", ingredienti: ["Mozzarella", "Porcini", "Crema di tartufo", "Grana"] },
        { nome: "Scamorza", ingredienti: ["Mozzarella", "Scamorza affumicata", "Speck"] },
        { nome: "Sitting Bull", ingredienti: ["Bufala", "Acciughe", "Pelati", "Origano"] }
    ],

    // Pizze Difficili (Speciali)
    difficili: [
        { nome: "Desideria", ingredienti: ["Specialità della casa"] },
        { nome: "Pippo", ingredienti: ["Specialità del Pizzaiolo"] },
        { nome: "Stria Angy", ingredienti: ["Pancetta arrotolata", "Spinaci", "Funghi freschi", "Scamorza", "Crema di pistacchio"] },
        { nome: "Rock", ingredienti: ["Pomodoro", "Mozzarella", "Salame piccante", "Pancetta affumicata", "Spinaci", "Gorgonzola"] },
        { nome: "Mediterranea", ingredienti: ["Pomodoro", "Burrata", "Melanzane", "Funghi freschi", "Pomodorini", "Rucola"] },
        { nome: "Marlon Brando", ingredienti: ["Pomodoro", "Mozzarella", "Salame piccante", "Pancetta affumicata", "Prosciutto cotto", "Spinaci", "Gorgonzola"] },
        { nome: "Delizia", ingredienti: ["Pomodoro", "Mozzarella", "Salmone", "Spinaci", "Radicchio"] },
        { nome: "Del Capo", ingredienti: ["Pomodoro", "Mozzarella", "Salame piccante", "Pancetta affumicata", "Cipolla", "Gorgonzola"] },
        { nome: "Così Così", ingredienti: ["Pomodoro", "Mozzarella", "Gorgonzola", "Peperoni", "Broccoli", "Pancetta affumicata", "Wurstel", "Salame piccante"] },
        { nome: "Buffalo Bill", ingredienti: ["Pomodoro", "Mozzarella", "Bufala", "Pomodorini", "Grana"] }
    ],

    calzoni: [
        { nome: "Calzone", ingredienti: ["Pomodoro", "Mozzarella", "Prosciutto cotto", "Funghi"] },
        { nome: "Calzone Farcito", ingredienti: ["Pomodoro", "Mozzarella", "Prosciutto cotto", "Funghi", "Carciofi", "Salsiccia"] }
    ],

    // Bevande
    bevande: [
        { nome: "Birra Moretti 0,33 cl", tipo: "Birra", categoria: "bottiglia" },
        { nome: "Birra Moretti 0,66 cl", tipo: "Birra", categoria: "bottiglia" },
        { nome: "Birra Heineken 0,33 cl", tipo: "Birra", categoria: "bottiglia" },
        { nome: "Birra Icnusa 0,66 cl", tipo: "Birra", categoria: "bottiglia" },
        { nome: "Birra Moretti Bianca 0,33", tipo: "Birra", categoria: "bottiglia" },
        { nome: "Birra Waisse piccola", tipo: "Birra", categoria: "spina" },
        { nome: "Birra Waisse media", tipo: "Birra", categoria: "spina" },
        { nome: "Birra Bionda piccola", tipo: "Birra", categoria: "spina" },
        { nome: "Birra Bionda media", tipo: "Birra", categoria: "spina" },
        { nome: "Coca Cola", tipo: "Bibita", categoria: "lattina" },
        { nome: "Coca Cola Zero", tipo: "Bibita", categoria: "lattina" },
        { nome: "Fanta", tipo: "Bibita", categoria: "lattina" },
        { nome: "Sprite", tipo: "Bibita", categoria: "lattina" },
        { nome: "The al limone", tipo: "Bibita", categoria: "lattina" },
        { nome: "The alla pesca", tipo: "Bibita", categoria: "lattina" },
        { nome: "Pignoletto sfuso", tipo: "Vino", categoria: "spina" },
        { nome: "Sangiovese sfuso", tipo: "Vino", categoria: "spina" }
    ]
};

// Generatore di domande
const questionGenerator = {
    // Domande sugli ingredienti
    generateIngredientQuestion(pizza, difficulty) {
        const correctAnswer = pizza.ingredienti;
        const wrongIngredients = this.getWrongIngredients(correctAnswer, difficulty);
        
        return {
            type: 'ingredients',
            question: `Quali sono gli ingredienti della pizza ${pizza.nome}?`,
            correctAnswer: correctAnswer.join(", "),
            options: this.shuffleOptions([
                correctAnswer.join(", "),
                ...wrongIngredients
            ]),
            difficulty: difficulty
        };
    },

    // Domande trabocchetto - ingrediente mancante
    generateMissingIngredientQuestion(pizza, difficulty) {
        const allIngredients = pizza.ingredienti;
        if (allIngredients.length < 3) return null;
        
        const missingIndex = Math.floor(Math.random() * allIngredients.length);
        const missingIngredient = allIngredients[missingIndex];
        const wrongIngredients = this.getAllIngredients().filter(ing => !allIngredients.includes(ing));
        const randomWrongIngredient = wrongIngredients[Math.floor(Math.random() * wrongIngredients.length)];
        
        return {
            type: 'trick',
            question: `Quale ingrediente NON è presente nella pizza ${pizza.nome}?`,
            correctAnswer: randomWrongIngredient,
            options: this.shuffleOptions([
                randomWrongIngredient,
                ...allIngredients.slice(0, 3)
            ]),
            difficulty: difficulty,
            isTrick: true
        };
    },

    // Domande trabocchetto - contare ingredienti
    generateCountQuestion(pizza, difficulty) {
        const count = pizza.ingredienti.length;
        const wrongCounts = [count - 1, count + 1, count + 2].filter(c => c > 0);
        
        return {
            type: 'trick',
            question: `Quanti ingredienti ha la pizza ${pizza.nome}?`,
            correctAnswer: count.toString(),
            options: this.shuffleOptions([
                count.toString(),
                ...wrongCounts.slice(0, 3).map(c => c.toString())
            ]),
            difficulty: difficulty,
            isTrick: true
        };
    },

    // Domande trabocchetto - pizza con ingrediente
    generatePizzaWithIngredientQuestion(difficulty) {
        const allPizzas = this.getAllPizzasByDifficulty(difficulty);
        const randomIngredient = this.getAllIngredients()[Math.floor(Math.random() * this.getAllIngredients().length)];
        
        const pizzasWithIngredient = allPizzas.filter(p => 
            p.ingredienti.some(ing => ing.toLowerCase().includes(randomIngredient.toLowerCase()))
        );
        
        if (pizzasWithIngredient.length === 0) return null;
        
        const correctPizza = pizzasWithIngredient[Math.floor(Math.random() * pizzasWithIngredient.length)];
        const wrongPizzas = allPizzas.filter(p => p.nome !== correctPizza.nome).slice(0, 3);
        
        return {
            type: 'trick',
            question: `Quale di queste pizze contiene ${randomIngredient}?`,
            correctAnswer: correctPizza.nome,
            options: this.shuffleOptions([
                correctPizza.nome,
                ...wrongPizzas.map(p => p.nome)
            ]),
            difficulty: difficulty,
            isTrick: true
        };
    },

    // Domanda - nome dalla descrizione
    generateNameFromIngredientsQuestion(pizza, difficulty) {
        const otherPizzas = this.getAllPizzasByDifficulty(difficulty).filter(p => p.nome !== pizza.nome);
        const wrongOptions = otherPizzas.slice(0, 3).map(p => p.nome);
        
        return {
            type: 'name',
            question: `Come si chiama la pizza con questi ingredienti: ${pizza.ingredienti.join(", ")}?`,
            correctAnswer: pizza.nome,
            options: this.shuffleOptions([
                pizza.nome,
                ...wrongOptions
            ]),
            difficulty: difficulty
        };
    },

    // Helper functions
    getWrongIngredients(correctIngredients, difficulty) {
        const allIngredients = this.getAllIngredients();
        const wrongOptions = [];
        
        while (wrongOptions.length < 3) {
            const shuffled = this.shuffleArray([...allIngredients]);
            const option = shuffled.slice(0, correctIngredients.length).join(", ");
            if (option !== correctIngredients.join(", ") && !wrongOptions.includes(option)) {
                wrongOptions.push(option);
            }
        }
        
        return wrongOptions;
    },

    getAllIngredients() {
        const ingredients = new Set();
        // Solo pizze e calzoni (hanno ingredienti)
        const pizzaArrays = [
            pizzaDatabase.classiche,
            pizzaDatabase.bianche,
            pizzaDatabase.difficili,
            pizzaDatabase.calzoni
        ];
        
        pizzaArrays.forEach(pizzaArray => {
            pizzaArray.forEach(pizza => {
                if (pizza.ingredienti) {
                    pizza.ingredienti.forEach(ing => ingredients.add(ing));
                }
            });
        });
        
        return Array.from(ingredients);
    },

    getAllPizzasByDifficulty(difficulty) {
        switch(difficulty) {
            case 'easy': return pizzaDatabase.classiche;
            case 'medium': return pizzaDatabase.bianche;
            case 'hard': return pizzaDatabase.difficili;
            default: return [...pizzaDatabase.classiche, ...pizzaDatabase.bianche, ...pizzaDatabase.difficili];
        }
    },

    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },

    shuffleOptions(options) {
        return this.shuffleArray(options);
    },

    // Domande sulle bevande
    generateDrinkQuestion() {
        const questionTypes = ['tipo', 'categoria', 'esiste'];
        const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        const drink = pizzaDatabase.bevande[Math.floor(Math.random() * pizzaDatabase.bevande.length)];
        
        if (type === 'tipo') {
            // Che tipo di bevanda è?
            const wrongTypes = ['Birra', 'Bibita', 'Vino'].filter(t => t !== drink.tipo);
            return {
                type: 'drink',
                question: `Che tipo di bevanda è "${drink.nome}"?`,
                correctAnswer: drink.tipo,
                options: this.shuffleOptions([drink.tipo, ...wrongTypes]),
                difficulty: 'medium'
            };
        } else if (type === 'categoria') {
            // In che formato è disponibile?
            const categories = { bottiglia: 'Bottiglia', spina: 'Spina', lattina: 'Lattina' };
            const wrongCats = Object.values(categories).filter(c => c !== categories[drink.categoria]);
            return {
                type: 'drink',
                question: `In che formato è disponibile "${drink.nome}"?`,
                correctAnswer: categories[drink.categoria],
                options: this.shuffleOptions([categories[drink.categoria], ...wrongCats.slice(0, 2), 'Vetro']),
                difficulty: 'medium'
            };
        } else {
            // Domanda trabocchetto - esiste questa bevanda?
            const exists = Math.random() > 0.5;
            let drinkName;
            
            if (exists) {
                drinkName = drink.nome;
            } else {
                // Crea bevanda inesistente
                const fakeDrinks = ['Birra Corona', 'Pepsi', 'Fanta Uva', 'Birra Peroni', 'The verde'];
                drinkName = fakeDrinks[Math.floor(Math.random() * fakeDrinks.length)];
            }
            
            return {
                type: 'trick',
                question: `Questa bevanda è disponibile al ristorante: "${drinkName}"?`,
                correctAnswer: exists ? 'Sì' : 'No',
                options: this.shuffleOptions(['Sì', 'No']),
                difficulty: 'medium',
                isTrick: true
            };
        }
    }
};

// Funzione per generare un set di domande
function generateQuestions(config) {
    const questions = [];
    const { numQuestions, difficulties, includeCalzoni = false, includeDrinks = false, trickQuestionRatio = 0.3 } = config;
    
    // Determina quante domande per categoria
    let totalCategories = 0;
    if (difficulties.easy || difficulties.medium || difficulties.hard) totalCategories++;
    if (includeCalzoni) totalCategories++;
    if (includeDrinks) totalCategories++;
    
    const questionsPerCategory = Math.floor(numQuestions / totalCategories);
    
    // Determina quante domande per difficoltà pizze
    const pizzaQuestions = (difficulties.easy || difficulties.medium || difficulties.hard) ? questionsPerCategory : 0;
    const easyCount = difficulties.easy && pizzaQuestions > 0 ? Math.ceil(pizzaQuestions * 0.13) : 0;
    const mediumCount = difficulties.medium && pizzaQuestions > 0 ? Math.floor(pizzaQuestions * 0.33) : 0;
    const hardCount = difficulties.hard && pizzaQuestions > 0 ? (pizzaQuestions - easyCount - mediumCount) : 0;
    
    // Genera domande facili
    if (easyCount > 0) {
        const easyPizzas = questionGenerator.shuffleArray(pizzaDatabase.classiche);
        for (let i = 0; i < Math.min(easyCount, easyPizzas.length); i++) {
            const questionType = Math.random();
            if (questionType < 0.5) {
                questions.push(questionGenerator.generateIngredientQuestion(easyPizzas[i], 'easy'));
            } else {
                questions.push(questionGenerator.generateNameFromIngredientsQuestion(easyPizzas[i], 'easy'));
            }
        }
    }
    
    // Genera domande medie
    if (mediumCount > 0) {
        const mediumPizzas = questionGenerator.shuffleArray(pizzaDatabase.bianche);
        for (let i = 0; i < Math.min(mediumCount, mediumPizzas.length); i++) {
            const questionType = Math.random();
            const useTrick = Math.random() < trickQuestionRatio;
            
            if (useTrick) {
                const trickType = Math.random();
                if (trickType < 0.33) {
                    const q = questionGenerator.generateMissingIngredientQuestion(mediumPizzas[i], 'medium');
                    if (q) questions.push(q);
                } else if (trickType < 0.66) {
                    questions.push(questionGenerator.generateCountQuestion(mediumPizzas[i], 'medium'));
                } else {
                    const q = questionGenerator.generatePizzaWithIngredientQuestion('medium');
                    if (q) questions.push(q);
                }
            } else {
                if (questionType < 0.5) {
                    questions.push(questionGenerator.generateIngredientQuestion(mediumPizzas[i], 'medium'));
                } else {
                    questions.push(questionGenerator.generateNameFromIngredientsQuestion(mediumPizzas[i], 'medium'));
                }
            }
        }
    }
    
    // Genera domande difficili
    if (hardCount > 0) {
        const hardPizzas = questionGenerator.shuffleArray(pizzaDatabase.difficili);
        for (let i = 0; i < Math.min(hardCount, hardPizzas.length); i++) {
            const useTrick = Math.random() < trickQuestionRatio;
            
            if (useTrick) {
                const trickType = Math.random();
                if (trickType < 0.33) {
                    const q = questionGenerator.generateMissingIngredientQuestion(hardPizzas[i], 'hard');
                    if (q) questions.push(q);
                } else if (trickType < 0.66) {
                    questions.push(questionGenerator.generateCountQuestion(hardPizzas[i], 'hard'));
                } else {
                    const q = questionGenerator.generatePizzaWithIngredientQuestion('hard');
                    if (q) questions.push(q);
                }
            } else {
                const questionType = Math.random();
                if (questionType < 0.5) {
                    questions.push(questionGenerator.generateIngredientQuestion(hardPizzas[i], 'hard'));
                } else {
                    questions.push(questionGenerator.generateNameFromIngredientsQuestion(hardPizzas[i], 'hard'));
                }
            }
        }
    }
    
    // Genera domande calzoni
    if (includeCalzoni) {
        const calzoniQuestions = questionsPerCategory;
        const calzoni = questionGenerator.shuffleArray(pizzaDatabase.calzoni);
        for (let i = 0; i < Math.min(calzoniQuestions, calzoni.length * 2); i++) {
            const calzone = calzoni[i % calzoni.length];
            questions.push(questionGenerator.generateIngredientQuestion(calzone, 'medium'));
        }
    }
    
    // Genera domande bevande
    if (includeDrinks) {
        const drinkQuestions = questionsPerCategory;
        for (let i = 0; i < drinkQuestions; i++) {
            questions.push(questionGenerator.generateDrinkQuestion());
        }
    }
    
    // Completa con domande random se necessario
    while (questions.length < numQuestions) {
        const allPizzas = [...pizzaDatabase.classiche, ...pizzaDatabase.bianche, ...pizzaDatabase.difficili];
        const randomPizza = allPizzas[Math.floor(Math.random() * allPizzas.length)];
        questions.push(questionGenerator.generateIngredientQuestion(randomPizza, 'medium'));
    }
    
    return questionGenerator.shuffleArray(questions).slice(0, numQuestions);
}
