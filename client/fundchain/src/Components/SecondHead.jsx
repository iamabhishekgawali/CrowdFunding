

import "typeface-roboto"
import { Button, Typography } from "@mui/material"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import "../Styles/SecondHead.css"
import { useNavigate } from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';

export default function SecondHead() {
    const Navigate = useNavigate();
    return <div className="SecondHead"> 
        <Typography variant="h4">
            CrowdFunding using powers of Crypto and Blockchain 
        </Typography>
        <DeleteIcon></DeleteIcon>
        <Button sx={{width:300}} variant="contained" size="medium" onClick={()=>{
            Navigate("/newCampaign")
        }} >Click here to create Campaign</Button>

     </div>
}