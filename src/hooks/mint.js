import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import Environment from "@/utils/Enviroment";
import { getLaunchedPadContract } from "@/utils/contractHelpers";
import axios from "axios";

export const MintTokens = () => {
    const { account } = useWeb3React()
    const web3 = useWeb3();
    const launchpadaddress = Environment.launchPadContract;
    const contract = getLaunchedPadContract(launchpadaddress, web3);

    const Mint = useCallback(
        async (count, account, amount, projectid) => {
            try {
                const gas = await contract.methods.purchaseTokens(projectid, count)
                    .estimateGas({ from: account, value: web3.utils.toWei((amount * count).toString()) })

                const staked = await contract.methods.purchaseTokens(projectid, count)
                    .send({ from: account, gas: gas, value: web3.utils.toWei((amount * count).toString()) })
                    .on("transactionHash", (tx) => {
                        return tx.transactionHash;
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

    return { Mint: Mint };
};

export default MintTokens;