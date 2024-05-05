export async function getUsers() {
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

export async function updateUser(userId, firstName, lastName, birthDate) {
    try {
        const response = await fetch(`http://localhost:3001/api/users/update/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                birth_date: birthDate
            })
        });
        if (!response.ok) {
            throw new Error('Hiba a mentés során');
        }
        const updatedUser = await response.json();
        return updatedUser;
    } catch (error) {
        throw new Error('Hiba a mentés során');
    }
}


