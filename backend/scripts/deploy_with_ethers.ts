// This script can be used to deploy the "Storage" contract using ethers.js library.
// Please make sure to compile "./contracts/1_Storage.sol" file before running this script.
// And use Right click -> "Run" from context menu of the file to run the script. Shortcut: Ctrl+Shift+S

import { deploy } from './ethers-lib'

(async () => {
    try {
        const master = await deploy('Master', [],"")
        console.log(`address: ${master.address}`)
        const coverDescript = await deploy('CoverNFTDescriptor',[master.address],'cover/')
        console.log(`address: ${coverDescript.address}`)
        const coverNFT = await deploy('CoverNFT', ['HedgeHog Protocol','HEDH',"0x0000000000000000000000000000000000000000",coverDescript.address],"cover/"); 
        console.log(`address: ${coverNFT.address}`)
        const cover = await deploy('Cover', [coverNFT.address,master.address],"cover/"); 
        console.log(`address: ${cover.address}`)

        


    } catch (e) {
        console.log(e.message)
    }
  })()