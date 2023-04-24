importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyCrzjrRQwmYbRke7Dkzqcp6ZZ945qeFfUg",
    authDomain: "mini2-fdd47.firebaseapp.com",
    projectId: "mini2-fdd47",
    storageBucket: "mini2-fdd47.appspot.com",
    messagingSenderId: "601657685204",
    appId: "1:601657685204:web:e7487007b5e0bc0949b741",
    measurementId: "G-6BSEGF3K4R"
});
const messaging = firebase.messaging();