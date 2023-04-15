<script lang="ts" setup>
import {cva} from "class-variance-authority";

interface Props {
  type?: 'elevated' | 'filled' | 'outlined'
  headline?: string
  supportingText?: string
  subhead?: string
  image?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'elevated'
})

const cardVariants = cva([
  'relative',
  'shadow-sm',
  'shadow-shadow',
  'rounded-[12px]',
  'overflow-hidden',
  'flex',
  'flex-col',
  'h-fit',
  'w-fit'
], {
  variants: {
    dir: {
      ltr: "flex-row",
      rtl: "flex-row-reverse",
    },
    type: {
      elevated: [
        'bg-surface',
        'bg-surface-level-1',
      ],
      filled: [
        'bg-surface-level-5'
      ],
      outlined: [
        'border',
        'border-outline',
        'bg-surface-level-1',
      ]
    }
  },
  defaultVariants: {
    dir: "ltr",
    type: 'elevated'
  },
})

const cardClasses = computed(() => cardVariants(props))

const {image, headline, subhead, supportingText} = toRefs(props)

const slots = useSlots()
const hasImage = computed(() => !!slots.image || !!image?.value)
const hasSubhead = computed(() => !!slots.subhead || !!subhead?.value)
const hasSupportingText = computed(() => !!slots.supportingText || !!supportingText?.value)
const hasHeader = computed(() => !!slots.header || hasSubhead.value || hasSupportingText.value)
</script>

<template>
  <div :class="cardClasses"
       data-component="card">
    <slot v-bind="{image,headline,subhead,supportingText}">
      <!--      <div v-if="hasImage"-->
      <!--           class="flex flex-col">-->
      <!--        <img :src="image"-->
      <!--             alt="Card Image"-->
      <!--             class="w-full object-cover h-[200px] rounded-[12px]"/>-->
      <!--      </div>-->
      <!--      <div class="mt-1 flex flex-col px-4 pb-4">-->
      <!--        <slot name="header" v-bind="{image,headline,subhead,supportingText}">-->
      <!--          <div class="flex flex-col">-->
      <!--            <div class="flex justify-between">-->
      <!--              <h3 class="my-2 text-2xl font-semibold leading-tight"-->
      <!--                  data-role="headline">-->
      <!--                <slot name="headline"-->
      <!--                      v-bind="{headline}">-->
      <!--                  {{ headline }}-->
      <!--                </slot>-->
      <!--              </h3>-->
      <!--            </div>-->
      <!--            <p class="mb-2 text-sm font-semibold"-->
      <!--               data-role="subhead">-->
      <!--              <slot name="subhead"-->
      <!--                    v-bind="{subhead}">-->
      <!--                {{ subhead }}-->
      <!--              </slot>-->
      <!--            </p>-->
      <!--          </div>-->
      <!--        </slot>-->
      <!--        <slot name="body">-->
      <!--          <div class="relative flex flex-col gap-4 overflow-hidden max-h-[200px]">-->
      <!--            <p class="text-sm line-clamp-3" data-role="supporting-text">-->
      <!--              <slot name="supporting-text"-->
      <!--                    v-bind="{supportingText}">-->
      <!--                {{ supportingText }}-->
      <!--              </slot>-->
      <!--            </p>-->
      <!--          </div>-->
      <!--        </slot>-->
      <!--        <slot name="footer">-->
      <!--          <div class="mt-4 flex flex-col gap-4">-->
      <!--            <slot name="actions"></slot>-->
      <!--          </div>-->
      <!--        </slot>-->
      <!--      </div>-->
    </slot>
  </div>
</template>
