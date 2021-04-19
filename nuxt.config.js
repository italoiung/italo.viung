export default {
  server: {
    port: 8000, // default: 3000     
    host: '0.0.0.0', // default: localhost   
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'pt',
      translate: 'no'
    },
    title: 'Ítalo Iung | Desenvolvedor Front-End ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Desenvolvedor front-end residido em Porto Alegre. Criação de sites rápidos com foco em alta performance, responsividade e experiência do usuário.' },
      { hid: 'og:description', name: 'og:description', content: 'Desenvolvedor front-end residido em Porto Alegre. Criação de sites rápidos com foco em alta performance, responsividade e experiência do usuário.' },
      { hid: 'og:image', property: 'og:image', content: '/ogImage.jpg' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/_reset.scss', '~/assets/scss/_base.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-displace.client.js',
    '~/store/init.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components/',
      {
        path: '~/components/atoms/',
        prefix: 'Atom'
      },
      {
        path: '~/components/molecules/',
        prefix: 'Molecule'
      },
      {
        path: '~/components/organisms/',
        prefix: 'Organism'
      },
      {
        path: '~/components/templates/',
        prefix: 'Template'
      }
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    ['@nuxtjs/google-fonts', {
      display: 'swap',
      download: true,
      families: {
        'Yeseva+One': true,
        Lora: [400, 600, 700],
        'Overpass+Mono': [300, 400, 700]
      }
    }],
    '@nuxtjs/style-resources',
    '@aceforth/nuxt-optimized-images',
    // '@nuxt/content',
  ],

  styleResources: {
    scss: [
      '~/assets/scss/_global.scss',
    ]
  },

  optimizedImages: {
    optimizeImages: true,
    optimizeImagesInDev: false,
    svgo: {
      plugins: [
        {
          removeViewBox: false,
          removeDimensions: true,
          collapseGroups: false,
        }
      ]
    },
  },

  pageTransition: {
    name: 'my-page',
    mode: 'out-in',
    beforeEnter(el) {
      this.$store.commit('changeLogo', el.dataset.label)
      this.$store.commit('toggleBackground')
    },
    afterEnter() {
      this.$store.commit('toggleBackground')
      this.$store.commit('toggleMenu', false)
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'pt',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
