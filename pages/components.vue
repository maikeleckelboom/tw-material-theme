<script lang="ts" setup>

const {$keyColors} = useNuxtApp()

watchEffect(() => {
})

const store = useSideSheetStore()

const {open} = store, {isOpened} = storeToRefs(store)

const roleToneMap = {
  'surface': {
    light: 100,
    dark: 0
  },
  'surface-dim': {
    light: 87,
    dark: 6
  },
  'surface-bright': {
    light: 98,
    dark: 24
  },
  'surface-container-lowest': {
    light: 100,
    dark: 4
  },
  'surface-container-low': {
    light: 96,
    dark: 10
  },
  'surface-container': {
    light: 94,
    dark: 12
  },
  'surface-container-high': {
    light: 92,
    dark: 17
  },
  'surface-container-highest': {
    light: 90,
    dark: 22
  },
}

const surfaceElevations = [
  'surface-level-1',
  'surface-level-2',
  'surface-level-3',
  'surface-level-4',
  'surface-level-5',
]

const colorMode = reactive(useColorMode())
</script>

<template>
  <div class="h-[100dvh] pb-10">
    <!--    <div class=" p-4 @container w-full h-screen overflow-y-auto scrollbar">-->
    <!--      &lt;!&ndash;-->
    <!--        Primary (P-80),-->
    <!--        On Primary (P-20),-->
    <!--        Secondary (S-80),-->
    <!--        On Secondary (S-20),-->
    <!--        Tertiary (T-80),-->
    <!--        On Tertiary (T-20)-->
    <!--       &ndash;&gt;-->
    <!--      <div class="grid gap-1">-->
    <!--        <div class="grid w-full  @[800px]:grid-cols-4 gap-1 @[600px]:grid-cols-2">-->
    <!--          &lt;!&ndash; Primary &ndash;&gt;-->
    <!--          <div class="grid grid-rows-[100px,50px] text-sm">-->
    <!--            <div class="flex flex-row justify-between p-4 bg-primary text-on-primary">-->
    <!--              <p class="text-ellipsis whitespace-nowrap text-sm">Primary</p>-->
    <!--              <span class="flex items-end text-sm">P-80</span>-->
    <!--            </div>-->
    <!--            <div class="flex grid grid-cols-2 items-center p-4 bg-on-primary text-primary">-->
    <!--              <p class="text-ellipsis whitespace-nowrap text-sm">On Primary</p>-->
    <!--              <span class="text-end text-sm">P-20</span>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          &lt;!&ndash; Secondary &ndash;&gt;-->
    <!--          <div class="grid grid-rows-[100px,50px] text-sm">-->
    <!--            <div class="flex flex-row justify-between p-4 bg-secondary text-on-secondary">-->
    <!--              <p class="text-ellipsis whitespace-nowrap text-sm">Secondary</p>-->
    <!--              <span class="flex items-end text-sm">S-80</span>-->
    <!--            </div>-->
    <!--            <div class="flex grid grid-cols-2 items-center p-4 bg-on-secondary text-secondary">-->
    <!--              <p class="text-ellipsis whitespace-nowrap text-sm">On Secondary</p>-->
    <!--              <span class="text-end text-sm">S-20</span>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          &lt;!&ndash; Tertiary &ndash;&gt;-->
    <!--          <div class="grid grid-rows-[100px,50px] text-sm">-->
    <!--            <div class="flex flex-row justify-between p-4 bg-tertiary text-on-tertiary">-->
    <!--              <p class="text-ellipsis whitespace-nowrap text-sm">Tertiary</p>-->
    <!--              <span class="flex items-end text-sm">T-80</span>-->
    <!--            </div>-->
    <!--            <div class="flex grid grid-cols-2 items-center p-4 bg-on-tertiary text-tertiary">-->
    <!--              <p class="text-ellipsis whitespace-nowrap text-sm">On Tertiary</p>-->
    <!--              <span class="text-end text-sm">T-20</span>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          &lt;!&ndash; Error &ndash;&gt;-->
    <!--          <div class="grid grid-rows-[100px,50px] text-sm @[800px]:ml-1">-->
    <!--            <div class="flex flex-row justify-between p-4 bg-error text-on-error">-->
    <!--              <p class="text-ellipsis whitespace-nowrap text-sm">Error</p>-->
    <!--              <span class="flex items-end text-sm">E-80</span>-->
    <!--            </div>-->
    <!--            <div class="flex items-center justify-between p-4 bg-on-error text-error">-->
    <!--              <p class="text-ellipsis whitespace-nowrap text-sm">On error</p>-->
    <!--              <span class="whitespace-nowrap text-end text-sm">E-20</span>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        &lt;!&ndash;-->
    <!--          Primary Container (P-30),-->
    <!--          On Primary Container (P-90),-->
    <!--          Secondary Container (S-30),-->
    <!--          On Secondary Container (S-90),-->
    <!--          Tertiary Container (T-30),-->
    <!--          On Tertiary Container (T-90)-->
    <!--        &ndash;&gt;-->
    <!--        <div class="grid w-full  @[800px]:grid-cols-4 gap-1 @[600px]:grid-cols-2">-->
    <!--          &lt;!&ndash; Primary Container &ndash;&gt;-->
    <!--          <div class="grid grid-rows-[100px,50px] text-sm">-->
    <!--            <div class="flex flex-row justify-between p-4 bg-primary-container text-on-primary-container">-->
    <!--              <p class="text-ellipsis whitespace-nowrap text-sm">Primary Container</p>-->
    <!--              <span class="flex items-end text-sm">P-30</span>-->
    <!--            </div>-->
    <!--            <div class="flex grid grid-cols-2 items-center p-4 bg-on-primary-container text-primary-container">-->
    <!--              <p class="text-ellipsis whitespace-nowrap text-sm">On Primary Container</p>-->
    <!--              <span class="text-end text-sm">P-90</span>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          &lt;!&ndash; Secondary Container &ndash;&gt;-->
    <!--          <div class="grid grid-rows-[100px,50px] text-sm">-->
    <!--            <div class="flex flex-row justify-between p-4 bg-secondary-container text-on-secondary-container">-->
    <!--              <p class="text-ellipsis whitespace-nowrap text-sm">Secondary Container</p>-->
    <!--              <span class="flex items-end text-sm">S-30</span>-->
    <!--            </div>-->
    <!--            <div class="flex grid grid-cols-2 items-center p-4 bg-on-secondary-container text-secondary-container">-->
    <!--              <p class="text-ellipsis whitespace-nowrap text-sm">On Secondary Container</p>-->
    <!--              <span class="text-end text-sm">S-90</span>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          &lt;!&ndash; Tertiary Container &ndash;&gt;-->
    <!--          <div class="grid grid-rows-[100px,50px] text-sm">-->
    <!--            <div class="flex flex-row justify-between p-4 bg-tertiary-container text-on-tertiary-container">-->
    <!--              <p class="text-ellipsis whitespace-nowrap text-sm">Tertiary Container</p>-->
    <!--              <span class="flex items-end text-sm">T-30</span>-->
    <!--            </div>-->
    <!--            <div class="flex grid grid-cols-2 items-center p-4 bg-on-tertiary-container text-tertiary-container">-->
    <!--              <p class="text-ellipsis whitespace-nowrap text-sm">On Tertiary Container</p>-->
    <!--              <span class="text-end text-sm">T-90</span>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          &lt;!&ndash; Error Container &ndash;&gt;-->
    <!--          <div class="grid grid-rows-[100px,50px] text-sm @[800px]:ml-1">-->
    <!--            <div class="flex flex-row justify-between p-4 bg-error-container text-on-error-container">-->
    <!--              <p class="text-ellipsis whitespace-nowrap text-sm">Error Container</p>-->
    <!--              <span class="flex items-end text-sm">E-30</span>-->
    <!--            </div>-->
    <!--            <div class="flex grid grid-cols-2 items-center p-4 bg-on-error-container text-error-container">-->
    <!--              <p class="text-ellipsis whitespace-nowrap text-sm">On error Container</p>-->
    <!--              <span class="text-end text-sm">E-90</span>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->

    <!--      <Divider/>-->
    <!--      <div class="grid gap-1 grid-cols-4">-->
    <!--        <div v-for="className in Object.keys(roleToneMap)"-->
    <!--             :key="className" :class="`bg-${className}`" class="flex flex-col justify-between p-4">-->
    <!--          <p class="truncate text-sm">-->
    <!--            {{ nameFromKey(className) }}-->
    <!--          </p>-->
    <!--          <span class="flex justify-end text-end text-sm">-->
    <!--            {{ `N-${roleToneMap[className][colorMode.value === 'light' ? 'light' : 'dark']}` }}-->
    <!--          </span>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <Divider/>-->
    <!--      <div class="grid gap-1">-->
    <!--        <div v-for="className in surfaceElevations"-->
    <!--             :key="className"-->
    <!--             :class="`bg-${className}`">-->
    <!--          <div class="flex flex-row h-[100px] p-4">-->
    <!--            <p class="truncate text-sm">-->
    <!--              {{ nameFromKey(className) }}-->
    <!--            </p>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <Divider/>-->
    <!--    </div>-->
  </div>
</template>
