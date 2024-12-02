<!-- AddItemForm.vue -->
<template>
  <transition name="modal">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto	">
      <div class="bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">
          {{ isEditMode ? 'Editar ' + title.slice(0, -1) : 'Agregar ' + title.slice(0, -1) }}
        </h2>
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div v-for="field in formFields" :key="field.name">
              <label :for="field.name" class="block text-sm font-medium text-white">
                {{ field.label }}
              </label>
              <input
                v-if="field.type === 'text' || field.type === 'number' || field.type === 'email'"
                :type="field.type"
                :id="field.name"
                v-model="formData[field.name]"
                :placeholder="field.placeholder || ''"
                class="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white"
                :required="field.required || false"
              />
              <select
                v-else-if="field.type === 'select'"
                :id="field.name"
                v-model="formData[field.name]"
                class="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white"
                :required="field.required || false"
              >
                <option value="" disabled>Seleccione una opción</option>
                <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
              </select>
              <textarea
                v-else-if="field.type === 'textarea'"
                :id="field.name"
                v-model="formData[field.name]"
                :placeholder="field.placeholder || ''"
                class="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white"
                :required="field.required || false"
              ></textarea>
              <!-- Puedes añadir más tipos de campos según sea necesario -->
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              @click="close"
              class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
            >
              {{ isEditMode ? 'Actualizar' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watch, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  item: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close', 'submit'])

const isEditMode = computed(() => props.item !== null)

const formFields = reactive([])
const formData = reactive({})

// Función para mapear columnas a campos de formulario
const mapColumnsToFields = () => {
  formFields.splice(0, formFields.length) // Limpiar campos existentes

  // Inicializar los campos de formulario
  props.columns.forEach(column => {
    let fieldType = 'text' // Tipo por defecto
    let options = []

    // Definir las opciones basadas en el nombre de la columna
    if (column === 'Tipo') {
      fieldType = 'select'
      options = ['Colegio Profesional', 'Asociacion', 'Fundacion']
    } else if (column === 'Sector') {
      fieldType = 'select'
      options = [
        'Agricultura y RRNaturales', 'Energía y Recursos', 'Industria y Manufactura',
        'Comercio', 'Servicios Financieros', 'Tecnología y Comunicaciones',
        'Servicios Profesionales y Consultorías', 'Salud', 'Transporte y Logística', 'Educación'
      ]
    } else if (column === 'Tamanno') {
      fieldType = 'select'
      options = ['Pequeña (< 50 empleados)', 'Mediana (Entre 50 y 250)', 'Grande (más de 250)', 'PSO']
    } else if (['Empleados', 'Dias_SigContacto'].includes(column)) {
      fieldType = 'number'
    } else if (column.toLowerCase().includes('email')) {
      fieldType = 'email'
    } else if (['Comentarios', 'Descripcion'].includes(column)) {
      fieldType = 'textarea'
    }

    formFields.push({
      name: column,
      label: column.replace('_', ' '),
      type: fieldType,
      options: options,
      required: true, // Personalizar si el campo es requerido
      placeholder: `Ingrese ${column.toLowerCase().replace('_', ' ')}`,
    })

    // Inicializar el valor del campo en formData
    formData[column] = props.item ? props.item[column] : ''
  })
}


// Mapear las columnas cuando el componente se monta o cambia
watch(() => props.columns, () => {
  mapColumnsToFields()
}, { immediate: true })

// También observa cambios en props.item para prellenar el formulario en modo edición
watch(() => props.item, () => {
  if (props.item) {
    props.columns.forEach(column => {
      formData[column] = props.item[column] || ''
    })
  } else {
    props.columns.forEach(column => {
      formData[column] = ''
    })
  }
}, { immediate: true })

const handleSubmit = () => {
  // Emitir el evento de submit con los datos del formulario
  emit('submit', { ...formData })
  // Cerrar el formulario después de enviar
  emit('close')
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
/* Transiciones para el modal */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>
