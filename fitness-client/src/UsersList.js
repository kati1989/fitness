import React, { useState, useEffect } from 'react';
import {getUsers} from "./api/usersApi";
import UserEdit from './UserEdit';

function UsersList() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        getUsers()
            .then(users => setUsers(users))
            .catch(error => console.error('Hiba:', error));
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    const handleSave = (updatedUser) => {
        // Itt lehetne a szerkesztett felhasználót menteni az API segítségével
        console.log('Mentés:', updatedUser);
        setEditingUser(null);
    };

    return (
        <div>
            {editingUser ? (
                <UserEdit
                    user={editingUser}
                    onSave={handleSave}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <div>
                    <h1>Felhasználók listája</h1>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                {`${user.first_name} ${user.last_name}`}
                                <button onClick={() => handleEdit(user)}>Szerkesztés</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UsersList;