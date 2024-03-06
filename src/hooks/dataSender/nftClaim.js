import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import { getNtLaunchedPadContract } from "../../utils/contractHelpers";
import Environment from "@/utils/Enviroment";
import { useWeb3React } from '@web3-react/core';
const NftClaim = () => {
    const web3 = useWeb3();
    var { account } = useWeb3React();
    const nftClaim = useCallback(
        async (id) => {
            const tokenAddress =  Environment.nftLaunchpad;
            const contract = getNtLaunchedPadContract(tokenAddress, web3);
            // let amountWei= web3.utils.toWei(nd.toString(), "ether");
            var gasFunPrice;
            web3.eth.getGasPrice().then((result) => {
                var result2 = parseInt(result) 
                // // console.log("gasfun", typeof result2, result2)
                gasFunPrice = result2.toString()
            })
            try {
                // const gas = await contract.methods
                //     .claim(id)
                //     .estimateGas({from: account });
                // let gasPrice = await web3.eth.getGasPrice();
                const details = await contract.methods
                    .claim(id)
                    .send({
                        from: account,
                        // gas,
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
    return { nftClaim: nftClaim };
};
export default NftClaim;