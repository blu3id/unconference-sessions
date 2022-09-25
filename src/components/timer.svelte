<script lang="ts">
  export let timeLimit: number;
  export let timeLeft: number;

  let animationFraction: string;
  let animationColour: string;

  $: {
    if (timeLeft <= 0) {
      animationFraction = '283';
    } else {
      animationFraction = `${
        (timeLeft / timeLimit - (1 / timeLimit) * (1 - timeLeft / timeLimit)) *
        283
      } 283`;
    }

    if (timeLeft > timeLimit * 0.5) {
      animationColour = 'green';
    } else if (timeLeft > timeLimit * 0.25) {
      animationColour = 'orange';
    } else if (timeLeft > 0) {
      animationColour = 'red';
    } else {
      animationColour = '';
    }
  }
</script>

<div class="timer">
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="circle">
      <circle class="elapsed" cx="50" cy="50" r="40" />
      <path
        stroke-dasharray={animationFraction}
        class="remaining {animationColour}"
        d="m 50,50 m -40,0 a 40,40 0 1 0 80,0 40,40 0 1 0 -80,0"
      />
    </g>
  </svg>
</div>

<style lang="scss">
  .timer {
    display: inline-block;
    width: 25px;
    height: 25px;
    vertical-align: middle;

    svg {
      .circle {
        fill: none;
        stroke: none;
      }

      .elapsed {
        stroke-width: 15px;
        stroke: grey;
      }

      .remaining {
        stroke-width: 20px;
        stroke-linecap: round;
        transform: rotate(90deg);
        transform-origin: center;
        transition: 1ms linear all;
        fill-rule: nonzero;
        stroke: currentColor;

        &.green {
          color: rgb(65, 184, 131);
        }

        &.orange {
          color: orange;
        }

        &.red {
          color: red; //rgb(26, 115, 232);
        }
      }
    }
  }
</style>
