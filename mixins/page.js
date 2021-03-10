import ogImage from '~/assets/img/resizable/projects/this.jpg'
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
      pageTitle: this.Translation([
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
      title: this.pageTitle[this.currentLang],
      meta: [
        { hid: 'og:image' },
        { property: 'og:image' },
        { content: this.BASE_URL + ogImage },
      ],
    }
  },
}
