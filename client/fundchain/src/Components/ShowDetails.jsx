
import { useEffect,useContext } from "react";
import { WalletContext } from "../Context/WalletContext";

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
        <div>
           
        </div>
    )
}