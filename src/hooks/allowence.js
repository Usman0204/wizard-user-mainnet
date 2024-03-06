
import { useCallback } from "react";
// import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../hooks/useWeb3"
import Environment from "@/utils/Enviroment";
// import { getMarketPlaceContract, getLaunchedPadContract } from "@/utils/contractHelpers";
import { getWcoreTokenContract } from "@/utils/contractHelpers";



export const CoreAllowance =()=>{
    // const {account} = useWeb3React();
    const web3 = useWeb3();
    // console.log("account", account)
    // console.log("account+++++++++++++", account)
    const contractAddress = Environment?.wcoretoken;
    const contract = getWcoreTokenContract(contractAddress,web3);
    const AllowanceCore = useCallback (
        async(account) => {
            console.log("accoutn", account, Environment?.marketPlaceContract)
            // let val = web3.utils.toWei(spendBnb.toString(), "ether");
            try {
                const balance = await contract.methods.allowance(account,Environment?.marketPlaceContract).call()
                let bal = web3.utils.fromWei(balance, "ether")
                // console.log("response",bal)
                return bal;
            } catch (error) {
                console.log('9999999', error)
                throw error;
            }
        },[contract]
    );
    return { AllowanceCore: AllowanceCore };
}
export default CoreAllowance;