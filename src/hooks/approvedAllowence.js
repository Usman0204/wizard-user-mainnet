import { useCallback } from "react";
// import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../hooks/useWeb3"
import Environment from "@/utils/Enviroment";
// import { getMarketPlaceContract, getLaunchedPadContract } from "@/utils/contractHelpers";
import { getWcoreTokenContract } from "@/utils/contractHelpers";

export const ApproveAllow =()=>{
    // const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment?.wcoretoken;    
    const contract = getWcoreTokenContract(contractAddress,web3);
    let value = "99999999999999999999999";
    
    const ApproveTokenAllow = useCallback (
        async(account) =>{
            console.log("_________", account, Environment?.marketPlaceContract)
            try {
                const approveGas = await contract.methods.approve(Environment?.marketPlaceContract,value).estimateGas({ from: account });
                const balance = await contract.methods.approve(Environment?.marketPlaceContract,value).send({from:account, gas: approveGas})
                // console.log('eeeeeeeeee', balance);
                return balance
            } catch (error) {
                console.log('9999999', error)
                throw error;
            }
        },[contract]
    );
    return { ApproveTokenAllow: ApproveTokenAllow };
}
export default ApproveAllow;
