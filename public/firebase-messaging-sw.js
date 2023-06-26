// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCU0xSooXc1mUjWqXbrb6NOP8mfOxrDbHY",
  authDomain: "pets-b05f2.firebaseapp.com",
  projectId: "pets-b05f2",
  storageBucket: "pets-b05f2.appspot.com",
  messagingSenderId: "110053211145",
  appId: "1:110053211145:web:a707126e86216bcc770cd8",
  measurementId: "G-F5TSGDDZCL",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
