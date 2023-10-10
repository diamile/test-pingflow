<script setup lang="ts">
import {ref,defineProps} from "vue"
import {useProductStore} from "@/stores/product.store"
import Swal from 'sweetalert2'
const store = useProductStore();
import {getColorFromCategory} from "@/utiles/index"

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

//fonction qui gére la modale d'edition
async function edit(item: { id: any; }){
    const { value: title } = await Swal.fire({
    title: 'Modification du titre',
    input: 'text',
    inputLabel: 'Titre',
    inputPlaceholder: 'Entrer un titre'
  })

  if(title){
    const response = await store.updateProduct({title,id:item.id})
    if(response){
      Swal.fire(
      'Modifié',
      '',
      'success'
    )
  }
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Le titre est obligatoire!',
    })
  }

   
}

//fonction qui gére la modale de suppression 
async function deleted(item: { id: any; }){
    Swal.fire({
    title: 'Voulez-vous vraiment supprimer ce produit?',
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then(async (result) => {
    
    if (result.isConfirmed) {
      Swal.fire('Saved!', '', 'success')
       await store.deletedProduct(item)
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
}

</script>

<template>

<v-alert
  v-if="store.redisInfo.display"
    color="success"
    icon="mdi-check-circle"
    outlined
    >
      Redis server is running
 </v-alert>
 
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
          initialSortBy: { field: 'id', type: 'asc' },
        }"

        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
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
            <v-btn color="secondary"  @click="edit(props.row)">
             Edit
            </v-btn>
            <v-btn color="error" @click="deleted(props.row)">
             DELETE
            </v-btn>
           
          </div>
        </span>

        <span v-if="props.column.field == 'category'">
          <v-badge
            :color="getColorFromCategory(props.row.category).color"
            :content="getColorFromCategory(props.row.category).value"
            inline
        ></v-badge>
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
