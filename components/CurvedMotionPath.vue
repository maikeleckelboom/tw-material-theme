<template>
  <div class="relative flex items-center t-[400px]">
    <div class="rounded-full dot w-[20px] h-[20px]"/>

  </div>
  <!--  <div class="rounded-full demo-dot w-[20px] h-[20px] bg-surface-level-1"/>-->
</template>

<style lang="postcss">
/*
.demo-dot {
  animation: xAxis 2.5s infinite cubic-bezier(0.02, 0.01, 0.21, 1);
}

.demo-dot::after {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: var(--md-sys-color-on-surface);
  animation: yAxis 2.5s infinite cubic-bezier(0.3, 0.27, 0.07, 1.64);
}
*/
:root {
  --transition-snap: cubic-bezier(.05, .69, .14, 1);
}

.dot {
  /* Container. Animate along the X-axis */
  /* Some layout code… */
  animation: xAxis 2.5s infinite ease-in;
  background-color: rgb(var(--md-sys-color-secondary-rgb) /.5);
}

.dot::after {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: var(--md-sys-color-secondary);
}

.dot::after {
  /* Render dot, and animate along Y-axis */
  /* Render dot */
  animation: yAxis 2.5s infinite ease-in;

}

@keyframes xAxis {
  50% {
    animation-timing-function: ease-in;
    transform: translateX(100px);
  }
}

@keyframes yAxis {
  50% {
    animation-timing-function: ease-out;
    transform: translateY(-100px);
  }
}


/*@keyframes yAxis {
  50% {
    animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);
    transform: translateY(-100px);
  }
}

@keyframes xAxis {
  50% {
    animation-timing-function: cubic-bezier(0.3, 0.27, 0.07, 1.64);
    transform: translateX(100px);
  }
}*/
</style>
