import React, { useState } from 'react';
import LoginForm from './LoginForm';
import Users from './Users';

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
                <Users />
            )}
        </div>
    );
}

export default App;
