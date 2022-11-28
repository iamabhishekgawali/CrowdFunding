import React from "react"
import { useEffect,useContext } from "react";
import { WalletContext } from "../Context/WalletContext";
import "../Styles/Style.css";

export default  function ShowDetails(currElem){
   
    const {GetInstance,currentCampaignData} = useContext(WalletContext)
    const url = window.location.href
    console.log(url)
    const id = url.substring(url.lastIndexOf("/") + 1);
    console.log(id)
    useEffect(()=>{
        GetInstance(id)
    },[])

    // Use this 
    console.log(currentCampaignData)
    

    return (
        <div className="card-container">
        <div className="card ">
          <div className="card-body">
          <h2 className="card-title"> {currentCampaignData[5]}</h2>
            <span className="card-number card-circle subtle"> {currentCampaignData[4]} </span>
            <span className="card-author subtle"> {currentCampaignData[5]}</span>

            <span className="card-description subtle">
              {currentCampaignData[6]}
            </span>
          </div>
          <img src="./images/covidFund.jpg" alt="images" className="card-media" />
        </div>
        {/* <button type="button" className="btn">Contribute</button> */}
        <span className="card-tag">CONTRIBUTE</span>

      </div>
        
    )
}