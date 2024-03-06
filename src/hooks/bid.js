import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../hooks/useWeb3"
import Environment from "@/utils/Enviroment";
import { getMarketPlaceContract, getLaunchedPadContract } from "@/utils/contractHelpers";



export const BidTokens = () => {
  const web3 = useWeb3();
  const Marketplacecontract = Environment.marketPlaceContract;
  // const stableAddress = Environment.launchPadContract;
  const contract = getMarketPlaceContract(Marketplacecontract, web3);
  // const approvecontract = getStableContract(stableAddress, web3);
  // console.log(contract, "moizzzzzzz");
  const { account } = useWeb3React()
  const Bid = useCallback(
    async (adder, tokenID, fee) => {
      console.log("fee++++++++++++",adder, tokenID, fee)
      try {
        var gasFunPrice;
        web3.eth.getGasPrice().then((result) => {
          var result2 = parseInt(result)
          // // console.log("gasfun", typeof result2, result2)
          gasFunPrice = result2.toString()
        })
        // const allowance = await approvecontract.methods.allowance(account, Environment.marketPlaceContract).call();
        // const neededAllowance = '100000000000000000000000000000';
        // if (parseInt(allowance) === 0) {
        //   const approveGas = await approvecontract.methods.approve(Environment.marketPlaceContract, neededAllowance).estimateGas({ from: account });
        //   await approvecontract.methods.approve(Environment.marketPlaceContract, neededAllowance).send({ from: account, gas: approveGas });
        // }
        // console.log("urirrrrrrrrrrrr", tokenID)
        let weiAmount = web3.utils.toWei(parseFloat(fee.toString()).toFixed(4), "ether")
        let address2 = JSON.stringify(adder)
        console.log("final", typeof address2, tokenID)
        const gas = await contract.methods.placeBid(adder, tokenID).estimateGas({ value: weiAmount, from: account, gasPrice: gasFunPrice })
        const staked = await contract.methods.placeBid(adder, tokenID).send({ value: weiAmount, from: account, gas: gas, gasPrice: gasFunPrice })
          .on("transactionHash", (tx) => {
            return tx.transactionHash
          })
          .catch((error) => {
            throw error;
          });
        return staked;
      } catch (e) {
        throw e;
      }
    },
    [contract]
  );

  return { Bid: Bid };
};


export default BidTokens;