<script setup lang="ts">
const emit = defineEmits<{
  (e: 'openModal'): void
}>();

const showPopup = ref(false)
</script>

<template>
  <header class="w-full h-16 flex justify-between items-center bg-white opacity-75 px-2">
    <nuxt-img src="/header/burger.png" class="cursor-pointer w-[51px] h-[51px]" @click="emit('openModal')" />
    <div
        class="rounded-full bg-[#7EEFFF] flex justify-center items-center w-[51px] h-[51px]"
        @click="showPopup = !showPopup"
    >
      <nuxt-img src="/header/user.png" class="m-auto w-[36px] h-[38px]" />
    </div>
    <div>

    </div>
  </header>
</template>
