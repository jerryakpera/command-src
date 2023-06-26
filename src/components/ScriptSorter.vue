<template>
  <q-btn-toggle
    spread
    no-caps
    rounded
    unelevated
    color="white"
    toggle-color="secondary"
    class="my-custom-toggle"
    :options="[
      { label: '', value: 'favorite', slot: 'favorite' },
      { label: '', value: 'copy-count', slot: 'copy-count' },
      { label: '', value: 'date', slot: 'date' },
    ]"
  >
    <template v-slot:favorite>
      <div
        class="flex items-center no-wrap full-width justify-center"
        :class="sortBy === 'favorite' ? 'text-white' : ' text-grey-7'"
        @click="toggleDirection('favorite')"
      >
        <div class="text-center">Favorites</div>
        <q-icon
          right
          :name="
            sortDirection === 'asc'
              ? 'las la-sort-amount-down'
              : 'las la-sort-amount-up'
          "
        />
      </div>
    </template>

    <template v-slot:copy-count>
      <div
        class="flex items-center no-wrap full-width justify-center"
        :class="sortBy === 'copy-count' ? 'text-white' : ' text-grey-7'"
        @click="toggleDirection('copy-count')"
      >
        <div class="text-center">Copy count</div>
        <q-icon
          right
          :name="
            sortDirection === 'asc'
              ? 'las la-sort-amount-down'
              : 'las la-sort-amount-up'
          "
        />
      </div>
    </template>

    <template v-slot:date>
      <div
        class="flex items-center no-wrap full-width justify-center"
        :class="sortBy === 'date' ? 'text-white' : ' text-grey-7'"
        @click="toggleDirection('date')"
      >
        <div class="text-center">Date</div>
        <q-icon
          right
          :name="
            sortDirection === 'asc'
              ? 'las la-sort-amount-down'
              : 'las la-sort-amount-up'
          "
        />
      </div>
    </template>
  </q-btn-toggle>
</template>

<script setup>
const emit = defineEmits(["update:sort-direction"]);
const props = defineProps(["sortBy", "sortDirection"]);

const toggleDirection = (label) => {
  if (props.sortBy !== label) return;

  if (props.sortDirection === "asc") {
    emit("update:sort-direction", "desc");
  } else emit("update:sort-direction", "asc");
};
</script>

<style lang="scss" scoped></style>
