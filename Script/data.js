// Database delle pizze
const pizzaDatabase = {
    classiche: [
        { name: "Marinara", ingredients: ["Pomodoro", "aglio", "origano"] },
        { name: "Capricciosa", ingredients: ["Pomodoro", "mozzarella", "prosciutto cotto", "funghi", "carciofini"] },
        { name: "Carciofi", ingredients: ["Pomodoro", "mozzarella", "carciofini"] },
        { name: "Funghi", ingredients: ["Pomodoro", "mozzarella", "funghi"] },
        { name: "Funghi freschi", ingredients: ["Pomodoro", "mozzarella", "funghi freschi"] },
        { name: "Funghi porcini", ingredients: ["Pomodoro", "mozzarella", "funghi porcini"] },
        { name: "Margherita", ingredients: ["Pomodoro", "mozzarella"] },
        { name: "Napoli", ingredients: ["Pomodoro", "mozzarella", "acciughe", "origano"] },
        { name: "Primavera", ingredients: ["Pomodoro", "mozzarella", "pomodoro a fette", "capperi", "acciughe", "origano"] },
        { name: "Prosciutto cotto", ingredients: ["Pomodoro", "mozzarella", "prosciutto cotto"] },
        { name: "Prosciutto cotto e funghi", ingredients: ["Pomodoro", "mozzarella", "prosciutto cotto", "funghi"] },
        { name: "Romana", ingredients: ["Pomodoro", "mozzarella", "acciughe", "capperi", "origano"] },
        { name: "Salsiccia", ingredients: ["Pomodoro", "mozzarella", "salsiccia"] },
        { name: "4 Formaggi", ingredients: ["Pomodoro", "mozzarella", "latteria"] },
        { name: "4 Stagioni", ingredients: ["Pomodoro", "mozzarella", "prosciutto cotto", "funghi", "carciofi"] },
        { name: "Asparagi", ingredients: ["Pomodoro", "mozzarella", "asparagi"] },
        { name: "Bresaola", ingredients: ["Pomodoro", "bufala", "bresaola", "rucola", "grana"] },
        { name: "Bufala", ingredients: ["Pomodoro", "bufala"] },
        { name: "Buffalo Bill", ingredients: ["Pomodoro", "mozzarella", "bufala", "pomodorini", "grana"] },
        { name: "Cipolla", ingredients: ["Pomodoro", "mozzarella", "cipolla"] },
        { name: "Così Così", ingredients: ["Pomodoro", "mozzarella", "gorgonzola", "peperoni", "broccoli", "pancetta affumicata", "wurstel", "salame piccante"] },
        { name: "Del Capo", ingredients: ["Pomodoro", "mozzarella", "salame piccante", "pancetta affumicata", "cipolla", "gorgonzola"] },
        { name: "Del Vecchio", ingredients: ["Pomodoro", "mozzarella", "salmone", "gamberetti"] },
        { name: "Delizia", ingredients: ["Pomodoro", "mozzarella", "salmone", "spinaci", "radicchio"] },
        { name: "Desideria", ingredients: ["Specialità della casa"] },
        { name: "Diavola", ingredients: ["Pomodoro", "mozzarella", "salame piccante"] },
        { name: "Gamberetti", ingredients: ["Pomodoro", "mozzarella", "gamberetti"] },
        { name: "Gorgonzola", ingredients: ["Pomodoro", "mozzarella", "gorgonzola"] },
        { name: "Marlon Brando", ingredients: ["Pomodoro", "mozzarella", "salame piccante", "pancetta affumicata", "prosciutto cotto", "spinaci", "gorgonzola"] },
        { name: "Mediterranea", ingredients: ["Pomodoro", "burrata", "melanzane", "funghi freschi", "pomodorini", "rucola"] },
        { name: "Melanzane", ingredients: ["Pomodoro", "mozzarella", "melanzane"] },
        { name: "Pancetta affumicata", ingredients: ["Pomodoro", "mozzarella", "pancetta affumicata"] },
        { name: "Pancetta arrotolata", ingredients: ["Pomodoro", "mozzarella", "pancetta arrotolata"] },
        { name: "Peperoni", ingredients: ["Pomodoro", "mozzarella", "peperoni"] },
        { name: "Pippo", ingredients: ["Specialità del Pizzaiolo"] },
        { name: "Prosciutto Crudo", ingredients: ["Pomodoro", "mozzarella", "prosciutto crudo"] },
        { name: "Pugliese", ingredients: ["Pomodoro", "mozzarella", "salame piccante", "cipolla"] },
        { name: "Rock", ingredients: ["Pomodoro", "mozzarella", "salame piccante", "pancetta affumicata", "spinaci", "gorgonzola"] },
        { name: "Salmone", ingredients: ["Pomodoro", "mozzarella", "salmone"] },
        { name: "Spinaci", ingredients: ["Pomodoro", "mozzarella", "spinaci"] },
        { name: "Stracchino", ingredients: ["Pomodoro", "mozzarella", "stracchino"] },
        { name: "Stria Angy", ingredients: ["Pancetta arrotolata", "spinaci", "funghi freschi", "scamorza", "crema di pistacchio"] },
        { name: "Tonno", ingredients: ["Pomodoro", "mozzarella", "tonno"] },
        { name: "Tonno e Cipolla", ingredients: ["Pomodoro", "mozzarella", "tonno", "cipolla"] },
        { name: "Verdure", ingredients: ["Pomodoro", "mozzarella", "verdure di stagione", "grana"] },
        { name: "Wurstel", ingredients: ["Pomodoro", "mozzarella", "wurstel"] }
    ],
    bianche: [
        { name: "5 Formaggi", ingredients: ["Mozzarella", "gorgonzola", "grana", "speck", "rucola"] },
        { name: "Blues", ingredients: ["Mozzarella", "pomodoro a fette", "melanzane", "acciughe", "origano"] },
        { name: "Cicciolina", ingredients: ["Mozzarella", "ciccioli", "gorgonzola", "grana"] },
        { name: "Crema di Asparagi", ingredients: ["Mozzarella", "asparagi", "gorgonzola", "grana"] },
        { name: "Crema di carciofi", ingredients: ["Mozzarella", "carciofi", "gorgonzola", "grana"] },
        { name: "Crema di Gamberetti", ingredients: ["Mozzarella", "gamberetti", "pomodorini", "rucola", "grana"] },
        { name: "Crema di Noci", ingredients: ["Mozzarella", "noci", "panna", "gorgonzola", "grana", "speck", "radicchio"] },
        { name: "Crema di Peperoni", ingredients: ["Mozzarella", "peperoni", "pancetta arrotolata", "gorgonzola", "grana"] },
        { name: "Crema di Pistacchio", ingredients: ["Mozzarella", "panna", "grana", "prosciutto cotto", "crema di pistacchio"] },
        { name: "Crema di Radicchio", ingredients: ["Mozzarella", "pancetta arrotolata", "radicchio", "gorgonzola", "grana", "glassa di aceto balsamico"] },
        { name: "Crema di Zucca", ingredients: ["Mozzarella", "zucca", "gorgonzola", "grana", "rucola"] },
        { name: "Friarielli", ingredients: ["Bufala", "friarielli", "salsiccia"] },
        { name: "Panna", ingredients: ["Mozzarella", "panna", "prosciutto cotto", "funghi freschi", "grana"] },
        { name: "Patacca", ingredients: ["Mozzarella", "pancetta arrotolata", "patate lesse", "grana"] },
        { name: "Porcini tartufata", ingredients: ["Mozzarella", "porcini", "crema di tartufo", "grana"] },
        { name: "Rucola", ingredients: ["Mozzarella", "gorgonzola", "stracchino", "grana", "rucola"] },
        { name: "Scamorza", ingredients: ["Mozzarella", "scamorza affumicata", "speck"] },
        { name: "Sitting Bull", ingredients: ["Bufala", "acciughe", "pelati", "origano"] },
        { name: "Vecchia Modena", ingredients: ["Mozzarella", "pancetta arrotolata", "grana", "glassa di aceto balsamico"] }
    ],
    calzoni: [
        { name: "Calzone", ingredients: ["Pomodoro", "mozzarella", "prosciutto cotto", "funghi"] },
        { name: "Calzone Farcito", ingredients: ["Pomodoro", "mozzarella", "prosciutto cotto", "funghi", "carciofi", "salsiccia"] }
    ]
};

// Funzione per ottenere tutte le pizze o per categoria
function getPizzas(category = 'all') {
    if (category === 'all') {
        return [
            ...pizzaDatabase.classiche,
            ...pizzaDatabase.bianche,
            ...pizzaDatabase.calzoni
        ];
    }
    return pizzaDatabase[category] || [];
}

// Funzione per ottenere il nome della categoria in italiano
function getCategoryName(category) {
    const names = {
        'classiche': 'Classiche',
        'bianche': 'Bianche',
        'calzoni': 'Calzoni',
        'all': 'Tutte le Pizze'
    };
    return names[category] || category;
}
