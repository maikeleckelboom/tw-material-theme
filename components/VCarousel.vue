<script lang="ts" setup>
import {Ref} from "vue"

const items: Ref<{
  headline: string
  order: number
  content?: string
}[]> = ref([
  {
    title: 'Slide 1',
    order: 0,
  },
  {
    title: 'Slide 2',
    order: 1,
  },
  {
    title: 'Slide 3',
    order: 2,
  },
  {
    title: 'Slide 4',
    order: 3,
  }
])

const currentSlide: Ref = ref()

const currentSlideWidth: Ref<number> = ref(0)

const setCurrentSlideWidth = () => {
  const {root} = currentSlide.value
  const {width} = root.getBoundingClientRect()
  currentSlideWidth.value = width
}

onMounted(() => setCurrentSlideWidth())

const current = reactive({
  slide: computed(() => slides.value[current.index]),
  slidesToShow: 4,
  slidesToScroll: 1,
  direction: 'forward',
  index: 0,
})

const prev = () => {
  current.direction = 'backward'
  nextTick(() =>
      Boolean(current.index > 0)
          ? current.index--
          : current.index = slides.value.length - 1)
}

const next = () => {
  current.direction = 'forward'
  nextTick(() =>
      Boolean(current.index < slides.value.length - 1)
          ? current.index++
          : current.index = 0)
}

const motion = reactive({
  initial: computed(() => ({
    opacity: 0,
    x: (current.direction === 'forward')
        ? currentSlideWidth.value
        : -currentSlideWidth.value,
  })),
  animate: computed(() => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1
    },
  })),
  exit: computed(() => ({
    opacity: 0,
    x: (current.direction === 'forward')
        ? -currentSlideWidth.value
        : currentSlideWidth.value,
  })),
})

const presence = reactive({
  exitBeforeEnter: false,
})

</script>

<template>
  <div class="single-slider">
    <div class="single-slider-container">
      <div v-bind="presence">
        <div :key="current.slide.title"
             ref="currentSlide"
             class="single-slider-item"
             v-bind="motion">
          <pre>{{ current }}</pre>
        </div>
      </div>
    </div>
    <div class="single-slider-controls">
      <button @click="prev()">Prev</button>
      <button @click="next()">Next</button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.single-slider {

  .single-slider-controls {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    z-index: 99;
    position: relative;
  }

  .single-slider-container {
    position: relative;
    overflow: hidden;
    height: 400px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    gap: 20px;

    .single-slider-item {
      height: 400px;
      width: 100%;
      background: #f08d49;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
    }
  }
}
</style>
