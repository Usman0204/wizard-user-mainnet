import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import { getNtLaunchedPadContract } from "../../utils/contractHelpers";
import Environment from "@/utils/Enviroment";
import { useWeb3React } from '@web3-react/core';
const WhiteListed = () => {
    const web3 = useWeb3();
    var { account } = useWeb3React();
    const whitelistedInfo = useCallback(
        async (projectId,stageId,address) => {
            const tokenAddress =  Environment.nftLaunchpad;
            const contract = getNtLaunchedPadContract(tokenAddress, web3);
            try {
                // let gasPrice = await web3.eth.getGasPrice();
                const details = await contract.methods
                    .stageWhitelists(projectId, stageId, address)
                    .call()
                return details;
            } catch (error) {
                // console.log("borrow", error)
                throw (error)
            }
        },
        [web3, account]
    );
    return { whitelistedInfo: whitelistedInfo };
};
export default WhiteListed;