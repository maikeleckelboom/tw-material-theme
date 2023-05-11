export default defineNuxtPlugin((nuxtApp) => {
  const dialog = useDialog();
  return {
    provide: {
      dialog,
    },
  };
});
