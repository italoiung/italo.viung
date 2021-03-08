<template>
  <main :data-label="label">
    <AtomWrap>
      <AtomDisplace
        tag="AtomCardAnimation"
        :on-hit="
          (top, left) => {
            if (!easterEgg.show)
              easterEgg.position = {
                top: parseInt(top) + 'px',
                left: parseInt(left) + 'px',
              }
            easterEgg.show = true
          }
        "
      />
      <AtomDisplace
        v-if="easterEgg.show"
        tag="AtomEggAnimation"
        :position="easterEgg.position"
        :callback="
          () => {
            easterEgg.show = false
          }
        "
      />
      <h1>
        <AtomTypewriter
          tag="span"
          :switcher="currentLang"
          :speed="90"
          :sentences="firstLine"
          :group-appear="false"
        />
        <AtomTypewriter
          tag="span"
          :switcher="currentLang"
          :speed="90"
          :sentences="secondLine"
          :group-appear="false"
        />
        <AtomTypewriter
          tag="span"
          :switcher="currentLang"
          :speed="90"
          :sentences="thirdLine"
        />
      </h1>
    </AtomWrap>
  </main>
</template>

<script>
import pageMixin from '~/mixins/page'
import translationData from '~/static_content/index.json'
export default {
  name: 'Index',
  mixins: [pageMixin],
  data() {
    return {
      label: 'italo<b>.</b><b>v</b>iung<b>()</b>',
      easterEgg: { show: false, position: { x: 0, y: 0 } },
      firstLine: this.Translation(translationData.first_line),
      secondLine: this.Translation(translationData.second_line),
      thirdLine: this.Translation(translationData.third_line),
    }
  },
}
</script>

<style lang="scss" scoped>
main {
  .wrap {
    margin-left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
  }
  .displace.card {
    position: absolute;
    max-width: calc(95% - var(--padding) * 2);
    left: var(--padding);
    top: 0.5rem;
    @include lg {
      left: calc(var(--padding) * 2);
    }
    @include xl {
      left: calc(var(--padding) * 3);
    }
  }
}
h1 {
  text-align: center;
  @include max-sm {
    margin: 1rem auto;
  }
  ::v-deep {
    > span {
      display: block;
      margin: auto;
      strong {
        color: var(--darkerText);
        font-weight: 600;
      }
      &.parent--pt:nth-child(1),
      &.parent--en:nth-child(3) {
        font-family: var(--fontItems);
        letter-spacing: 0.025em;
        width: max-content;
      }
      &:nth-child(2) {
        font-size: 0.75em;
        letter-spacing: 0.05em;
        line-height: 1.25;
        width: max-content;
      }
      &.parent--pt:nth-child(3),
      &.parent--en:nth-child(1) {
        font-family: var(--fontBody);
        font-size: 0.35em;
        line-height: 1;
        min-height: 1.25em;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-weight: bold;
        margin: 1rem 0;
        width: 100%;
        &.string {
          &--0 {
            text-align: left;
          }
          &--1 {
            text-align: center;
          }
          &--2 {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
