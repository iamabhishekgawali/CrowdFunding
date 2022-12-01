import react, { useContext, useState, useEffect } from "react";
import { WalletContext } from "../Context/WalletContext";
import "../Styles/Home.css";
import CircularBar from "./CircularBar";
import Cardgrid from "./Cardgrid";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

export default function Home() {
  const [spinner, setSpinner] = useState(true);
  const {
    CampaignsSummary,
    GetDeployedTransaction,
    CampaignsData,
    setCampaignData,
  } = useContext(WalletContext);
  console.log("Before");
  console.log(CampaignsSummary);

  useEffect(() => {
    GetDeployedTransaction().then((res) => {
      setCampaignData(res);
    });
    setTimeout(() => {
      setSpinner(false);
    }, 5000);
  }, []);

  if(spinner){
    return (<div className="Home"> <CircularBar /> </div>)
  }
  else
    return  (<Cardgrid/>)
}
