import React from "react";

const DARK_MODE_KEY = "dark_mode";
const DARK_THEME = { color: "#fff", background: "#333" };
const LIGHT_THEME = { color: "#333", background: "#fff" };

const DarkMode = {
  getSetting: function () {
    try {
      const storedValue = window.localStorage.getItem(DARK_MODE_KEY);
      return storedValue === "true";
    } catch (e) {
      return false;
    }
  },

  updateSetting: function (value: string) {
    try {
      window.localStorage.setItem(DARK_MODE_KEY, value ? "true" : "false");
    } catch (e) {
      /* empty */
    }
  },
};

export { DARK_THEME, LIGHT_THEME, DarkMode };

export default React.createContext(true);
