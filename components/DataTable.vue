<script lang="ts" setup>
interface Column {
  label: string;
  value: string;
}

interface Row {
  [key: string]: any;
}

interface Props {
  columns: Column[];
  rows: Row[];
}

const props = defineProps<Props>();

const { columns, rows } = toRefs(props);

const state = reactive({
  selected: [] as Row[],
});
</script>

<template>
  <div class="table-container">
    <table class="table" v-bind="$attrs">
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">
            <slot :name="column.value" v-bind="column">
              {{ column.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="(column, index) in columns" :key="index">
            <slot :name="column.value" v-bind="column">
              {{ row[column.value] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="postcss">
/*
*/
</style>
