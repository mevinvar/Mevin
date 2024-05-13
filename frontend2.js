const React = require('react');
const { useEffect, useState } = React;
const io = require('socket.io-client');  

function App() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:3000');
        socket.on('notification', (message) => {
            setNotifications(prev => [...prev, message]);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ul>
                {notifications.map((note, index) => (
                    <li> key={index} &gt; {note.message} for address {note.addr}</li>
                ))}
            </ul>
        </div>
    );
}

module.exports = App; 
