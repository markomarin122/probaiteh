# Korisničko Uputstvo Za Projekat

Ovo je tvoje lokalno uputstvo koje sadrži sve bitne informacije za rad na projektu.

---

## 1. Kako Pokrenuti Projekat (Najbrži način)
Na tvom Desktopu ili u ovom folderu se nalazi fajl `start-project.bat`. 
- **Dvoklikni na njega.**
- On će sam otvoriti dva prozora: jedan za Backend (PHP) i jedan za Frontend (React).
- Kada se učitaju, sajt je dostupan na: **http://localhost:5173**

---

## 2. Rešavanje Greške "ERR_CONNECTION_REFUSED"
Ako vidiš ovu poruku u browseru, to znači da serveri nisu pokrenuti.
1. Zatvori sve crne prozore (terminale) koji su možda ostali otvoreni.
2. Ponovo pokreni `start-project.bat`.
3. Ako i dalje ne radi, uđi u VS Code terminal i kucaj:
   - `cd vehicle-rental-frontend` pa `npm run dev`
   - `cd vehicle-rental-backend` pa `php artisan serve`

---

## 3. Rad sa Git-om (Bitno!)
Pre nego što počneš da radiš na drugom uređaju:
1. `git pull` (da preuzmeš najnovije)
2. Uradi izmene.
3. `git add .`
4. `git commit -m "opis izmena"`
5. `git push` (da sačuvaš na GitHub)

---

## 4. Podešavanje baze (SQLite)
Ako na novom uređaju baza ne radi:
- Uđi u `vehicle-rental-backend/database`
- Ako nema fajla `database.sqlite`, napravi ga komandom: `type nul > database.sqlite`
- Pokreni migracije: `php artisan migrate --seed`

---

💡 **Napomena:** Ovo uputstvo nije na Git-u. Čuvaj ga lokalno.
