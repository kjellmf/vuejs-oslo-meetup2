<template>
  <div class="card">
    <header class="card-header" @click="closed = !closed">
      <slot name="title">
        <p class="card-header-title">{{name}}</p>
      </slot>
      <a class="card-header-icon card-toggle" title="">
        <i class="fas" :class="{'fa-angle-up':closed, 'fa-angle-down':!closed}"></i>
      </a>
    </header>
    <transition name="fade">
      <div class="card-content" v-show="!closed">
        <slot/>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "collapse-card",
  data: function () {
    return {
      closed: false
    }
  },
  props: {
    name: String
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.20s ease-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
