// import web3NoAccount from './web3'
// import factoryAbi from "./factoryAbi.json"
// import collection from "./collectionAbi.json"
// import wethAbi from "./wethAbi.json"
import marketplace from '@/utils/MarketplaceAbi.json'
import launchpadcontract from '@/utils/LaunchPadAbi.json'
import nftLaunchpad from '@/utils/nftLaunchpad.json'
import wcoreToken from '@/utils/WcoreTokenAbi.json'
// import factAbi from "./factAbi.json"
// import mintAbi from '../utils/mintAbi.json';
// import stableAbi from '../utils/stableAbi.json';


const getContract = (abi, address, web3) => {
    const _web3 = web3 ?? web3NoAccount;
    // console.log('_web3',_web3);
    return new _web3.eth.Contract(abi, address)
}

// export const getCollectionContract = (address, web3) => {
//     return getContract(collection, address, web3)
// }
export const getMarketPlaceContract = (address, web3) => {
    return getContract(marketplace, address, web3)
}

export const getWcoreTokenContract = (address, web3) => {
    return getContract(wcoreToken, address, web3)
}

export const getLaunchedPadContract = (address, web3) => {
    return getContract(launchpadcontract, address, web3)
}
export const getNtLaunchedPadContract = (address, web3) => {
    return getContract(nftLaunchpad, address, web3)
}

// export const getFactContract = (address, web3) => {
//     return getContract(factAbi, address, web3)
// }
// export const getOnceNftContract = (address, web3) => {
//     return getContract(mintAbi, address, web3)
// }
// export const getMarketContract = (address, web3) => {
//     return getContract(marketPlace, address, web3)
// }
// export const getStableContract = (address, web3) => {
//     return getContract(stableAbi, address, web3)
// }

// export const getUSDTContract = (address, web3) => {
//     return getContract(USDTAbi, address, web3)
// }

// export const getWethContract = (address, web3) => {
//     return getContract(wethAbi, address, web3)
// }

// export const getUSDTMainContract = (address, web3) => {
//     return getContract(USDTMainAbi, address, web3)
// }