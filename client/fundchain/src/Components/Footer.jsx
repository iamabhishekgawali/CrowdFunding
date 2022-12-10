import "../Styles/NavBar.css";
import { useContext } from "react";
import { WalletContext } from "../Context/WalletContext";
import { Link } from "react-router-dom";
import { Card, Button, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
  const { ConnectWallet, connectedAccount } = useContext(WalletContext);

  return (
    <Card
      sx={{
        boxShadow: 2,
        display: "flex",
        padding: 1,
        flexdirection: "row",
        width: 1,
      }}
    >
      <div className="NavLeft">
        <div
          className="Title"
          style={{
            padding: "15px",
          }}
        >
          <Link to="/">🤝FundChain</Link>
        </div>
      </div>

      <div
        className="NavRight"
        style={{
          padding: "20px",
        }}
      >
        <div className="CreateCampaign">
          <Typography variant="body1">Contact us at</Typography>
        </div>

        <div className="HowitWorks">
          <FacebookIcon size="large" />
        </div>

        <div className="Wallet">
          <InstagramIcon size="large"></InstagramIcon>
        </div>

        <div className="Wallet">
         <GitHubIcon onClick={()=>{
            window.location.href = "https://github.com/iamabhishekgawali/CrowdFunding"
         }}></GitHubIcon>
        </div>
      </div>

      <div
        className="NavRight"
        style={{
          padding: "20px",
        }}
      >
        <div className="HowitWorks">
          <div style={{ display: "flex", gap: "10px" }}>
            <EmailIcon
              sx={{ marginTop: "5px", width: "20px", height: "15px" }}
            ></EmailIcon>
            <Typography variant="button">
              Abhishek.gawali19@vit.edu
            </Typography>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <EmailIcon
              sx={{ marginTop: "5px", width: "20px", height: "15px" }}
            ></EmailIcon>
            <Typography variant="button">
              {" "}
              chetan.jain19@vit.edu{" "}
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  );
}
