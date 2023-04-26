import { initializeApp } from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const firebaseConfig = {
  apiKey: "AIzaSyBA1RFVmIhbPcoQkjx7M2QC1FweDKxrQIQ",
  authDomain: "interview-test-share-videos.firebaseapp.com",
  projectId: "interview-test-share-videos",
  storageBucket: "interview-test-share-videos.appspot.com",
  messagingSenderId: "290562148868",
  appId: "1:290562148868:web:9ddb3494a27a4a71a88351",
  databaseURL: "https://interview-test-share-videos-default-rtdb.asia-southeast1.firebasedatabase.app"
};
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App firebaseApp={app} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
