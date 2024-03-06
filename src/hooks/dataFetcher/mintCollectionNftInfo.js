import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import { getLaunchedPadContract } from "../../utils/contractHelpers";
import Environment from "@/utils/Enviroment";
import { useWeb3React } from '@web3-react/core';
const MintCollectionNftInfo = () => {
    const web3 = useWeb3();
    var { account } = useWeb3React();
    const mintCollectionNftsInfo = useCallback(
        async (collection) => {
            console.log(collection);
            const tokenAddress = collection;
            const contract = getLaunchedPadContract(tokenAddress, web3);
            try {
                // let gasPrice = await web3.eth.getGasPrice();
                const totalLimit = await contract.methods
                    .maxLimit()
                    .call()
                const minted = await contract.methods
                    .NFTsMinted()
                    .call()
                const maxMintLimit = await contract.methods
                    .maxMintLimit()
                    .call()
                console.log(totalLimit, minted, maxMintLimit);
                return {
                    totalLimit:  totalLimit, minted, maxMintLimit
                };
            } catch (error) {
                console.log("borrow", error)
                throw (error)
            }
        },
        [web3, account]
    );
    return { mintCollectionNftsInfo: mintCollectionNftsInfo };
};
export default MintCollectionNftInfo;