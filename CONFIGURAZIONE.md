# 🔧 Configurazione GitHub Token

Per permettere al quiz di salvare automaticamente i risultati sui file CSV della repository GitHub, è necessario configurare un **Personal Access Token**.

## 📝 Passi per la configurazione:

### 1. Crea un Personal Access Token su GitHub

1. Vai su [GitHub.com](https://github.com)
2. Clicca sulla tua foto profilo in alto a destra → **Settings**
3. Scorri in basso e clicca su **Developer settings** (nel menu a sinistra)
4. Clicca su **Personal access tokens** → **Tokens (classic)**
5. Clicca su **Generate new token** → **Generate new token (classic)**
6. Dai un nome al token (es: "Desideria Quiz")
7. Seleziona i seguenti permessi:
   - ✅ **repo** (seleziona tutti i sotto-permessi)
8. Clicca su **Generate token**
9. **COPIA IL TOKEN** (lo vedrai solo una volta!)

### 2. Inserisci il token nel codice

1. Apri il file `Script/script.js`
2. Cerca questa riga all'inizio del file:
   ```javascript
   const GITHUB_TOKEN = 'TUO_TOKEN_QUI'; // ← INSERISCI IL TUO TOKEN QUI
   ```
3. Sostituisci `'TUO_TOKEN_QUI'` con il token che hai copiato:
   ```javascript
   const GITHUB_TOKEN = 'ghp_tuoTokenCopiato'; // ← Il tuo token
   ```
4. Salva il file

### 3. Fai il commit e push

```bash
git add Script/script.js
git commit -m "Configure GitHub token"
git push
```

## ✅ Verifica che funzioni

1. Apri il quiz dal browser
2. Completa una partita
3. Controlla che appaia il messaggio: **"✅ Risultati salvati con successo su GitHub!"**
4. Verifica che i file CSV nella repository si siano aggiornati:
   - `CSV/Tutte.csv` - Tutte le partite
   - `CSV/Torneo.csv` - Migliori tempi torneo
   - `CSV/Custom.csv` - Tutte le partite custom

## ⚠️ Sicurezza

**IMPORTANTE**: Il token è sensibile! Non condividerlo mai pubblicamente.

Se il repository è pubblico, considera di:
- Usare un backend server invece di esporre il token
- Oppure mantenere il token in un file separato non tracciato da git

## 🔍 Troubleshooting

### "Failed to load resource: the server responded with a status of 401"
- Il token non è valido o è scaduto
- Genera un nuovo token e aggiornalo nel codice

### "Impossibile salvare su GitHub, salvato solo localmente"
- Controlla che il token sia correttamente configurato
- Verifica che il token abbia i permessi `repo`
- Controlla la connessione internet

### I file CSV non si aggiornano
- Aspetta qualche secondo (GitHub può impiegare un attimo)
- Ricarica la pagina della repository
- Controlla la console del browser per errori (F12)
