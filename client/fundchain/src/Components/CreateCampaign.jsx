
import react,{useState} from 'react';
import { Card,TextField,Button,TextareaAutosize } from '@mui/material';
import {red} from "@mui/material/colors"
import InputAdornment from '@mui/material/InputAdornment';
import { useContext } from "react"
import { WalletContext } from "../Context/WalletContext"

import "../Styles/CreateCampaign.css"



export default function CreateCampaign() {

    
    const {connectedAccount} = useContext(WalletContext)
    const [error, setError] = useState("");
    const [minContriInUSD, setMinContriInUSD] = useState(0);
    const [subtitle,setSubtitle] = useState("");
    const [campaignname,setCampaignName] = useState("");
    const [targetInUSD, setTargetInUSD] = useState(0);
    const [description,setDescription] = useState("")
    const [imageurl,setImageurl] = useState("")
    const [weblink,setweblink] = useState("")
    

    function onchangeHandler(){
       
    }

    const sx = {
        margin :2
    }

    return (

        <div className= "CreateCampaignOuter">
        <h1>Create a New Campaign</h1>
           
        <Card sx={{width:1}} >
        <div className='CreateCampaignForm'>

            <form onSubmit={(e)=>{
                onchangeHandler()
                } }  className="CampaignForm">

                <TextField sx = {sx} required fullwidth type={'text'} label="Title of the Campaign" onChange={(e)=>{
                    setCampaignName(e.target.value);
                }} >
                    
                </TextField>

                <TextField sx = {sx} required fullwidth type={'text'} label="Slogan of the Project" onChange={(e)=>{
                    setSubtitle(e.target.value);
                }}>

                </TextField>

                <TextField required InputProps={{
            endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
          }} sx = {sx}  fullwidth type={'number'} label="Minimum amout in Eth" onChange={(e)=>{
                    setMinContriInUSD(e.target.value);
                }}>

                </TextField>
 
                <TextField  required sx={sx} fullwidth type={'text'} label="Image URL" onChange={(e)=>{
                    setImageurl(e.target.value);
                }} >

                </TextField>

                <TextField  required sx={sx} fullwidth type={'number'} label="Target to Achieve"  InputProps={{
            endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
          }} onChange={(e)=>{
                    setTargetInUSD(e.target.value);
                }}>

                </TextField>

                <TextField required sx={sx} fullwidth type={'text'} label="Description of the Project"onChange={(e)=>{
                    setDescription(e.target.value);
                }} >

                </TextField>

                <TextField required sx={sx} fullwidth type={'text'} label="Enter project Link" onChange={(e)=>{
                    setweblink(e.target.value);
                }} >

                </TextField>

                {  connectedAccount  ? (<Button sx={sx} variant="outlined" type={'submit'}> Submit </Button>): (<Button sx={sx} variant="outlined" type={'submit'} disabled> Please connect Your wallet First </Button>) }
            </form>
        </div>
        </Card>
        </div>
    )


   
        
}