<template>
  <main :data-label="label">
    <AtomWrap>
      <AtomResponsiveImage
        src-image="italo-vianna-iung.jpg"
        alt="Ítalo Vianna Iung"
        class="image"
      />
      <div class="box">
        <AtomTypewriter
          :switcher="currentLang"
          :sentences="title"
          :group-appear="false"
          tag="h1"
        />
        <AtomTypewriter
          v-for="(item, index) in paragraphs"
          :key="index + item"
          :switcher="currentLang"
          :sentences="item"
          :group-appear="false"
        />
      </div>
    </AtomWrap>
  </main>
</template>

<script>
import pageMixin from '~/mixins/page'
import translationData from '~/static_content/contato.json'
export default {
  name: 'Contato',
  mixins: [pageMixin],
  data() {
    return {
      title: this.Translation([
        'Ítalo Vianna Iung | Desenvolvedor Front-End | Contato',
        'Ítalo Vianna Iung | Front-End Developer | Contact',
      ]),
      label: 'italo<b>.</b><b>v</b>iung<b>.</b>contact<b>()</b>',
      title: this.Translation(translationData.title),
      paragraphs: translationData.paragraphs.map((item) =>
        this.Translation(item)
      ),
    }
  },
}
</script>

<style lang="scss" scoped>
main {
  padding: var(--headerOffset) 0 0;
  .wrap {
    margin-right: 0;
    display: flex;
  }
}
.image {
  position: absolute;
  left: 0;
  bottom: 0;
  height: calc(100% - var(--headerHeight));
  ::v-deep img {
    height: 100%;
    width: auto;
    object-fit: cover;
    object-position: top center;
  }
}
.box {
  position: relative;
  width: 100%;
  background-color: rgba(var(--darkBgRgb), 0.75);
  box-shadow: 3px 9px 3px 2px rgba(var(--darkerTextRgb), 0.353);
  backdrop-filter: blur(0.5rem);
  border-radius: 5% 15% 5% 15% / 15% 5% 15% 5%;
  padding: 1rem;
  margin: auto 0 auto auto;
  @include sm {
    width: 75%;
  }
  @include lg {
    width: 50%;
  }
  ::v-deep h1 {
    font-weight: 300;
    color: var(--darkText);
    b {
      color: var(--darkerText);
    }
  }
}
</style>
