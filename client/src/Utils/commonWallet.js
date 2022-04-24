import { ethers } from "ethers";
import myContractData from "../artifacts/contracts/CrowdFunding.sol/CrowdFunding.json";
import { toast } from 'react-toastify';

const abi = myContractData.abi;
const contract_address = process.env.REACT_APP_CONTRACT_ADDRESS;

const ethersProvider = ethers.getDefaultProvider(process.env.REACT_APP_RINKEBY_URL);
const guestWallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, ethersProvider);
let mySigner = guestWallet.connect(ethersProvider)

let commonWallet = new ethers.Contract(
    contract_address,
    abi,
    mySigner
);

export default commonWallet;