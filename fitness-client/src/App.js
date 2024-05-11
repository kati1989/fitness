import React, { useState } from 'react';
import LoginForm from './LoginForm';
import UsersList from './UsersList';
import UserEdit from './UserEdit';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={!loggedIn ? <LoginForm onLogin={handleLogin} /> : <UsersList />} />
                <Route path="/userEdit" element={<UserEdit />} />
                <Route path="/usersList" element={<UsersList />} />
            </Routes>
        </Router>
    );
}

export default App;