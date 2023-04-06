<template>
  <div class="relative flex h-screen flex-col overflow-y-auto bg-surface-level-1 w-[80px]"
       data-component="rail">
    <div class="inline-flex flex-col items-center justify-center w-full h-[80px]">
      <div class="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-surface-level-2">
        <Icon class="w-[20px] h-[20px]" name="ic:outline-menu"/>
      </div>
    </div>

    <!-- Section 1 -->
    <div class="flex flex-col">
      <span class="text-xs font-medium leading-tight text-on-surface-level-1">
        Label Section 1
      </span>
      <nav
          class="flex flex-col items-center justify-center w-full h-[40px] mt-2"
          data-component="rail-item"
      >
        <Icon class="w-[20px] h-[20px]" name="ic:triangle"/>
      </nav>

    </div>


  </div>
</template>
