import React, { useState } from "react";
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
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  signInWithRedirect,
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Loading } from "./loading";
import app from "../../../firebaseConnect";

const Registar = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isloading, setİSloading] = useState(false);
  const auth = getAuth(app);

  function reg(auth, email, password) {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("registared", user);
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setLoading(false);
        // ..
      });
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Geçersiz email").required("Gerekli"),
    password: Yup.string().required("Gerekli"),
  });

  const handleSubmit = (values) => {
    reg(auth, values.email, values.password);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
     <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <MaterialCommunityIcons name="notebook" size={50} color="white" />
            <View style={{marginLeft:12}} >
              <Text
                style={{ fontSize: 40, fontWeight: "bold", color: "white" }}
              >
                Planner
              </Text>
            </View>
          </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ width: "100%" }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Registar</Text>
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
              {loading ? (
                <Loading renk={"black"} />
              ) : (
                <Pressable onPress={handleSubmit} style={styles.Pressable}>
                  <Text style={{ color: "white", fontSize: 18 }}>Registar</Text>
                </Pressable>
              )}
              <Pressable
                onPress={() => navigation.navigate("auth")}
                style={styles.toggleTextContainer}
              >
                <Text style={styles.toggleText}>
                  Hesabın var mı ? Giriş yap
                </Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </ScrollView>
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
    backgroundColor: "#DBDBDB",

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

export default Registar;
