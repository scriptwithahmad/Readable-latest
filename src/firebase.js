import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD0Du3JQRLti4WXfhaBeBCjYysfi8cDp1A",
  authDomain: "push-notifications-ab7de.firebaseapp.com",
  projectId: "push-notifications-ab7de",
  storageBucket: "push-notifications-ab7de.appspot.com",
  messagingSenderId: "796051376611",
  appId: "1:796051376611:web:5dcc1f3b504e1ac55f78d6",
  measurementId: "G-09LB5NQBGH",
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BC4LB8TI3h7AFKw05kob5DEfffz7ji73B60KPvnFKvT8IvstdXw47rrsiDu5-3uCqK8GWDSyAYyPAac2IoPxAKE",
    });
    console.log(token);
  } else if (permission === "denied") {
    alert("you denied for the notificatiosn");
  }
};
