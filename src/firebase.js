import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBA1RFVmIhbPcoQkjx7M2QC1FweDKxrQIQ",
  authDomain: "interview-test-share-videos.firebaseapp.com",
  projectId: "interview-test-share-videos",
  storageBucket: "interview-test-share-videos.appspot.com",
  messagingSenderId: "290562148868",
  appId: "1:290562148868:web:9ddb3494a27a4a71a88351",
  databaseURL: "https://interview-test-share-videos-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const firebaseApp = initializeApp(firebaseConfig);


export default firebaseApp;