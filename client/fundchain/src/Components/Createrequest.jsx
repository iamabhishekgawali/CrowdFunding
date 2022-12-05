import React, { useState, useContext } from "react";
import "../Styles/addwithdraw.css";
import { Button, Typography, Card, TextField } from "@mui/material";
import { WalletContext } from "../Context/WalletContext";
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

  const { Addtorequest } = useContext(WalletContext);

  const [description, setDescription] = useState();
  const [eth, setEth] = useState();
  const [walletaddress, setWalletaddress] = useState();

  return (
    <div style={style}>
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
            console.log({id,description,eth,walletaddress});
            Addtorequest(id, description, eth, walletaddress);
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
