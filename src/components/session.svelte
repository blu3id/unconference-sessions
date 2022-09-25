<script lang="ts">
  import SessionLead from './session.lead.svelte';
  import type { SessionData } from '../store/sessions';

  export let session: SessionData;
</script>

<article class="session">
  <h3>
    {@html session.title
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/\n/g, '<span>&nbsp;&</span><br />')}
  </h3>
  {#if session.leader1}
    <div class="lead">
      <span>Lead(s):</span>
      <ul>
        <SessionLead leader={session.leader1} />
        <SessionLead leader={session.leader2} />
        <SessionLead leader={session.leader3} />
        <SessionLead leader={session.leader4} />
      </ul>
    </div>
  {/if}
  <footer>
    <dl>
      {#if session.room}
        <div class="room">
          <dt>Room:</dt>
          <dd title="Room">{session.room}</dd>
        </div>
      {/if}

      {#if session.capacity}
        <div class="capacity">
          <dt>Capacity:</dt>
          <dd title="Capacity">{session.capacity}</dd>
        </div>
      {/if}

      {#if session.notesUrl}
        <div class="notes">
          <dt>Session Notes:</dt>
          <dd>
            <a title="Session Notes" href={session.notesUrl}
              >{session.notesUrl}</a
            >
          </dd>
        </div>
      {/if}

      {#if session.hashtag}
        <div class="hashtag">
          <dt>Hashtag:</dt>
          <dd>
            <a
              title="Session Hashtag: {session.hashtag}"
              href="https://twitter.com/search?q={encodeURIComponent(
                session.hashtag,
              )}">{session.hashtag.substring(1)}</a
            >
          </dd>
        </div>
      {/if}
    </dl>
  </footer>
</article>
