import React,{useContext, useEffect,useState} from "react";
import { WalletContext } from "../Context/WalletContext"; 
import CircularBar from "./CircularBar";
import { Table,TableContainer,Paper,TableHead ,TableRow,TableCell,TableBody, Button, Typography} from "@mui/material";
import web3 from "web3"
import { useNavigate } from "react-router-dom";

function TransactionList() {

  const {ethpricenow,transactionaccountList,transactionamountList,currentCampaignData} = useContext(WalletContext);
  
  console.log(transactionaccountList);
  console.log(transactionamountList);

  const style = {
    width : "90%",
    height : "80%",
    display : "flex",
    flexDirection : "column",
    gap : "20px"
  }

  if(true){
  return (<div style={style} >
  <div style={{
    display : "flex",
    justifyContent : "space-between"
  }}>
    <Typography variant="h5" style={{
      width : 500,
    }}>
     Total Sucessfull Transaction for {currentCampaignData[5]} 
    </Typography>
  </div>
  <TableContainer  sx={{boxShadow : 3}} component={Paper}>
  <Table   sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"> <Typography variant="body2" fontWeight={"bold"} >NO</Typography> </TableCell>
            <TableCell align="center"><Typography variant="body2" fontWeight={"bold"}>RECIEPENT ADDRESS</Typography></TableCell>
            <TableCell align="center"><Typography variant="body2" fontWeight={"bold"}>AMOUNT CONTRIBUTED</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionaccountList.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  align="center" component="th" scope="column">
                {index}
              </TableCell>
              <TableCell align="center">{row}</TableCell>
              <TableCell  align="center" scope="column"> <div>{web3.utils.fromWei(transactionamountList[index].toString())}</div> <div>   <Typography variant="body1"> {  Math.trunc(web3.utils.fromWei(transactionamountList[index].toString())*ethpricenow)}$</Typography> </div> </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
  </TableContainer>
  </div>);
  }

}

export default TransactionList;
