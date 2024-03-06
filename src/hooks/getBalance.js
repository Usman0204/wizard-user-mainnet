import { useCallback } from "react";
// import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../hooks/useWeb3"
import Environment from "@/utils/Enviroment";
// import { getMarketPlaceContract, getLaunchedPadContract } from "@/utils/contractHelpers";
import { getWcoreTokenContract } from "@/utils/contractHelpers";

export const GetBalance = () => {
  const web3 = useWeb3();
  const tokenAddress = Environment?.wcoretoken;
  const contract = getWcoreTokenContract(tokenAddress, web3);
  const GetBal = useCallback(async (account) => {
    const approved = await contract.methods.balanceOf(account).call();
    // let balance = web3.utils.fromWei(approved, "ether")
    let balance = parseInt(approved) / 1000000000000000000
    // console.log("balance", balance)
    return balance;
  }, [contract, web3]);

  return { GetBal: GetBal };
};

export default GetBalance;