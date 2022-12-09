import React,{useEffect,useContext} from 'react'
import Confetti from 'react-confetti'
import { WalletContext } from '../Context/WalletContext';

console.log("Called")
export default () => {

  const {setTransactionprocess} = useContext(WalletContext);
  const width = window.width;
  const height = window.height;

  useEffect((
    setInterval(() => {
        setTransactionprocess(false);
    }, 5000)
),[])
  return (
    <Confetti
      width={width}
      height={height}
    />
  )
}