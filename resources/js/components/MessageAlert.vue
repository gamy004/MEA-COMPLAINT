<template>
  <div class="message-alert__wrapper" :class="$_alertable_classes">
    <v-alert
      :transition="transitionName"
      :value="alert"
      :type="$_alertable_context"
      :color="$_alertable_color"
      class="elevation-5"
      @mouseover="onMouseOver"
      @mouseleave="onMouseLeave"
    >
      <slot name="message" :message="$_alertable_message">
        <v-layout align-center>
          <span>{{ $_alertable_message }}</span>

          <template v-for="(action, actionIndex) in $_alertable_actions">
            <v-btn
              :key="`messageAlertAction-${actionIndex}`"
              small
              flat
              :color="$_alertable_action_color"
              @click.stop.prevent="onActionClicked(action)"
            >{{ action.text }}</v-btn>
          </template>
        </v-layout>
      </slot>
    </v-alert>
  </div>
</template>

<script>
import alertable from "../mixins/alertable";

export default {
  mixins: [alertable],

  computed: {
    transitionName() {
      return this.alertablePosition.includes("left")
        ? "slide-x-transition"
        : "slide-x-reverse-transition";
    }
  },

  methods: {
    onMouseOver(event) {
      clearTimeout(this.alertable_timer);
    },

    onMouseLeave(event) {
      this.$_alertable_updateTimer();
    },

    onActionClicked(action) {
      action.handler(this.alertableProps);

      this.alert = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.message-alert {
  &__wrapper {
    position: fixed;
    z-index: 3;

    .v-alert {
      border-radius: 5px;
    }

    &.top-middle {
      top: 15px;
      left: 50%;
      transform: translateX(-50%);
    }

    &.bottom-middle {
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
    }

    &.middle-left {
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
    }

    &.middle-right {
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }

    &.top-right {
      top: 15px;
      right: 25px;
    }

    &.top-left {
      top: 15px;
      left: 25px;
    }

    &.bottom-right {
      bottom: 15px;
      right: 25px;
    }

    &.bottom-left {
      bottom: 25px;
      left: 15px;
    }
  }
}
</style>


