<template>
  <div>
    <div class="row q-col-gutter-sm q-mb-md">
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

    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 350px"
      class="q-pr-md"
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

import { useScriptsStore } from "stores/scripts-store";
import { computed, watch } from "vue";

const scriptsStore = useScriptsStore();

const terminalFilter = computed(() => scriptsStore.terminalFilter);
const descriptionFilter = computed(() => scriptsStore.descriptionFilter);

const resetScripts = () => {
  scriptsStore.scripts = scriptsStore._scripts;
};

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
