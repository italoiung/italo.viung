<template>
  <main :data-label="label">
    <AtomWrap>
      <MoleculeProjectsCarousel :items="projects" />
      <div v-show="!activeProject" class="title">
        <AtomTypewriter
          :sentences="title"
          tag="h1"
          :switcher="currentLang"
          :speed="90"
        />
        <AtomTypewriter
          :sentences="subtitle"
          tag="h2"
          :switcher="currentLang"
          :speed="45"
        />
      </div>
      <transition name="work" mode="out-in">
        <MoleculeProjectInfo
          v-if="activeProject"
          :key="activeProject.id"
          :project="activeProject"
        />
      </transition>
    </AtomWrap>
  </main>
</template>

<script>
import pageMixin from '~/mixins/page'
import pageData from '~/static_content/trabalhos.json'
export default {
  name: 'Trabalhos',
  mixins: [pageMixin],
  data() {
    return {
      pageTitle: this.Translation([
        'Ítalo Vianna Iung | Desenvolvedor Front-End | Trabalhos',
        'Ítalo Vianna Iung | Front-End Developer | Works',
      ]),
      label: 'italo<b>.</b><b>v</b>iung<b>.</b>work<b>()</b>',
      title: this.Translation(pageData.title),
      subtitle: this.Translation(pageData.subtitle),
      projects: pageData.projects.map((project, index) =>
        Object.assign(project, { active: !index })
      ),
    }
  },
  computed: {
    activeProject() {
      if (this.$nuxt.$route.hash)
        return this.projects.find(
          (item) => item.id === this.$nuxt.$route.hash.split('#')[1]
        )
      return null
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  @include sm {
    @include screenHeight(720) {
      padding-bottom: 0;
    }
  }
  .wrap {
    margin-right: 0;
    padding-top: var(--headerEdge);
  }
  ::v-deep .carousel {
    width: calc(var(--maxWidth) + 50vw - var(--maxWidth) / 2);
    box-shadow: -6px 9px 3px 2px rgba(var(--darkerTextRgb), 0.253);
    max-width: 100vw;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .title {
    color: var(--darkText);
    max-width: 30rem;
    ::v-deep {
      strong,
      b {
        color: var(--darkerText);
      }
    }
  }
  h1 {
    font-family: var(--fontItems);
  }
  h2 {
    font-weight: 300;
  }
}
</style>
