export default {
  data() {
    return {
      isXs: false,
      isSm: false,
      isMd: false,
      isLg: false,
      isXl: false,
    }
  },
  methods: {
    changeBreakpoints() {
      this.isXs = window.innerWidth < 576
      this.isSm = window.innerWidth >= 576
      this.isMd = window.innerWidth >= 768
      this.isLg = window.innerWidth >= 992
      this.isXl = window.innerWidth >= 1200
    },
  },
  mounted() {
    const $this = this
    $this.changeBreakpoints()
    window.addEventListener('resize', function () {
      $this.changeBreakpoints()
    })
  },
}
