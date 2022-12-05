import React from "react";
import { useEffect, useContext } from "react";
import { WalletContext } from "../Context/WalletContext";
import "../Styles/Showdetails.css";
import InputAdornment from "@mui/material/InputAdornment";
import web3 from "web3"
import { Link } from "react-router-dom"



import {
  Card,
  Typography,
  Box,
  LinearProgress,
  TextField,
  Button,
} from "@mui/material";
import "typeface-roboto-mono";
import { useState } from "react";
import CircularBar from "./CircularBar";

const sx = {
  boxShadow: 2,
};

export default function ShowDetails(currElem) {
  const [enteredAmount,setenteredAmount] = useState(0);
  const [spinner, setSpinner] = useState(true);
  const { GetInstance, currentCampaignData,Contribute,ethpricenow} = useContext(WalletContext);
  const url = window.location.href;
  console.log(url);
  const id = url.substring(url.lastIndexOf("/") + 1);
  console.log(id);
  useEffect(() => {
    GetInstance(id);
    setTimeout(() => {
      setSpinner(false);
    }, 5000);
  }, []);

  let MinAmount = null
  let CampaignBalance = null
  let target = null

  console.log(currentCampaignData)
  if(!spinner){
    MinAmount = web3.utils.fromWei(currentCampaignData[0].toString());
    CampaignBalance = web3.utils.fromWei(currentCampaignData[1].toString());
    target = web3.utils.fromWei(currentCampaignData[8].toString());
  }
  // Use this

  return spinner ? (
    <div className="Showdetailsspinner">
    <CircularBar></CircularBar>
    </div>
  ) : (
    <div className="Showdetails">
      <div className="Left">
        <div className="InnerLeft">
          <div className="ProjectTitle">
            <Typography variant="h3" gutterBottom>
              {currentCampaignData[5]}
            </Typography>
          </div>

          <div className="Description">
            <Box component="span" sx={{ display: "block" }}>
              <Typography variant="body2" gutterBottom>
                {currentCampaignData[6]}
              </Typography>
            </Box>
          </div>

          <div className="EtherScanLink">
            <Link
              href={`https://goerli.etherscan.io/address/${currentCampaignData[9]}`}
            >
              <Typography variant="body2" gutterBottom>
                View on Goerli Etherscan
              </Typography>
            </Link>
          </div>

          <div className="OuterCard">
            <Card sx={sx} className="InnerOuterCard">
              <div>
                <Typography variant="caption">Minimum Contribution</Typography>
              </div>
              <div>{MinAmount} ({ethpricenow*MinAmount}$)</div>
            </Card>
          </div>

          <div className="OuterCard">
            <Card sx={sx} className="InnerOuterCard">
              <div>
                <Typography variant="caption">Wallet Address</Typography>
              </div>
              <div>{currentCampaignData[4].toString()}</div>
            </Card>
          </div>

          <div className="OuterCard">
            <Card sx={sx} className="InnerOuterCard">
              <div>
                <Typography variant="caption">Number of Request</Typography>
              </div>
              <div>{currentCampaignData[2].toString()}</div>
            </Card>
          </div>

          <div className="OuterCard">
            <Card sx={sx} className="InnerOuterCard">
              <div>
                <Typography variant="caption">Number of Approval</Typography>
              </div>
              <div>{currentCampaignData[3].toString()}</div>
            </Card>
          </div>
        </div>
      </div>

      <div className="Right">
        <div className="InnerRight">
          <div className="OuterCard">
            <Card sx={sx} className="InnerOuterCard">
              <div>
                <Typography variant="caption">CampaignBalance</Typography>
              </div>
              <Typography variant="h6">
                {CampaignBalance} ({CampaignBalance*ethpricenow}$) ETH
              </Typography>
              <Typography variant="body">
                Target of {target} ({target*ethpricenow}$) ETH
              </Typography>
              <div className="ProgressBar">
                <LinearProgress variant="buffer" value={50} />
              </div>
            </Card>
          </div>

          <div className="OuterCard">
            <Card sx={sx} className="InnerOuterCard">
              <div className="ContributeNow">
                <Typography variant="h5">Contribute Now!</Typography>
              </div>

              <div className="EnterAmount">
                <Typography variant="body2">
                  Contribute the amount in ETH you want to send
                </Typography>
              </div>

              <div>
                <TextField
                onChange={(e)=>{
                  setenteredAmount(e.target.value)
                }}
                  className="Ethinput"
                  type={"number"}
                  label="Target to Achieve"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">ETH</InputAdornment>
                    ),
                  }}
                ></TextField>
              </div>

              <div className="contriButton">
                
                <Button variant="contained"  onClick={
                  (e)=>{
                    Contribute(id,enteredAmount.toString())
                  }
                }>
                  <Typography variant="button">Contribute</Typography>
                </Button>
                
              </div>
            </Card>
          </div>

          <div className="OuterCard">
            <Card sx={sx} className="InnerOuterCard">
              <div className="contriButton">
              <Link to={`/withdraw/${id}`}>
                <Button variant="contained">
                  <Typography variant="button">
                    Add a Withdrawal Request
                  </Typography>
                </Button>
              </Link>
              </div>
              <div className="LastNote">
                <Typography variant="body">
                  * You can see Where these funds are being used and if you have
                  contributed you can also approve those Withdrawal request :)
                </Typography>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
