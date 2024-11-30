<script setup lang="ts">
import {useUsers} from "~/stores/users";
import type {User} from "~/types/user";

const store = useUsers()

const isOpen = ref(false)

const currentPage = ref(1)

const selectedCategory = ref('ADVENTURE BLOG')

const sorted = ref(false)

const categories = [
  'ADVENTURE BLOG',
  'NATURE BLOG',
  'FASHION BLOG',
  'MODERN BLOG',
];

const contacts = [
  'PHONE: +1(234)-23-45-22',
  'ADDRESS: Green st., Yalow',
  'EMAIL: Yallow@park.info',
];

const date = computed( () => {
  return new Date().toLocaleDateString()
})

const usersByCategory = computed(() => {
  const users = store.getUsersByCategory(selectedCategory.value)
  if (sorted.value) {
    return store.sortUsersByRating(users)
  }
  return users
})

const totalPages = computed(() => {
  return Math.ceil(usersByCategory.value.length / 4)
})

const handleSort = () => {
  sorted.value = true
}

const selectCategory = (cat: string) => {
  selectedCategory.value = cat
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * 4
  return usersByCategory.value.slice(startIndex, startIndex + 4)
})

const addLike = (id: number) => {
  store.allUsers[id].rating += 0.1
  store.$patch()
}

watch(selectedCategory, () => {
  currentPage.value = 1
  sorted.value = false
}, {deep: true})
</script>

<template>
  <div class="w-screen h-screen bg-cover bg-center bg-[url('/bg-img/bg.png')] relative">
    <a-header class="absolute top-2" @open-modal="isOpen = true" />
    <div class="flex justify-center">
      <div class="bg-[url('/bg-img/img.png')] w-[1300px] h-[1100px] bg-cover bg-center mt-20">
        <div class="flex flex-col gap-10 py-16 px-8">
          <div class="bg-[#5BB9CD] w-fit rounded-lg px-5">
            <span class="text-white text-4xl">{{ date }}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="bg-[#5BB9CD] w-fit rounded-lg px-5">
              <span class="text-white text-6xl">{{ selectedCategory }}</span>
            </div>
            <div class="flex items-center gap-4 h-10 px-3 bg-[#EEFCF7] py-2">
              <nuxt-img src="/filter.png" class="size-6"/>
              <span class="text-[#1DE390] text-4xl">Rating</span>
              <nuxt-img
                  src="/polygon.png"
                  class="size-6 cursor-pointer"
                  @click="handleSort"
              />
            </div>
            <div class="flex flex-col">
              <nuxt-img
                  src="/Arrow.png" class="w-[93px] cursor-pointer"
                @click="nextPage"
              />
              <span class="text-5xl">{{ currentPage }}/{{ totalPages }}</span>
            </div>
          </div>
          <div class="grid grid-rows-2 grid-cols-2 gap-[55px]">
            <post-card
              v-for="(post, i) in paginatedUsers"
              :key="i"
              :user="post"
              @click="addLike(post.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <left-bar v-model="isOpen" :categories="categories" :contacts="contacts" @category="selectCategory"/>
</template>
