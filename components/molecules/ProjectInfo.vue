<template>
  <div class="project">
    <div class="project__inner">
      <AtomResponsiveImage
        :src-image="`projects/${project.logo}`"
        :alt="project.name"
        class="project__logo"
      />
      <h3>{{ project.name }}</h3>
      <p>{{ project.stack }}</p>
      <p>{{ project.year }}</p>
      <a
        v-if="project.url"
        :href="project.url"
        rel="noopener external"
        target="_blank"
        v-html="require('~/assets/img/svg/link.svg?include')"
      ></a>
      <a
        v-if="project.github"
        :href="project.github"
        rel="noopener external"
        target="_blank"
        v-html="require('~/assets/img/svg/github.svg?include')"
      ></a>
    </div>
    <AtomResponsiveImage
      :src-image="`projects/${project.screen}`"
      :alt="project.name"
      class="project__screen"
      type="threeQuarters"
    />
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.project {
  &__inner {
    width: 15rem;
    margin-top: 0.5rem;
    padding: 1rem;
    background-color: rgba(var(--darkBgRgb), 0.75);
    box-shadow: 3px 9px 3px 2px rgba(var(--darkerTextRgb), 0.353);
    backdrop-filter: blur(0.25rem);
    border-radius: 5% 15% 5% 15% / 15% 5% 15% 5%;
    text-align: center;
    color: var(--darkText);
    position: relative;
  }
  h3 {
    display: none;
  }
  a {
    ::v-deep svg {
      width: 2rem;
      path {
        fill: var(--darkerText);
      }
    }
  }
  &__screen {
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;

    @include max-sm {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }

    ::v-deep img {
      width: 50rem;
    }
  }
  &__logo {
    margin-bottom: 1rem;
    ::v-deep {
      img {
        max-width: 10rem;
        max-height: 5rem;
        object-fit: contain;
        margin: auto;
      }
    }
  }
}
</style>
