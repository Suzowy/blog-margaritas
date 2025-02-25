

// import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import 'react-quill/dist/quill.snow.css';

// Render the app
createRoot(document.getElementById('root')).render(
    <AuthProvider>
    <App />
</AuthProvider>);
