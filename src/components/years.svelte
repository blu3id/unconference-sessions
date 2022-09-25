<script lang="ts">
  import { push, link } from 'svelte-spa-router';
  import active from 'svelte-spa-router/active';
  import { onMount, onDestroy } from 'svelte';
  import Timer from './timer.svelte';
  import { sessionsStore } from '../store/sessions';

  const { sessions, sessionsDataURL, loading, error } = sessionsStore;

  export let activeYear: number;
  export let refreshTime: number;

  const currentYear: number = new Date().getFullYear();
  let timerEnabled = false;
  let timeLeftVar = 0;
  let timer: number;

  function stopTimer() {
    clearInterval(timer);
  }

  function runTick() {
    timeLeftVar -= 150;
    if (timeLeftVar < 0) {
      stopTimer();
      if (!$loading) {
        sessionsStore.fetch($sessionsDataURL);
      }
    }
  }

  function runTimer() {
    stopTimer();
    if (refreshTime === 0) {
      timerEnabled = false;
      return;
    }
    if (!timerEnabled || $loading) {
      return;
    }
    timeLeftVar = refreshTime;
    timer = setInterval(() => {
      runTick();
    }, 150);
  }

  function toggleTimer() {
    if ($error) {
      return;
    }
    if (timerEnabled || $error) {
      timerEnabled = false;
      stopTimer();
    } else {
      timerEnabled = true;
      runTimer();
    }
  }

  function visibilityHandler() {
    if (document.visibilityState === 'hidden') {
      stopTimer();
    } else if (timerEnabled) {
      runTimer();
    }
  }

  onMount(() => {
    if (
      typeof document.addEventListener === 'undefined' ||
      typeof document.hidden === 'undefined'
    ) {
      console.log('Page Visibility API, not avaialble.');
    } else {
      document.addEventListener('visibilitychange', visibilityHandler, false);
    }
  });

  onDestroy(() => {
    clearInterval(timer);
    if (
      typeof document.addEventListener !== 'undefined' ||
      typeof document.hidden !== 'undefined'
    ) {
      document.removeEventListener(
        'visibilitychange',
        visibilityHandler,
        false,
      );
    }
  });

  $: timeLeft = timeLeftVar;

  $: {
    if (activeYear !== currentYear) {
      timerEnabled = false;
      stopTimer();
    } else if ($sessions && activeYear in $sessions) {
      timerEnabled = true;
    } else {
      timerEnabled = false;
    }
  }

  $: {
    if (!$loading) {
      runTimer();
    }
  }

  $: title = $error ? 'Error Refreshing Data' : 'Toggle Auto Refresh';
</script>

<div class="past-years">
  <ul>
    {#if $sessions}
      <li on:click={() => push('/')} use:active={'/'}>
        <a href="/" use:link>{currentYear}</a>
      </li>
      {#each Object.entries($sessions).sort((a, b) => Number(b[0]) - Number(a[0])) as [year, timeslots]}
        {#if Number(year) !== currentYear}
          <li on:click={() => push(`/${year}`)} use:active={`/${year}`}>
            <a href="/{year}" use:link>{year}</a>
          </li>
        {/if}
      {/each}
      {#if activeYear === currentYear && activeYear in $sessions && refreshTime !== 0}
        <li
          {title}
          class="timer"
          class:loading={$loading}
          class:error={$error}
          class:paused={!timerEnabled}
          on:click={() => toggleTimer()}
        >
          <Timer {timeLeft} timeLimit={refreshTime} />
        </li>
      {/if}
    {/if}
  </ul>
</div>
