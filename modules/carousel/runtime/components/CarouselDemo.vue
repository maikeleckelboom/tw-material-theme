<script lang="ts" setup>
import Carousel from "~/modules/carousel/runtime/components/Carousel.vue"
import CarouselItem from "~/modules/carousel/runtime/components/CarouselItem.vue"
import {DragConfig, GenericOptions, InternalDragOptions, UseWheelConfig} from "@vueuse/gesture";

/**
 * flex-grow:
 * How much of the positive free space does this item get?
 *
 * flex-shrink:
 * How much negative free space can be removed from this item?
 *
 * flex-basis:
 * What is the size of the item before growing and shrinking happens?
 */

/**
 * Carousel item layout
 * Large and medium carousel items adapt dynamically to screen size.
 *
 * Small carousel items have a minimum width of 40dp and a maximum width of 56dp.
 */


// The first item is always the largest
// The last item is always the smallest
// The middle item is always the medium

const carousel = ref<InstanceType<typeof Carousel>>()
const carouselElement = ref<HTMLElement>()

watchEffect(() => {
  carouselElement.value = carousel.value?.$el as HTMLElement
  console.log("watchPostEffect", carousel.value, carouselElement.value)
}, {flush: "post"})

type DragOptions = InternalDragOptions | & DragConfig
type WheelOptions = InternalDragOptions & UseWheelConfig

const genericOptions: GenericOptions & DragOptions | & WheelOptions = {
  domTarget: carouselElement,
  eventOptions: {
    passive: true,
  },
}

const dragOptions: DragOptions = {
  rubberband: true,
}

const wheelOptions: WheelOptions = {
  rubberband: false,
}
const config = {
  drag: dragOptions,
  wheel: wheelOptions,
  ...genericOptions,
}

const {motionProperties} = useMotionProperties(carouselElement, {
  x: 0,
})

const {set} = useSpring(motionProperties, {
  stiffness: 100,
  damping: 10,
  mass: 1,
})

onMounted(() => {
  console.log("onMounted", carousel.value, carouselElement.value)
  set({x: 10})
})
</script>

<template>
  <div class="flex-1">
    <Carousel ref="carousel" class="flex flex-row gap-2 pr-4 pl-2 w-full pt-2">
      <CarouselItem>1</CarouselItem>
      <CarouselItem>2</CarouselItem>
      <CarouselItem>3</CarouselItem>
      <CarouselItem>4</CarouselItem>
      <CarouselItem>5</CarouselItem>
      <CarouselItem>6</CarouselItem>
      <CarouselItem>7</CarouselItem>
      <CarouselItem>8</CarouselItem>
      <CarouselItem>9</CarouselItem>
      <CarouselItem>10</CarouselItem>
    </Carousel>
  </div>
</template>
