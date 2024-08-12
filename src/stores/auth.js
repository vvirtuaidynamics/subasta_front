import PocketBase from "pocketbase";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // Create a PocketBase client
  const pbClient = new PocketBase(
    process.env.POCKETBASE_URL || "http://127.0.0.1:8090"
  );

  // This store keeps track of the user model and token
  const token = ref(pbClient.authStore.token);
  const user = ref(pbClient.authStore.model);

  // Observe the PocketBase auth status so we can update our state when changes happen
  pbClient.authStore.onChange((authToken, userModel) => {
    token.value = authToken;
    user.value = userModel;
  });

  // This is a promise the Vue components can check to see if auth is loaded before rendering
  // It is not needed for PocketBase, but do for Firebase and some other auth systems so I like to keep it here.
  const ready = ref(Promise.resolve(true));

  async function register(email, password, passwordConfirm) {
    await pbClient.users.create({
      email,
      password,
      passwordConfirm,
    });
    await pbClient.users.requestVerification(email);
    await login(email, password);
  }

  async function login(email, password) {
    return pbClient.collection("users").authWithPassword(email, password);
  }

  async function logout() {
    await pbClient.authStore.clear();
  }

  async function sendPasswordReset(email) {
    await pbClient.users.requestPasswordReset(email);
  }

  async function sendVerification(email) {
    if (user.value) {
      await pbClient.users.requestVerification(user.value.email);
    }
  }

  async function destroyAccount(password) {
    await pbClient.users.authViaEmail(user.value.email, password);
    await pbClient.users.delete(user.value.id);
    await pbClient.authStore.clear();
  }

  const authenticated = computed(() => {
    return !!user.value;
  });

  return {
    // state properties
    token,
    user,
    ready,
    // actions
    register,
    login,
    logout,
    sendPasswordReset,
    sendVerification,
    destroyAccount,
    // getters
    authenticated,
  };
});
