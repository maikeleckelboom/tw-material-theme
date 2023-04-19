<script lang="ts" setup>

const {$keyColors} = useNuxtApp()

watchEffect(() => {
  console.log($keyColors)
})
</script>

<template>
  <div class="mx-auto p-4 max-w-[1280px] @container h-screen overflow-y-auto scrollbar">
    <!--
      Primary Key Color
      Secondary Key Color
      Tertiary Key Color
     -->
    <div class="grid w-full grid-cols-4 gap-1 grid-rows-7">
      <div class="flex flex-col items-center justify-between">
        <p class="mb-2 text-[15px]">Primary Key Color</p>
        <input v-model="$keyColors.primary" class="mb-4 h-14 w-14" type="color"/>
        <div class="pb-4">
          <svg clip-rule="evenodd" fill="var(--md-sys-color-on-surface)" fill-rule="evenodd" height="24" width="24"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z"/>
          </svg>
        </div>
      </div>
      <div class="flex flex-col items-center justify-between">
        <p class="mb-2 text-[15px]">Secondary Key Color</p>
        <input v-model="$keyColors.secondary" class="mb-4 h-14 w-14" type="color"/>
        <div class="pb-4">
          <svg clip-rule="evenodd" fill="var(--md-sys-color-on-surface)" fill-rule="evenodd" height="24" width="24"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z"/>
          </svg>
        </div>
      </div>
      <div class="flex flex-col items-center justify-between">
        <p class="mb-2 text-[15px]">Tertiary Key Color</p>
        <input v-model="$keyColors.tertiary" class="mb-4 h-14 w-14" type="color"/>
        <div class="pb-6">
          <svg clip-rule="evenodd" fill="var(--md-sys-color-on-surface)" fill-rule="evenodd" height="24" width="24"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z"/>
          </svg>
        </div>
      </div>
    </div>
    <!--
      Primary (P-80),
      On Primary (P-20),
      Secondary (S-80),
      On Secondary (S-20),
      Tertiary (T-80),
      On Tertiary (T-20)
     -->
    <div class="grid gap-1">
      <div class="grid w-full  @[800px]:grid-cols-4 gap-1 @[600px]:grid-cols-2">
        <!-- Primary -->
        <div class="grid grid-rows-[100px,50px] text-sm">
          <div class="flex flex-row justify-between p-4 bg-primary text-on-primary">
            <p class="text-ellipsis whitespace-nowrap text-sm">Primary</p>
            <span class="flex items-end text-sm">P-80</span>
          </div>
          <div class="flex grid grid-cols-2 items-center p-4 bg-on-primary text-primary">
            <p class="text-ellipsis whitespace-nowrap text-sm">On Primary</p>
            <span class="text-end text-sm">P-20</span>
          </div>
        </div>
        <!-- Secondary -->
        <div class="grid grid-rows-[100px,50px] text-sm">
          <div class="flex flex-row justify-between p-4 bg-secondary text-on-secondary">
            <p class="text-ellipsis whitespace-nowrap text-sm">Secondary</p>
            <span class="flex items-end text-sm">S-80</span>
          </div>
          <div class="flex grid grid-cols-2 items-center p-4 bg-on-secondary text-secondary">
            <p class="text-ellipsis whitespace-nowrap text-sm">On Secondary</p>
            <span class="text-end text-sm">S-20</span>
          </div>
        </div>
        <!-- Tertiary -->
        <div class="grid grid-rows-[100px,50px] text-sm">
          <div class="flex flex-row justify-between p-4 bg-tertiary text-on-tertiary">
            <p class="text-ellipsis whitespace-nowrap text-sm">Tertiary</p>
            <span class="flex items-end text-sm">T-80</span>
          </div>
          <div class="flex grid grid-cols-2 items-center p-4 bg-on-tertiary text-tertiary">
            <p class="text-ellipsis whitespace-nowrap text-sm">On Tertiary</p>
            <span class="text-end text-sm">T-20</span>
          </div>
        </div>
        <!-- Error -->
        <div class="grid grid-rows-[100px,50px] text-sm @[800px]:ml-1">
          <div class="flex flex-row justify-between p-4 bg-error text-on-error">
            <p class="text-ellipsis whitespace-nowrap text-sm">Error</p>
            <span class="flex items-end text-sm">E-80</span>
          </div>
          <div class="flex items-center justify-between p-4 bg-on-error text-error">
            <p class="text-ellipsis whitespace-nowrap text-sm">On error</p>
            <span class="whitespace-nowrap text-end text-sm">E-20</span>
          </div>
        </div>
      </div>
      <!--
        Primary Container (P-30),
        On Primary Container (P-90),
        Secondary Container (S-30),
        On Secondary Container (S-90),
        Tertiary Container (T-30),
        On Tertiary Container (T-90)
      -->
      <div class="grid w-full  @[800px]:grid-cols-4 gap-1 @[600px]:grid-cols-2">
        <!-- Primary Container -->
        <div class="grid grid-rows-[100px,50px] text-sm">
          <div class="flex flex-row justify-between p-4 bg-primary-container text-on-primary-container">
            <p class="text-ellipsis whitespace-nowrap text-sm">Primary Container</p>
            <span class="flex items-end text-sm">P-30</span>
          </div>
          <div class="flex grid grid-cols-2 items-center p-4 bg-on-primary-container text-primary-container">
            <p class="text-ellipsis whitespace-nowrap text-sm">On Primary Container</p>
            <span class="text-end text-sm">P-90</span>
          </div>
        </div>
        <!-- Secondary Container -->
        <div class="grid grid-rows-[100px,50px] text-sm">
          <div class="flex flex-row justify-between p-4 bg-secondary-container text-on-secondary-container">
            <p class="text-ellipsis whitespace-nowrap text-sm">Secondary Container</p>
            <span class="flex items-end text-sm">S-30</span>
          </div>
          <div class="flex grid grid-cols-2 items-center p-4 bg-on-secondary-container text-secondary-container">
            <p class="text-ellipsis whitespace-nowrap text-sm">On Secondary Container</p>
            <span class="text-end text-sm">S-90</span>
          </div>
        </div>
        <!-- Tertiary Container -->
        <div class="grid grid-rows-[100px,50px] text-sm">
          <div class="flex flex-row justify-between p-4 bg-tertiary-container text-on-tertiary-container">
            <p class="text-ellipsis whitespace-nowrap text-sm">Tertiary Container</p>
            <span class="flex items-end text-sm">T-30</span>
          </div>
          <div class="flex grid grid-cols-2 items-center p-4 bg-on-tertiary-container text-tertiary-container">
            <p class="text-ellipsis whitespace-nowrap text-sm">On Tertiary Container</p>
            <span class="text-end text-sm">T-90</span>
          </div>
        </div>
        <!-- Error Container -->
        <div class="grid grid-rows-[100px,50px] text-sm @[800px]:ml-1">
          <div class="flex flex-row justify-between p-4 bg-error-container text-on-error-container">
            <p class="text-ellipsis whitespace-nowrap text-sm">Error Container</p>
            <span class="flex items-end text-sm">E-30</span>
          </div>
          <div class="flex grid grid-cols-2 items-center p-4 bg-on-error-container text-error-container">
            <p class="text-ellipsis whitespace-nowrap text-sm">On error Container</p>
            <span class="text-end text-sm">E-90</span>
          </div>
        </div>
      </div>
    </div>
    <div class="grid gap-1">
      <!--
        Surface Dim (N-6),
        Surface (N-6),
        Surface Bright (N-24)
      -->
      <div class="mt-5 grid w-full  grid-cols-1 @[500px]:grid-cols-3 gap-1">
        <!-- Surface Dim (N-6) -->
        <div class="grid text-sm grid-rows-[100px]">
          <div class="flex flex-row justify-between p-4 bg-palette-neutral-6">
            <p class="text-ellipsis whitespace-nowrap text-sm light:text-[#fff]">Surface Dim</p>
            <span class="flex items-end text-sm">N-6</span>
          </div>
        </div>
        <!-- Surface (N-6) -->
        <div class="grid text-sm grid-rows-[100px]">
          <div class="flex flex-row justify-between p-4 bg-palette-neutral-6">
            <p class="text-ellipsis whitespace-nowrap text-sm">Surface Dim</p>
            <span class="flex items-end text-sm">N-6</span>
          </div>
        </div>
        <!-- Surface Bright (N-24) -->
        <div class="grid text-sm grid-rows-[100px]">
          <div class="flex flex-row justify-between p-4 bg-palette-neutral-24 text-on-surface">
            <p class="text-ellipsis whitespace-nowrap text-sm">Surface Bright</p>
            <span class="flex items-end text-sm">N-24</span>
          </div>
        </div>
      </div>
      <!--
        Surface Container Lowest (N-4),
        Surface Container Low (N-10),
        Surface Container (N-12),
        Surface Container High (N-17),
        Surface Container Highest (N-22)
      -->
      <div
          class="grid w-full @[800px]:grid-cols-2 @[1000px]:grid-cols-3 @[1200px]:grid-cols-5 gap-1 grid-rows-7">
        <!-- Surface Container Lowest -->
        <div class="grid text-sm grid-rows-[100px]">
          <div class="flex flex-row justify-between p-4 bg-palette-neutral-4 light:text-[#fff]">
            <p class="text-ellipsis whitespace-nowrap text-sm">Surface Container Lowest</p>
            <span class="flex items-end text-sm">N-4</span>
          </div>
        </div>
        <!-- Surface Container Low -->
        <div class="grid text-sm grid-rows-[100px]">
          <div class="flex flex-row justify-between p-4 bg-palette-neutral-10 text-on-surface">
            <p class="text-ellipsis whitespace-nowrap text-sm">Surface Container Low</p>
            <span class="flex items-end text-sm">N-10</span>
          </div>
        </div>
        <!-- Surface Container -->
        <div class="grid text-sm grid-rows-[100px]">
          <div class="flex flex-row justify-between p-4 bg-palette-neutral-12 text-on-surface">
            <p class="text-ellipsis whitespace-nowrap text-sm">Surface Container</p>
            <span class="flex items-end text-sm">N-12</span>
          </div>
        </div>
        <!-- Surface Container High -->
        <div class="grid text-sm grid-rows-[100px]">
          <div class="flex flex-row justify-between p-4 bg-palette-neutral-17 text-on-surface">
            <p class="text-ellipsis whitespace-nowrap text-sm">Surface Container High</p>
            <span class="flex items-end text-sm">N-17</span>
          </div>
        </div>
        <!-- Surface Container Highest -->
        <div class="grid text-sm h-[100px] @[800px]:col-span-2 @[1000px]:col-span-2 @[1200px]:col-span-1">
          <div class="flex flex-row justify-between p-4 bg-palette-neutral-22 text-on-surface">
            <p class="text-ellipsis whitespace-nowrap text-sm">Surface Container Highest</p>
            <span class="flex items-end text-sm">N-22</span>
          </div>
        </div>
      </div>
      <!--
        On Surface (N-90),
        On Surface Variant (NV-80),
        Outline (NV-60),
        Outline Variant (NV-30)
      -->
      <div class="grid @[800px]:grid-cols-2 @[1200px]:grid-cols-4
">
        <!-- On Surface -->
        <div
            class="flex grid grid-cols-2 items-center p-4 bg-on-surface text-surface">
          <p class="text-ellipsis whitespace-nowrap text-sm">On Surface</p>
          <span class="text-end text-sm">N-90</span>
        </div>
        <!-- On Surface Variant -->
        <div
            class="flex grid grid-cols-2 items-center p-4 bg-palette-neutral-variant-80 text-surface">
          <p class="text-ellipsis whitespace-nowrap text-sm">On Surface Variant</p>
          <span class="text-end text-sm">NV-80</span>
        </div>
        <!-- Outline -->
        <div
            class="flex grid grid-cols-2 items-center p-4 bg-palette-neutral-variant-60 text-surface">
          <p class="text-ellipsis whitespace-nowrap text-sm">Outline</p>
          <span class="text-end text-sm">NV-60</span>
        </div>
        <!-- Outline Variant -->
        <div
            class="flex grid grid-cols-2 items-center p-4 bg-palette-neutral-variant-30 text-on-surface-variant">
          <p class="text-ellipsis whitespace-nowrap text-sm">Outline Variant</p>
          <span class="text-end text-sm">NV-30</span>
        </div>
      </div>
    </div>
    <!--
      Neutral Key Color
      Neutral Variant Key Color
     -->
    <div class="grid w-full grid-cols-4 gap-1">
      <div class="flex flex-col items-center justify-between">
        <div class="pt-4">
          <svg class="rotate-180" clip-rule="evenodd" fill="var(--md-sys-color-on-surface)" fill-rule="evenodd"
               height="24"
               width="24"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z"/>
          </svg>
        </div>
        <input v-model="$keyColors.neutral" class="mt-4 h-14 w-14" type="color"/>
        <p class="mt-2 text-[15px]">Neutral Key Color</p>
      </div>
      <div class="flex flex-col items-center justify-between">
      </div>
      <div class="flex flex-col items-center justify-between">
        <div class="pt-4">
          <svg class="rotate-180" clip-rule="evenodd" fill="var(--md-sys-color-on-surface)" fill-rule="evenodd"
               height="24"
               width="24"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z"/>
          </svg>
        </div>
        <input v-model="$keyColors.neutralVariant" class="mt-4 h-14 w-14" disabled type="color"/>
        <p class="mt-2 text-[15px]">Neutral Variant Key Color</p>
      </div>
    </div>
  </div>
</template>
