<script lang="ts" setup>
interface Props {
  cols?: string | number;
  rows?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  cols: 2,
  rows: 1,
});

const columns = computed(() =>
  typeof props.cols === "string" ? parseInt(props.cols) : props.cols
);

const rows = computed(() =>
  typeof props.rows === "string" ? parseInt(props.rows) : props.rows
);
</script>

<template>
  <section class="grid gap-4 py-4">
    <legend>
      <h2 class="text-2xl font-bold">
        <slot name="legend" />
      </h2>
    </legend>
    <div v-for="row in rows" :key="`row-${row}`" class="flex flex-col">
      <div class="mb-2">
        <slot :name="`header-row-${row}`" />
      </div>
      <div class="grid auto-cols-max grid-flow-col gap-8">
        <slot :name="`body-row-${row}`">
          <div v-for="col in columns" :key="`col-${col}`" class="flex flex-col">
            <div class="flex flex-col">
              <h3 class="mb-2 italic">
                <slot v-if="row === 1" :name="`header-col-${col}`" />
                <slot v-else :name="`header-row-${row}-col-${col}`" />
              </h3>
            </div>
            <div class="mt-3 flex items-center gap-4">
              <slot v-if="row === 1" :name="`body-col-${col}`" />
              <slot v-else :name="`body-row-${row}-col-${col}`" />
            </div>
          </div>
        </slot>
      </div>
    </div>
  </section>
</template>
