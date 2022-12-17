import React, { useState, useContext, useEffect } from "react";
import "../Styles/addwithdraw.css";
import { Button, Typography, Card, TextField,Backdrop,Alert,AlertTitle,CircularProgress } from "@mui/material";
import { WalletContext } from "../Context/WalletContext";
import { useNavigate } from "react-router-dom";

const style = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
};

const CardStyle = {
  width: "50%",
  height: "auto",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "30px",
  padding: "30px",
};

function Createrequest() {
  const url = window.location.href;
  console.log(url);
  const id = url.substring(url.lastIndexOf("/") + 1);
  console.log(id);

  const { Addtorequest,transactionprocess,setTransactionprocess } = useContext(WalletContext);
  const Navigate = useNavigate();
  const [description, setDescription] = useState();
  const [eth, setEth] = useState();
  const [walletaddress, setWalletaddress] = useState();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    console.log("Called handle close")
    setTransactionprocess(false);
    Navigate(`/withdraw/${id}`);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div style={style}>
      
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        {!transactionprocess ? (
          <CircularProgress />
        ) : (
          <div style={{}}>
            <Alert severity="success" fontSize="80">
              <AlertTitle>Request Added Sucessfully</AlertTitle>
            </Alert>
          </div>
        )}
      </Backdrop>

      <Typography sx={{ width: 0.5, fontWeight: "400" }} variant="h2">
        Make a Withdrawal Request
      </Typography>
      <Card sx={{ boxShadow: 4, borderRadius: 7 }} style={CardStyle}>
        <TextField
          required
          rows="4"
          sx={{ width: 0.8 }}
          label="Request Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></TextField>
        <TextField
          required
          sx={{ width: 0.8 }}
          label="Amount in ETH"
          onChange={(e) => {
            setEth(e.target.value);
          }}
        ></TextField>
        <TextField
          required
          sx={{ width: 0.8 }}
          label="WalletAddress"
          onChange={(e) => {
            setWalletaddress(e.target.value);
          }}
        ></TextField>
        <Button
          required
          onClick={() => {
            console.log(walletaddress)
            console.log({id,description,eth,walletaddress});
            Addtorequest(id, description, eth, walletaddress);
            handleToggle();
          }}
          sx={{ width: 0.8 }}
          variant="contained"
        >
          {" "}
          Make Request{" "}
        </Button>
      
      </Card>
    </div>
  );
}

export default Createrequest;
