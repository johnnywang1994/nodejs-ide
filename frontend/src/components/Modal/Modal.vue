<template>
  <transition name="modal-fade">
    <div class="modal-wrapper" v-show="openState" :style="style">
      <transition name="modal-fade">
        <div class="modal-inner" v-show="openState" :style="style">
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    openState: {
      type: Boolean,
      default: false,
    },
    animation: {
      type: String,
      default: 'fade',
    },
    duration: {
      type: Number,
      default: 0.4,
    },
  },
  name: 'Modal',
  computed: {
    style() {
      return {
        animationDuration: `${this.duration}s`
      };
    },
  },
};
</script>

<style lang="scss">
.modal-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .75);
  .modal-inner {
    position: absolute;
    max-width: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
  }
}
</style>
