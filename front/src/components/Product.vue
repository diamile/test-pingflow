<script setup lang="ts">
import {ref,defineProps} from "vue"
import {useProductStore} from "@/stores/product.store"
const store = useProductStore();

let columns= [
        {
          label: "ID",
          field: "id",
          filterable: true,
          filterOptions: {
            enabled: true,
            placeholder: "",
          },
        },
        {
          label: "Title",
          field: "title",
          filterable: true,
          filterOptions: {
            enabled: true,
            placeholder: "",
          },
        },
        {
          label: "Price",
          field: "price",
          type: "number",
        },
       
        {
          label: "Category",
          field: "category",
          type: "string",
          filterable: true,
          filterOptions: {
            enabled: true,
            placeholder: "",
          },
        },
        {
          label: "Rating",
          field: "rating",
          type: "object",
        },
        {
          label: "Action",
          field: "action",
         
        },
       
]

</script>

<template>

 <vue-good-table
        ref="someTable"
        :columns="columns"
        :rows="store.products"
        :line-numbers="true"
        :search-options="{
          enabled: true,

          skipDiacritics: true,

          placeholder: 'Search this table',
        }"
        :sort-options="{
          enabled: true,
          initialSortBy: { field: 'title', type: 'asc' },
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 5,
          setCurrentPage: 1,
        }"
        theme="polar-bear"
      > 

      <template #table-row="props">
        <span v-if="props.column.field == 'rating'">
          <span style="font-weight: bold; color: blue;">{{props.row.rating.count}}</span> 
        </span>

        <span v-if="props.column.field == 'action'">
          <div class="actions">
            <v-btn color="secondary">
             Edit
            </v-btn>
            <v-btn color="error">
             DELETE
            </v-btn>
           
          </div>
        </span>
        
      </template>

      </vue-good-table>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

.actions{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  width:160px;
}
</style>
