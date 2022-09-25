<script lang="ts">
  import { replace } from 'svelte-spa-router';
  import type { UnconferenceConfigBranding } from '../main';
  import Years from './years.svelte';
  import Timeslot from './timeslot.svelte';
  import { sessionsStore } from '../store/sessions';

  const { sessions } = sessionsStore;

  export let name: string;
  export let branding: UnconferenceConfigBranding;
  export let refreshTime: number;
  export let params: RouterParams | undefined;

  type RouterParams = {
    groups: Record<string, number>;
  };

  const currentYear: number = new Date().getFullYear();
  let year: number;

  $: {
    if (!params || !params.groups || !params.groups.year) {
      year = currentYear;
    } else if ($sessions && params.groups.year in $sessions) {
      year = params.groups.year;
    } else if ($sessions) {
      // eslint-disable-next-line no-void
      void replace('/');
    } else {
      year = params.groups.year;
    }
  }
</script>

<svelte:head>
  <title>{`${name} ${year} Session Grid`}</title>
</svelte:head>
<header
  class:no-subheading={branding && !branding.subheading}
  class:center={branding && branding.center}
  class:logo={branding && branding.logo}
>
  {#if branding && branding.logo}<img
      src={branding.logo}
      alt="{name} Logo"
    />{/if}
  <h1>{name}</h1>
  <h2>{year} Session Grid</h2>
</header>
<Years activeYear={year} {refreshTime} />
<main>
  {#if $sessions}
    {#if year in $sessions}
      {#each Object.entries($sessions[year]).sort((a, b) => Number(a[0]) - Number(b[0])) as [session, sessionData]}
        <Timeslot timeslot={sessionData} />
      {/each}
    {:else}
      <span class="error">No Session Data for {year}</span>
    {/if}
  {:else}
    <span class="loading">Session Data Loading</span>
  {/if}
</main>
