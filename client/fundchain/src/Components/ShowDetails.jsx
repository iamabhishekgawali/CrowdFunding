import React from "react";
import { useEffect, useContext } from "react";
import { WalletContext } from "../Context/WalletContext";
import "../Styles/Showdetails.css";
import InputAdornment from "@mui/material/InputAdornment";
import web3 from "web3";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import TransactionList from "./TransactionList";

import {
  Card,
  Typography,
  Box,
  LinearProgress,
  TextField,
  Button,
  Alert,
  Backdrop,
  CircularProgress,
  Modal,
  AlertTitle,
} from "@mui/material";
import "typeface-roboto-mono";
import { useState } from "react";
import CircularBar from "./CircularBar";

const sx = {
  boxShadow: 2,
};

export default function ShowDetails(currElem) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setTransactionprocess(false);
    window.location.reload(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const TempHandleToggle = ()=>{
    setOpen(!open);
    refundHandleClose();
  }

  const [refundopen, setrefundOpen] = useState(false);

  const refundHandleClose = () => {
    setrefundOpen(!refundopen);
  };

  const refundHandleToggle = () => {
    setrefundOpen(!refundopen);
  };

  const [enteredAmount, setenteredAmount] = useState(0);
  const [spinner, setSpinner] = useState(true);
  const {
    transactionprocess,
    GetInstance,
    currentCampaignData,
    Contribute,
    ethpricenow,
    setTransactionprocess,
    DaysDifferenceCalculator,
    FindStatus,
    getRefund,
    refundStatus,
    getRefundTransaction,
    connectedAccountrefundstatus,
    GetcompleteStatus,
    GetFailedStatus,
    campaignstatus,
    failstatus
  } = useContext(WalletContext);
  const url = window.location.href;
  console.log(url);
  const id = url.substring(url.lastIndexOf("/") + 1);
  console.log(id);

  useEffect(() => {
    GetInstance(id);
    GetcompleteStatus(id);
    GetFailedStatus(id);
    setTimeout(() => {
      setSpinner(false);
    }, 5000);
  }, []);

  let MinAmount = null;
  let CampaignBalance = null;
  let target = null;
  let percent = 10;

  if (spinner == false) {
    const a = web3.utils.fromWei(currentCampaignData[8].toString());
    const b = web3.utils.fromWei(currentCampaignData[1].toString());
    console.log(a);
    console.log(b);
    percent = (b / a) * 100;
    console.log(percent);

    
  }

  console.log("---- currentCampaignData --- ")
  console.log(currentCampaignData);
  if (!spinner) {
    MinAmount = web3.utils.fromWei(currentCampaignData[0].toString());
    CampaignBalance = web3.utils.fromWei(currentCampaignData[1].toString());
    target = web3.utils.fromWei(currentCampaignData[8].toString());
  }

  const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setTransactionprocess(false);
  }, []);

  if (transactionprocess) {
    setTimeout(() => {
      setTransactionprocess(false);
      window.location.reload(false);
    }, 4000);
  }

  return spinner ? (
    <div className="Showdetailsspinner">
      <CircularBar></CircularBar>
    </div>
  ) : (
    <div
      style={{
        height: "auto",
        minHeight: "100%",
        weight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "50px",
        padding: "10px",
        paddingBottom: "10%",
        boxShadow: 3,
        borderRadius: 10,
      }}
    >
      <div className="Showdetails">
        <Modal open={refundopen} onClose={refundHandleClose}>
          <Card sx={style}>
            <div>
              <Card sx={sx} className="InnerOuterCard">
                <div>
                  <Typography variant="caption">Wallet Address</Typography>
                </div>
                <div>{refundStatus.address}</div>
              </Card>
            </div>

            <div>
              <Card sx={sx} className="InnerOuterCard">
                <div>
                  <Typography variant="caption">Amount</Typography>
                </div>
                <div>{refundStatus.amount}</div>
              </Card>
            </div>

            <div>
              <Card sx={sx} className="InnerOuterCard">
                <div>
                  <Typography variant="caption">Status</Typography>
                </div>
                <div>{refundStatus.status}</div>
              </Card>
            </div>
            <Button
              disabled={connectedAccountrefundstatus ? true : false}
              variant="outlined"
              onClick={() => {
                getRefundTransaction(id, refundStatus.index);
                TempHandleToggle();
              }}
            >
              Get Refund
            </Button>
          </Card>
        </Modal>
        {transactionprocess && (
          <Confetti
            style={{
              zIndex: "99999",
            }}
          ></Confetti>
        )}
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
                <AlertTitle> Transaction sucessfully completed</AlertTitle>
              </Alert>
            </div>
          )}
        </Backdrop>
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
              <div style={{}}>
                <a
                  target="_blank"
                  href={`https://goerli.etherscan.io/address/${currentCampaignData[9]}`}
                >
                  <Typography sx={{ color: "grey" }} variant="body2">
                    View on Goerli Etherscan
                  </Typography>
                </a>
              </div>
            </div>

            <div className="OuterCard">
              <Card sx={sx} className="InnerOuterCard">
                <div>
                  <Typography variant="caption">
                    Minimum Contribution
                  </Typography>
                </div>
                <div>
                  {MinAmount} ({ethpricenow * MinAmount}$)
                </div>
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

            { campaignstatus ? (
              <div className="OuterCard">
                <Card sx={sx} className="InnerOuterCard">
                  <Typography
                    variant="h6"
                    sx={{
                      color: "green",
                    }}
                  >
                    {"Successfull"}
                  </Typography>
                </Card>
              </div>
            ) : (

              failstatus ? (<>
              
              <div className="OuterCard">
              <Card sx={sx} className="InnerOuterCard">
                  <Typography
                    variant="h6"
                    sx={{
                      color: "red",
                    }}
                  >
                    {"Failed"}
                  </Typography>
                </Card>
              </div>
              
              </>) : (<>
              
                <div className="OuterCard">
                <Card sx={sx} className="InnerOuterCard">
                  <div>
                    <Typography variant="body2">Days Left</Typography>
                  </div>
                  <Typography variant="body2">
                    {DaysDifferenceCalculator( new Date(currentCampaignData[10]*1000))}
                  </Typography>
                </Card>
              </div>
              
              </>) 

              
            )}
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
                  {CampaignBalance} ({CampaignBalance * ethpricenow}$) ETH
                </Typography>
                <Typography variant="body">
                  Target of {target} ({target * ethpricenow}$) ETH
                </Typography>
                <div className="ProgressBar">
                  <LinearProgress variant="buffer" value={percent} />
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
                    onChange={(e) => {
                      setenteredAmount(e.target.value);
                    }}
                    className="Ethinput"
                    type={"number"}
                    label="Enter the amount"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {Math.trunc(enteredAmount * ethpricenow)}$
                        </InputAdornment>
                      ),
                    }}
                  ></TextField>
                </div>

                <div className="contriButton">
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      Contribute(id, enteredAmount.toString());
                      handleToggle();
                    }}
                  >
                    <Typography variant="button">Contribute</Typography>
                  </Button>
                </div>
              </Card>
            </div>

            <div className="OuterCard">
              <Card sx={sx} className="InnerOuterCard">
                <div className="contriButton">
                  <Button
                    variant="contained"
                    disabled={ campaignstatus  ? false : true}
                  >
                    <Link to={`/withdraw/${id}`}>
                      <Typography variant="button">
                        Add a Withdrawal Request
                      </Typography>
                    </Link>
                  </Button>
                </div>
                <div className="LastNote">
                  <Typography variant="body">
                    * You can see Where these funds are being used and if you
                    have contributed you can also approve those Withdrawal
                    request :)
                  </Typography>
                </div>
              </Card>
            </div>

            <div className="OuterCard">
              <Card sx={sx} className="InnerOuterCard">
                <div className="contriButton">
                  <Button
                    disabled={failstatus ? false : true}
                    variant="contained"
                    onClick={() => {
                      getRefund(id);
                      refundHandleToggle();
                    }}
                  >
                    <Typography variant="button">Refund</Typography>
                  </Button>
                </div>
                <div className="LastNote">
                  <Typography variant="body">
                    If the Campign turns out to be failure then get your Funds
                    back by paying small as gas fee for your transaction
                  </Typography>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <TransactionList />
    </div>
  );
}
