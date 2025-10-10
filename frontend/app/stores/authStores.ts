import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: typeof window !== "undefined" ? localStorage.getItem("token") || "" : "",
    user: null as null | { email: string; prenom?: string; nom?: string },
    isLoggedIn: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
  }),
  actions: {
    setUser(user: any) {
      this.user = user;
    },
    setToken(token: string) {
      this.token = token;
      this.isLoggedIn = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }
    },
    logout() {
      this.token = "";
      this.user = null;
      this.isLoggedIn = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
  },
});
