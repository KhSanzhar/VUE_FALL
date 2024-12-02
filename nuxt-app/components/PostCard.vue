<script setup lang="ts">
import type { User } from "~/types/user";

const props = defineProps<{
  user: User
}>()

const emit = defineEmits<{
  (e: 'like'): void
}>()

const fullStars = computed(() => Math.floor(props.user.rating));
const hasHalfStar = computed(() => props.user.rating % 1 >= 0.5);
const emptyStars = computed(() => 5 - fullStars.value - (hasHalfStar.value ? 1 : 0));
</script>

<template>
  <div class="flex flex-col rounded-lg bg-[#5BB9CD] gap-2 p-4">
    <div class="flex p-4 justify-between items-center">
      <div class="flex flex-col justify-between bg-[#73c3d3] rounded-lg p-2">
        <span class="text-white text-xl">{{ user.name }}</span>
        <span class="text-white text-sm">{{ user.pubDate }}</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-white text-lg">Rating</span>
        <div class="flex items-center space-x-1">
          <img
              v-for="star in fullStars"
              :key="'full-' + star"
              src="/star.png"
              alt="star"
              class="w-5 h-5"
          />
          <div v-if="hasHalfStar" class="relative w-5 h-5">
            <img
                src="/empty-star.png"
                alt="half-star"
                class="w-5 h-5 absolute inset-0"
            />
            <img
                src="/star.png"
                alt="half-star"
                class="w-5 h-5 absolute left-0 top-0 clip-50"
            />
          </div>
          <img
              v-for="star in emptyStars"
              :key="'empty-' + star"
              src="/empty-star.png"
              alt="empty-star"
              class="w-5 h-5"
          />
        </div>
      </div>
      <div>
        <nuxt-img :src="user.avatar" alt="User Avatar" class="rounded-full w-12 h-12"/>
      </div>
    </div>
    <div class="mt-2">
      <span class="text-white text-lg">{{ user.comment }} {{ user.rating }}</span>
    </div>
    <div class="flex justify-end mt-4">
      <button
          class="bg-[#43EF27] h-8 px-5 rounded-lg text-white font-semibold hover:bg-[#33cc21]"
          @click="emit('like')"
      >
        LIKE
      </button>
    </div>
  </div>
</template>

<style scoped>
.clip-50 {
  clip-path: inset(0 50% 0 0);
}
</style>
