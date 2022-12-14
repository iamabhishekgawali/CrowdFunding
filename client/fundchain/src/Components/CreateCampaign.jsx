
import react, { useState } from 'react';
import { Card, TextField, Button, Typography,Alert,AlertTitle,Backdrop,CircularProgress } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useContext } from "react"
import { WalletContext } from "../Context/WalletContext"
import { useNavigate } from 'react-router-dom';
import "../Styles/CreateCampaign.css"
import CampaignIcon from '@mui/icons-material/Campaign';
import { useEffect } from 'react';
import "typeface-roboto"


export default function CreateCampaign() {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setTransactionprocess(false);
      navigate("/")
    };
    const handleToggle = () => {
      setOpen(!open);
    };
    const navigate = useNavigate();
    const { connectedAccount, CreateNewCampaign,ethpricenow,transactionprocess,setTransactionprocess } = useContext(WalletContext)
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
        
    }

    useEffect(()=>{
        setTransactionprocess(false);
    },[])

    const sx = {
        margin: 2
    }

    return (

        <div className="CreateCampaignOuter">

<Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        {!transactionprocess ? (
          <CircularProgress />
        ) : (
          <div style={{}}>
           
            <Alert severity="success" fontSize="80">
              <AlertTitle> Transaction sucessfully completed</AlertTitle>
            </Alert>
          </div>
        )}
      </Backdrop>
            <Typography variant='h4'>
            Create a New Campaign
            <CampaignIcon style={{ fontSize: 40,marginLeft : 20,marginTop : 10 }} />
            </Typography>
            <Card sx={{ width: 1 }} >
                <div className='CreateCampaignForm'>

                    <form onSubmit={(e) => {
                        onchangeHandler()
                        handleToggle();
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
                            endAdornment: <InputAdornment position="end">  <Typography variant='h6'> $ {Math.trunc(minContriInUSD *ethpricenow)}</Typography>      </InputAdornment>,
                        }} sx={sx} type={'text'} label={`Minimum amout in ETH`} onChange={(e) => {
                            setMinContriInUSD(e.target.value);
                            
                        }}>

                        </TextField>

                        <TextField sx={sx} type={'text'} label="Image URL" onChange={(e) => {
                            setImageurl(e.target.value);
                        }} >

                        </TextField>

                        <TextField sx={sx} type={'text'} label={`Target to Achieve ETH`} InputProps={{
                            endAdornment: <InputAdornment position="end"> <Typography variant='h6'> $ {Math.trunc(targetInUSD *ethpricenow)} </Typography></InputAdornment>,
                        }} onChange={(e) => {
                            setTargetInUSD(e.target.value);
                        }}>

                        </TextField>

                        <TextField sx={sx} type={'text'} label="Description of the Project" onChange={(e) => {
                            setDescription(e.target.value);
                        }} >

                        </TextField>
                        <Typography sx={{marginLeft : "20px"}} variant='body2'> Enter the Deadline</Typography>
                        <TextField sx={sx}  type='date'  onChange={(e) => {
                            setweblink(e.target.value);
                        }} >
                        </TextField>
                        {connectedAccount ? (<Button sx={sx}  variant="outlined" type={'submit'}> Submit </Button>) : (<Button sx={sx} variant="outlined" type={'submit'} disabled> Please connect Your wallet First </Button>)}
                    </form>
                </div>
            </Card>
        </div>
    )




}