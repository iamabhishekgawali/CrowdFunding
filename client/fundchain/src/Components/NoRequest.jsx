
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { Button, Typography ,Card} from '@mui/material';
import { Link } from 'react-router-dom';


const style = {
    width : "80%",
    height : "60%",
    display : "flex",
    flexDirection : "column",
    alignItems : "center",
    gap : "20px",
}

export default function NoRequest(){

    const url = window.location.href;
    console.log(url);
    const id = url.substring(url.lastIndexOf("/") + 1);
    console.log(id);

    return(
        <Card sx={{boxShadow : 2}} style={style}>
            <FavoriteOutlinedIcon color='primary' sx = {{width : 150,height : 200}} />
            <Typography variant='h4' >No Request for this Campign yet</Typography>
            <Typography variant='h6' >Create a Withdraw request for this campign rather</Typography>
            <Link to={`/withdraw/makerequest/${id}`}>
                <Button sx={{width : 400}} variant='contained'>Create a Withdrawal request</Button>
            </Link>
        </Card>
    )
}