<!-- src/components/Table.vue -->
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold text-gray-900">{{ title }}</h1>
        <p class="mt-2 text-sm text-gray-700">
          Información relevante sobre {{ title.toLowerCase() }}.
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          class="block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="addItem"
        >
          Agregar {{ singularTitle }}
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="relative">
            <!-- Botones de acciones en lote (Bulk edit y Delete all) -->
            <div v-if="selectedItems.length > 0" class="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
              <button
                type="button"
                class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                @click="bulkEdit"
              >
                Bulk edit
              </button>
              <button
                type="button"
                class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                @click="deleteAll"
              >
                Delete all
              </button>
            </div>
            
            <!-- Renderizado Condicional de la Tabla o Mensaje de No Datos -->
            <template v-if="data.length > 0">
              <table class="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" class="relative px-7 sm:w-12 sm:px-6">
                      <input
                        type="checkbox"
                        class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        :checked="isAllSelected"
                        :indeterminate="isIndeterminate"
                        @change="toggleSelectAll"
                      />
                    </th>
                    <th
                      v-for="(header, index) in headers"
                      :key="index"
                      scope="col"
                      class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      {{ header }}
                    </th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                      <span class="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr
                    v-for="item in data"
                    :key="item[uniqueKey]"
                    :class="[selectedItems.includes(item[uniqueKey]) && 'bg-gray-50']"
                  >
                    <td class="relative px-7 sm:w-12 sm:px-6">
                      <div v-if="selectedItems.includes(item[uniqueKey])" class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"></div>
                      <input
                        type="checkbox"
                        class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        :value="item[uniqueKey]"
                        v-model="selectedItems"
                      />
                    </td>
                    <td
                      v-for="(value, key) in item"
                      :key="key"
                      :class="['whitespace-nowrap py-4 pr-3 text-sm font-medium', selectedItems.includes(item[uniqueKey]) ? 'text-indigo-600' : 'text-gray-900']"
                    >
                      {{ value }}
                    </td>
                    <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      <a href="#" class="text-indigo-600 hover:text-indigo-900 mr-2" @click.prevent="editItem(item)">
                        Editar
                        <span class="sr-only">, {{ getRowIdentifier(item) }}</span>
                      </a>
                      <button
                        @click="viewComments(item)"
                        class="text-green-600 hover:text-green-900"
                      >
                        Comentarios
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
            <template v-else>
              <p class="text-center text-gray-500">No hay datos disponibles.</p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Definir las props que el componente recibirá
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  uniqueKey: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: 'Users',
  },
})

// Emitir eventos para manejar acciones en el componente padre
const emit = defineEmits(['add-item', 'bulk-edit', 'delete-all', 'edit-item', 'view-comments']) // Añadido 'view-comments'

// Computed para obtener los encabezados dinámicamente, incluyendo uniqueKey
const headers = computed(() => {
  if (props.data.length > 0) {
    return Object.keys(props.data[0])
  }
  return []
})

// Computed para determinar si todos los elementos están seleccionados
const isAllSelected = computed(() => {
  return props.data.length > 0 && selectedItems.value.length === props.data.length
})

// Computed para determinar el estado indeterminado
const isIndeterminate = computed(() => {
  return selectedItems.value.length > 0 && selectedItems.value.length < props.data.length
})

// Estado reactivo para los elementos seleccionados
const selectedItems = ref([])

// Watcher para resetear la selección cuando cambian los datos
watch(
  () => props.data,
  () => {
    selectedItems.value = []
  }
)

// Función para alternar la selección de todos los elementos
const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedItems.value = props.data.map(item => item[props.uniqueKey])
  } else {
    selectedItems.value = []
  }
}

// Función para manejar la edición en lote
const bulkEdit = () => {
  emit('bulk-edit', selectedItems.value)
}

// Función para manejar la eliminación en lote
const deleteAll = () => {
  emit('delete-all', selectedItems.value)
}

// Función para manejar la adición de un nuevo elemento
const addItem = () => {
  emit('add-item')
}

// Función para manejar la edición de un elemento
const editItem = (item) => {
  emit('edit-item', item)
}

// Función para manejar la visualización de comentarios
const viewComments = (item) => {
  emit('view-comments', item)
}

// Función para obtener un identificador único para cada fila (para accesibilidad)
const getRowIdentifier = (item) => {
  return item[props.uniqueKey]
}

// Computed para obtener el título en singular para el botón "Agregar"
const singularTitle = computed(() => {
  if (props.title.endsWith('s')) {
    return props.title.slice(0, -1)
  }
  return props.title
})
</script>

<style scoped>
/* Agrega estilos adicionales si es necesario */
</style>
