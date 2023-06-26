<template>
  <div style="height: 350px" class="flex justify-center">
    <div style="width: 100%">
      <div
        class="text-h5 heading-font text-center text-weight-medium text-secondary"
      >
        Remembering terminal scripts and command made easy
      </div>

      <div
        class="text-italic q-my-lg text-center text-weight-medium text-body1"
        :class="$q.dark.isActive ? 'text-white ' : 'text-dark'"
      >
        Save a list of your most commonly used commands and easily copy them for
        quick use.
      </div>

      <div class="q-my-lg">
        <q-btn
          no-caps
          size="lg"
          color="secondary"
          class="full-width"
          label="Add a script"
          @click="emit('switchTab', 'add-script')"
        />
      </div>
    </div>

    <div
      class="self-end text-caption"
      :class="$q.dark.isActive ? 'text-grey-3' : 'text-grey-8'"
    >
      * still in development
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["switchTab"]);
</script>

<style lang="scss" scoped></style>
