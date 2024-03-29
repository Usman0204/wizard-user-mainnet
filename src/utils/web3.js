import random from 'lodash/random'
import Web3 from "web3";
import getRpcUrl from './getRpcUrl'


// Array of available nodes to connect to
export const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2, process.env.REACT_APP_NODE_3]
// export const nodes = ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"]
const getWeb3NoAccount = () => {
  return web3NoAccount;
}

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}
const RPC_URL = getRpcUrl() || "https://default-rpc-url.com";
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 });
const web3NoAccount = new Web3(httpProvider)


export { getWeb3NoAccount }
export default getNodeUrl



// import Web3 from 'web3'
// import getRpcUrl from './getRpcUrl'

// const RPC_URL = getRpcUrl()
// const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 })
// const web3NoAccount = new Web3(httpProvider)

// const getWeb3NoAccount = () => {
//   return web3NoAccount
// }

// export { getWeb3NoAccount }
// export default web3NoAccount