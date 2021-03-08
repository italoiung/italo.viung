function Translation(langs, strings) {
  const $this = this
  langs.forEach(function (item, index) {
    if (typeof strings[index] === 'string') {
      $this[item] = strings[index]
    } else {
      $this[item] = { strings: strings[index], currentIndex: 0 }
    }
  })
}
export default {
  data() {
    return {
      title: this.Translation([
        'Ítalo Vianna Iung | Desenvolvedor Front-End',
        'Ítalo Vianna Iung | Front-End Developer',
      ]),
    }
  },
  computed: {
    currentLang() {
      return this.$store.state.currentLang
    },
  },
  methods: {
    Translation(strings) {
      return new Translation(this.$store.state.langs, strings)
    },
  },
  head() {
    return {
      title: this.title[this.currentLang]
    }
  }
}
