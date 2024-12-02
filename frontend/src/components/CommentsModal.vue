<!-- src/components/CommentsModal.vue -->
<template>
    <TransitionRoot as="template" :show="isOpen">
      <Dialog as="div" class="relative z-10" @close="close">
        <!-- Fondo Oscuro -->
        <TransitionChild
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>
  
        <!-- Contenedor del Modal -->
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              enter="ease-out duration-300"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-3/4 max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all max-h-[80vh]"
              >
                <div class="flex flex-col h-full">
                  <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    Comentarios para {{ clientName }}
                  </DialogTitle>
  
                  <!-- Lista de Comentarios -->
                  <div class="flex-1 mb-4 overflow-auto">
                    <ul>
                      <li
                        v-for="comment in comments"
                        :key="comment.ID"
                        class="border-b border-gray-200 py-2"
                      >
                        <p class="text-sm text-gray-700">{{ comment.Comentario }}</p>
                        <p class="text-xs text-gray-500">
                          Fecha: {{ formatDate(comment.Fecha) }}
                        </p>
                      </li>
                    </ul>
                    <div v-if="comments.length === 0" class="text-sm text-gray-500">
                      No hay comentarios para este cliente.
                    </div>
                  </div>
  
                  <!-- Formulario para Agregar Nuevo Comentario -->
                  <form @submit.prevent="addComment" class="mt-4">
                    <label for="newComment" class="block text-sm font-medium text-gray-700">
                      Nuevo Comentario
                    </label>
                    <textarea
                      id="newComment"
                      v-model="newComment"
                      rows="3"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Escribe tu comentario aquí..."
                      required
                    ></textarea>
                    <div class="mt-3 flex justify-end">
                      <button
                        type="button"
                        @click="close"
                        class="mr-2 inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Agregar Comentario
                      </button>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { TransitionRoot, TransitionChild, Dialog, DialogTitle, DialogPanel } from '@headlessui/vue';
  import axios from '../services/axios';
  import { useToast } from 'vue-toastification';
  
  // Props recibidas desde el componente padre
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    clientDNI: {
      type: String,
      required: true,
    },
  });
  
  // Emite eventos para cerrar el modal y notificar al padre
  const emit = defineEmits(['close', 'comment-added']);
  
  // Estado reactivo para los comentarios
  const comments = ref([]);
  
  // Estado reactivo para el nuevo comentario
  const newComment = ref('');
  
  // Instancia de toast para notificaciones
  const toast = useToast();
  
  // Función para cerrar el modal
  const close = () => {
    emit('close');
  };
  
  // Función para formatear la fecha
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };
  
  // Función para obtener los comentarios desde el backend
  const fetchComments = async () => {
    try {
      console.log('fetchComments');
      const response = await axios.get('/comentarios', {
        params: { Nombre_Cliente: props.clientName },
      });
      comments.value = response.data;
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
      comments.value = [];
      toast.error('Error al obtener los comentarios.');
    }
  };
  
  // Función para agregar un nuevo comentario
  const addComment = async () => {
  if (!newComment.value.trim()) {
    toast.error('El comentario no puede estar vacío.');
    return;
  }

  try {
    const payload = {
      DNI: props.clientDNI,
      Comentario: newComment.value.trim(),
      Nombre_Cliente: props.clientName,
    };

    // Corrected URL interpolation using template literals
    const response = await axios.post(`/comentarios/${props.clientDNI}`, payload);

    comments.value.push(response.data); // Assuming the backend returns the created comment
    newComment.value = '';
    toast.success('Comentario agregado exitosamente.');
    emit('comment-added');
  } catch (error) {
    console.error('Error al agregar el comentario:', error);
    //toast.error('Error al agregar el comentario.');
  }
};

  
  // Verificar el estado inicial de `isOpen` al montar el componente
  onMounted(() => {
    if (props.isOpen) {
      fetchComments();
    }
  });
  
  // Observar cambios en `isOpen` y llamar a `fetchComments` cuando sea `true`
  watch(
    () => props.isOpen,
    (newVal) => {
      if (newVal) {
        fetchComments();
      }
    },
    { immediate: true } // Asegura que el watcher se ejecute inmediatamente con el valor actual
  );
  </script>
  
  <style scoped>
  /* Puedes agregar estilos adicionales aquí si es necesario */
  </style>
  