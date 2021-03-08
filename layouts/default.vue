<template>
  <div>
    <OrganismHeader />
    <Nuxt />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  mounted() {
    this.changeLogo(this.$nuxt.$route.matched[0].instances.default.label)
  },
  methods: {
    ...mapMutations({
      changeLogo: 'changeLogo',
    }),
  },
}
</script>
