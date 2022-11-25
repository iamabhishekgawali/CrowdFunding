
import { WalletContext } from "../Context/WalletContext"
import {useContext} from "react"

export default function Cardgrid (){

    const  {connectedAccount,GetDeployedTransaction}  = useContext(WalletContext)


    return(
        <div>
            This is a Card
        </div>
    )
}