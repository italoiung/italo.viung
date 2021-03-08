<template>
  <div class="card" @mouseover="effect = true" @mouseleave="effect = false">
    <div
      ref="clone"
      class="card__clone"
      v-html="require(`~/assets/img/svg/${src}?include`)"
    ></div>
    <transition
      name="card"
      @before-enter="before"
      @enter="during"
      @leave="after"
    >
      <div
        v-if="effect"
        class="card__effect"
        v-html="require(`~/assets/img/svg/${src}?include&original`)"
      ></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CardAnimation',
  props: {
    src: {
      type: String,
      default: 'home.svg',
      required: false,
    },
  },
  data() {
    return {
      effect: false,
    }
  },
  methods: {
    before() {
      this.$refs.clone.style.transform = 'scale(0.85)'
    },
    during() {
      this.$refs.clone.style.transform = 'scale(1.25)'
    },
    after() {
      this.$refs.clone.style.transform = 'scale(1)'
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  width: 25rem;
  position: relative;
  transition: all 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  @include on-event {
    &::before {
      box-shadow: inset 0 0 5px 5px rgba(var(--darkerTextRgb), 0.85);
      border-radius: 20% 80% 20% 80% / 80% 20% 80% 20%;
    }
  }
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--darkHighlight);
    transition: all 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 80% 20% 80% 20% / 20% 80% 20% 80%;
    box-shadow: inset 0 0 10px 10px rgba(var(--darkerTextRgb), 0.253);
    z-index: 1;
  }
  > div {
    padding: 2rem 1rem;
    width: 100%;
    transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  &__clone {
    position: relative;
    z-index: 1;
  }
  &__effect {
    @extend %center-absolute;
    z-index: 13;
    transition: transform 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      filter 1s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      opacity 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.065s !important;
    transform: translate(-50%, -50%) scale(1.25);
    filter: drop-shadow(3px 9px 5px rgba(var(--darkerTextRgb), 0.85));
    ::v-deep svg {
      .text {
        animation: writing 2.25s infinite alternate-reverse;
        &:nth-of-type(2n - 1) {
          animation-duration: 1.75s;
        }
      }
      .circle {
        transform: translate(0, 0);
      }
      .button {
        cursor: pointer;
      }
    }
    @include on-event {
      ::v-deep svg {
        .circle {
          transition: 0.75s all;
          &--desktop {
            transform: translate(5%, -7%);
          }
          &--mobile {
            transform: translate(4%, -5%);
          }
        }
      }
    }
  }
  &-enter-to,
  &-leave {
    filter: drop-shadow(3px 9px 5px rgba(var(--darkerTextRgb), 0.66));
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.85);
    filter: drop-shadow(-3px -9px 5px rgba(var(--darkerTextRgb), 0.253));
  }
  &-leave-active {
    transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      filter 1s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.25s !important;
    pointer-events: none !important;
  }
  ::v-deep svg {
    height: auto;
    width: 100%;
  }
}

@keyframes writing {
  from {
    width: 0.75rem;
    opacity: 0.77;
  }
  to {
    opacity: 1;
  }
}
</style>
