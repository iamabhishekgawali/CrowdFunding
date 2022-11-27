
import react,{useContext,useState,useEffect} from 'react';
import { WalletContext } from '../Context/WalletContext';
import "../Styles/Home.css"
import CircularBar from './CircularBar';
import Cardgrid  from "./Cardgrid"
import { useNavigate } from 'react-router-dom';

export default function Home(){

    const [spinner,setSpinner] = useState(true);
    const  {connectedAccount,GetDeployedTransaction,CampaignsData,setCampaignData}  = useContext(WalletContext);
    const navigate = useNavigate();

    useEffect(()=>{
        GetDeployedTransaction().then((res)=>{
            setCampaignData(res);
        });
        console.log(navigate[0])
        setTimeout(() => {
            setSpinner(false)
        }, 5000);
    },[])
    
    return (
        <div className = "Home">
              { spinner ? (<CircularBar/>) : (
                
                CampaignsData.map((e)=>{
                        return <div>{e}</div>
                    })
                
              )}
        </div>
    )
}