

// Used to Create a Global State for  

import React, { useEffect, useState } from "react";
import { ethers, Signer } from "ethers"

import { contractABI,contractAddress,contractABI1 } from "../utils/constant";

export const WalletContext = React.createContext();
const { ethereum } = window;

const getWallet = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const TransactionContract = new ethers.Contract(contractAddress,contractABI,signer); 
    return TransactionContract;
}

const GetContract = (add) =>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const TransactionContract = new ethers.Contract(add,contractABI1,signer); 
    return TransactionContract;
}

const CreateNewCampaign = async (WalletAddress,title,MinAmount,Imageurl,TargetAmount,Description,ProjectLink)=>{

    if(!ethereum) alert("Please Install MetaMask");
    const Transaction = getWallet();
    const Parsed_MinAmount = ethers.utils.parseEther(MinAmount);
    const Parsed_TargetAmount = ethers.utils.parseEther(TargetAmount);
    var ts = Math.round((new Date()).getTime() / 1000);

    const TransactionHash =  await Transaction.createCampaign(Parsed_MinAmount,title,Description,Imageurl,Parsed_TargetAmount,ts,ProjectLink,WalletAddress);

    console.log(TransactionHash.hash);
    TransactionHash.wait();
    console.log(`Success - ${TransactionHash.hash}`);

}


const GetDeployedTransaction = async ()=>{

    try {
        if(!ethereum) alert("Please install Metamask");
        console.log("Getting Wallet...")
        const Transaction = getWallet();
        console.log("Getting Deployed Campaign...")
        const TransactionHash = await Transaction.getDeployedCampaigns();
        return TransactionHash;
    }
    catch(err){
        console.log("Whats the problme yrr")
        console.log(err)
    }
}


export const WalletProvider = ({ children }) => {

    const [connectedAccount, setconnectedAccount] = useState("");
    const [isloading,setIsLoading] = useState(false);
    const [CampaignsData,setCampaignData] = useState([]);
    const [CampaignsSummary,setCampaignsSummary] = useState({});
    const [currentCampaignData,setCampaignDataData] = useState({})

    async function GetAllCampaignsData(){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        let RecievedData = []
        CampaignsData.map(async (e)=>{
            const TransactionContract = new ethers.Contract(e,contractABI1,signer);
            const Response  = await TransactionContract.getSummary();
            console.log("Getting Response")
            console.log(typeof Response)
            RecievedData.push(Response)
        })
        setCampaignsSummary(RecievedData)
    }

    const GetInstance = async (Array)=>{
        const TransactionHash = GetContract(Array);
        const CampaignData = await TransactionHash.getSummary();
        setCampaignDataData(CampaignData);
    }
    

    useEffect(()=>{
     
    },[])

    useEffect(()=>{
        GetAllCampaignsData();
    },[CampaignsData])

    const CheckifWalletisConnected = async () => {

        try {
            if (!ethereum) alert("Please install MetaMask");
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length) {
                setconnectedAccount(accounts[0]);
            }
            else {
                console.log("No accounts Found")
            }
            console.log(accounts)
        }
        catch (error) {
            console.error(error);
        }
    }

    const ConnectWallet = async () => {
        try {
            if (!ethereum) alert("Please install MetaMask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setconnectedAccount(accounts[0]);
        }
        catch (error) {
            console.log(error);
            throw new Error("No Ethereum Object");
        }
    }

    useEffect(() => {
        CheckifWalletisConnected();
    }, [])

    return (
        <WalletContext.Provider value={{currentCampaignData,GetInstance,CampaignsSummary,ConnectWallet, connectedAccount, CreateNewCampaign , isloading , setIsLoading , GetDeployedTransaction,CampaignsData,setCampaignData}}>
            {children}
        </WalletContext.Provider>
    )
}

