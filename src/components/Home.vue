<template>
  <div>
    <div>
      <div class="text-h6 heading-font text-weight-bold text-accent">
        Terminal Command Library
      </div>

      <div
        class="text-body1 text-weight-medium"
        :class="$q.dark.isActive ? 'text-white ' : 'text-dark'"
      >
        Store and Manage Commands for Multiple Terminals
      </div>

      <div class="text-body2 q-mb-md q-mt-sm">
        <p>
          Are you tired of searching through endless documentation and command
          histories to
          <span
            :class="
              $q.dark.isActive
                ? 'text-accent'
                : 'text-secondary text-weight-bold'
            "
            >find the commands</span
          >
          you need for
          <span
            :class="
              $q.dark.isActive
                ? 'text-accent'
                : 'text-secondary text-weight-bold'
            "
            >different terminals</span
          >
        </p>
      </div>

      <div class="row q-col-gutter-sm q-mt-md">
        <div class="col-6 text-body2">
          <div
            class="text-body1 text-weight-medium"
            :class="$q.dark.isActive ? 'text-white ' : 'text-dark'"
          >
            Features
          </div>

          <div class="text-body2 q-mb-md q-mt-sm">
            <ul
              style="margin: 0; padding: 0; padding-left: 20px"
              class="q-pl-md"
            >
              <li>
                <span
                  :class="
                    $q.dark.isActive
                      ? 'text-accent'
                      : 'text-secondary text-weight-bold'
                  "
                  >Centralized Repository</span
                >
              </li>
              <li>
                <span
                  :class="
                    $q.dark.isActive
                      ? 'text-accent'
                      : 'text-secondary text-weight-bold'
                  "
                  >Categorization and Tagging</span
                >
              </li>
              <li>
                <span
                  :class="
                    $q.dark.isActive
                      ? 'text-accent'
                      : 'text-secondary text-weight-bold'
                  "
                  >Command Search</span
                >
              </li>
              <li>
                <span
                  :class="
                    $q.dark.isActive
                      ? 'text-accent'
                      : 'text-secondary text-weight-bold'
                  "
                  >Command Execution</span
                >
              </li>
            </ul>
          </div>
        </div>

        <div class="col-6 text-body2">
          <div
            class="text-body1 text-weight-medium"
            :class="$q.dark.isActive ? 'text-white ' : 'text-dark'"
          >
            Benefits
          </div>

          <div class="text-body2 q-mb-md q-mt-sm">
            <ul
              style="margin: 0; padding: 0; padding-left: 20px"
              class="q-pl-md"
            >
              <li>
                <span
                  :class="
                    $q.dark.isActive
                      ? 'text-accent'
                      : 'text-secondary text-weight-bold'
                  "
                  >Efficiency & organization</span
                >
              </li>
              <li>
                <span
                  :class="
                    $q.dark.isActive
                      ? 'text-accent'
                      : 'text-secondary text-weight-bold'
                  "
                  >Resource sharing</span
                >
              </li>
              <li>
                <span
                  :class="
                    $q.dark.isActive
                      ? 'text-accent'
                      : 'text-secondary text-weight-bold'
                  "
                  >Knowledge retention</span
                >
              </li>
              <li>
                <span
                  :class="
                    $q.dark.isActive
                      ? 'text-accent'
                      : 'text-secondary text-weight-bold'
                  "
                  >Error Reduction</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>

      <q-separator spaced="sm" />

      <div class="q-my-lg">
        <q-btn
          no-caps
          rounded
          size="medium"
          color="secondary"
          label="Add a script"
          @click="emit('switchTab', 'add-script')"
        />
      </div>
    </div>

    <div
      class="flex full-width justify-end text-caption"
      :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-7'"
    >
      * still in development
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["switchTab"]);
</script>

<style lang="scss" scoped>
.keyword {
  color: $accent;
}
</style>
