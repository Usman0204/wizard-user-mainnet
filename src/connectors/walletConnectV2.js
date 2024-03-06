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
        chains: [1116],
        optionalChains: [1116],
        showQrModal: true
      },

      onError: (err => {
        console.log('erron in connector::::', err)
      })
    })
)
