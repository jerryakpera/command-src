<template>
  <q-card
    flat
    class="q-mb-sm"
    :class="item.favorite ? 'bg-secondary' : 'bg-grey-5'"
    style="padding: 1px; border-radius: 10px"
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
              size="xs"
              color="secondary"
              name="las la-thumbs-up"
              v-if="item.favorite"
            />

            <div class="text-secondary text-body2 text-weight-bold">
              {{ item.copyCount || 0 }}
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
                dense
                no-caps
                unelevated
                color="secondary"
                style="padding: 3px 10px"
                @click="handleCopy(item)"
              >
                Copy
                <q-icon size="xs" class="q-ml-xs" name="las la-copy" />
              </q-btn>
            </div>

            <div>
              <q-btn
                dense
                :outline="!item.favorite"
                :unelevated="item.favorite"
                :color="item.favorite ? 'secondary' : 'grey-6'"
                @click="handleFavoriteScript(item._id)"
              >
                <q-icon size="xs" name="las la-thumbs-up" />
              </q-btn>
            </div>

            <div>
              <q-btn
                dense
                unelevated
                color="negative"
                @click="handleDeleteScript(item._id)"
              >
                <q-icon size="xs" name="las la-trash" />
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
