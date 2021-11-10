import { get } from "svelte/store";
import store, { provider as providerStore } from "./svelte-eth";
import { CONNECT_KEY } from "./constants";

export default async function connect() {
  const provider = get(providerStore);

  const accounts = await provider.send("eth_requestAccounts", []);

  store.update((state) => ({ ...state, account: accounts[0] }));

  window.localStorage.setItem(CONNECT_KEY, "true");
}
