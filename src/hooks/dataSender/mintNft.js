import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import { getNtLaunchedPadContract } from "../../utils/contractHelpers";
import Environment from "@/utils/Enviroment";
import { useWeb3React } from '@web3-react/core';
const MintNft = () => {
    const web3 = useWeb3();
    var { account } = useWeb3React();
    const mintNfts = useCallback(
        async (purchaseTokens, pId,amount,_id) => {
            // console.log('purchaseTokens',purchaseTokens, pId, amount, _id);
            let totalPrice= parseFloat(purchaseTokens) * amount
            const tokenAddress =  Environment.nftLaunchpad;
            const contract = getNtLaunchedPadContract(tokenAddress, web3);
            let nd = parseFloat(totalPrice)?.toFixed(6);
            // let amountWei= web3.utils.toWei(nd.toString(), "ether");
            var gasFunPrice;
            web3.eth.getGasPrice().then((result) => {
                var result2 = parseInt(result) 
                // // // console.log("gasfun", typeof result2, result2)
                gasFunPrice = result2.toString()
            })
            nd = web3.utils.toWei(nd.toString(), "ether");
            console.log(pId, _id, amount, nd, 'utils');

            try {
                const gas = await contract.methods
                    .purchaseTokens(pId, _id, amount )
                    .estimateGas({ value: nd, from: account });
                // let gasPrice = await web3.eth.getGasPrice();
                const details = await contract.methods
                    .purchaseTokens(pId, _id, amount )
                    .send({
                        value: nd,
                        from: account,
                        gas,
                        gasPrice: gasFunPrice
                    })
                return details;
            } catch (error) {
                console.log("borrow", error)
                throw (error)
            }
        },
        [web3, account]
    );
    return { mintNfts: mintNfts };
};
export default MintNft;