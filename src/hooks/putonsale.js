import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../hooks/useWeb3";
import Environment from "@/utils/Enviroment";
// import { getMarketContract, getOnceNftContract } from "../../utils/contractHelpers";
import { getMarketPlaceContract, getLaunchedPadContract } from "@/utils/contractHelpers";

export const PutOnSaleTokens = () => {
    const web3 = useWeb3();
    const stakingAddress = Environment.marketPlaceContract;
    const mintAddress = Environment.launchPadContract;
    const contract = getMarketPlaceContract(stakingAddress, web3);
    // const approvecontract = getLaunchedPadContract(mintAddress, web3);
    // console.log(contract, "sufyan scverver");
    const { account } = useWeb3React()

    const OnSale = useCallback(
        async (tokenID, collectionAddr,  salePrice) => {
            console.log(tokenID, collectionAddr, salePrice);
            const approvecontract = getLaunchedPadContract(collectionAddr, web3);
            // console.log(salePrice, environment.Marketplace, tokenID, "jawadddddddddddddd")
            try {
                var gasFunPrice;
                web3.eth.getGasPrice().then((result) => {
                    var result2 = parseInt(result) + 2000000000 
                    // // console.log("gasfun", typeof result2, result2)
                    gasFunPrice = result2.toString()
                })
                // console.log('Putting on sale', environment.OnceNft, tokenID);
                const approveGas = await approvecontract.methods.approve(stakingAddress, tokenID).estimateGas({ from: account });
                await approvecontract.methods.approve(stakingAddress, tokenID).send({ from: account, gasPrice: gasFunPrice, gas: approveGas});
                console.log(gasFunPrice);
                // const allowance = await approvecontract.methods.allowance(account, stakingAddress).call();
                // if (approvecontract >= salePrice) {
                let weiAmount = web3.utils.toWei(salePrice.toString())
                const gas = await contract.methods.listItem(collectionAddr,tokenID, weiAmount).estimateGas({ from: account });
                const staked = await contract.methods.listItem(collectionAddr, tokenID, weiAmount).send({ from: account, gasPrice: gasFunPrice, gas: gas })
                    .on("transactionHash", (tx) => {
                        return tx.transactionHash;
                    })
                    .catch((error) => {
                        throw error;
                    });
                return staked;
                // } else {
                //     throw new Error('Insufficient allowance for sale');
                // }
            } catch (e) {
                console.log('Error putting on sale:', e);
                throw e;
            }
        },
        [contract, account, stakingAddress]
    );

    return { OnSale: OnSale };
};

export default PutOnSaleTokens;