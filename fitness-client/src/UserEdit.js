import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { updateUser } from './api/usersApi';
import { useNavigate } from 'react-router-dom';


function UserEdit({ user, onSave, onCancel }) {
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [birthDate, setBirthDate] = useState(new Date(user.birth_date));
    const navigate = useNavigate();

    const handleSave = () => {
        updateUser(user.id, firstName, lastName, birthDate.toISOString().slice(0, 10), (err) => {
            if (err) {
                console.error('Hiba történt a felhasználó adatainak mentése közben:', err);
                // Itt kezelheted a mentési hibát, például egy üzenet megjelenítésével a felhasználónak
                return;
            }
            onSave({
                ...user,
                first_name: firstName,
                last_name: lastName,
                birth_date: birthDate.toISOString().slice(0, 10)
            });
            navigate('/usersList') ; // Átirányítás a userList oldalra
        }).then(r =>            navigate('/usersList') // Átirányítás a userList oldalra
    );
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Szerkesztés</h1>
            <div style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }} className="p-field">
                    <label htmlFor="firstName">Vezetéknév</label>
                    <InputText id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div style={{ marginBottom: '10px' }} className="p-field">
                    <label htmlFor="lastName">Keresztnév</label>
                    <InputText id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div style={{ marginBottom: '10px' }} className="p-field">
                    <label htmlFor="birthDate">Születési dátum</label>
                    <Calendar id="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.value)} dateFormat="yy-mm-dd" />
                </div>
            </div>
            <Button onClick={handleSave} label="Mentés" />
            <Button onClick={onCancel} label="Mégse" className="p-button-secondary" />
        </div>
    );
}

export default UserEdit;
