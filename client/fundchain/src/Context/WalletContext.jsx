// Used to Create a Global State for
import web3 from "web3"
import Campaign from "../utils/Campaign.json"
import React, { useEffect, useState } from "react";
import { ethers, Signer } from "ethers";
import axios from "axios"
import { contractABI, contractAddress, contractABI1 } from "../utils/constant";
export const WalletContext = React.createContext();
const { ethereum } = window;


const Web3 = new web3(ethereum)

const getWallet = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const TransactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return TransactionContract;
};

const GetContract = (add) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const TransactionContract = new ethers.Contract(add, contractABI1, signer);
  return TransactionContract;
};



const CreateNewCampaign = async (
  WalletAddress,
  title,
  MinAmount,
  Imageurl,
  TargetAmount,
  Description,
  ProjectLink
) => {
  if (!ethereum) alert("Please Install MetaMask");
  const Transaction = getWallet();
  const Parsed_MinAmount = ethers.utils.parseEther(MinAmount);
  const Parsed_TargetAmount = ethers.utils.parseEther(TargetAmount);
  var ts = Math.round(new Date().getTime() / 1000);

  const TransactionHash = await Transaction.createCampaign(
    Parsed_MinAmount,
    title,
    Description,
    Imageurl,
    Parsed_TargetAmount,
    ts,
    ProjectLink,
    WalletAddress
  );

  console.log(TransactionHash.hash);
  TransactionHash.wait();
  console.log(`Success - ${TransactionHash.hash}`);
};

const GetDeployedTransaction = async () => {
  try {
    if (!ethereum) alert("Please install Metamask");
    console.log("Getting Wallet...");
    const Transaction = getWallet();
    console.log("Getting Deployed Campaign...");
    const TransactionHash = await Transaction.getDeployedCampaigns();
    return TransactionHash;
  } catch (err) {
    console.log("Whats the problme yrr");
    console.log(err);
  }
};

export const WalletProvider = ({ children }) => {
  const [connectedAccount, setconnectedAccount] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [CampaignsData, setCampaignData] = useState([]);
  const [CampaignsSummary, setCampaignsSummary] = useState({});
  const [currentCampaignData, setCampaignDataData] = useState({});
  const [ethpricenow,setEthpricenow]  = useState(0);
  const [withdrawrequestcount,setwithdrawrequestcount] = useState(0);
  const [Allwithdrawrequest,setAllwithdrawrequest] = useState();
  const [transactionprocess,setTransactionprocess] = useState(false);

  async function GetAllCampaignsData() {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    let RecievedData = [];
    CampaignsData.map(async (e) => {
      const TransactionContract = new ethers.Contract(e, contractABI1, signer);
      const Response = await TransactionContract.getSummary();
      console.log("Getting Response");
      console.log(typeof Response);
      RecievedData.push(Response);
    });
    setCampaignsSummary(RecievedData);
  }

  function GetCampaign(id){
    return new Web3.eth.Contract(Campaign.abi,id)
  }

  const GetInstance = async (Array) => {
    const TransactionHash = GetContract(Array);
    const CampaignData = await TransactionHash.getSummary();
    setCampaignDataData(CampaignData);
  };

  useEffect(() => {
    console.log("This is the connected account")
    console.log(connectedAccount);
  }, [connectedAccount]);

  useEffect(() => {
    GetAllCampaignsData();
  }, [CampaignsData]);

  const CheckifWalletisConnected = async () => {
    try {
      if (!ethereum) alert("Please install MetaMask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setconnectedAccount(accounts[0]);
      } else {
        console.log("No accounts Found");
      }
      console.log(accounts);
    } catch (error) {
      console.error(error);
    }
  };

  const ConnectWallet = async () => {
    try {
      if (!ethereum) alert("Please install MetaMask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setconnectedAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };

  const Contribute = async (id,amount)=>{
    const campaign = GetCampaign(id);
    console.log(amount)
    const transactionHash = await campaign.methods.contribute().send({from : connectedAccount,value : Web3.utils.toWei(amount, 'ether')});
    console.log("Setting true")
    setTransactionprocess(true);
  }

  useEffect(() => {
    CheckifWalletisConnected();
    axios.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR").then((data)=>{
    console.log("Hello world")  
    console.log(data.data)
    const {USD} = data.data
    console.log(typeof parseFloat(USD))
    setEthpricenow(parseFloat(USD))
    })
  }, []);


  const FindCount = async (id)=>{
    const TransactionHash = GetContract(id);
    const CampaignData = await TransactionHash.numRequests.call();
    console.log(CampaignData)
    setwithdrawrequestcount(CampaignData.toString())
  }

  const Addtorequest = async (id,description,eth,walletaddress)=>{
    const TransactionHash = GetContract(id);
    console.log("Parsing th amount of ether recio");
    const ParsedAmount = ethers.utils.parseEther(eth)
    console.log(ParsedAmount);
    const Hash = await TransactionHash.createRequest(description,ParsedAmount,connectedAccount);
    const FinalHash = await Hash.wait()
    console.log(FinalHash)
  }

  const GetRequest = async (id)=>{
    let Allthelist  = []
    const TransactionHash = GetContract(id);
    for(let i=0;i<withdrawrequestcount;i++){
      const hash = await TransactionHash.requests(i);
      console.log(hash)
      Allthelist.push(hash)
    }
    setAllwithdrawrequest(Allthelist)
  }

  const FinalizeRequest = async (id,index)=>
  {
    const TransactionHash = GetContract(id);
    const Hash = await TransactionHash.finalizeRequest(index);
    await Hash.wait();
  }

  const ApproveRequest = async (id,index)=>{
    const TransactionHash = GetContract(id);
    const Hash = await TransactionHash.approveRequest(index);
    await Hash.wait()
  }

  return (
    <WalletContext.Provider
      value={{
        currentCampaignData,
        GetInstance,
        CampaignsSummary,
        ConnectWallet,
        connectedAccount,
        CreateNewCampaign,
        isloading,
        setIsLoading,
        GetDeployedTransaction,
        CampaignsData,
        setCampaignData,
        Contribute,
        ethpricenow,
        FindCount,
        Addtorequest,
        withdrawrequestcount,
        Allwithdrawrequest,
        GetRequest,
        ApproveRequest,
        FinalizeRequest,
        setTransactionprocess,
        transactionprocess
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
