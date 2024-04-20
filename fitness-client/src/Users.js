import React, { useState, useEffect } from 'react';
import getUsers from './api/usersApi'; // Elérési út módosítása

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then(users => setUsers(users))
            .catch(error => console.error('Hiba:', error));
    }, []);

    return (
        <div>
            <h1>Felhasználók listája</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{`${user.first_name} ${user.last_name}`}</li>
                ))}
            </ul>
        </div>
    );
}

export default Users;