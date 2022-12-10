
import { WalletContext } from "../Context/WalletContext";
import { useContext } from "react";
import { useEffect } from "react";
import NoRequest from "./NoRequest";
import ShowWithdrawRequest from "./ShowWithdrawRequest";
import "../Styles/addwithdraw.css"
import { useNavigate } from "react-router-dom";

export default function AddWithdrawRequest(){

    const  {withdrawrequestcount,FindCount} = useContext(WalletContext);
    const url = window.location.href;
    console.log(url);
    const id = url.substring(url.lastIndexOf("/") + 1);
    console.log(id);

    useEffect(()=>{
        FindCount(id);
    },[])

    return (
        <div className="withdrawrequest">
            {parseInt(withdrawrequestcount)==0 ? (<NoRequest/>) : (<ShowWithdrawRequest id={id} />)}
        </div>
    )
}