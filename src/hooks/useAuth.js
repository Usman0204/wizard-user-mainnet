// import { useToast } from "../state/hooks";
import { connectorsByName } from "../utils/web3React";

const useAuth = () => {
  // const { toastError } = useToast();

  const login = async (connectorID) => {
    console.log("connector", connectorID);
    const connector = connectorsByName[connectorID];
    if (connector) {
      if (connectorID === "injected") {
        await connector.activate(1115);
      } else {
        await connector.activate();
      }
    } else {
      // toastError("Can't find connector", "The connector config is wrong");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const logout = async (connectorID) => {
    const connector = connectorsByName[connectorID];
    if (connector) {
    if (connector?.deactivate) {
      await connector.deactivate()
    } else {
      await connector.resetState()
    }
      // await connector.deactivate()
    } else {
      // toastError("Can't find connector", "The connector config is wrong");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return { login, logout };
};

export default useAuth;





// import { connectorsByName } from "../utils/web3React";
// import { setupNetwork } from "../utils/wallet";


// const useAuth = () => {
//   const login = async (connectorID, chain) => {
//     const connector = connectorsByName[connectorID];
//     if (connector) {
//       if (chain === '1115') {
//         console.log(chain, 'Ethereum TestNet Georli');
//         const hasSetup = await setupNetwork(chain);
//         if (hasSetup) {
//           await connector.activate(parseInt(chain));
//         }
//       } 
//       // else if (chain === '56') {
//       //   console.log(chain, 'Binance Smart Chain Mainnet');
//       //   const hasSetup = await setupNetwork(chain);
//       //   if (hasSetup) {
//       //     await connector.activate(parseInt(chain));
//       //   }
      
//       // }
//       else if (chain === '1115') {
//         console.log(chain, 'core mainnet');
//         const hasSetup = await setupNetwork(chain);
//         if (hasSetup) {
//           await connector.activate(parseInt(chain));
//         }
//       }
//       // else if (chain === '1115') {
//       //   console.log(chain, 'mainnet');
//       //   const hasSetup = await setupNetwork(chain);
//       //   if (hasSetup) {
//       //     await connector.activate(parseInt(chain));
//       //   }
//       // }
//       // else if (chain === '80001') {
//       //   console.log(chain, 'Mumbai Testnet (Polygon network)');
//       //   const hasSetup = await setupNetwork(chain);
//       //   if (hasSetup) {
//       //     await connector.activate(parseInt(chain));
//       //   }
//       //   // else if (chain === '5') {
//       //   //   console.log(chain, 'Goerli');
//       //   //   const hasSetup = await setupNetwork(chain);
//       //   //   if (hasSetup) {
//       //   //     await connector.activate(parseInt(chain));
//       //   //   }
//       //   // }
//       // } 
      
//       else {
//         console.error('Unsupported chain');
//       }

//     }
//     else {
//       console.error('Invalid connector');
//     }
//   };


//   const logout = async () => {
//     const connectorID = window.localStorage.getItem("connectorId")
//     const connector = connectorsByName[connectorID];
//     if (connector) {
//       if (connector?.deactivate) {
//         await connector.deactivate()
//       } else {
//         await connector.resetState()
//       }
//     } else {
//       // toastError("Can't find connector", "The connector config is wrong");
//     }
//   };
//   return { login, logout };
// };

// export default useAuth;