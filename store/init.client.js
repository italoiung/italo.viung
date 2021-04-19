export default ({ store }) => {
  if (localStorage.getItem('lang'))
    store.commit('changeLang', localStorage.getItem('lang'))
}
