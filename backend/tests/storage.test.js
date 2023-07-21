// Right click on the script name and hit "Run" to execute
const { expect } = require("chai");
const { ethers } = require("hardhat");
const px_basis_point = 10000;
const qty_basis_point = 100000000;
const account = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
describe("Storage", function () {

  var masterAddress;
  var coverAddress;
  it("test deploy", async function () {

      const Master = await ethers.getContractFactory("Master");
      const master = await Master.deploy();
      await master.deployed();
      console.log(`Master address: ${master.address}`);
      masterAddress = master.address;

      const CoverNFTDescriptor = await ethers.getContractFactory("CoverNFTDescriptor");
      const coverNFTDescriptor = await CoverNFTDescriptor.deploy(master.address);
      await coverNFTDescriptor.deployed();
      console.log(`CoverNFTDescriptor address: ${coverNFTDescriptor.address}`);


      const CoverNFT = await ethers.getContractFactory("CoverNFT");
      const coverNFT = await CoverNFT.deploy('HedgeHog Protocol','HEDH',account,coverNFTDescriptor.address);
      await coverNFT.deployed();
      console.log(`CoverNFT address: ${coverNFT.address}`);
      

      const Cover = await ethers.getContractFactory("Cover");
      const cover = await Cover.deploy(coverNFT.address,master.address);
      await cover.deployed();
      console.log(`Cover address: ${cover.address}`);
      coverAddress = cover.address;

      const HEDHToken = await ethers.getContractFactory("HEDHToken");
      const hedhToken = await HEDHToken.deploy();
      await hedhToken.deployed();
      console.log(`HEDHToken address: ${hedhToken.address}`);

      const Pool = await ethers.getContractFactory("Pool");
      const pool = await Pool.deploy(hedhToken.address,master.address);
      await pool.deployed();
      console.log(`Pool address: ${pool.address}`);

      const MCR = await ethers.getContractFactory("MCR");
      const mcr = await MCR.deploy(master.address);
      await mcr.deployed();
      console.log(`mcr address: ${mcr.address}`);
      //pool cover mcr
      await master.setPoolAddress(pool.address);
      await master.setMCRAddress(mcr.address);
      await master.setCoverAddress(cover.address);

      await coverNFT.changeOperator(cover.address);

      const Assessment = await ethers.getContractFactory("Assessment");
      const assess = await Assessment.deploy();
      await assess.deployed();
      console.log(`assess address: ${assess.address}`);

      //address hedhAddress, address coverNFTAddress,address _master
      const IndividualClaims = await ethers.getContractFactory("IndividualClaims");
      const individualClaims = await IndividualClaims.deploy(hedhToken.address,coverNFT.address,master.address);
      await individualClaims.deployed();
      console.log(`individualClaims address: ${individualClaims.address}`);

      await master.setAssessmentAddress(assess.address);

        // const master = await deploy('Master', [],"")
        // console.log(`address: ${master.address}`)
        // const coverDescript = await deploy('CoverNFTDescriptor',[master.address],'cover/')
        // console.log(`address: ${coverDescript.address}`)
        // const coverNFT = await deploy('CoverNFT', ['HedgeHog Protocol','HEDH',"0x0000000000000000000000000000000000000000",coverDescript.address],"cover/"); 
        // console.log(`address: ${coverNFT.address}`)
        // const cover = await deploy('Cover', [coverNFT.address,master.address],"cover/"); 
        // console.log(`address: ${cover.address}`)

    // const Storage = await ethers.getContractFactory("Storage");
    // const storage = await Storage.deploy();
    // await storage.deployed();
    // console.log('storage deployed at:'+ storage.address)
    // expect((await storage.retrieve()).toNumber()).to.equal(0);
  });
   it("test updating and retrieving updated value", async function () {
      const cover = await ethers.getContractAt("Cover",coverAddress);
      console.log(coverAddress);
      const master = await ethers.getContractAt("Master",masterAddress);
    

    // address token0;
    // address token1;
    // uint token1Qty;
    // uint token0Qty;
    // uint lowerBoundRatio;
    // uint upperBoundRatio;
    // uint period;
    // string pairStr;
// 
    // BuyCover:
    // ["0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000",1,1500,1200,1600,60,"ETH DAI Pair"]


      // await cover.buyCover(["0x0000000000000000000000000000000000000000",
      //                       "0x0000000000000000000000000000000000000000",
      //                       "1",
      //                       "1500",
      //                       "1200",
      //                       "1600",
      //                       "60",
      //                       "ETH DAI Pair"
      //                     ]);


    // const Storage = await ethers.getContractFactory("Storage");
    // const storage = await Storage.deploy();
    // await storage.deployed();
    // const storage2 = await ethers.getContractAt("Storage", storage.address);
    // const setValue = await storage2.store(56);
    // await setValue.wait();
    // expect((await storage2.retrieve()).toNumber()).to.equal(56);
  });
});