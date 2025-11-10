// Server Node.js per gestire il salvataggio CSV su GitHub
// Usa il token dal file .env in modo sicuro (non esposto al browser)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configurazione GitHub
const GITHUB_OWNER = 'F3rryX';
const GITHUB_REPO = 'Desideria';
const TOKEN = process.env.TOKEN; // Legge dal file .env

// Endpoint per salvare risultati nel CSV
app.post('/api/save-result', async (req, res) => {
    try {
        const { player_name, time, score, total, percentage, date, questions, time_per_question, mode } = req.body;

        // Valida i dati
        if (!player_name || !time || !score || !total || !percentage || !date || !questions || !time_per_question || !mode) {
            return res.status(400).json({ error: 'Dati mancanti' });
        }

        // Trigger GitHub Action
        const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/dispatches`, {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                'Authorization': `token ${TOKEN}`
            },
            body: JSON.stringify({
                event_type: 'save-quiz-result',
                client_payload: {
                    player_name,
                    time,
                    score,
                    total,
                    percentage,
                    date,
                    questions,
                    time_per_question,
                    mode
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('GitHub API error:', errorData);
            return res.status(response.status).json({ 
                error: `GitHub API error: ${response.status}`,
                details: errorData
            });
        }

        res.json({ success: true, message: 'Risultato salvato con successo!' });

    } catch (error) {
        console.error('Errore nel salvataggio:', error);
        res.status(500).json({ error: 'Errore interno del server', details: error.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server attivo' });
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`🚀 Server avviato su http://localhost:${PORT}`);
    console.log(`📝 Endpoint disponibile: POST /api/save-result`);
    console.log(`❤️  Health check: GET /api/health`);
    
    if (!TOKEN) {
        console.warn('⚠️  ATTENZIONE: TOKEN non trovato nel file .env');
    } else {
        console.log('✅ Token GitHub caricato correttamente');
    }
});
