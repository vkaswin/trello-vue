<template>
  <div class="sub-card">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "SubCard",
  props: ["text"],
};
</script>

<style lang="scss">
.sub-card {
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
  padding: 10px;
  background-color: #fff;
  cursor: default;
  width: calc(100% - 20px);
}
</style>
