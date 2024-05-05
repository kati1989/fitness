import React, { useState } from 'react';
import {updateUser} from './api/usersApi';

function UserEdit({ user, onSave, onCancel }) {
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [birthDate, setBirthDate] = useState(user.birth_date);

    const handleSave = () => {
        // Felhasználó módosított adatainak mentése az adatbázisban
        updateUser(user.id, firstName, lastName, birthDate, (err) => {
            if (err) {
                console.error('Hiba történt a felhasználó adatainak mentése közben:', err);
                // Itt kezelheted a mentési hibát, például egy üzenet megjelenítésével a felhasználónak
                return;
            }
            // Ha sikeres volt a mentés, akkor hívjuk meg a onSave függvényt, hogy értesítsük a szülő komponenst

        }).then(r =>  onSave({...user, first_name: firstName, last_name: lastName, birth_date: birthDate}));
    };

    return (
        <div>
            <h1>Szerkesztés</h1>
            <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
            />
            <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
            />
            <input
                type="date"
                value={birthDate ? birthDate.slice(0, 10) : ""}
                onChange={e => setBirthDate(e.target.value)}
            />
            <button onClick={handleSave}>Mentés</button>
            <button onClick={onCancel}>Mégse</button>
        </div>
    );
}

export default UserEdit;