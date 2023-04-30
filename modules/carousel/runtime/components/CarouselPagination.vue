<script lang="ts" setup>
import {DistanceAngleBounds} from "@vueuse/gesture"
import {clamp, snap} from "popmotion"


const props = defineProps<{
  container: HTMLElement,
  elements: HTMLElement[],
  colorModelBounds: DistanceAngleBounds,
  items: {
    [key: string]: any
  }[],
  x: number,
}>()


const emit = defineEmits<{
  (e: 'paginate', {x}: {
    x: number
  }): void
}>()

const someSlidesDifferentWidth = ref<boolean>(false)

const offsets = computed<number[]>(() => unref(someSlidesDifferentWidth)
    ? unref(props.elements).map(slide => Number((unref(slide) as HTMLElement).offsetLeft) * -1)
    : [])

const setSomeSlidesDifferentWidth = () => {
  someSlidesDifferentWidth.value = unref(props.elements).some(slide => {
    const [firstSlide] = unref(props.elements)
    const {width: firstSlideWidth} = unref(firstSlide).getBoundingClientRect()
    const {width} = unref(slide).getBoundingClientRect()
    return (firstSlideWidth !== width)
  })
}

const provideOffsetLeftProperty = (item: any) => {
  const itemElement = unref(item)
  const {index} = itemElement.dataset
  const {offsetLeft} = unref(item) as HTMLElement
  unref(props.items)[index].offsetLeft = offsetLeft
}

onMounted(setSomeSlidesDifferentWidth)

whenever(someSlidesDifferentWidth, () => unref(props.elements).forEach(provideOffsetLeftProperty))

const getStaticDimensions = () => {
  const [first, second] = unref(props.elements)
  const {right, width} = first.getBoundingClientRect()
  const spacing = second.getBoundingClientRect().left - right
  return {width, spacing}
}

const getClosestOffset = (x: number, delta: 1 | -1): number => {
  const {width, spacing} = getStaticDimensions()
  const {floor, ceil, abs} = Math
  const total = abs(x) / (width + spacing)
  const totalNegativeSlides = (delta === 1)
      ? floor(total)
      : ceil(total)
  return -totalNegativeSlides * (width + spacing)
}

const getClosestSnapOffset = (x: number, delta: 1 | -1): number => {
  const filterOffsets = (offset: number) => Boolean(delta === -1)
      ? offset > x : offset < x
  const directionalOffsets = unref(offsets).filter(filterOffsets)
  const snapTo = snap(directionalOffsets)
  const closestOffset = snapTo(x)
  const indexOfClosestOffset = unref(offsets).indexOf(closestOffset)
  const {min, max} = unref(props.bounds)
  const clamped = clamp(min!, max!, x)
  return unref(offsets)[indexOfClosestOffset - delta] || clamped
}

const findClosestOffset = (x: number, delta: 1 | -1): number => {
  return unref(someSlidesDifferentWidth)
      ? getClosestSnapOffset(x, delta)
      : getClosestOffset(x, delta)
}

const scrollTo = (delta: 1 | -1): void => {
  const {clientWidth} = unref(props.container) as HTMLElement
  const x = unref(props.x) + (-clientWidth * delta)
  const clampedX = clamp(props.bounds.min!, props.bounds.max!, x)
  const closestOffset = (x === clampedX)
      ? findClosestOffset(clampedX, delta)
      : clampedX
  emit('paginate', {x: closestOffset})
}

const onNext = () => scrollTo(1)
const onPrev = () => scrollTo(-1)

const angleRight = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>'
const angleLeft = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>'

const prevDisabled = computed(() => unref(props.x) >= unref(props.bounds).max! - 10)
const nextDisabled = computed(() => unref(props.x) <= unref(props.bounds).min! + 10)

const componentID = 1

const prevID = `navigate-previous-${componentID}`
const nextID = `navigate-next-${componentID}`

const exposed = {
  onNext,
  onPrev,
  angleRight,
  angleLeft,
}

defineExpose(exposed)
</script>

<template>
  <div class="carousel-pagination">
    <slot v-bind="exposed">
      <button :aria-labelledby="prevID"
              :disabled="prevDisabled"
              v-on:click="onPrev">
        <span v-html="angleLeft"/>
        <span :id="prevID">
            <!-- -->
          </span>
      </button>
      <button :aria-labelledby="nextID"
              :disabled="nextDisabled"
              v-on:click="onNext">
          <span :id="nextID">
            <!-- -->
          </span>
        <span v-html="angleRight"/>
      </button>
    </slot>
  </div>
</template>
