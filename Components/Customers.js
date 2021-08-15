import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

const Customers = ({ history, customersDetails, setCurrentCustomer }) => {

  const [loading, setLoading] = useState(false);
  const [customers, setCustomer] = useState([]);

  useEffect(() => {
    setCustomer(customersDetails);
    setLoading(true);
  }, [customersDetails]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome
          onPress={() => history.goBack()}
          name="reply"
          style={styles.icon}
        />
        <Image source={require("../logo.png")} style={styles.logo} />
        <Text style={styles.heading}>Banking System</Text>
      </View>

      <ScrollView style={styles.ScrollView}>
        <View style={styles.main}>
          <Text style={styles.title}>Customers Details</Text>
          <View
            style={{
              alignSelf: "stretch",
              borderBottomWidth: 4,
              borderBottomColor: "#000",
              marginTop: 10,
              marginBottom: 10,
              marginHorizontal: 20,
            }}
          />
          <View style={styles.table}>
            <View style={styles.table_header}>
              <Text style={styles.table_heading}>Acc. No.</Text>
              <Text style={styles.table_heading}>Acc. Holder</Text>
              <Text style={styles.table_heading}>Balance</Text>
            </View>
            <View
              style={{
                alignSelf: "stretch",
                borderBottomWidth: 3,
                borderBottomColor: "#000",
                marginTop: 10,
                marginBottom: 10,
                marginHorizontal: 8,
              }}
            />
            {!loading ? (
              <Image style={{width: 50, height: 50, alignSelf: "center", alignItems: "center"}} source={require('../loader.gif')}/>
            ):(
              customers.length < 0 ? (
              <View style={styles.table_row}>
                <Text style={(styles.table_heading, { alignSelf: "center" })}>
                  No Data
                </Text>
              </View>
            ) : (
              customers.map((customer) => {
                return (
                  <TouchableOpacity
                    key={customer._id}
                    onPress={() =>{
                      setCurrentCustomer(customer.Account_No)
                      history.push("/customer_details")
                    }}
                  >
                    <View style={styles.table_row}>
                      <Text
                        style={
                          (styles.table_data, { width: 30, lineHeight: 45 })
                        }
                      >
                        {customer.Account_No}
                      </Text>
                      <View style={styles.profile}>
                        <Image
                          style={styles.profile_img}
                          source={{ uri: customer.Profile }}
                        />
                        <Text style={styles.table_data}>
                          {customer.Account_Holder}
                        </Text>
                      </View>
                      <Text
                        style={
                          (styles.table_data, { width: 80, lineHeight: 45 })
                        }
                      >
                        ₹{customer.Balance}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignSelf: "stretch",
                        borderBottomWidth: 2,
                        borderBottomColor: "#000",
                        marginTop: 10,
                        marginBottom: 10,
                        marginHorizontal: 8,
                      }}
                    />
                  </TouchableOpacity>
                );
              })
            )
            )}

            
          </View>
        </View>
      </ScrollView>

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => history.push("/")}>
          <FontAwesome name="home" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => history.push("/customers_details")}>
          <FontAwesome name="users" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => history.push("/transfer")}>
          <FontAwesome name="rupee" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => history.push("/history")}>
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
  title: {
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "bold",
    fontFamily: "Roboto",
    alignItems: "center",
    textAlign: "center",
  },
  main: {
    marginTop: 10,
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
  table: {
    width: "90%",
    margin: 20,
    backgroundColor: "rgba(43, 111, 243, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 5,
  },
  table_header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(43, 111, 243, 0.51)",
    padding: 5,
  },
  table_heading: {
    fontSize: 16,
    fontWeight: "bold",
  },
  table_row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(43, 111, 243, 0.15)",
    padding: 5,
  },
  table_data: {
    fontSize: 16,
    marginHorizontal: 5,
    lineHeight: 45,
  },
  profile: {
    display: "flex",
    flexDirection: "row",
  },
  profile_img: {
    width: 50,
    height: 50,
    borderRadius: 77,
  },
});

export default Customers;
