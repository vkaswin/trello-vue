import { onMounted, onUnmounted } from "vue";

export const useOnClickOutSide = (ref, handler) => {
  onMounted(() => {
    document.addEventListener("touchstart", handleClickOutSide);
    document.addEventListener("mousedown", handleClickOutSide);
  });

  onUnmounted(() => {
    document.removeEventListener("touchstart", handleClickOutSide);
    document.removeEventListener("mousedown", handleClickOutSide);
  });

  const handleClickOutSide = (event) => {
    const { target } = event;
    if (ref.value && !ref.value.contains(target)) {
      handler();
    }
  };
};
