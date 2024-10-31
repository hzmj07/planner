// AuthContext.js
import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const Login = async (userData) => {
        try {
            const jsonValue = JSON.stringify(userData);
            await AsyncStorage.setItem("userData", jsonValue);
            console.log("Veri başarıyla saklandı!");
            setLoading(false)
          } catch (e) {
            console.error("Veri saklanırken hata oluştu", e);
            setLoading(false)
          }
    };

    const logout = () => {
        setUser(null);
    };


    

    return (
        <AuthContext.Provider value={{ user, isLoading, Login, logout ,setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
