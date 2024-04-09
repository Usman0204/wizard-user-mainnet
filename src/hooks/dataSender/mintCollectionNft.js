import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import { getLaunchedPadContract } from "../../utils/contractHelpers";
import Environment from "@/utils/Enviroment";
import { useWeb3React } from '@web3-react/core';
const MintCollectionNft = () => {
    const web3 = useWeb3();
    var { account } = useWeb3React();
    const mintCollectionNfts = useCallback(
        async (collection, amount) => {
            console.log('collection',collection, amount);
            const contract = getLaunchedPadContract(collection, web3);
            // let amountWei= web3.utils.toWei(nd.toString(), "ether");
            var gasFunPrice;
            web3.eth.getGasPrice().then((result) => {
                var result2 = parseInt(result) + 2000000000 
                // // // console.log("gasfun", typeof result2, result2)
                gasFunPrice = result2.toString()
            })
            // console.log(nd, pId, amount,nd, totalPrice);
            try {
                const gas = await contract.methods
                    .mintToken(account, amount )
                    .estimateGas({ from: account });
                // let gasPrice = await web3.eth.getGasPrice();
                const details = await contract.methods
                    .mintToken(account, amount )
                    .send({
                        from: account,
                        gas,
                        gasPrice: gasFunPrice
                    })
                return details;
            } catch (error) {
                // console.log("borrow", error)
                throw (error)
            }
        },
        [web3, account]
    );
    return { mintCollectionNfts: mintCollectionNfts };
};
export default MintCollectionNft;