<template>
  <div class="card">
    <transition name="card" mode="out-in" @enter="enter">
      <AtomTypewriter
        v-if="endEffect"
        :callback="callback"
        sentences="a literal easter egg"
        :speed="90"
      />
      <div
        v-else-if="!effect"
        ref="clone"
        :key="`clone-${taps}`"
        class="card__clone"
        @click="breakEgg"
        v-html="require(`~/assets/img/svg/${src}?include`)"
      ></div>
      <div
        v-else
        key="effect"
        class="card__effect"
        v-html="require(`~/assets/img/svg/${src}?original&include`)"
      ></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'EggAnimation',
  props: {
    src: {
      type: String,
      default: 'egg.svg',
      required: false,
    },
    callback: {
      type: Function,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      taps: 1,
      animating: 0,
      endEffect: false,
    }
  },
  computed: {
    effect() {
      return this.taps > 2
    },
  },
  methods: {
    breakEgg(event) {
      const el = event.target
      const time = 1500
      const step = 10
      const $this = this
      const shake = () => {
        el.style.animation = `shaking ${time}ms ${this.taps}`
        const interval = setInterval(() => {
          $this.animating += step
          if ($this.animating >= time) {
            $this.taps++
            clearInterval(interval)
          }
        }, step)
        $this.animating = 0
      }
      if ($this.animating <= 0) {
        shake()
      } else {
        setTimeout(shake, time - +$this.animating)
      }
    },
    enter(el) {
      const $this = this
      if (el.classList.contains('card__effect'))
        setTimeout(function () {
          $this.endEffect = true
        }, 10000)
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  width: 5rem;
  transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-size: 0.85rem;
  &__clone {
    cursor: pointer;
  }
  &__effect {
    position: relative;
    z-index: 13;
    ::v-deep {
      /* crack */
      #path-11 {
        animation: cracking 10s infinite;
      }

      .eggsvg {
        animation: shaking 10s infinite;
        transform-origin: bottom center;
      }

      .egg-upper {
        animation: crackout 10s infinite;
        transform-origin: center right;
      }

      .chick {
        animation: chickout 10s infinite;
        transform-origin: center center;
      }

      .mouth {
        animation: mouthMove 10s infinite;
      }
    }
  }
  ::v-deep svg {
    height: auto;
    width: 100%;
    pointer-events: none;
  }
}

@keyframes shaking {
  0% {
    transform: rotate(0deg);
  }
  1% {
    transform: rotate(3deg);
  }
  2% {
    transform: rotate(0deg);
  }
  3% {
    transform: rotate(-3deg);
  }
  4% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(0deg);
  }
  11% {
    transform: rotate(3deg);
  }
  12% {
    transform: rotate(0deg);
  }
  13% {
    transform: rotate(-3deg);
  }
  14% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(0deg);
  }
  21% {
    transform: rotate(3deg);
  }
  22% {
    transform: rotate(0deg);
  }
  23% {
    transform: rotate(-3deg);
  }
  24% {
    transform: rotate(0deg);
  }
}
@keyframes cracking {
  0% {
    x: 0;
    width: 0;
  }
  6% {
    x: 5px;
    width: 0;
  }
  11% {
    x: 5px;
    width: 50px;
  }
  16% {
    x: 5px;
    width: 50px;
  }
  20% {
    x: -20px;
    width: 100px;
  }
  25% {
    x: -20px;
    width: 100px;
  }
  40% {
    x: -80px;
    width: 260px;
  }
  100% {
    x: -80px;
    width: 260px;
  }
}
@keyframes crackout {
  0% {
    transform: rotate(0deg);
    transform: translateY(0);
  }
  30% {
    transform: rotate(0deg);
    transform: translateY(0);
  }
  35% {
    transform: rotate(0deg);
    transform: translateY(-15px);
  }
  40% {
    transform: rotate(0deg);
    transform: translateY(-10px);
  }
  45% {
    transform-origin: bottom right;
    transform: translateY(-20px);
  }
  50% {
    transform-origin: center center;
    transform: translateY(-15px);
  }
  70% {
    transform-origin: bottom right;
    transform: translateY(-130px) rotate(120deg);
  }
  90% {
    transform-origin: bottom right;
    transform: translateY(-130px) rotate(130deg);
  }
}
@keyframes chickout {
  0% {
    transform: translate(47px, 46px);
  }
  60% {
    transform: translate(47px, 46px);
  }
  100% {
    transform: translate(47px, 26px);
  }
}
@keyframes mouthMove {
  60% {
    transform: scaleY(1) translateY(-10px);
  }
  80% {
    transform: scaleY(1.5) translateY(-30px);
  }
  100% {
    transform: scaleY(1.2) translateY(-20px);
  }
}
</style>
<style>
@keyframes shaking {
  0% {
    transform: rotate(0deg);
  }
  2% {
    transform: rotate(5deg);
  }
  4% {
    transform: rotate(0deg);
  }
  7% {
    transform: rotate(-5deg);
  }
  10% {
    transform: rotate(0deg);
  }
  22% {
    transform: rotate(0deg);
  }
  23% {
    transform: rotate(5deg);
  }
  26% {
    transform: rotate(0deg);
  }
  28% {
    transform: rotate(-5deg);
  }
  30% {
    transform: rotate(0deg);
  }
  41% {
    transform: rotate(0deg);
  }
  43% {
    transform: rotate(5deg);
  }
  46% {
    transform: rotate(0deg);
  }
  49% {
    transform: rotate(-5deg);
  }
  60% {
    transform: rotate(0deg);
  }
  63% {
    transform: rotate(-5deg);
  }
  64% {
    transform: rotate(0deg);
  }
  66% {
    transform: rotate(-5deg);
  }
  69% {
    transform: rotate(0deg);
  }
  82% {
    transform: rotate(0deg);
  }
  83% {
    transform: rotate(5deg);
  }
  86% {
    transform: rotate(0deg);
  }
  88% {
    transform: rotate(-5deg);
  }
  93% {
    transform: rotate(0deg);
  }
  95% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
