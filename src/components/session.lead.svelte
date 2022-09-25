<script lang="ts">
  export let leader: string;
</script>

{#if leader}
  <li>
    {#if leader.startsWith('@')}
      <a href="https://twitter.com/{leader.substring(1)}">{leader}</a>
    {:else}
      {leader}
    {/if}
  </li>
{/if}
