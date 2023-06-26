<template>
  <q-form @submit.prevent.stop="handleSubmit">
    <q-card-section class="q-pa-none">
      <div class="row q-col-gutter-xs q-mb-md">
        <div class="col-12">
          <div class="text-body2 text-weight-bold">
            Complete the form below to save a new terminal script/command
          </div>
          <ol>
            <li>Terminal, description and command fields are required</li>

            <li>
              Do not include any sensitive information when creating scripts
            </li>

            <li>Indicate variables using &lt;variable&gt;</li>
          </ol>
        </div>

        <div class="col-12" v-if="scriptItem">
          <ScriptItem :item="scriptItem" />
        </div>

        <div class="col-4">
          <q-select
            outlined
            use-input
            autofocus
            lazy-rules
            stack-label
            color="secondary"
            v-model="terminal"
            input-debounce="0"
            @filter="filterFn"
            :options="options"
            :rules="[isRequired]"
            label-color="secondary"
            label="terminal (version)"
            new-value-mode="add-unique"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>

        <div class="col-8">
          <q-input
            outlined
            stack-label
            color="secondary"
            label="Description"
            label-color="secondary"
            v-model="description"
            :rules="[isRequired]"
          />
        </div>
      </div>

      <div
        class="text-caption text-negative text-weight-medium"
        v-if="formError"
      >
        {{ formError }}
      </div>
      <q-editor
        v-model="command"
        min-height="5rem"
        color="secondary"
        :rules="[isRequired]"
        placeholder="enter your command here"
      />
    </q-card-section>

    <q-card-actions class="q-px-none q-mt-sm q-pb-none q-mb-none">
      <q-btn
        no-caps
        rounded
        label="Save"
        type="submit"
        color="primary"
        class="full-width"
      />
    </q-card-actions>
  </q-form>
</template>

<script setup>
import ScriptItem from "components/ScriptItem.vue";

import { useQuasar } from "quasar";
import { computed, onMounted, ref } from "vue";

import { useValidation } from "src/composables";
import { useScriptsStore } from "src/stores/scripts-store";

const { isRequired } = useValidation();
const scriptsStore = useScriptsStore();

const $q = useQuasar();
const scriptItem = ref(null);
const emit = defineEmits(["switchTab"]);

const command = ref("");
const terminal = ref("");
const formError = ref("");
const description = ref("");
const options = ref([]);

const filterFn = (val, update) => {
  if (val === "") {
    update(() => {
      options.value = scriptsStore.terminalOptions;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = scriptsStore.terminalOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

const validateNoDuplicates = (newScript) => {
  return new Promise((resolve, reject) => {
    const duplicateTerminalAndDescription =
      scriptsStore.getDuplicateTerminalAndDesc(newScript);

    const duplicateDescriptionAndCMD =
      scriptsStore.getDuplicateDescAndCMD(newScript);

    if (duplicateTerminalAndDescription) {
      reject(duplicateTerminalAndDescription);
    }

    if (duplicateDescriptionAndCMD) {
      reject(duplicateDescriptionAndCMD);
    }

    resolve(newScript);
  });
};

const handleSubmit = async () => {
  const newScript = {
    terminal: terminal.value,
    description: description.value,
    command: command.value,
    favorite: false,
    copyCount: 0,
  };

  if (!command.value) {
    $q.notify({
      message: "Enter a command",
      color: "dark",
    });

    return;
  }

  $q.loading.show();

  validateNoDuplicates(newScript)
    .then((payload) => {
      const _id =
        Math.random().toString(16).slice(2) + "-" + new Date().getTime();

      const script = {
        _id,
        createdAt: new Date(),
        ...payload,
      };

      scriptsStore._scripts.push(script);
      scriptsStore.saveScripts();
      scriptsStore.loadScripts();

      emit("switchTab");
      $q.loading.hide();
    })
    .catch((e) => {
      scriptItem.value = e;

      $q.notify({
        color: "dark",
        icon: "las la-exclamation",
        message: "A similar script already exists",
      });
      $q.loading.hide();
    });
};

onMounted(() => {
  options.value = [...scriptsStore.terminalOptions];
});
</script>

<style lang="scss" scoped></style>
