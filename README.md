<h1 align="center">
  <img alt="cgapp logo" src="https://vectorified.com/image/ethereum-logo-vector-13.png" width="224px"/><br/>
  Crowdy 
  <br/>
  
<br/>
</h1>
<p align="center">Crowdy is a crowd funding smart contract based on Ethereum blockchain, built with solidity and HardHat(for Testing and deployment). </p>
<p align="center">
<img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" alt="maintained"/>
<img src="https://img.shields.io/badge/License-MIT-green" alt="license"/>
</p>

## Contract Address
```
0x352CfCce7e597eC550990e888aA738fa2149fceA
```
[Verify on Etherscan](https://sepolia.etherscan.io/address/0x352CfCce7e597eC550990e888aA738fa2149fceA#code)


<br />

## 📃 Table of contents

- [Contract Address](#contract-address)
- [📃 Table of contents](#-table-of-contents)
- [🔧 Tech Stack](#-tech-stack)
- [📥 Installation](#-installation)
- [🔗 Setup Backend](#-setup-backend)
- [🤖 Commands](#-commands)
- [Technical Details](#technical-details)
  - [Variables](#variables)
  - [Structs](#structs)
  - [Events](#events)
  - [Modifiers](#modifiers)
  - [Functions](#functions)
- [👨🏻‍💻 Contributor](#-contributor)
- [📩 Contact Me 👇](#-contact-me-)


## 🔧 Tech Stack 
<p align="center">


<img src="https://img.shields.io/badge/Solidity-000000?style=for-the-badge&logo=solidity&logoColor=white" alt="Solidity"/>
<img src="https://img.shields.io/badge/HardHat-F59812?style=for-the-badge&logo=hardhat&logoColor=white" alt="hardhat"/>
<img src="https://img.shields.io/badge/Alchemy-0284C7?style=for-the-badge&logo=Alchemy&logoColor=0A0A0A" alt="Infura"/>
<img src="https://img.shields.io/badge/Remix%20IDE-334155?style=for-the-badge&logo=ethereum&logoColor=61DAFB" alt="vercel"/>
</p>



## 📥 Installation
- Start by cloning the repo with following command
```
git clone https://github.com/akashvaghela09/crowdy.git
```

## 🔗 Setup Backend
go to the backend folder and install dependencies 

```
cd backend && npm install
```

Create environment variables inside *.env* file as mentioned below 
```
SEPOLIA_RPC_URL
ETHERSCAN_API_KEY
PRIVATE_KEY
```

## 🤖 Commands
- Start local hardhat node
```
npx hardhat node
```
- Compile contracts
```
npx hardhat compile
```
- Run tests
```
npx hardhat test
```
- Run coverage
```
npx hardhat coverage
```
- Deploy contracts to local hardhat node
```
npm run deploy-local
```


- Deploy contracts to sepolia testnet
```
npm run deploy-sepolia
```
- Verify contracts on sepolia testnet
```
npm run verify-sepolia
```

## Technical Details 
| Feature              | Details                                     |
| -------------------- | ------------------------------------------- |
| Programming Language | Solidity                                    |
| Version              | 0.8.9                                       |
| Contract             | CrowdFunding                                |
| License              | MIT                                         |
| Description          | A smart contract for crowdfunding projects. |

### Variables
|Variable|	Description|
|--|--|
|nextId	| ID for the next project.|
|totalFundingRaised	|Total amount of funding raised.|
|dayCount	|The current day count.|
|owner	|The owner of the contract.|
|fundingRecords	|Mapping of Funding struct to their IDs.|

### Structs

|Struct|	Description|
|--|--|
|Funding	|Struct for storing project details, including ID, title, target amount, collected amount, deadline, status, and contributors.|
|Contributor|	Struct for storing contributor details, including refund ID and funded amount.|

### Events

|Event|	Description|
|--|--|
|newProjectAdded|	Broadcast that new projects is added.|
|contributionAdded	|Broadcast that contributions is added.|
|projectClosed|	Broadcast that projects is now closed.|
|refundTransferred	|Broadcast that refunds has transferred.|

### Modifiers

|Modifier|	Description|
|--|--|
|checkIfOwner()|	Checks if the caller is the contract owner.|
|checkIfReceiver()|	Checks if the caller is not the receiver of the funding.|
|checkIfOpen()|	Checks if the funding project is open.
|checkFundingAmount()|	Checks if the funding amount is valid.|
|checkIfValid()|	Checks if the funding project is valid (not paused).|

### Functions

|Function|	Description|
|--|--|
|addForFunding()	|Adds a new project for funding.|
|contribute()	|Contributes funds to a project.|
|refundFunds()	|Refunds funds to contributors for a specific project.|
|pauseFunding()	|Pauses funding for a specific project.|
|updateCounter()|	Update day count.|
|getProjectData()	|Retrieves the data of a specific project.|
|getAllProjectsData()	|Retrieves the data of all projects.|
|totalProjects()|	Retrieves the total number of projects.|
|getTotalFundRaised()	|Retrieves the total amount of funding raised.|

## 👨🏻‍💻 Contributor
- ## [Akash Vaghela](https://akash11.com)


## 📩 Contact Me 👇

<a href="https://github.com/akashvaghela09">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
</a>
<a href="https://linkedin.com/in/akashvaghela09">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Linkedin"/>
</a>
<a href="https://twitter.com/akashvaghela09">
    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter"/>
</a>