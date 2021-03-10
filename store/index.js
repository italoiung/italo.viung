export const state = function () {
  return {
    logo: 'italo<span>.</span><b>v</b>iung()',
    langs: ['pt', 'en'],
    currentLang: 'pt',
    background: false,
    isMenuOpen: false,
  }
}

export const mutations = {
  changeLogo(state, logo) {
    state.logo = logo
  },
  changeLang(state, lang) {
    state.currentLang = lang
  },
  toggleBackground(state) {
    state.background = !state.background
  },
  toggleMenu(state, isOpen) {
    state.isMenuOpen = isOpen
  },
}
