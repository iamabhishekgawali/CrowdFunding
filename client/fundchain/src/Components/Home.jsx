
import react,{useContext,useState,useEffect} from 'react';
import { WalletContext } from '../Context/WalletContext';
import "../Styles/Home.css"
import CircularBar from './CircularBar';
import Cardgrid  from "./Cardgrid"

export default function Home(){

    const [spinner,setSpinner] = useState(true);

    useEffect(()=>{
        setTimeout(() => {
            setSpinner(false)
        }, 3000);
    },[])
    
    return (
        <div className = "Home">
              { spinner ? (<CircularBar/>) : (<Cardgrid/>)  }
        </div>
    )
}