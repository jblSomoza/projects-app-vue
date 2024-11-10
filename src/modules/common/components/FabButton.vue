<template>
  <button
    :class="['btn btn-circle btn-secondary fixed bottom-10 right-10', position]"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
});

defineEmits(['click']);
</script>

<style scoped>
.top-left {
  top: 10px;
  left: 10px;
}

.top-right {
  top: 10px;
  right: 10px;
}

.bottom-left {
  bottom: 10px;
  left: 10px;
}

.bottom-right {
  bottom: 10px;
  right: 10px;
}
</style>
