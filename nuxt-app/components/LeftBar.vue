<script setup lang="ts">

const props = defineProps<{
  categories: string[]
  contacts: string[]
}>()

const emit = defineEmits<{
  (e: 'open'): void
  (e: 'close'): void
  (e: 'category', category: string): void
}>()

const isOpen = defineModel<boolean>()

const handleSelect = (category: string) => {
  emit('category', category)
  isOpen.value = false
}
</script>

<template>
  <div v-show="isOpen">
    <div class="fixed top-0 left-0 w-[350px] h-full bg-[#C1EBF1] z-20 absolute">
      <div class="flex flex-col gap-5 p-3">
        <div class="bg-white flex justify-center items-center rounded-lg">
          <h1 class="text-4xl font-bold">MENU</h1>
        </div>
        <div class="rounded-lg py-3 bg-white flex flex-col gap-8">
          <div class="flex flex-col gap-5">
            <div
                v-for="(cat, index) in categories"
                :key="index"
                class="bg-[#42D669] text-center rounded-lg p-3"
            >
              <span
                  class="text-4xl text-white font-bold cursor-pointer"
                  @click="handleSelect(cat)"
              >
                {{ cat }}
              </span>
            </div>
          </div>

          <div class="bg-[#42D669] p-3 flex flex-col gap-6">
            <h2 class="text-4xl text-white font-bold text-center">CONTACTS</h2>
            <div class="flex flex-col gap-6">
            <span
                v-for="(contact, index) in contacts"
                :key="index"
                class="font-bold text-2xl text-white"
            >
              {{ contact }}
            </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-screen h-screen absolute top-0 left-0 bg-black opacity-50 z-10" @click="isOpen = false" />
  </div>
</template>

