import { defineStore } from "pinia";

export const useScriptsStore = defineStore("scripts", {
  state: () => ({
    terminalFilter: "",
    descriptionFilter: "",
    _scripts: [],
    scripts: [],
    terminalOptions: [],
  }),

  getters: {
    allScripts: (state) => state.scripts,
    favoritesFirstScripts: (state) =>
      state.scripts.sort((a, b) => {
        return Number(b.favorite) - Number(a.favorite);
      }),
  },

  actions: {
    getDateFromID(id) {
      const [a, date] = id.split("-");
      return date;
    },

    sortScriptsByFavorite(direction) {
      if (direction === "asc") {
        this.scripts.sort((a, b) => {
          const aFavorite = Number(a.favorite) || 0;
          const bFavorite = Number(b.favorite) || 0;

          return bFavorite - aFavorite;
        });
      }
      if (direction === "desc") {
        this.scripts
          .sort((a, b) => {
            const aFavorite = Number(a.favorite) || 0;
            const bFavorite = Number(b.favorite) || 0;

            return bFavorite - aFavorite;
          })
          .reverse();
      }
    },

    sortScriptsByCopyCount(direction) {
      if (direction === "asc") {
        this.scripts.sort((a, b) => {
          const aCopyCount = Number(a.copyCount) || 0;
          const bCopyCount = Number(b.copyCount) || 0;

          return bCopyCount - aCopyCount;
        });
      }

      if (direction === "desc") {
        this.scripts
          .sort((a, b) => {
            const aCopyCount = Number(a.copyCount) || 0;
            const bCopyCount = Number(b.copyCount) || 0;

            return bCopyCount - aCopyCount;
          })
          .reverse();
      }
    },

    sortScriptsByDate(direction) {
      if (direction === "asc") {
        this.scripts.sort((a, b) => {
          const aDate = this.getDateFromID(a._id);
          const bDate = this.getDateFromID(b._id);

          return bDate - aDate;
        });
      }

      if (direction === "desc") {
        this.scripts
          .sort((a, b) => {
            const aDate = this.getDateFromID(a._id);
            const bDate = this.getDateFromID(b._id);

            return bDate - aDate;
          })
          .reverse();
      }
    },

    getDuplicateTerminalAndDesc({ terminal, description }) {
      return this.scripts.find((script) => {
        const lowercaseTerminal = script.terminal.toLowerCase();
        const lowercaseDescription = script.description.toLowerCase();

        const terminalMatches = lowercaseTerminal === terminal.toLowerCase();
        const descriptionMatches =
          lowercaseDescription === description.toLowerCase();

        if (terminalMatches && descriptionMatches) {
          return script;
        }
      });
    },

    getDuplicateDescAndCMD({ description, command }) {
      return this.scripts.find((script) => {
        const lowercaseDescription = script.description.toLowerCase();
        const lowercaseCommand = script.command.toLowerCase();

        const commandMatches = lowercaseCommand === command.toLowerCase();
        const descriptionMatches =
          lowercaseDescription === description.toLowerCase();

        if (commandMatches && descriptionMatches) {
          return script;
        }
      });
    },

    saveScripts() {
      const scriptsStr = JSON.stringify(this._scripts);
      localStorage.setItem("CMDEr_scripts", scriptsStr);
    },

    loadScripts() {
      this.scripts = JSON.parse(localStorage.getItem("CMDEr_scripts")) || [];
      this._scripts = JSON.parse(localStorage.getItem("CMDEr_scripts")) || [];

      this.terminalOptions = this._scripts.map((script) => script.terminal);
    },

    removeScript(id) {
      this._scripts = this._scripts.filter((script) => script._id != id);
    },

    favoriteScript(id) {
      this._scripts = this._scripts.map((script) => {
        if (script._id === id) {
          script.favorite = !script.favorite;
        }

        return script;
      });
    },

    addCopyCount(id) {
      this._scripts = this._scripts.map((script) => {
        if (script._id === id) {
          if (!script.copyCount) {
            script.copyCount = 1;
          } else script.copyCount += 1;
        }

        return script;
      });
    },

    updateScript(id) {
      const script = this._scripts.find((script) => script._id === id);

      const scriptIndex = this.scripts.findIndex((script) => script._id === id);

      this.scripts[scriptIndex] = script;
    },
  },
});
