import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "../Context/WalletContext";
import CircularBar from "./CircularBar";
import {
  Backdrop,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  CircularProgress,
  Alert,
  AlertTitle
} from "@mui/material";
import web3 from "web3";
import { useNavigate } from "react-router-dom";

function ShowWithdrawRequest({ id }) {
  const Navigate = useNavigate();
  const [spinner, setSpinner] = useState(true);
  const {
    Hasapproved,
    ApproveRequest,
    withdrawrequestcount,
    Allwithdrawrequest,
    GetRequest,
    currentCampaignData,
    GetInstance,
    ethpricenow,
    FinalizeRequest,
    transactionprocess,
    setTransactionprocess,
  } = useContext(WalletContext);
  console.log(id);
  console.log(withdrawrequestcount);
  console.log(Allwithdrawrequest);
  console.log(currentCampaignData);
  
  useEffect(() => {
    GetRequest(id);
    GetInstance(id);
    Hasapproved(id);
    setTransactionprocess(false);
    setTimeout(() => {
      setSpinner(false);
    }, 3000);
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setTransactionprocess(false);
    window.location.reload(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const style = {
    width: "80%",
    height: "80%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  if (!spinner) {
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
                <AlertTitle> Transaction sucessfully completed</AlertTitle>
              </Alert>
            </div>
          )}
        </Backdrop>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h3"
            style={{
              width: 500,
            }}
          >
            Withdrawal Requests for {currentCampaignData[5]}
          </Typography>
          <div>
            <Typography variant="h4">Balance</Typography>
            <Typography variant="h5">
              {" "}
              {web3.utils.fromWei(currentCampaignData[1].toString()) +
                "ETH"}{" "}
              {web3.utils.fromWei(currentCampaignData[1].toString()) *
                ethpricenow}
              $
            </Typography>
            <Button
              onClick={() => {
                Navigate(`/withdraw/makerequest/${id}`);
              }}
              variant="contained"
              size="small"
            >
              Add withdrawal request
            </Button>
          </div>
        </div>
        <TableContainer
          sx={{ boxShadow: 3, backgroundColor: "white" }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">
                  {" "}
                  <Typography variant="body2" fontWeight={"bold"}>
                    DESCRIPTION
                  </Typography>{" "}
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={"bold"}>
                    AMOUNT
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={"bold"}>
                    RECIEPENT ADDRESS
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={"bold"}>
                    APPROVAL COUNT
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={"bold"}>
                    COMPLETED
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={"bold"}>
                    APPROVE
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={"bold"}>
                    FINALIZE
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Allwithdrawrequest.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell align="right">{row[1]}</TableCell>
                  <TableCell align="right">
                    {web3.utils.fromWei(row[2].toString())}
                  </TableCell>
                  <TableCell align="right">{row[3]}</TableCell>
                  <TableCell align="right">
                    {row[5].toString()}/{currentCampaignData[3].toString()}
                  </TableCell>
                  <TableCell align="right">{row[4] ? "YES" : "NO"}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <Button
                      disabled={row[4] ? true : false}
                      variant="contained"
                      size="small"
                      onClick={() => {
                        ApproveRequest(id, index);
                        handleToggle();
                      }}
                    >
                      Approve
                    </Button>{" "}
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    <Button
                      variant="contained"
                      size="small"
                      disabled={row[4] ? true : false}
                      onClick={() => {
                        FinalizeRequest(id, index);
                        handleToggle();
                      }}
                    >
                      Finalize
                    </Button>{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    return <CircularBar />;
  }
}

export default ShowWithdrawRequest;
