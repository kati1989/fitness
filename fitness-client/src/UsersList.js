import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
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
                    <DataTable value={users}>
                        <Column field="username" header="Felhasználónév" />
                        <Column field="first_name" header="Keresztnév" />
                        <Column field="last_name" header="Vezetéknév" />
                        <Column
                            header="Műveletek"
                            body={(rowData) => (
                                <button onClick={() => handleEdit(rowData)}>Szerkesztés</button>
                            )}
                        />
                    </DataTable>
                </div>
            )}
        </div>
    );
}

export default UsersList;
