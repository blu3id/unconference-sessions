<script lang="ts">
  import Router from 'svelte-spa-router';
  import { wrap } from 'svelte-spa-router/wrap';
  import { onMount } from 'svelte';
  import type { UnconferenceConfigBranding } from './main';
  import Grid from './components/grid.svelte';
  import NotFound from './components/not-found.svelte';
  import { sessionsStore } from './store/sessions';

  export let name: string;
  export let branding: UnconferenceConfigBranding;
  export let sessionData: string;
  export let refreshTime: number;

  const routes = new Map();
  routes.set(
    '/',
    wrap({
      component: Grid,
      props: {
        name,
        branding,
        refreshTime,
      },
    }),
  );
  routes.set(
    /^\/(?<year>[0-9]{4})$/i,
    wrap({
      component: Grid,
      props: {
        name,
        branding,
        refreshTime,
      },
    }),
  );
  routes.set('*', NotFound);

  onMount(() => {
    sessionsStore.fetch(sessionData);
  });
</script>

<svelte:head>
  <title>{name} Session Grid</title>
</svelte:head>
<Router {routes} />
<footer>
  Powered by open-source <a
    href="https://github.com/blu3id/unconference-sessions"
    >unconference-sessions</a
  >
  inspiration from
  <a href="https://github.com/ConvivioTeam/unconf-live-session-grid"
    >unconf-live-session-grid</a
  >
</footer>
