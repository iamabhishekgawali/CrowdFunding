import { display } from "@mui/system"
import Alert from '@mui/material/Alert';

const sx = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifycontent: "center",
    alignitem: "center"
}

export default function ConnectWallet(){
    return (
        <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems : "center"}}>
                  <Alert severity="info">Connect Your Wallet to see More Info</Alert>

        </div>
    )
}