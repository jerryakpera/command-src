<template>
  <q-card
    flat
    class="q-mb-sm"
    :class="$q.dark.isActive ? 'bg-secondary' : 'bg-secondary'"
    style="padding: 2px; border-radius: 10px"
  >
    <q-expansion-item
      label="First"
      icon="explore"
      class="bg-dark"
      group="somegroup"
      switch-toggle-side
      header-class="text-white"
    >
      <template #header>
        <div
          class="flex full-width justify-between items-center q-col-gutter-sm text-weight-bold"
        >
          <div>
            <div class="text-secondary">{{ item.terminal }}:</div>
            <div>
              {{ item.description }}
            </div>
          </div>

          <div class="flex items-center q-col-gutter-sm">
            <q-icon
              size="sm"
              color="secondary"
              name="las la-star"
              v-if="item.favorite"
            />

            <div class="text-secondary text-body2 text-weight-bold">
              {{ item.copyCount }}
            </div>
          </div>
        </div>
      </template>

      <q-separator :class="$q.dark.isActive" />
      <q-card style="padding: 1px; border-radius: 0 0 10px 10px">
        <q-card-section class="flex justify-between items-start">
          <div v-html="item.command"></div>

          <div class="flex items-center q-col-gutter-xs">
            <div>
              <q-btn
                unelevated
                dense
                color="secondary"
                @click="handleCopy(item)"
              >
                Copy
                <q-icon size="sm" class="q-ml-xs" name="las la-copy" />
              </q-btn>
            </div>

            <div>
              <q-btn
                unelevated
                dense
                color="accent"
                @click="handleFavoriteScript(item._id)"
              >
                <q-icon name="las la-star" />
              </q-btn>
            </div>

            <div>
              <q-btn
                unelevated
                dense
                color="negative"
                @click="handleDeleteScript(item._id)"
              >
                <q-icon name="las la-trash" />
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-card>
</template>

<script setup>
import striptags from "striptags";
import { useQuasar } from "quasar";
import { decode } from "html-entities";

import { useScriptsStore } from "src/stores/scripts-store";

const $q = useQuasar();
const props = defineProps(["item"]);

const scriptsStore = useScriptsStore();

const sterilizeCommand = (command) => {
  let cmd = striptags(command);
  cmd = decode(cmd);
  return cmd.replace(/  +/g, " ");
};

const handleCopy = (script) => {
  scriptsStore.addCopyCount(script._id);
  scriptsStore.scripts = scriptsStore._scripts;
  scriptsStore.saveScripts();

  navigator.clipboard.writeText(sterilizeCommand(script.command));
};

const handleDeleteScript = (id) => {
  scriptsStore.removeScript(id);
  scriptsStore.saveScripts();
  scriptsStore.loadScripts();
};

const handleFavoriteScript = (id) => {
  scriptsStore.favoriteScript(id);
  scriptsStore.saveScripts();
  scriptsStore.updateScript(id);
};
</script>

<style lang="scss" scoped></style>
