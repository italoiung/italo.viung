<template>
  <div class="wrap">
    <AtomMohakaBackground class="background" />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Wrap',
}
</script>

<style lang="scss" scoped>
.wrap {
  width: var(--maxWidth);
  padding: 0 var(--padding);
  margin: 0 auto;
  position: relative;
}
.background {
  opacity: 0.4;
}
</style>
