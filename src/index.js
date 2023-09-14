import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(
      function(registration) {
        console.log('Service Worker 등록 성공:', registration.scope);
      },
      function(error) {
        console.log('Service Worker 등록 실패:', error);
      }
    );
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

