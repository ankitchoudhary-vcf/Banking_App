import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";

const CustomerDetails = ({
  history,
  currentCustomer,
  transactionDetails,
  customersDetails,
  setFrom
}) => {
  //loader
  const [customerLoader, setCustomerLoader] = useState(false);
  const [statementsLoader, setStatementsLoader] = useState(false);

  // Customer Details
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    function filteredCustomer(data) {
      return parseInt(data.Account_No) === parseInt(currentCustomer);
    }

    async function Customers() {
      var filtered = await customersDetails.filter(filteredCustomer);
      setCustomer(filtered);
      setCustomerLoader(true);
    }
    Customers();
  }, [customersDetails]);

  // Transaction Statements
  const [statements, setStatements] = useState([]);

  useEffect(() => {
    function FilterStatements(data) {
      return parseInt(data.Credited_by) === parseInt(currentCustomer);
    }

    async function Statements() {
      var filteredStatements = await transactionDetails.filter(
        FilterStatements
      );
      setStatements(filteredStatements);
      setStatementsLoader(true);
    }
    Statements();
  }, [transactionDetails]);

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
          <Text style={styles.title}>Customer Details</Text>
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
          {!customerLoader ? (
            <Image
              style={{
                width: 50,
                height: 50,
                alignSelf: "center",
                alignItems: "center",
              }}
              source={require("../loader.gif")}
            />
          ) : (
            customer.map((customer) => {
              return (
                <View key={customer._id} style={styles.customer}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: 10,
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={{ uri: customer.Profile }}
                      style={styles.profile_img}
                    />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: 2,
                      marginLeft: 10,
                      justifyContent: "flex-start",
                    }}
                  >
                    <FontAwesome name="user" style={{ fontSize: 30 }} />
                    <Text
                      style={{
                        lineHeight: 25,
                        fontWeight: "bold",
                        fontSize: 18,
                        marginLeft: 10,
                      }}
                    >
                      {customer.Account_Holder}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: 2,
                      marginLeft: 10,
                      justifyContent: "flex-start",
                    }}
                  >
                    <FontAwesome name="university" style={{ fontSize: 30 }} />
                    <Text
                      style={{
                        lineHeight: 25,
                        fontWeight: "bold",
                        fontSize: 18,
                        marginLeft: 10,
                      }}
                    >
                      {customer.Account_No}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: 2,
                      marginLeft: 10,
                      justifyContent: "flex-start",
                    }}
                  >
                    <FontAwesome name="envelope" style={{ fontSize: 30 }} />
                    <Text
                      style={{
                        lineHeight: 25,
                        fontWeight: "bold",
                        fontSize: 18,
                        marginLeft: 10,
                      }}
                    >
                      {customer.Email_Id}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: 2,
                      marginLeft: 10,
                      justifyContent: "flex-start",
                    }}
                  >
                    <FontAwesome name="money" style={{ fontSize: 30 }} />
                    <Text
                      style={{
                        lineHeight: 25,
                        fontWeight: "bold",
                        fontSize: 18,
                        marginLeft: 10,
                      }}
                    >
                      {customer.Balance}
                    </Text>
                  </View>
                  <Button style={{ marginTop: 10 }} title="Transfer Money" onPress={()=>{
                      setFrom((customer.Account_No).toString());
                      history.push('/transfer');
                  }} />
                </View>
              );
            })
          )}

          <Text style={styles.title}>Statements</Text>
          <View
            style={{
              alignSelf: "stretch",
              borderBottomWidth: 2,
              borderBottomColor: "#000",
              marginTop: 10,
              marginBottom: 10,
              marginHorizontal: 20,
            }}
          />

          <View style={styles.table}>
            <View style={styles.table_header}>
              <Text style={styles.table_heading}>Date</Text>
              <Text style={styles.table_heading}>Description</Text>
              <Text style={styles.table_heading}>Cr.</Text>
              <Text style={styles.table_heading}>Dr.</Text>
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

            {!statementsLoader ? (
              <Image
                style={{
                  width: 50,
                  height: 50,
                  alignSelf: "center",
                  alignItems: "center",
                }}
                source={require("../loader.gif")}
              />
            ) : (
              statements.map((statement) => {
                return (
                  <View key={statement._id}>
                    <View style={styles.table_row}>
                      <Text style={(styles.table_data, { width: 40 })}>
                        {statement.Created_on.slice(0, 10)}
                      </Text>
                      <Text style={(styles.table_data, { width: 80 })}>
                        {statement.Status === "Credited"
                          ? "Transferred to the account" + statement.Debated_to
                          : "Received from the account" + statement.Debated_to}
                      </Text>
                      <Text style={styles.table_data}>
                        {statement.Status === "Credited"
                          ? "₹" + statement.Amount
                          : "-"}
                      </Text>
                      <Text style={styles.table_data}>
                        {statement.Status === "Debited"
                          ? "₹" + statement.Amount
                          : "-"}
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
                  </View>
                );
              })
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
  profile_img: {
    width: 135,
    height: 135,
    borderRadius: 77,
  },
  customer: {
    width: "90%",
    margin: 20,
    backgroundColor: "rgba(43, 111, 243, 0.15)",
    marginBottom: 40,
    padding: 10,
  },
});

export default CustomerDetails;
