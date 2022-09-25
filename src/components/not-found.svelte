<script lang="ts">
  import { replace } from 'svelte-spa-router';

  export let params;
  if (!params) {
    // eslint-disable-next-line no-void
    void replace('/');
  }
  // eslint-disable-next-line no-void
  void replace('/');
</script>
