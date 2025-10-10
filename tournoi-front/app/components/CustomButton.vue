<template>
  <button
    class="custom-btn"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
// Aucun script nécessaire ici
</script>

<style scoped>
.custom-btn {
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  border: none;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 0.6rem;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.custom-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.2);
}
.custom-btn:active {
  transform: translateY(0);
  box-shadow: none;
}
</style>