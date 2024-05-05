import React, { useState } from 'react';
import LoginForm from './LoginForm';
import UsersList from './UsersList';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    return (
        <div>
            {!loggedIn ? (
                <LoginForm onLogin={handleLogin} />
            ) : (
                <UsersList />
            )}
        </div>
    );
}

export default App;
