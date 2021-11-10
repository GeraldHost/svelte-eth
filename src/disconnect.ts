import store from "./svelte-eth";
import { CONNECT_KEY } from "./constants";

export default function disconnect() {
  store.update((state) => ({ ...state, account: undefined }));

  window.localStorage.setItem(CONNECT_KEY, "false");
}
