<script lang="ts" setup>
import {useGesture} from "@vueuse/gesture"
import {PropertiesKeys} from "@vueuse/motion"
import {Carousel, CarouselItem, CarouselPagination} from "#components"

const preferredMotion = usePreferredReducedMotion()

const {context: railDrawerContext} = storeToRefs(useRailDrawerStore())

const items = ref<{
  id: number;
  headline: string;
  subtitle: string;
  image: string,
  style?: {
    width?: string
  }
}[]>([
  {
    id: 1,
    title: "Title 1",
    subtitle: "Subtitle 1",
    image: "https://picsum.photos/seed/1/200/300",
  },
  {
    id: 2,
    title: "Title 2",
    subtitle: "Subtitle 2",
    image: "https://picsum.photos/seed/92/200/300",
  },
  {
    id: 3,
    title: "Title 3",
    subtitle: "Subtitle 3",
    image: "https://picsum.photos/seed/43/200/300",
  },
  {
    id: 4,
    title: "Title 4",
    subtitle: "Subtitle 4",
    image: "https://picsum.photos/seed/22/200/300",
  },
  {
    id: 5,
    title: "Title 5",
    subtitle: "Subtitle 5",
    image: "https://picsum.photos/seed/5/200/300",
  },
  {
    id: 6,
    title: "Title 6",
    subtitle: "Subtitle 6",
    image: "https://picsum.photos/seed/6/200/300",
  },
  {
    id: 7,
    title: "Title 7",
    subtitle: "Subtitle 7",
    image: "https://picsum.photos/seed/32/300",
  },
  {
    id: 8,
    title: "Title 8",
    subtitle: "Subtitle 8",
    image: "https://picsum.photos/seed/14/200/300",
  },
  {
    id: 9,
    title: "Title 9",
    subtitle: "Subtitle 9",
    image: "https://picsum.photos/seed/9/200/300",
  },
  {
    id: 10,
    title: "Title 10",
    subtitle: "Subtitle 10",
    image: "https://picsum.photos/seed/60/200/300",
  },
  {
    id: 11,
    title: "Title 11",
    subtitle: "Subtitle 11",
    image: "https://picsum.photos/seed/41/200/300",
  },
  {
    id: 12,
    title: "Title 12",
    subtitle: "Subtitle 12",
    image: "https://picsum.photos/seed/12/200/300",
  },
  {
    id: 13,
    title: "Title 13",
    subtitle: "Subtitle 13",
    image: "https://picsum.photos/seed/13/200/300",
  },
  {
    id: 14,
    title: "Title 14",
    subtitle: "Subtitle 14",
    image: "https://picsum.photos/seed/14/200/300",
  },
  {
    id: 15,
    title: "Title 15",
    subtitle: "Subtitle 15",
    image: "https://picsum.photos/seed/15/200/300",
  },
  {
    id: 16,
    title: "Title 16",
    subtitle: "Subtitle 16",
    image: "https://picsum.photos/seed/16/200/300",
  },
  {
    id: 17,
    title: "Title 17",
    subtitle: "Subtitle 17",
    image: "https://picsum.photos/seed/17/200/300",
  },
  {
    id: 18,
    title: "Title 18",
    subtitle: "Subtitle 18",
    image: "https://picsum.photos/seed/18/200/300",
  },
  {
    id: 19,
    title: "Title 19",
    subtitle: "Subtitle 19",
    image: "https://picsum.photos/seed/19/200/300",
  },
  {
    id: 20,
    title: "Title 20",
    subtitle: "Subtitle 20",
    image: "https://picsum.photos/seed/20/200/300",
  },
  {
    id: 21,
    title: "Title 21",
    subtitle: "Subtitle 21",
    image: "https://picsum.photos/seed/21/200/300",
  },
])

const carouselComponent = ref<InstanceType<typeof Carousel>>()
const itemComponents = ref<InstanceType<typeof CarouselItem>[]>([])
const itemElements = computed(() => itemComponents.value.map((item) => item.$el))
const carousel = ref<HTMLElement>()

watchEffect(() => {
  carousel.value = carouselComponent.value?.$el
}, {flush: "post"})


const {motionProperties} = useMotionProperties(carousel, {
  x: 0,
  cursor: "grab",
}) as PropertiesKeys

const {set} = useSpring(motionProperties, {
  restSpeed: 0.15,
  bounce: 0.1,
  stiffness: 150,
  damping: 15,
  mass: 0.1,
})

const context = reactive({
  tracking: false,
})

const offsetX = computed({
  get: () => motionProperties.x ?? 0,
  set: (x: number) => {
    set({x})
    setSharedOffset(x)
  }
})


const controller = useGesture({
  onDragStart: () => {
    context.tracking = true
    set({cursor: "grabbing"})
  },
  onDrag: ({offset: [x]}) => {
    offsetX.value = x
  },
  onDragEnd: () => {
    set({cursor: "grab"})
    context.tracking = false
  },
}, {
  domTarget: carousel,
  eventOptions: {
    passive: true,
  },
  drag: {
    rubberband: true,
  }
})

const setSharedBounds = ({min, max}: { min: number, max: number }) => {
  controller.config.drag!.bounds = [[min, max], [0, 0]]
}

const setSharedOffset = (x: number) => {
  controller.state.drag.offset = [x, 0]
}

const colorModelBounds = reactive({
  min: 0,
  max: 0
})

const viewport = useViewport()

const getBounds = () => {
  const {scrollWidth, clientWidth} = unref(carousel)!
  const {width: {value}} = unref(railDrawerContext)
  const additionalWidth = viewport.isLessThan("md") ? 0 : value
  return {min: (scrollWidth - (clientWidth - additionalWidth)) * -1, max: 0}
}

const setBounds = () => {
  Object.assign(bounds, getBounds())
}

tryOnMounted(setBounds)

useResizeObserver(carousel, setBounds)

watch(railDrawerContext, setBounds, {deep: true})

watch(bounds, setSharedBounds)

const onPaginate = ({x}: { x: number }) => {
  offsetX.value = x
}
</script>

<template>
  <div>
    <Carousel
        ref="carouselComponent"
        :class="{'tracking': context.tracking}">
      <CarouselItem
          v-for="(item, key) in items"
          ref="itemComponents"
          v-bind="{item, key}"
      />
    </Carousel>
    <CarouselPagination
        :bounds="bounds"
        :container="carousel"
        :elements="itemElements"
        :items="items"
        :x="offsetX"
        v-on:paginate="onPaginate"
    />
  </div>
</template>

<style lang="postcss">
.tracking * {
  pointer-events: none;
}

</style>
