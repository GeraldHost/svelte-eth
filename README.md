# svelte-eth

Small ethers implementation for svelte 

> Note: Keep this codebase light. No more than 250 lines of code (maybe not including connectors once more are implemented)

# Install

```
yarn add svelte-eth
```

```
npm install svelte-eth
```

# Usage

### Connect

Connect and disconnect from injected provider like metamask. (ref: todo below)

```svelte
// App.svelte
<script>
  import { connect, disconnect, account, chainId } from "svelte-eth";
</script>

<button on:click={connect}>Connect</button>
<button on:click={disconnect}>Disconnect</button>

<p>Connect to chain ID: {$chainId}</p>
<p>Connected account: {$account}</p>
```

### Contract

Instantiate a contract and use it

```svelte
// App.svelte
<script>
  import { contract } from "svelte-eth";
  
  $: dai = contract(ADDRESS, ABI);
  $: balanceOf = () => $dai.balanceOf("0xAb......Cd");
</script>
```

You could also do this from within a file for example

```ts
// balanceOf.js
import { get } from "svelte/store";
import { contract } from "svelte-eth";

export default async function balanceOf(address) {
  const dai = get(contract(ADDRESS, ABI));
  return dai.balanceOf(address);
}
```

```svelte
// App.svelte
<script>
    import balanceOf from "./payable/mint.ts";
    
    const balance = balanceOf(address);
</script>
```

# Build 

```
yarn build
```

# Examples

To run the local example you can run the following commands

```
git clone https://github.com/GeraldHost/svelte-eth.git
cd svelte-eth && yarn && yarn build
cd example && yarn && yarn dev
```

# Todo
- Add connectors feature so we can build connectors for all the wallet and not just support to basic injected connector
