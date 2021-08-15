import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

const Home = ({history}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../logo.png")} style={styles.logo} />
        <Text style={styles.heading}>Banking System</Text>
      </View>

      <ScrollView style={styles.ScrollView}>
        <Text style={styles.title}>Welcome to the Banking System</Text>
        <Image source={require("../bank.png")} style={styles.bank} />

        <View style={styles.menu}>
          <TouchableOpacity onPress={()=>history.push('/customers_details')} style={styles.customers}>
            <Image source={require("../user.jpg")} style={styles.image} />
            <Text style={styles.subtitle}>Customers Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.transfer} onPress={()=>history.push('/transfer')}>
            <Image source={require("../transfer.jpg")} style={styles.image} />
            <Text style={styles.subtitle}>Transfer Amount</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.navbar}>
        <TouchableOpacity onPress={()=>history.push('/')}>
          <FontAwesome name="home" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>history.push('/customers_details')}>
          <FontAwesome name="users" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>history.push('/transfer')}>
          <FontAwesome name="rupee" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>history.push('/history')}>
          <FontAwesome name="exchange" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6DE3FD",
    alignItems: "center",
    justifyContent: "center",
  },
  navbar: {
    backgroundColor: "rgba(43, 111, 243, 0.51)",
    width: "100%",
    height: "8%",
    position: "absolute",
    bottom: "0%",
    display: "flex",
    alignSelf: "baseline",
    flexDirection: "row",
    justifyContent: "space-evenly",
    zIndex: 3,
  },
  icon: {
    fontSize: 40,
    marginTop: 10,
  },
  header: {
    backgroundColor: "rgba(43, 111, 243, 0.51)",
    position: "absolute",
    top: 0,
    width: "100%",
    height: "12%",
    paddingTop: "5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    zIndex: 3,
  },
  heading: {
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "bold",
    fontFamily: "Roboto",
    lineHeight: 70,
  },
  logo: {
    width: 75,
    height: 75,
  },
  bank: {
    width: 374,
    height: 280,
    zIndex: -3,
  },
  title: {
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "bold",
    fontFamily: "Roboto",
    alignItems: "center",
    textAlign: "center",
  },
  menu: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 50,
  },
  ScrollView: {
    position: "absolute",
    height: "80%",
    width: "100%",
    margin: 20,
    alignSelf: "center",
    paddingTop: 50,
    bottom: 40,
  },
  image: {
    width: 139,
    height: 135,
    borderRadius: 70,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "bold",
    fontFamily: "Roboto",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Home;
