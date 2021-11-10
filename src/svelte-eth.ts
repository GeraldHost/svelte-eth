import { ethers } from "ethers";
import { derived, writable } from "svelte/store";
import { CONNECT_KEY } from "./constants";

interface IStore {
  provider?: any;
  account?: string;
  chainId?: number;
}

const store = writable<IStore>({});

async function initWeb3() {
  const injectedEthereum = (window as any).ethereum;

  const provider = new ethers.providers.Web3Provider(injectedEthereum, "any");
  const { chainId } = await provider.getNetwork();
  store.set({ chainId, provider });

  if (window.localStorage.getItem(CONNECT_KEY) === "true") {
    const accounts = await provider.send("eth_requestAccounts", []);
    if (accounts[0]) {
      store.update((state) => ({ ...state, account: accounts[0] }));
    }
  }

  injectedEthereum.on("accountsChanged", (accounts: string[]) => {
    store.update((state) => ({ ...state, account: accounts[0] }));
  });

  injectedEthereum.on("chainChanged", (chainId: string) => {
    store.update((state) => ({ ...state, chainId: Number(chainId) }));
  });

  return store;
}

initWeb3();

export const chainId = derived(store, ($store) => $store.chainId);

export const account = derived(store, ($store) => $store.account);

export const provider = derived(store, ($store) => $store.provider);

export default store;
