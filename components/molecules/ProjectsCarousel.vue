<template>
  <div ref="carousel" class="carousel">
    <NuxtLink
      v-for="item in items"
      :id="item.id"
      :key="item.name"
      :to="{
        path: '/' + $nuxt.$route.name,
        hash: '#' + item.id,
      }"
      class="carousel__item"
      tabindex="0"
    >
      <AtomResponsiveImage
        :src-image="`projects/${item.screen}`"
        :alt="item.name"
        type="oneQuarter"
        class="carousel__item__screen"
        loading="lazy"
      />
      <AtomResponsiveImage
        :src-image="`projects/${item.logo}`"
        :alt="item.name"
        :img-style="item.extraStyle"
        type="oneQuarter"
        class="carousel__item__logo"
      />
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'ProjectsCarousel',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    prev() {
      const index = this.items.findIndex(
        (item) => item.id === this.$nuxt.$route.hash.split('#')[1]
      )
      if (index === 0) return null
      if (this.items[index - 1])
        return {
          path: '/' + this.$nuxt.$route.name,
          hash: '#' + this.items[index - 1].id,
        }
      return null
    },
    next() {
      const index = this.items.findIndex(
        (item) => item.id === this.$nuxt.$route.hash.split('#')[1]
      )
      if (index === this.items.length) return null
      if (this.items[index + 1])
        return {
          path: '/' + this.$nuxt.$route.name,
          hash: '#' + this.items[index + 1].id,
        }
      return null
    },
  },
}
</script>

<style lang="scss" scoped>
.carousel {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: mandatory;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  position: relative;
  display: flex;
  &::before,
  &::after {
    content: '';
    width: 50%;
    flex: 0 0 auto;
    background-color: rgba(var(--darkBgRgb), 0.75);
    backdrop-filter: blur(0.25rem);
  }
  &__nav {
    position: absolute;
    top: 0;
    transform: translateY(-100%);
    width: 2rem;
    &--prev {
      left: 0;
    }
    &--next {
      left: 3rem;
    }
  }
  &__item {
    scroll-snap-align: center;
    flex: 1 0 auto;
    width: 15rem;
    position: relative;
    &.nuxt-link-active {
      &::before {
        backdrop-filter: blur(0.05rem);
      }
    }
    &::before {
      @extend %cover;
      background-color: rgba(var(--darkBgRgb), 0.5);
      backdrop-filter: blur(0.25rem);
      transition: 0.15s all;
      z-index: 1;
    }
    &__screen {
      ::v-deep img {
        width: 100%;
      }
    }
    &__logo {
      ::v-deep img {
        @extend %center-absolute;
        z-index: 2;
        max-height: 50%;
        min-width: 50%;
        object-fit: contain;
      }
    }
  }
}
</style>
