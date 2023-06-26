<template>
  <div>
    <div class="row q-col-gutter-sm q-mb-sm">
      <div class="col-3">
        <q-input
          outlined
          autofocus
          label="filter terminal"
          v-model="scriptsStore.terminalFilter"
        />
      </div>

      <div class="col-9">
        <q-input
          outlined
          label="filter description"
          v-model="scriptsStore.descriptionFilter"
        />
      </div>
    </div>

    <q-card-section
      class="q-pa-none q-mt-none q-mb-sm"
      v-if="scriptsStore?.allScripts?.length > 0"
    >
      <ScriptSorter
        :sortBy="sortBy"
        v-model="sortBy"
        :sortDirection="sortDirection"
        v-model:sort-direction="sortDirection"
      />
    </q-card-section>

    <q-scroll-area
      class="q-pr-none"
      :bar-style="barStyle"
      style="height: 350px"
      :thumb-style="thumbStyle"
    >
      <ScriptItem
        v-for="(item, i) in scriptsStore.allScripts"
        :key="item._id"
        :item="item"
      />
    </q-scroll-area>
  </div>
</template>

<script setup>
import ScriptItem from "components/ScriptItem.vue";
import ScriptSorter from "components/ScriptSorter.vue";

import { useScriptsStore } from "stores/scripts-store";
import { computed, watch, ref } from "vue";

const scriptsStore = useScriptsStore();

const sortBy = ref("");
const sortDirection = ref("asc");

const terminalFilter = computed(() => scriptsStore.terminalFilter);
const descriptionFilter = computed(() => scriptsStore.descriptionFilter);

const handleTerminalFilter = (terminal) => {
  scriptsStore.scripts = scriptsStore._scripts.filter((script) => {
    const lcTerminal = script.terminal.toLowerCase();

    if (lcTerminal.includes(terminal.toLowerCase())) {
      return script;
    }
  });
};

const handleDescriptionFilter = (description) => {
  scriptsStore.scripts = scriptsStore._scripts.filter((script) => {
    const lcTerminal = script.description.toLowerCase();

    if (lcTerminal.includes(description.toLowerCase())) {
      return script;
    }
  });
};

watch(terminalFilter, (current) => {
  handleTerminalFilter(current);
});

watch(descriptionFilter, (current) => {
  handleDescriptionFilter(current);
});

watch(sortBy, (current) => {
  if (current === "favorite") {
    scriptsStore.sortScriptsByFavorite(sortDirection.value);
  }

  if (current === "copy-count") {
    scriptsStore.sortScriptsByCopyCount(sortDirection.value);
  }

  if (current === "date") {
    scriptsStore.sortScriptsByDate(sortDirection.value);
  }
});

watch(sortDirection, (current) => {
  if (sortBy.value === "favorite") {
    scriptsStore.sortScriptsByFavorite(current);
  }

  if (sortBy.value === "copy-count") {
    scriptsStore.sortScriptsByCopyCount(current);
  }

  if (sortBy.value === "date") {
    scriptsStore.sortScriptsByDate(current);
  }
});

const thumbStyle = {
  right: "4px",
  borderRadius: "5px",
  backgroundColor: "#027be3",
  width: "5px",
  opacity: 0.75,
};

const barStyle = {
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#027be3",
  width: "9px",
  opacity: 0.2,
};
</script>

<style lang="scss" scoped></style>
