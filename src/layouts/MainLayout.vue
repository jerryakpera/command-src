<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q-pa-md">
      <q-card flat style="border-radius: 10px; border: 1px solid #0096c7">
        <q-tabs
          dense
          no-caps
          align="left"
          v-model="tab"
          active-color="secondary"
          indicator-color="secondary"
          active-class="bg-secondary text-white"
          :class="$q.dark.isActive ? 'text-white' : 'text-black'"
        >
          <div class="flex full-width justify-between">
            <div class="flex">
              <q-tab name="home" label="Home" />
              <q-tab name="scripts" label="All scripts" />
              <q-tab name="add-script" label="Add Script" />
            </div>

            <div class="q-pr-sm">
              <q-toggle
                v-model="darkMode"
                color="secondary"
                icon="las la-adjust"
              />
            </div>
          </div>
        </q-tabs>

        <q-card
          flat
          class="bg-secondary"
          style="padding: 1px 0 0px 0; border-radius: 0 0 10px 10px"
        >
          <q-card-section
            class="q-pa-md"
            :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
          >
            <q-tab-panels v-model="tab" animated class="q-pa-none">
              <q-tab-panel name="home" class="q-pa-none">
                <Home @switchTab="(val) => (tab = val)" />
              </q-tab-panel>

              <q-tab-panel name="scripts" class="q-pa-none">
                <AllScripts />
              </q-tab-panel>

              <q-tab-panel name="add-script" class="q-pa-none">
                <AddScripts @switch-tab="tab = 'scripts'" />
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card>
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import Home from "components/Home.vue";
import AllScripts from "components/AllScripts.vue";
import AddScripts from "components/AddScripts.vue";

import { ref, watch } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const darkMode = ref(true);
const tab = ref("home");

const toggleDarkMode = () => {
  $q.dark.set(!$q.dark.isActive);
};

watch(darkMode, () => {
  toggleDarkMode();
});
</script>

<!-- TODO: Add import and export scripts -->
