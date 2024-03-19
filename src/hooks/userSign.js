// import { useEffect, useCallback, useState } from "react";
// import { useWeb3React } from "@web3-react/core";
// import { connectorsByName, getLibraryForSign } from "../utils/web3React";
// import { ethers } from "ethers";
// import useWeb3 from "./useWeb3";

// const Signature = (data) => {
//   const { account } = useWeb3React();
//   const web3 = useWeb3();
//   let library = null;

//   const ConnectorNames = {
//     Injected: "injected",
//     WalletConnect: "walletconnect",
//     BSC: "bsc"
//   }
//   useEffect(() => {
//     const fetchData = async () => {
//       const connectorId = window.localStorage.getItem("connectorId");
//       if (connectorId && connectorId === ConnectorNames.Injected && account) {
//         library = getLibraryForSign(web3?.givenProvider);
//       } else {
//         if (connectorsByName.walletconnect.provider) {
//           library = getLibraryForSign(connectorsByName.walletconnect.provider);
//         }
//       }
//     };

//     fetchData();
//   }, []);

//   const sign = useCallback(async () => {
//     try {
//       console.log("Attempting", account);
//       console.log("connectorId", ConnectorNames.Injected);
//       if (library && account) {
//         let signature;
//         console.log("Signing");
//         signature = await library.send(
//           'personal_sign',
//           [ethers.utils.hexlify(ethers.utils.toUtf8Bytes(account.toLowerCase())), account.toLowerCase()]
//         );
//         console.log("obtained", signature);
//         return signature;
//       }
//     } catch (error) {
//       console.error("Error", error);
//       throw error;
//     }
//   }, [account, library]);

//   return { userSign: sign };
// };

// export default Signature;

// yesterday


// import { useCallback, useState, useEffect } from "react";
// import { useWeb3React } from "@web3-react/core";
// import { getLibraryForSign } from "../utils/web3React";
// import useLibrary from "./useLibrary";
// import { ethers } from "ethers";
// import useWeb3 from "../hooks/useWeb3";
// import { connectorsByName } from "../utils/web3React";


// const useSignature = (wab) => {
//   const web3 = useWeb3()
//   const { account } = useWeb3React();
//   const { library1, connectorId } = useLibrary();
//   let library = null
//   if (web3 && account) {
//     // console.log("web3========================", web3)
//     const connectorId = window.localStorage.getItem("connectorId")
//     if (connectorId === 'injected') {
//       library = getLibraryForSign(web3?.givenProvider);
//     } else {
//       library = getLibraryForSign(connectorsByName?.walletconnect.provider);
//     }
//   }
//   const sign = useCallback(
//     async () => {
//       // console.log("hereere",account,web3)

//       // console.log("Ssoos", web3)
//       if (account && web3) {
//         const connectorId = window.localStorage.getItem("connectorId")
//         if (connectorId === 'injected') {
//           library = getLibraryForSign(web3?.givenProvider);
//         } else {
//           library = getLibraryForSign(connectorsByName?.walletconnect.provider);
//         }
//       }
//       // console.log("oooow", library)
//       if (library && account) {
//         try {
//           let signature = await library.send(
//             'personal_sign',
//             [ethers.hexlify(ethers.toUtf8Bytes(account)), account.toLowerCase()]
//           );
//           // console.log("here2222",signature)
//           return signature;
//         } catch (error) {
//           console.log("!!!!!!!!xx", error)
//           throw error;
//         }
//       }
//     },
//     [account, web3]
//   );

//   return { userSign: sign };
// };

// export default useSignature;



// import { useWeb3React } from "@web3-react/core";
// import { useCallback } from "react";
// // import Web3 from "web3";
// import { getLibraryForSign } from "../utils/web3React";
// import 'react-toastify/dist/ReactToastify.css';
// import useWeb3 from "../hooks/useWeb3";
// import { connectorsByName } from "../utils/web3React";

// import { ethers } from "ethers";
// export const useSignature = (data) => {
//   // const { account } = useWeb3React()
//   const { account } = useWeb3React()
//   const web3 = useWeb3()
//   var library = null;
//   if (web3 && account) {
//     const connectorId = window.localStorage.getItem("connectorId")
//     if (connectorId === 'injected' && account) {
//       library = getLibraryForSign(web3?.givenProvider);
//     } else {
//       if (connectorsByName.walletconnect.provider) {
//         library = getLibraryForSign(connectorsByName.walletconnect.provider);
//       }
//     }
//   }

//   const sign = useCallback(async (accountData) => {
//     if ((library && account)) {
//       try {
//         if (web3 && account) {
//           const connectorId = window.localStorage.getItem("connectorId")
//           if (connectorId === 'injected') {
//             library = getLibraryForSign(web3?.givenProvider);
//           } else {
//             library = getLibraryForSign(connectorsByName.walletconnect.provider);
//           }
//           let signature = await library.send(
//             'personal_sign',
//             [ethers.hexlify(ethers.toUtf8Bytes(account)), account.toLowerCase()]
//           );
//           return signature
//         }


//       }
//       catch (error) {
//         return false
//       }
//     }
//   }, [account, library, data])
//   return { userSign: sign }
// }
// export default useSignature




import { useCallback, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { getLibraryForSign } from "../utils/web3React";
import useLibrary from "./useLibrary";
import { ethers } from "ethers";
import useWeb3 from "../hooks/useWeb3";
import { connectorsByName } from "../utils/web3React";


const useSignature = (wab) => {
  const web3 = useWeb3()
  const { account } = useWeb3React();
  // const { library1, connectorId } = useLibrary();
  let library = null
  // if (web3 && account) {
    const connectorId = typeof window !== 'undefined' ? window.localStorage.getItem("connectorId") : null;
    if (connectorId === 'injected' && account) {
      library = getLibraryForSign(web3?.givenProvider);
    } else {
      if (connectorsByName.walletconnect.provider) {
        library = getLibraryForSign(connectorsByName.walletconnect.provider);
      }
    }



  const sign = useCallback(
    async () => {
      console.log("hereere", account, web3)
      const connectorId = window.localStorage.getItem("connectorId")
      // console.log("Ssoos", web3)
      if (connectorId === 'injected' && account) {
        library = getLibraryForSign(web3?.givenProvider);
      } else {
        // return console.log(“connectorsByName”, connectorsByName[‘walletconnect’])
        if (connectorsByName?.walletconnect?.provider) {
          library = getLibraryForSign(connectorsByName?.walletconnect?.provider);
        }
      }
      // console.log("oooow", library)
      if (library && account) {
        console.log("web3========================", web3, account, library)
        try {
          let signature = await library.send(
            'personal_sign',
            [ethers.hexlify(ethers.toUtf8Bytes(account)), account.toLowerCase()]
          );
          // console.log("here2222",signature)
          return signature;
        } catch (error) {
          console.log("!!!!!!!!xx", error)
          throw error;
        }
      }
    },
    [account, web3,connectorId]
  );

  return { userSign: sign };
};

export default useSignature;




