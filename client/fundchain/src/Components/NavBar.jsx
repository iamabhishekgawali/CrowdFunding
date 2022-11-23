

import "../Styles/NavBar.css"
import {useContext} from "react"
import  {WalletContext} from "../Context/WalletContext"

export default function NavBar() {

  const {ConnectWallet,connectedAccount} = useContext(WalletContext);

  return (

    <div className="NavBar">

      <div className="Left">

        <div className="Title" >
          <a href="/">🤝FundChain</a>
        </div>
      </div>


      <div className="Right">

        <div className="CreateCampaign">
          <button>
            <a href="/campaign/new">Create Campaign</a>
          </button>
        </div>

        <div className="HowitWorks" >
          <button>
            <a href="/#howitworks"> How it Works</a>
          </button>
        </div>

        <div className="Wallet">

          {connectedAccount ? (
            <div>
              <button>{connectedAccount}</button>
            </div>
          ) : (
            <div>
              <button onClick={() => {
                ConnectWallet();
              }}>
                Connect to MetaMask
              </button>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}