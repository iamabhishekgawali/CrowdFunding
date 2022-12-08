import React,{useContext, useEffect,useState} from "react";
import { WalletContext } from "../Context/WalletContext"; 
import CircularBar from "./CircularBar";
import { Table,TableContainer,Paper,TableHead ,TableRow,TableCell,TableBody, Button, Typography} from "@mui/material";
import web3 from "web3"

function ShowWithdrawRequest({ id }) {

  const [spinner,setSpinner] = useState(true);
  const {ApproveRequest,withdrawrequestcount,Allwithdrawrequest,GetRequest,currentCampaignData,GetInstance} = useContext(WalletContext);
  console.log(id)
  console.log(withdrawrequestcount)
  console.log(Allwithdrawrequest)
  console.log(currentCampaignData);
  useEffect(()=>{
    GetRequest(id);
    GetInstance(id);
    setTimeout(()=>{
      setSpinner(false)
    },3000)
  },[])

  const style = {
    width : "80%",
    height : "80%",
    display : "flex",
    flexDirection : "column",
    gap : "20px"
  }

  if(!spinner){
  return (<div style={style} >
  <div style={{
    display : "flex",
    justifyContent : "space-between"
  }}>
    <Typography variant="h3" style={{
      width : 500,
    }}>
      Withdrawal Requests for {currentCampaignData[5]} 
    </Typography>
    <div>
    <Typography variant="h4" >Balance</Typography>
    <Typography variant="h5" >  {web3.utils.fromWei(currentCampaignData[1].toString())+ "ETH"}
      </Typography>
      </div>
  </div>
  <TableContainer  component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right"> <Typography variant="body2" fontWeight={"bold"} >DESCRIPTION</Typography> </TableCell>
            <TableCell align="right"><Typography variant="body2" fontWeight={"bold"}>AMOUNT</Typography></TableCell>
            <TableCell align="right"><Typography variant="body2" fontWeight={"bold"}>RECIEPENT ADDRESS</Typography></TableCell>
            <TableCell align="right"><Typography variant="body2" fontWeight={"bold"}>APPROVAL COUNT</Typography></TableCell>
            <TableCell align="right"><Typography variant="body2" fontWeight={"bold"}>APPROVE</Typography></TableCell>
            <TableCell align="right"><Typography variant="body2" fontWeight={"bold"}>FINALIZE</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Allwithdrawrequest.map((row,index) => (
            <TableRow
              key={row[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index}
              </TableCell>
              <TableCell align="right">{row[0]}</TableCell>
              <TableCell align="right">{web3.utils.fromWei(row[1].toString())}</TableCell>
              <TableCell align="right">{row[2]}</TableCell>
              <TableCell align="right">{row[4].toString()}/{withdrawrequestcount}</TableCell>
              <TableCell align="right">  <Button variant="contained" size="small" onClick={()=>{
                ApproveRequest(id,index);
              }}>Approve</Button> </TableCell>
              <TableCell align="right"> <Button variant="contained" size="small" >Finalize</Button>   </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  </TableContainer>
  </div>);
  }
  else
  {
    return (<CircularBar/>)
  }
}

export default ShowWithdrawRequest;
