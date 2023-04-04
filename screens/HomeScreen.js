import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
      .then((user) => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.emailContainer}>
        <Text style={styles.emailText}>
          SignedIn With: {auth.currentUser.email}
        </Text>
      </View>
      <View style={styles.signoutContainer}>
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={styles.btnText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emailContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    borderBottomWidth: 2,
    borderColor: "blue",
    borderRadius: 10,
  },
  emailText: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: 1.4,
  },
  signoutContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  btnText: {
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: 1.5,
  },
});
