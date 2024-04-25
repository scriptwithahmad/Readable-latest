// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.

importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyD0Du3JQRLti4WXfhaBeBCjYysfi8cDp1A",
  authDomain: "push-notifications-ab7de.firebaseapp.com",
  projectId: "push-notifications-ab7de",
  storageBucket: "push-notifications-ab7de.appspot.com",
  messagingSenderId: "796051376611",
  appId: "1:796051376611:web:5dcc1f3b504e1ac55f78d6",
  measurementId: "G-09LB5NQBGH",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
