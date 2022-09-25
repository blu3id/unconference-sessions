<script lang="ts">
  import type { SessionData } from '../store/sessions';
  import Session from './session.svelte';

  export let timeslot: Array<SessionData>;
</script>

<section>
  {#if timeslot[0].session % 1 !== 0}
    <h2 class="timing">{timeslot[0].title} - {timeslot[0].time}</h2>
  {:else}
    <h2>Session {timeslot[0].session} - {timeslot[0].time}</h2>
    <div>
      {#each timeslot as session}
        <Session {session} />
      {/each}
    </div>
  {/if}
</section>
