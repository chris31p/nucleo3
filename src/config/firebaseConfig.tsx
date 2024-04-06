import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import  ReactNativeAsyncStorage  from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBbCdk_MGQR1Qim6tn-8mOkY_YryWpiVcE",
  authDomain: "loginapp-3e58b.firebaseapp.com",
  projectId: "loginapp-3e58b",
  storageBucket: "loginapp-3e58b.appspot.com",
  messagingSenderId: "777830113981",
  appId: "1:777830113981:web:7ceb2a0646457c9f7ccdd4",
  databaseURL: "https://loginapp-3e58b-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const database = getDatabase(app);