# 🍕 Desideria Quiz - Server Setup

## Installazione

1. **Installa Node.js** (se non ce l'hai):
   - Scarica da https://nodejs.org/ (versione LTS)

2. **Installa le dipendenze**:
   ```bash
   npm install
   ```

3. **Verifica che il file `.env` contenga il token**:
   ```
   TOKEN=ghp_IL_TUO_TOKEN_QUI
   ```

## Avvio del Server

```bash
npm start
```

Il server si avvierà su `http://localhost:3000`

## Come Funziona

1. **Il browser** apre `index.html` e gioca al quiz
2. **Quando finisci**, JavaScript chiama `http://localhost:3000/api/save-result`
3. **Il server Node.js** usa il token dal `.env` per chiamare GitHub API in modo sicuro
4. **GitHub Actions** si attiva e aggiorna i CSV

## Vantaggi

✅ **Token sicuro**: Non più esposto nel codice JavaScript del browser  
✅ **Niente 401 errors**: Il server usa sempre il token valido dal `.env`  
✅ **Facile aggiornare**: Cambi il token solo nel file `.env`, non nel codice  
✅ **GitHub felice**: Niente più secret scanning che blocca i push  

## Endpoint Disponibili

- `POST /api/save-result` - Salva risultato quiz
- `GET /api/health` - Verifica che il server sia attivo

## Troubleshooting

**Errore "TOKEN non trovato"**:
- Verifica che il file `.env` esista e contenga `TOKEN=ghp_...`

**Errore "Cannot GET /"**:
- Normale! Il server non serve pagine HTML, solo API
- Apri `index.html` direttamente nel browser

**Errore di connessione dal browser**:
- Verifica che il server sia avviato con `npm start`
- Controlla che sia su `http://localhost:3000`
