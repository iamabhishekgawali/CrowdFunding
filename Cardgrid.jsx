
// Show available Campaigns
import React from "react"
import { WalletContext} from "../Context/WalletContext"
import {useContext,useEffect,useState} from "react"
import "../Styles/Style.css";
// import {WalletContext} from "../Context/WalletContext"


export default function Cardgrid (){
    const {CampaignsSummary} = useContext(WalletContext)
    const [campaignData, setCampaignData] = useState(CampaignsSummary);
    // console.log(campaignData);
    return(<>
    <section className="main-card--cointainer">
    {campaignData.map((currElem) => {
        return (
            <>
             
            <div className="card-container">
            <div className="card ">
              <div className="card-body">
                <span className="card-number card-circle subtle"> {currElem[4].toString()} </span>
                <span className="card-author subtle"> {currElem[8].toString()}</span>
                <h2 className="card-title"> {currElem[5]}</h2>
                <span className="card-description subtle">
                {currElem[6]}
                </span>
              </div>
              <img src="{currElem[8]}" alt="images" className="card-media" />

              
            </div>
          </div> 
          </>  
        )
    })}
    </section>
     </>
    )
    
}