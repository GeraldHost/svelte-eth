<script lang="ts">
  import { connect, disconnect, account, chainId } from "../../dist/index.js";

  const validChainId = 137;
</script>

<main>
  <h1>svelte-eth example</h1>

  {#if $chainId !== validChainId}
    <p>Invalid chain. Connect to chain ID {validChainId}</p>
  {:else if !$account}
    <button on:click={connect}>Connect</button>
  {/if}

  {#if $account}
    <button on:click={disconnect}>Disconnect {$account?.slice(0, 6)}</button>
  {/if}
</main>


