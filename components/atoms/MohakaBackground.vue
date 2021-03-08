<template>
  <div>
    <svg ref="svg">
      <path
        v-for="(path, index) in paths"
        :id="'path' + index"
        :key="'path' + index"
        :d="animating ? path.animation : path.fixed"
        :fill="path.fill"
      />
    </svg>
  </div>
</template>

<script>
import paths from '~/static_content/mohakaPaths.json'
export default {
  data() {
    return {
      paths,
    }
  },
  computed: {
    animating() {
      return this.$store.state.background
    },
  },
}
</script>

<style lang="scss" scoped>
div {
  @extend %cover;
  z-index: -1;
  overflow: hidden;
}
svg {
  @extend %center-absolute;
  min-width: 110%;
  min-height: 110%;
  max-width: unset;
  width: auto;
  height: auto;
}
path {
  transition: 0.15s all;
}
</style>
