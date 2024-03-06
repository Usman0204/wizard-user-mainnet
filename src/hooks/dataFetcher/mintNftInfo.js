import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import { getNtLaunchedPadContract } from "../../utils/contractHelpers";
import Environment from "@/utils/Enviroment";
import { useWeb3React } from '@web3-react/core';
const MintNftInfo = () => {
    const web3 = useWeb3();
    var { account } = useWeb3React();
    const mintNftsInfo = useCallback(
        async (projectId) => {
            const tokenAddress =  Environment.nftLaunchpad;
            const contract = getNtLaunchedPadContract(tokenAddress, web3);
            try {
                // let gasPrice = await web3.eth.getGasPrice();
                const details = await contract.methods
                    .purchasedNftsInfo(account, projectId )
                    .call()
                return details;
            } catch (error) {
                // console.log("borrow", error)
                throw (error)
            }
        },
        [web3, account]
    );
    return { mintNftsInfo: mintNftsInfo };
};
export default MintNftInfo;