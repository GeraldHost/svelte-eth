import { ethers } from "ethers";
import { derived } from "svelte/store";
import { provider } from "./svelte-eth";

export default function contract(
  address: string,
  abi: ethers.ContractInterface
) {
  return derived(provider, ($provider) => {
    if ($provider && address && abi) {
      return new ethers.Contract(address, abi, $provider);
    }
    return null;
  });
}
