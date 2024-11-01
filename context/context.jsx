// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebaseConnect";

export const AuthContext = createContext();

export const AuthProvider = ({ children , navigation }) => { // navigation kaldırıldı
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(false);

    function login(auth, email, password) {
        setLoading(true);
    
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            const data = {
               "email": email,
               "password": password,
               "uid": user.uid        
            };
            saveUserData(data);
    
            navigation.navigate("Homeonline");
            console.log("Logged in", user.uid);
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.error(errorMessage);
            setLoading(false);
          });
      }

    const getUserData = async () => { // navigation parametre olarak eklendi
        setLoading(true);
      
        try {
            const strData = await AsyncStorage.getItem("userData");
            const data = JSON.parse(strData);
            if (data && Object.keys(data).length > 0) {
                login(auth, data.email, data.password);
            }
            setLoading(false);
        } catch (e) {
            console.error("Hata oluştu", e);
            setLoading(false);
        }
    };

    const saveUserData = async (userData) => {
        try {
            const jsonValue = JSON.stringify(userData);
            await AsyncStorage.setItem("userData", jsonValue);
            console.log("Veri başarıyla saklandı!");
            setLoading(false);
        } catch (e) {
            console.error("Veri saklanırken hata oluştu", e);
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("İlk açılışta kullanıcı verilerini kontrol eder");
         getUserData(); // getUserData çağrısı
      }, []);

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, logout, setLoading, login, getUserData }}>
            {children}
        </AuthContext.Provider>
    );
};
