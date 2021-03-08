export default async (to, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }

  const findEl = async (hash, x) => {
    return document.querySelector(hash) ||
      new Promise((resolve) => {
        if (x > 50) {
          return resolve()
        }
        setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
      })
  }

  if (to.hash) {
    let el = await findEl(to.hash)
    if (el.parentElement.scrollWidth > window.innerWidth)
      return el.parentElement.scrollLeft = el.offsetLeft - el.parentElement.offsetWidth / 2 + el.offsetWidth / 2
    else if (el.parentElement.scrollHeight > window.innerHeight)
      return el.parentElement.scrollTop = el.offsetTop
    if ('scrollBehavior' in document.documentElement.style) {
      return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
    } else {
      return window.scrollTo(0, el.offsetTop)
    }
  }

  return { x: 0, y: 0 }
}