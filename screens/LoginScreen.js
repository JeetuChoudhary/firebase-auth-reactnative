import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { KeyboardAvoidingView, TextInput, View } from "react-native";
import { auth } from "../firebase-config";
import { useNavigation } from "@react-navigation/native";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("value inside user", user);
        navigator.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        const user = userCred.user;
        console.log("value of User", user);
        console.log("User Email", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log("Signed In With Email", userCred.user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btns} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btns, styles.btnOutline]}
          onPress={handleSignUp}
        >
          <Text style={[styles.btnText, styles.btnTextOutline]}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  inputText: {
    marginTop: 10,
    borderRadius: 13,
    paddingVertical: 18,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    letterSpacing: 1.4,
    borderColor: "blue",
    borderWidth: 1,
  },
  buttonContainer: {
    width: "60%",
    marginTop: 20,
  },
  btns: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  btnOutline: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderColor: "blue",
    borderWidth: 2,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 1.5,
  },
  btnTextOutline: {
    color: "blue",
  },
});
