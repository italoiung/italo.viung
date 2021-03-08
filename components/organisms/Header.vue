<template>
  <header>
    <AtomWrap>
      <NuxtLink to="/" class="logo">
        <ClientOnly>
          <AtomTypewriter tag="span" :speed="75" :sentences="logo" />
        </ClientOnly>
      </NuxtLink>
      <button
        v-if="!isMd && !isMenuOpen"
        class="menu-toggler"
        @click="isMenuOpen = !isMenuOpen"
      >
        menu <span></span>
      </button>
      <transition name="slide-in">
        <nav v-if="isMd || isMenuOpen">
          <ul>
            <li v-for="item in navItems" :key="item.path">
              <NuxtLink :to="item.path">
                <ClientOnly>
                  <AtomTypewriter
                    tag="span"
                    :speed="90"
                    :sentences="item.label"
                    :switcher="currentLang"
                    :group-appear="false"
                  />
                </ClientOnly>
              </NuxtLink>
            </li>
          </ul>
          <div class="overlay" @click="isMenuOpen = !isMenuOpen"></div>
        </nav>
      </transition>
      <button
        v-for="lang in langs"
        :key="lang"
        class="lang-toggler"
        @click="changeLang(lang)"
      >
        {{ lang }}
      </button>
    </AtomWrap>
  </header>
</template>

<script>
import pageMixin from '~/mixins/page'
import responsiveMixin from '~/mixins/responsive'
import navItems from '~/static_content/navItems.json'
export default {
  name: 'Header',
  mixins: [pageMixin, responsiveMixin],
  data() {
    return {
      isMenuOpen: false,
      navItems: navItems.map((item) =>
        Object.assign(item, { label: this.Translation(item.label) })
      ),
    }
  },
  computed: {
    logo() {
      return this.$store.state.logo
    },
    name() {
      return this.$nuxt.$route.name
    },
    currentLang() {
      return this.$store.state.currentLang
    },
    langs() {
      return this.$store.state.langs.filter((lang) => lang !== this.currentLang)
    },
  },
  methods: {
    changeLang(lang) {
      this.$store.commit('changeLang', lang)
    },
  },
}
</script>

<style>
:root {
  --headerHeight: 4rem;
  --headerOffset: calc(var(--headerHeight) / 1.5);
  --headerEdge: calc(var(--headerHeight) + var(--headerOffset));
}
</style>

<style lang="scss" scoped>
header {
  position: fixed;
  top: var(--headerOffset);
  left: 0;
  height: var(--headerHeight);
  width: 100%;
  background-image: linear-gradient(90deg, var(--lightBg) 50%, transparent 50%);
  z-index: 12;
  color: var(--darkText);
  .wrap {
    height: 100%;
    background-color: var(--lightBg);
    display: flex;
    align-items: center;
    @include md {
      justify-content: space-between;
    }
  }
}
.logo {
  font-size: 1.5rem;
  margin-right: auto;
  @include max-xs {
    letter-spacing: 0;
  }
}
a {
  display: block;
  letter-spacing: 0.05em;
  font-weight: 100;
  ::v-deep b {
    color: var(--darkHighlight);
  }
}
nav {
  @include max-sm {
    position: fixed;
    top: 0;
    right: 0;
    transition: 0.15s all;
    z-index: 14;
    width: 100vw;
  }
  ul {
    @include md {
      display: flex;
      margin: 0 -0.25em;
    }
    @include max-sm {
      margin-left: auto;
      height: 100vh;
      overflow: auto;
      padding: var(--headerOffset) 2rem;
      width: 20rem;
      background-color: rgba(var(--darkBgRgb), 0.5);
      box-shadow: -4px 4px 3px 2px rgba(var(--darkerTextRgb), 0.5);
      backdrop-filter: blur(1rem);
      border-radius: 5% 0% 0% 15% / 15% 0% 0% 5%;
      max-width: 90vw;
      font-size: 1.5rem;
    }
    li {
      margin: 1rem 0;
      transition: 0.15s all;
      @include md {
        margin: 0 0.25em;
      }
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
      a {
        position: relative;
        display: block;
        overflow: hidden;
        width: max-content;
        margin-left: auto;
        &::before {
          content: '';
          position: absolute;
          height: 50%;
          width: 100%;
          left: 0;
          bottom: 0;
          transform: translateX(-100%);
          opacity: 0;
          transition: 0.15s all;
          background-color: var(--darkText);
        }
        &.nuxt-link-active {
          color: var(--darkHighlight);
          &::before {
            opacity: 1;
            transform: translateX(0);
          }
        }
      }
    }
  }
  .overlay {
    position: absolute;
    z-index: -1;
    @extend %cover;
    backdrop-filter: blur(0.25rem);
  }
}
.lang-toggler {
  font-family: var(--fontHeading);
  border-top: 1px solid var(--darkBg);
  border-bottom: 1px solid var(--darkBg);
  margin-left: 1rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  line-height: 1;
  padding: 0.15rem 0 0.3rem;
}
.menu-toggler {
  font-family: var(--fontHeading);
  letter-spacing: -0.05rem;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 1rem;
  font-weight: 300;
  cursor: pointer;
  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 1rem;
    height: 0.1rem;
    background-color: var(--darkBg);
    right: 0;
  }
  &::before {
    bottom: 0.25rem;
  }
  &::after {
    top: 0.25rem;
  }
  span {
    margin-left: 0.5rem;
    display: block;
    width: 1rem;
    height: 0.1rem;
    background-color: var(--darkBg);
  }
}
.slide-in-enter,
.slide-in-leave-to {
  transform: translateX(100%);
}
.slide-enter-to,
.slide-leave {
  transform: translateX(0);
}
</style>
