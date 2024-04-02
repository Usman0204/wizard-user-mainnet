import { initializeConnector } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

// import { MAINNET_CHAINS } from '../chains'

// const [mainnet, ...optionalChains] = Object.keys(MAINNET_CHAINS).map(Number)


// console.log("mainnet", mainnet)
// console.log("optionalChains", optionalChains)

export const [walletConnectV2, hooks] = initializeConnector(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: "c4ec78a803d413d1caad6a1a808a6738",
        chains: [1115],
        optionalChains: [1115],
        showQrModal: true
      },

      onError: (err => {
        console.log('erron in connector::::', err)
      })
    })
)


// export const [walletConnectV2, hooks] = initializeConnector(
//   (actions) =>
//     new WalletConnectV2({
//       actions,
//       options: {
//         projectId: "202a3d538b088d735b99722b0cea4910",
//         chains: [1115],
//         optionalChains: [1115],
//         showQrModal: true
//       },
//       timeout : 10000,
//       onError: (err => {
//         console.log('erron in connector::::', err)
//       })
//     })
// )