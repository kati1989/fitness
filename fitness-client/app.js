// Felhasználók megjelenítése az oldalon
document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('user-list');

    getUsers()
        .then(users => {
            users.forEach(user => {
                const listItem = document.createElement('li');
                listItem.textContent = `${user.first_name} ${user.last_name}`;
                userList.appendChild(listItem);
            });
        });
});
