import React, {useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Router, Switch, Route } from "react-router-native";
import createHistory from "history/createMemoryHistory";
import Home from "./Components/Home";
import Customers from "./Components/Customers";
import Transfer from "./Components/Transfer";
import TransferHistory from "./Components/TransferHistory";
import CustomerDetails from "./Components/CustomerDetails";
import axios from "axios";

const history = createHistory();


export default function App() {

  // loader
  const [customerLoader, setCustomerLoader]= useState(false);
  const [transactionLoader, setTransactionLoader]= useState(false);


  //customersDetails
  const [customersDetails, setCustomersDetails] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState('');

  //fetching the customersDetails
  useEffect(() => {
    async function fetchCustomersDetails() {
      try {
        const data = await axios.get(
          process.env.React_App_API_KEY+"/customers"
        );
        setCustomersDetails(data.data);
        setCustomerLoader(true);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCustomersDetails();
  }, [customersDetails]);

   //transactionDetails
   const [transactionDetails, setTransactionDetails] = useState([]);

   //fetching the transaction details
   useEffect(() => {
     async function fetchTransactionDetails() {
       try {
         const transactionData = await axios.get(
           process.env.React_App_API_KEY+"/transactions"
         );
         setTransactionDetails(transactionData.data);
         setTransactionLoader(true);
       } catch (err) {
         console.log(err);
       }
     }
     fetchTransactionDetails();
   }, [transactionDetails]);

   // transfer input
   const [from, setFrom] = useState('');
   const [to, setTo] = useState('');
   const [amount, setAmount] = useState('');
   const [disable, setDisable] = useState(false);

   // transfer handler
   const handleTransfer = async () => {
    setDisable(true);

     try{
       const checkfrom = await axios.get(process.env.React_App_API_KEY+`/customers/${parseInt(from)}`)
       
       if(checkfrom.data)
       {
         const checkto = await axios.get(process.env.React_App_API_KEY+`/customers/${parseInt(to)}`)
         
         if(checkto.data)
         {
           const data = {
             from: parseInt(from),
             to: parseInt(to),
             amount: parseInt(amount)
           }
          try {
            const transfer = await axios.put(
              process.env.React_App_API_KEY+`/customers/${data.from}&${data.to}`,
              {
                amount: data.amount,
              }
            );
            if (transfer.status === 200 && !transfer.data.message) {
              const response = await axios.post(
                process.env.React_App_API_KEY+"/transactions",
                data
              );
              if (response.status === 200) {
                alert(" Transfer Done Successfully !!");
              } else {
                alert(" Transfer Failed, Try again!!");
              }
            } else {
              alert(transfer.data.message + " !!");
            }
          } catch (err) {
            alert('Transaction Failed!!')
          }
          }
          else{
            alert('Please Enter Valid Account Number!!')
          }
        }
        else{
          alert('Please Enter Valid Account Number!!')
        }
    }
    catch(err){
      alert('Transaction Failed!!')
    }

    setFrom("");
    setTo("");
    setAmount("");
    setDisable(false);
  };
 

  return (
    <Router history={history}>
    {!customerLoader && !transactionLoader ? (
      <View style={styles.container}>
        <Image source={require('./logo.png')} style={{width: 335, height:335}}/>
        <Text style={{fontSize:48, fontWeight: 'bold'}}>Banking System</Text>
        <Image source={require('./loader.gif')} style={{width: 135, height:135}}/>
      </View>
    ):(
      <Switch>
        <Route exact path="/">
          <Home history={history}/>
        </Route>
        <Route exact path="/customers_details">
          <Customers history={history} customersDetails={customersDetails} setCurrentCustomer={setCurrentCustomer} />
        </Route>
        <Route exact path="/transfer">
          <Transfer history={history} setAmount={setAmount} setTo={setTo} setFrom={setFrom} to={to} from={from} amount={amount} handleTransfer={handleTransfer} disable={disable}/>
        </Route>
        <Route exact path="/history">
          <TransferHistory history={history} transactionDetails={transactionDetails} />
        </Route>
        <Route exact path="/customer_details">
          <CustomerDetails history={history} setFrom={setFrom} currentCustomer={currentCustomer} transactionDetails={transactionDetails} customersDetails={customersDetails} />
        </Route>
      </Switch>
    )}
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6DE3FD",
    alignItems: "center",
    justifyContent: "center",
  },
});