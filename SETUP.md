# 🔧 ISTRUZIONI CONFIGURAZIONE RAPIDA

## Setup Completo per il Salvataggio su GitHub

### PASSO 1: Crea il Personal Access Token

1. Vai su: https://github.com/settings/tokens
2. Clicca "Generate new token (classic)"
3. Nome: `Desideria Quiz`
4. Seleziona permessi:
   - ✅ `public_repo`
   - ✅ `workflow`
5. Clicca "Generate token"
6. **COPIA IL TOKEN!** (esempio: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### PASSO 2: Aggiungi il Secret al Repository

1. Vai su: https://github.com/F3rryX/Desideria/settings/secrets/actions
2. Clicca "New repository secret"
3. Name: `TOKENDESIDERIA`
4. Value: incolla il token copiato al passo 1
5. Clicca "Add secret"

### PASSO 3: Configura il Token nel Browser

1. Apri il quiz: https://f3rryx.github.io/Desideria/
2. Premi **F12** per aprire la console
3. Copia e incolla questo comando (sostituisci IL_TUO_TOKEN):

```javascript
configureGitHubToken('ghp_IL_TUO_TOKEN_QUI')
```

4. Premi INVIO
5. Verifica che sia configurato:

```javascript
checkGitHubToken()
```

### FATTO! ✅

Ora quando finisci un quiz:
- I risultati verranno salvati automaticamente su GitHub
- Verranno aggiornati i file CSV nel repository
- Potrai cercare i risultati di qualsiasi giocatore

---

## 🔍 Comandi Console Utili

### Verifica configurazione token
```javascript
checkGitHubToken()
```

### Configura token
```javascript
configureGitHubToken('ghp_IL_TUO_TOKEN')
```

### Rimuovi token
```javascript
localStorage.removeItem('github_token')
```

---

## 📂 Dove Vengono Salvati i Risultati

- **CSV/Tutte.csv** → Tutte le partite
- **CSV/Torneo.csv** → Solo migliori tempi torneo
- **CSV/Custom.csv** → Tutte le partite custom

Puoi vedere i file qui:
https://github.com/F3rryX/Desideria/tree/main/CSV

---

## ⚠️ Troubleshooting

### "Errore nel salvataggio dei risultati"
- Verifica che il token sia configurato: `checkGitHubToken()`
- Controlla che il secret TOKENDESIDERIA esista nel repository
- Verifica che il token abbia i permessi corretti (`public_repo` + `workflow`)

### "Token GitHub NON configurato"
- Riesegui il comando `configureGitHubToken('ghp_...')`
- Verifica di aver copiato tutto il token (inizia con `ghp_`)

### Il workflow non parte
- Controlla che il secret `TOKENDESIDERIA` sia configurato
- Vai su https://github.com/F3rryX/Desideria/actions e verifica gli errori
- Assicurati che il workflow file esista: `.github/workflows/save-quiz-results.yml`

---

## 🔒 Sicurezza

- ✅ Il token nel browser è salvato solo localmente (localStorage)
- ✅ Il token NON viene mai committato su GitHub
- ✅ Il secret TOKENDESIDERIA è criptato e sicuro
- ⚠️ NON condividere il tuo token con nessuno
- ⚠️ Se il token viene compromesso, eliminalo e creane uno nuovo

---

**Hai bisogno di aiuto? Contatta l'amministratore del repository.**
