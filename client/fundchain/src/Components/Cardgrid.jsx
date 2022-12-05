// Show available Campaigns
import React from "react";
import { WalletContext } from "../Context/WalletContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Grid, Paper, Typography, LinearProgress} from "@mui/material";
import "../Styles/Style.css";
import SecondHead from "./SecondHead";
import { height, margin } from "@mui/system";
import { alignProperty } from "@mui/material/styles/cssUtils";
import web3 from "web3"

export default function Cardgrid() {
  const { CampaignsSummary,ethpricenow } = useContext(WalletContext);
  console.log(CampaignsSummary);
  return (
    <div className="style">
      <SecondHead></SecondHead>

      <Grid
        columnSpacing={{ xs: 4, sm: 4, md: 3 }}
        container
        justifyContent="start"
      >
        {CampaignsSummary.map((value, index) => (
          <Grid key={index} item xs={4}>
            <Link to={`${value[9].toString()}`}>
            <Card
              sx={{
                boxShadow : 4,
                height: 400,
                margin: 2,
                padding : 2,
                display : "flex",
                flexDirection : "column",
                gap : 1,
                justifyContent : "center"
              }}
            >
              <img src="https://images.unsplash.com/photo-1533167649158-6d508895b680?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjBzcGxhc2h8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60" width="100%" height="70%"></img>
              <Typography variant="h5">{value[5]}</Typography>
              <Typography variant="body2"> by {value[4]}</Typography>
              <Typography variant="h6">{web3.utils.fromWei(value[8].toString())*ethpricenow} $</Typography>
              <LinearProgress variant="buffer" value={50} />
            </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
