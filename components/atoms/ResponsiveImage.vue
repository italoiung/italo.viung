<template>
  <picture v-if="srcImage && originalSrc() && webpSrc()">
    <source :srcSet="webpSrc().srcSet" type="image/webp" />
    <source :srcSet="originalSrc().srcSet" />
    <img
      :src="originalSrc().placeholder"
      :alt="alt"
      :width="originalSrc().width"
      :height="originalSrc().height"
      :loading="loading"
      :style="imgStyle"
    />
  </picture>
</template>

<script>
export default {
  name: 'ResponsiveImage',
  props: {
    srcImage: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    loading: {
      type: [String, Boolean],
      default: false,
      required: false,
    },
    type: {
      type: String,
      default: 'half',
      required: false,
    },
    imgStyle: {
      type: Object,
      default: () => ({}),
      required: false,
    },
  },
  methods: {
    originalSrc() {
      if (!this.srcImage) return null
      if (this.type === 'oneQuarter')
        return require(`~/assets/img/resizable/${this.srcImage}?resize&min=155&max=375&placeholder=true`)
      if (this.type === 'half')
        return require(`~/assets/img/resizable/${this.srcImage}?resize&min=295&max=615&placeholder=true`)
      if (this.type === 'threeQuarters')
        return require(`~/assets/img/resizable/${this.srcImage}?resize&min=375&max=920&placeholder=true`)
      if (this.type === 'wrap')
        return require(`~/assets/img/resizable/${this.srcImage}?resize&min=375&max=1226&placeholder=true`)
      return require(`~/assets/img/resizable/${this.srcImage}?resize&min=375&max=1920&placeholder=true`)
    },
    webpSrc() {
      if (!this.srcImage) return null
      if (this.type === 'oneQuarter')
        return require(`~/assets/img/resizable/${this.srcImage}?resize&min=155&max=306&format=webp`)
      if (this.type === 'half')
        return require(`~/assets/img/resizable/${this.srcImage}?resize&min=295&max=615&format=webp`)
      if (this.type === 'threeQuarters')
        return require(`~/assets/img/resizable/${this.srcImage}?resize&min=375&max=920&format=webp`)
      if (this.type === 'wrap')
        return require(`~/assets/img/resizable/${this.srcImage}?resize&min=375&max=1226&format=webp`)
      return require(`~/assets/img/resizable/${this.srcImage}?resize&min=375&max=1920&format=webp`)
    },
  },
}
</script>
