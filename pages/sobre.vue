<template>
  <main :data-label="label" class="container">
    <AtomWrap>
      <AtomDisplace
        tag="AtomResponsiveImage"
        src-image="stickers/Ganesha.png"
        alt="Ganesha"
        type="oneQuarter"
        class="image image--ganesha"
      />
      <AtomDisplace
        tag="AtomResponsiveImage"
        src-image="stickers/GaneshaGlasses.png"
        alt="Ganesha de óculos"
        type="oneQuarter"
        class="image image--glasses"
      />
      <AtomDisplace
        tag="AtomResponsiveImage"
        src-image="stickers/EuGanesha.png"
        alt="Eu com o Ganesha"
        type="half"
        class="image image--big"
      />
      <div class="box">
        <div class="box__inner">
          <div class="box__tabs">
            <AtomTypewriter
              v-for="(item, index) in tabs"
              :key="index + item"
              :switcher="currentLang"
              :sentences="item"
              :group-appear="false"
              :class="{ active: activeBox === item.en }"
              @click.native="activeBox = item.en"
            />
          </div>
          <transition mode="out-in">
            <div v-if="activeBox === 'about'" class="box__content about">
              <AtomTypewriter
                :switcher="currentLang"
                :sentences="title"
                :group-appear="false"
                tag="h1"
              />
              <p
                v-for="(item, index) in paragraphs"
                :key="index + index"
                v-html="item[currentLang]"
              ></p>
            </div>
            <div v-if="activeBox === 'skills'" class="box__content skills">
              <strong
                v-for="(item, index) in skills"
                :key="index + item"
                :style="{
                  '--size': item.weight,
                  color: `var(--${colors[item.weight]})`,
                  fontWeight: (item.weight - 1) * 100,
                }"
                class="skill"
              >
                {{ item.name }}
              </strong>
            </div>
          </transition>
        </div>
      </div>
    </AtomWrap>
  </main>
</template>

<script>
import pageMixin from '~/mixins/page'
import translationData from '~/static_content/sobre.json'
export default {
  name: 'Sobre',
  mixins: [pageMixin],
  data() {
    return {
      title: this.Translation([
        'Ítalo Vianna Iung | Desenvolvedor Front-End | Sobre',
        'Ítalo Vianna Iung | Front-End Developer | About',
      ]),
      label: 'italo<b>.</b><b>v</b>iung<b>.</b>me<b>()</b>',
      activeBox: 'about',
      paragraphs: translationData.paragraphs.map((item) =>
        this.Translation(item)
      ),
      tabs: translationData.tabs.map((item) => this.Translation(item)),
      title: this.Translation(translationData.title),
      skills: translationData.skills,
      colors: {
        9: 'darkerText',
        7: 'darkText',
        5: 'lightHighlight',
        3: 'lightBg',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
main {
  .wrap {
    display: flex;
  }
}
.image {
  @include max-sm {
    top: var(--headerEdge);
  }
  &--ganesha,
  &--glasses {
    max-width: 8rem;
  }
  &--ganesha {
    max-width: 8rem;
    @include max-sm {
      left: 0.1rem;
    }
    @include md {
      bottom: 0.1rem;
      right: 0.1rem;
    }
  }
  &--glasses {
    max-width: 8rem;
    right: 0.1rem;
    @include md {
      top: 0.1rem;
    }
  }
  &--big {
    max-width: 12rem;
    left: calc(50% - 12rem / 2);
    @include md {
      bottom: 0.1rem;
      left: 0.1rem;
    }
  }
}
.box {
  position: relative;
  width: 100%;
  height: calc(100% - var(--headerEdge) * 2.5);
  background-color: rgba(var(--darkBgRgb), 0.75);
  box-shadow: 3px 9px 3px 2px rgba(var(--darkerTextRgb), 0.353);
  backdrop-filter: blur(0.5rem);
  border-radius: 5% 15% 5% 15% / 15% 5% 15% 5%;
  margin: auto auto 0;
  @include sm {
    width: 75%;
  }
  @include md {
    height: 75%;
  }
  @include lg {
    width: 50%;
  }
  &__inner {
    position: absolute;
    top: 50%;
    left: calc(50% + 0.25rem);
    transform: translate(-50%, -50%);
    width: 90%;
    padding-right: 0.5rem;
    height: 90%;
    display: flex;
    flex-direction: column;
    ::v-deep {
      h1 {
        font-weight: 300;
        color: var(--darkText);
        b {
          color: var(--darkerText);
        }
      }
    }
  }
  &__content {
    flex: 1 1 auto;
    margin-top: 1rem;
    overflow: auto;
    transition: 0.15s all;
  }
  &__tabs {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    p {
      margin: 0 0 0 0.5rem;
      letter-spacing: 0.1rem;
      font-size: 1rem;
      line-height: 1;
      cursor: pointer;
      overflow: hidden;
      position: relative;
      transition: 0.15s all;
      &::before {
        content: '';
        position: absolute;
        height: 40%;
        width: 100%;
        left: 0;
        bottom: 0;
        transform: translateX(-100%);
        opacity: 0;
        transition: 0.15s all;
        background-color: var(--darkerText);
        z-index: -1;
      }
      &:hover,
      &.active {
        color: var(--darkText);
        font-weight: bold;
        &::before {
          transform: translateX(0);
          opacity: 1;
        }
      }
    }
  }
}
.skills {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.skill {
  font-family: var(--fontHeading);
  position: relative;
  overflow: hidden;
  font-size: calc(var(--size) * 0.25rem + 0.15rem);
  color: var(--darkText);
  margin: 0 0.25rem;
}
</style>
