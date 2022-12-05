import React,{useContext, useEffect,useState} from "react";
import { WalletContext } from "../Context/WalletContext"; 
import CircularBar from "./CircularBar";
import { List, ListItem } from "@mui/material";

function ShowWithdrawRequest({ id }) {

  const [spinner,setSpinner] = useState(true);
  const {withdrawrequestcount,Allwithdrawrequest,GetRequest} = useContext(WalletContext);
  console.log(id)
  console.log(withdrawrequestcount)
  console.log(Allwithdrawrequest)
  useEffect(()=>{
    GetRequest(id);
    setTimeout(()=>{
      setSpinner(false)
    },3000)
  },[])

  const style = {
    width : "80%",
    height : "80%",
    backgroundColor : "red"
  }

  if(!spinner){
  return (<div style={style} >
   <List>
    <ListItem>Hello world</ListItem>
    <ListItem>Hello world</ListItem>
    <ListItem>Hello world</ListItem>
    <ListItem>Hello world</ListItem>
   </List>
  </div>);
  }
  else
  {
    return (<CircularBar/>)
  }
}

export default ShowWithdrawRequest;
