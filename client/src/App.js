
import React, { useEffect } from 'react';
import './App.css';
import { ethers } from "ethers";
import { abi } from './helper';
import { AllRoutes } from './Routes/AllRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { setApplicationList, setContractInstance, setTotalApplication, setTotalFundRaised } from './Redux/app/actions';
import { Header } from './Component/Header';


function App() {
  const dispatch = useDispatch();
  const {
    totalFundRaised,
    totalApplication,
    applicationList
} = useSelector((state) => state.app)
  useEffect(() => {
        
    // method 1 => with JsonRpcProvider/Infura 
    // const ethersProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RINKEBY_URL);
    // const wallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, ethersProvider);
    
    // method 2 => with Web3Provider/MetaMask
    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    
    
    (async () => {
      // let mySigner = wallet.connect(ethersProvider); // for method 1
      let mySigner = await ethersProvider.getSigner(); // for method 2
      console.log("Signer is : ", mySigner._isSigner);
      
      
      let contractObj = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS, 
        abi,
        mySigner
        );

      dispatch(setContractInstance(contractObj))

      const totalraised = await contractObj.getTotalFundRaised()
      dispatch(setTotalFundRaised(totalraised.toString()));

      const totalraisedList = await contractObj.totalFundings()
      dispatch(setTotalApplication(totalraisedList.toString()));

      const rawList = [...applicationList]
      for(let i = 0; i < totalraisedList; i++){
        let itemObj = {}
        const item = await contractObj.getFundingData(i);

        // Set values
        itemObj.id = item.id.toString();
        itemObj.collection = item.collection.toString();
        itemObj.target = item.target.toString();
        itemObj.title = item.title;
        itemObj.description = item.description;
        itemObj.imageUrl = item.imageUrl;
        itemObj.receiver = item.receiver;
        itemObj.isOpen = item.isOpen;
        itemObj.isValid = item.isValid;

        rawList.push(itemObj);
        dispatch(setApplicationList([...rawList]))

      }
    })();

  }, []);

  return (
    <div className="App">
      <Header />
      <AllRoutes />
    </div>
  );
}

export default App;
