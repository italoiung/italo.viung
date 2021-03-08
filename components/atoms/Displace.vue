<template>
  <component
    :is="tag"
    :key="componentKey"
    v-displace="{ constrain }"
    class="displace"
    :callback="callback"
    v-bind="$attrs"
    :style="position"
    @onMouseMove="move"
    @onTouchMove="move"
    @onMouseUp="toggleBackground"
    @onTouchUp="toggleBackground"
    @onMouseDown="toggleBackground"
    @onTouchDown="toggleBackground"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'Displace',
  props: {
    tag: {
      type: String,
      default: 'div',
      required: false,
    },
    constrain: {
      type: Boolean,
      default: true,
      required: false,
    },
    position: {
      type: Object,
      default: () => ({ top: null, left: null }),
      required: false,
    },
    callback: {
      type: Function,
      default: () => {},
      required: false,
    },
    onHit: {
      type: Function,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      componentKey: 0,
    }
  },
  mounted() {
    const $this = this
    window.addEventListener('resize', function () {
      $this.componentKey++
    })
  },
  methods: {
    toggleBackground() {
      this.$store.commit('toggleBackground')
    },
    move({ detail }) {
      const $this = this
      const { element, event } = detail
      const [width, height] = [
        ($this.constrain
          ? element.parentElement.offsetWidth
          : window.innerWidth) - element.offsetWidth,
        ($this.constrain
          ? element.parentElement.offsetHeight
          : window.innerWidth) - element.offsetHeight,
      ]
      const onHit = (direction) => {
        const elementCenterPosition = [
          element.offsetTop + element.offsetHeight / 2,
          element.offsetLeft + element.offsetWidth / 2,
        ]
        $this.onHit(...elementCenterPosition)
        element.classList.add(`hit-${direction}`)
        setTimeout(function () {
          element.classList.remove(`hit-${direction}`)
        }, 750)
      }
      if (element.offsetLeft >= width && event.movementX > 0) {
        onHit('right')
      } else if (element.offsetLeft <= 0 && event.movementX < 0) {
        onHit('left')
      }
      if (element.offsetTop >= height && event.movementY > 0) {
        onHit('bottom')
      } else if (element.offsetTop <= 0 && event.movementY < 0) {
        onHit('top')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.displace {
  position: absolute;
  cursor: move;
  touch-action: none;
  user-select: none;
}
</style>
