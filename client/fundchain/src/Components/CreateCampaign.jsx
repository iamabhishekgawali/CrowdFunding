
import react, { useState } from 'react';
import { Card, TextField, Button, Typography } from '@mui/material';
import { red } from "@mui/material/colors"
import InputAdornment from '@mui/material/InputAdornment';
import { useContext } from "react"
import { WalletContext } from "../Context/WalletContext"
import { useNavigate } from 'react-router-dom';
import "../Styles/CreateCampaign.css"
import CampaignIcon from '@mui/icons-material/Campaign';
export default function CreateCampaign() {

    const navigate = useNavigate();
    const { connectedAccount, CreateNewCampaign,ethpricenow } = useContext(WalletContext)
    const [error, setError] = useState("");
    const [minContriInUSD, setMinContriInUSD] = useState(0);
    const [subtitle, setSubtitle] = useState("");
    const [campaignname, setCampaignName] = useState("");
    const [targetInUSD, setTargetInUSD] = useState(0);
    const [description, setDescription] = useState("")
    const [imageurl, setImageurl] = useState("")
    const [weblink, setweblink] = useState("")
    const [_minContriInUSD,set__minContriInUSD] = useState("");

    async function onchangeHandler() {
        console.log({
            connectedAccount,
            campaignname,
            minContriInUSD,
            imageurl,
            targetInUSD,
            description,
            weblink
        })
        await CreateNewCampaign(connectedAccount, campaignname,minContriInUSD ,imageurl,targetInUSD,description,weblink);
        navigate("/")
    }


    const sx = {
        margin: 2
    }

    return (

        <div className="CreateCampaignOuter">
            <Typography variant='h4'>
            Create a New Campaign
            <CampaignIcon style={{ fontSize: 40,marginLeft : 20,marginTop : 10 }} />
            </Typography>
            <Card sx={{ width: 1 }} >
                <div className='CreateCampaignForm'>

                    <form onSubmit={(e) => {

                        onchangeHandler()
                        e.preventDefault();

                    }} className="CampaignForm">

                        <TextField sx={sx} type={'text'} label="Title of the Campaign" onChange={(e) => {
                            setCampaignName(e.target.value);
                        }} >

                        </TextField>

                        <TextField sx={sx} type={'text'} label="Slogan of the Project" onChange={(e) => {
                            setSubtitle(e.target.value);
                        }}>

                        </TextField>

                        <TextField InputProps={{
                            endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
                        }} sx={sx} type={'number'} label={`Minimum amout in Eth ${Math.trunc(minContriInUSD *ethpricenow)} $`} onChange={(e) => {
                            setMinContriInUSD(e.target.value);
                        }}>

                        </TextField>

                        <TextField sx={sx} type={'text'} label="Image URL" onChange={(e) => {
                            setImageurl(e.target.value);
                        }} >

                        </TextField>

                        <TextField sx={sx} type={'number'} label={`Target to Achieve ETH ${Math.trunc(targetInUSD*ethpricenow)}$`} InputProps={{
                            endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
                        }} onChange={(e) => {
                            setTargetInUSD(e.target.value);
                        }}>

                        </TextField>

                        <TextField sx={sx} type={'text'} label="Description of the Project" onChange={(e) => {
                            setDescription(e.target.value);
                        }} >

                        </TextField>

                        <TextField sx={sx} type={'text'} label="Enter project Link" onChange={(e) => {
                            setweblink(e.target.value);
                        }} >

                        </TextField>

                        {connectedAccount ? (<Button sx={sx} variant="outlined" type={'submit'}> Submit </Button>) : (<Button sx={sx} variant="outlined" type={'submit'} disabled> Please connect Your wallet First </Button>)}
                    </form>
                </div>
            </Card>
        </div>
    )




}