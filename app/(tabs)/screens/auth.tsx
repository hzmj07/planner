import React, { useState ,useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import {AuthContext} from "../../../context/context"


import app from "../../../firebaseConnect";
import {
  signInWithRedirect,
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Loading } from "./loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = ({ navigation }) => {


  const auth = getAuth(app);

  const { user, isLoading , Login, logout , setLoading } = useContext(AuthContext);


  function login(auth, email, password, navigation) {
    setLoading(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Login(user);

  
        
        navigation.navigate("Homeonline");
        
        console.log("loging in", user.uid);
        //  addUser(email , password);
        
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        setLoading(false)
        
      });
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Geçersiz email").required("Gerekli"),
    password: Yup.string().required("Gerekli"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    login(auth, values.email, values.password, navigation);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
     {isLoading ? <View style={{flex:1 , alignItems:"center" , justifyContent:"center" }} ><Loading renk={"white"} /></View>:<View style={{flex:1}} >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>
            Planner
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

    

        <View style={{ width: "100%" }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>LOGİN</Text>
        </View>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Şifre"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              

              {isLoading ? <Loading renk={"black"}/> : <Pressable onPress={handleSubmit} style={styles.Pressable}>
                <Text style={{ color: "white", fontSize: 18 }}>Login</Text>
              </Pressable>}
              <Pressable
                onPress={() => navigation.navigate("registar")}
                style={styles.toggleTextContainer}
              >
                <Text style={styles.toggleText}>Hesabınız yoksa oluştur</Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </ScrollView>

      </View>
      }
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#00204C",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#f0f4f8",
  },
  formContainer: {
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "#007bff",
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  toggleTextContainer: {
    marginTop: 15,
  },
  toggleText: {
    color: "#007bff",
    fontSize: 16,
  },
  Pressable: {
    borderWidth: 1,
    height: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00204C",
  },
});

export default App;
