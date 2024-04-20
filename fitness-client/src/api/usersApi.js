async function getUsers() {
    try {
        const response = await fetch('http://localhost:3001/api/users');
        if (!response.ok) {
            throw new Error('Hiba a lekérdezés során');
        }
        const users = await response.json();
        return users;
    } catch (error) {
        throw new Error('Hiba a lekérdezés során');
    }
}

export default getUsers;
