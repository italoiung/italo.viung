<template>
  <transition name="type-finish" mode="out-in">
    <transition-group
      v-if="!finished"
      key="group"
      :class="htmlClass"
      class="typewriter"
      name="typing"
      mode="out-in"
      :tag="tag"
      :appear="appearAnimation"
      @before-enter="beforeEnter"
      @before-leave="beforeLeave"
      @enter="enter"
      @leave="leave"
      @after-enter="afterEnter"
    >
      <span
        v-for="(letter, index) in writer"
        :key="`Letter-${letter}-Origin-${switcher}-Index-${index}-Full-${writer}`"
        :class="{ 'white-space': !letter.trim() }"
        :data-index="index"
        >{{ letter }}</span
      >
      <span key="blink" class="blink"></span>
    </transition-group>
    <component
      :is="tag"
      v-else
      key="formatted"
      :class="htmlClass"
      class="typewriter"
      v-html="formatted"
    />
  </transition>
</template>

<script>
export default {
  name: 'TypeWriter',
  props: {
    switcher: {
      type: [Number, String],
      default: 0,
      required: false,
    },
    tag: {
      type: String,
      default: 'p',
      required: false,
    },
    speed: {
      type: Number,
      default: 25,
      required: false,
    },
    calback: {
      type: Function,
      default: () => {},
      required: false,
    },
    sentences: {
      type: [String, Array, Object],
      default: '',
      required: true,
    },
    groupAppear: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  data() {
    return {
      finished: !this.groupAppear,
    }
  },
  computed: {
    appearAnimation() {
      return (
        !this.finished ||
        this.groupAppear ||
        typeof this.activeSentence !== 'string'
      )
    },
    activeSentence() {
      if (typeof this.sentences === 'undefined') return
      if (typeof this.sentences === 'string') return this.sentences
      return this.sentences[this.switcher]
    },
    htmlClass() {
      if (!this.activeSentence) return
      return {
        [`string string--${this.activeSentence.currentIndex}`]:
          typeof this.activeSentence === 'object',
        [`parent parent--${this.switcher}`]: typeof this.sentences !== 'string',
      }
    },
    writer() {
      if (!this.activeSentence) return
      if (typeof this.activeSentence === 'object')
        return this.activeSentence.strings[
          this.activeSentence.currentIndex
        ].replace(/(<([^>]+)>)/gi, '')
      return this.activeSentence.replace(/(<([^>]+)>)/gi, '')
    },
    formatted() {
      if (!this.activeSentence) return
      if (typeof this.activeSentence === 'object')
        return this.activeSentence.strings[this.activeSentence.currentIndex]
      return this.activeSentence
    },
  },
  watch: {
    sentences: {
      sync: true,
      handler() {
        this.finished = false
      },
    },
    switcher: {
      sync: true,
      handler() {
        this.finished = false
      },
    },
    writer: {
      sync: true,
      immediate: true,
      handler() {
        if (typeof this.activeSentence !== 'string') this.finished = false
      },
    },
  },
  methods: {
    beforeEnter(el) {
      if (el.classList.contains('white-space')) el.style.display = 'none'
      else el.style.display = 'inline-block'
      el.style.height = '0'
      el.style.width = '0'
      el.style.opacity = '0'
      el.dataset.index % 2
        ? (el.style.transform = 'translateY(0.5em)')
        : (el.style.transform = 'translateY(-0.1em)')
      el.style.transition = '0.35s all'
    },
    enter(el) {
      const delay = el.dataset.index * this.speed
      setTimeout(() => {
        if (el.classList.contains('white-space')) el.style.display = 'inline'
        el.style.transform = 'translateY(0)'
        el.style.opacity = '1'
        el.style.height = el.scrollHeight + 'px'
        el.style.width = el.textContent.trim()
          ? el.scrollWidth + 'px'
          : '0.25em'
      }, delay)
    },
    afterEnter(el) {
      const $this = this
      const delay = el.dataset.index * this.speed
      const isLast = parseInt(el.dataset.index) === this.writer.length - 1
      setTimeout(() => {
        if (isLast) {
          $this.finished = true
          $this.calback(el)
          if (typeof $this.activeSentence === 'object')
            setTimeout(() => {
              $this.activeSentence.currentIndex ===
              $this.activeSentence.strings.length - 1
                ? ($this.activeSentence.currentIndex = 0)
                : $this.activeSentence.currentIndex++
            }, delay)
        }
        el.style.display = 'initial'
      }, delay)
    },
    beforeLeave(el) {
      el.style.display = 'inline-block'
      el.style.position = 'absolute'
      el.style.height = el.scrollHeight + 'px'
      el.style.width = el.scrollWidth + 'px'
    },
    leave(el) {
      el.style.opacity = 0
      el.style.height = '0'
      el.style.width = '0'
    },
  },
}
</script>

<style lang="scss" scoped>
.typewriter {
  position: relative;
  z-index: 2;
}
.white-space {
  width: 0.25em;
}
.blink {
  height: auto !important;
  padding-left: 0.35em;
  border-right: 0.15em solid var(--darkHighlight);
  transition: none !important;
  animation: blink 0.15s steps(4, start) infinite;
}
.typing-enter-active {
  transition: 0.35s all;
}
.typing-leave-active {
  transition: 0.35s all;
  transform: translateX(-100%);
}
.type-finish-enter-active,
.type-finish-leave-active {
  transition: 0.1s all;
}
.type-finish-enter,
.type-finish-leave-to {
  opacity: 0.25;
}
@keyframes blink {
  to {
    visibility: hidden;
  }
}
</style>
