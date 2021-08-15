import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";

const Transfer = ({ history, to, from, amount, setAmount, setTo, setFrom, handleTransfer, disable }) => {
  
  function isInteger(value)      
  {       
    num=value.trim()      
    return !(value.match(/\s/g)||num==""||isNaN(num)||(typeof(value)=='number')||((num.toString().includes('.'))))      
  }

  const handleSubmit = (e)=> {
    e.preventDefault();
    
    if(from && to && amount && parseInt(from)!==parseInt(to))
    {
      if(isInteger(amount) && isInteger(from) && isInteger(to))
      {
        handleTransfer()
      }
      else{
        alert("Invalid Input!!, Input Should be integer")
      }
    }
    else{
      alert("Invalid Input!!")
    }
    
  }
  
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
          <Text style={styles.title}>Transfer Amount</Text>
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
          <View style={styles.form}>
            <View style={styles.input_fields}>
              <Text
                style={{ lineHeight: 45, fontSize: 16, fontWeight: "bold" }}
              >
                From :
              </Text>
              <TextInput
                placeholder="Transfer From Acc. No."
                keyboardType="numeric"
                value={from}
                onChangeText={(text) => setFrom(text)}
                style={styles.input}
              />
            </View>
            <View style={styles.input_fields}>
              <Text
                style={{ lineHeight: 45, fontSize: 16, fontWeight: "bold" }}
              >
                To :
              </Text>
              <TextInput
                placeholder="Transfer To Acc. No."
                keyboardType="numeric"
                value={to}
                onChangeText={(text) => setTo(text)}
                style={styles.input}
              />
            </View>
            <View style={styles.input_fields}>
              <Text
                style={{ lineHeight: 45, fontSize: 16, fontWeight: "bold" }}
              >
                Amount :
              </Text>
              <TextInput
                placeholder="Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={(text) => setAmount(text)}
                style={styles.input}
              />
            </View>
            <Button title="Transfer" disabled={disable} onPress={handleSubmit} />
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
  form: {
    margin: 20,
    width: "90%",
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(43, 111, 243, 0.15)",
  },
  input: {
    padding: 5,
    borderColor: "rgba(43, 111, 243, 0.5)",
    borderWidth: 2,
    backgroundColor: "rgba(43, 111, 243, 0.2)",
    width: "70%",
  },
  input_fields: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Transfer;
