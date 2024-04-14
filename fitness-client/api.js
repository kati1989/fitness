// Felhasználók lekérdezése az API-ról
function getUsers() {
    return fetch('http://localhost:3000/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Hiba a lekérdezés során');
            }
            return response.json();
        })
        .catch(error => console.error('Hiba:', error));
}