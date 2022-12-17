// Used to Create a Global State for
import web3 from "web3";
import Campaign from "../utils/Campaign.json";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { contractABI, contractAddress, contractABI1 } from "../utils/constant";
export const WalletContext = React.createContext();
const { ethereum } = window;

const Web3 = new web3(ethereum);

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
  console.log("----------------------------");
  console.log(TransactionContract);
  console.log("----------------------------");

  return TransactionContract;
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
  const [ethpricenow, setEthpricenow] = useState(0);
  const [withdrawrequestcount, setwithdrawrequestcount] = useState(0);
  const [Allwithdrawrequest, setAllwithdrawrequest] = useState();
  const [transactionprocess, setTransactionprocess] = useState(false);
  const [transactionaccountList, setTransactionaccountList] = useState([]);
  const [transactionamountList, setTransactionamountList] = useState([]);
  const [mode, setMode] = useState("light");
  const [connectedAccountrefundstatus, setconnectedAccountrefundstatus] = useState(false);
  const [campaignstatus, setCampaignStatus] = useState(false);
  const [failstatus,setFailstatus] = useState(false);
  const [hasapproved,setHasapproved] = useState(false);

  const [refundStatus, setrefundStatus] = useState({
    address: null,
    amount: null,
    status: null,
    index: -1,
  });

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
    console.log("converting date");
    console.log(typeof ProjectLink);
    const ConvertedDate = Math.round(new Date(ProjectLink).getTime() / 1000);
    console.log(ConvertedDate);
    const web_link = "www.google.com";
    console.log(WalletAddress);
    const TransactionHash = await Transaction.createCampaign(
      Parsed_MinAmount,
      title,
      Description,
      Imageurl,
      Parsed_TargetAmount,
      ts,
      web_link,
      connectedAccount,
      ConvertedDate
    );

    await TransactionHash.wait();
    setTransactionprocess(true);
  };

  const GetcompleteStatus= async (id)=>{
    const Hash = GetContract(id);
    const TransactionHash = await Hash.Complete_status.call();
    console.log(`Complete Status : ${TransactionHash}`)
    setCampaignStatus(TransactionHash)
  }

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

  function GetCampaign(id) {
    return new Web3.eth.Contract(Campaign.abi, id);
  }

  const GetInstance = async (Array) => {
    const TransactionHash = GetContract(Array);
    console.log(TransactionHash);
    const Temp = await TransactionHash.getSummary();
    const Allcontributors = await TransactionHash.getContibuter();
    const contributedAmounts = await TransactionHash.getAmountContributed();
    setCampaignDataData(Temp);
    setTransactionaccountList(Allcontributors);
    setTransactionamountList(contributedAmounts);

  };

  useEffect(() => {
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

  const Contribute = async (id, amount) => {
    const campaign = GetCampaign(id);
    console.log(amount);
    const GetcompleteStatus = await campaign.methods.contribute().send({
      from: connectedAccount,
      value: Web3.utils.toWei(amount, "ether"),
    });
    console.log("Setting true");
    setTransactionprocess(true);
  };

  const Hasapproved = async(index,address)=>{
    const Contract = GetContract(address);
    const TransactionHash = await Contract.checkifApproved(index,connectedAccount);
    setHasapproved(TransactionHash)
  }

  const DaysDifferenceCalculator = (DateCreated) => {
    const CurrentDated = new Date();
    var difference = DateCreated.getTime() - CurrentDated.getTime();

    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;
    daysDifference = parseInt(daysDifference);
    return daysDifference;
  };

  useEffect(() => {
    CheckifWalletisConnected();
    axios
      .get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR"
      )
      .then((data) => {
        console.log("Hello world");
        console.log(data.data);
        const { USD } = data.data;
        console.log(typeof parseFloat(USD));
        setEthpricenow(parseFloat(USD));
      });
  }, []);

  const FindCount = async (id) => {
    const TransactionHash = GetContract(id);
    const CampaignData = await TransactionHash.numRequests.call();
    console.log(CampaignData);
    setwithdrawrequestcount(CampaignData.toString());
  };

  const Addtorequest = async (id, description, eth, walletaddress) => {
    const TransactionHash = GetContract(id);
    console.log("Parsing th amount of ether recio");
    const ParsedAmount = ethers.utils.parseEther(eth);
    console.log(ParsedAmount);
    console.log("Making request");
    console.log(walletaddress);
    const Hash = await TransactionHash.createRequest(
      description,
      ParsedAmount,
      walletaddress
    );
    const FinalHash = await Hash.wait();
    console.log(FinalHash);
    setTransactionprocess(true);
  };

  const getRefund = async (id) => {
    let index = -1;
    for (var i = 0; i < transactionaccountList.length; i++) {
      if (
        transactionaccountList[i].toString().toLowerCase() ==
        connectedAccount.toString()
      ) {
        index = i;
        break;
      }
    }

    const TransactionHash = GetContract(id);
    console.log(`connectedAccount : ${connectedAccount}`);
    const Hash = await TransactionHash.refunded(connectedAccount);
    console.log(`Hash-------------------- : ${Hash}`);


    if(index != -1)
      setconnectedAccountrefundstatus(Hash);
    else
    setconnectedAccountrefundstatus(true);
  
    if (index != -1) {
      setrefundStatus({
        ...refundStatus,
        amount: web3.utils.fromWei(transactionamountList[i].toString()),
        status: "found",
        address: transactionaccountList[i],
        index: i,
      });
    } else {
      setrefundStatus({
        ...refundStatus,
        amount: null,
        status: "not found",
        address: null,
      });
    }
  };

  const GetRequest = async (id) => {
    let Allthelist = [];
    const TransactionHash = GetContract(id);
    for (let i = 0; i < withdrawrequestcount; i++) {
      const hash = await TransactionHash.requests(i);
      console.log(hash);
      Allthelist.push(hash);
    }
    setAllwithdrawrequest(Allthelist);
  };

  const getRefundTransaction = async (id, index) => {
    console.log(id, index);
    const TransactionHash = GetContract(id);
    const Hash = await TransactionHash.Refunds(index);
    setTransactionprocess(true);
  };

  const FinalizeRequest = async (id, index) => {
    const TransactionHash = GetContract(id);
    const Hash = await TransactionHash.finalizeRequest(index);
    await Hash.wait();
    setTransactionprocess(true);
  };

  const ApproveRequest = async (id, index) => {
    const TransactionHash = GetContract(id);
    const Hash = await TransactionHash.approveRequest(index);
    await Hash.wait();
    setTransactionprocess(true);
  };

  const GetFailedStatus = async (id)=>{
    const Hash = GetContract(id);
    const TrasactionHash = await  Hash.getDeadline();
    const days = DaysDifferenceCalculator(new Date(TrasactionHash * 1000))
    if(days < 0)
      setFailstatus(true);
  }

  return (
    <WalletContext.Provider
      value={{
        Hasapproved,
        GetFailedStatus,
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
        transactionprocess,
        transactionaccountList,
        transactionamountList,
        mode,
        setMode,
        DaysDifferenceCalculator,
        getRefund,
        refundStatus,
        getRefundTransaction,
        connectedAccountrefundstatus,
        campaignstatus,
        GetcompleteStatus,
        failstatus
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
