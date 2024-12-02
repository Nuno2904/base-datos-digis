<!-- src/views/Dashboard.vue -->
<template>
  <div class="min-h-full">
    <!-- Barra de Navegación Superior con Disclosure para el Menú Responsivo -->
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="border-b border-gray-700">
          <div class="flex h-16 items-center justify-between px-4 sm:px-0">
            <div class="flex items-center">
              <!-- Logo de la Aplicación -->
              <div class="shrink-0">
                <img
                  class="h-8 w-8"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Digis Dashboard"
                />
              </div>
              <!-- Navegación Principal (Solo en Pantallas Medianas y Grandes) -->
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <button
                    v-for="item in navigation"
                    :key="item.name"
                    @click="selectTab(item)"
                    :class="[
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    ]"
                  >
                    {{ item.name }}
                  </button>
                </div>
              </div>
            </div>
            <!-- Iconos de Notificaciones y Perfil de Usuario (Solo en Pantallas Medianas y Grandes) -->
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <!-- Botón de Notificaciones -->
                <button
                  type="button"
                  class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span class="sr-only">View notifications</span>
                  <BellIcon class="h-6 w-6" aria-hidden="true" />
                  <!-- Indicador de Notificaciones -->
                  <span class="absolute top-0 right-0 inline-block h-2 w-2 rounded-full bg-red-400"></span>
                </button>

                <!-- Menú de Usuario -->
                <Menu as="div" class="relative ml-3">
                  <div>
                    <MenuButton
                      class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span class="sr-only">Open user menu</span>
                      <img
                        class="h-8 w-8 rounded-full"
                        :src="user.imageUrl"
                        alt="User Avatar"
                      />
                    </MenuButton>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-200"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <MenuItem
                        v-for="item in userNavigation"
                        :key="item.name"
                        v-slot="{ active }"
                      >
                        <template v-if="item.name !== 'Sign out'">
                          <a
                            :href="item.href"
                            :class="[
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            ]"
                          >
                            {{ item.name }}
                          </a>
                        </template>
                        <template v-else>
                          <button
                            @click="handleLogout"
                            :class="[
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block w-full text-left px-4 py-2 text-sm',
                            ]"
                          >
                            {{ item.name }}
                          </button>
                        </template>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
            <!-- Botón del Menú Móvil (Solo en Pantallas Pequeñas) -->
            <div class="-mr-2 flex md:hidden">
              <DisclosureButton
                class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="sr-only">Open main menu</span>
                <Bars3Icon
                  v-if="!open"
                  class="block h-6 w-6"
                  aria-hidden="true"
                />
                <XMarkIcon
                  v-else
                  class="block h-6 w-6"
                  aria-hidden="true"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Menú Móvil -->
      <DisclosurePanel class="border-b border-gray-700 md:hidden">
        <div class="space-y-1 px-2 py-3 sm:px-3">
          <button
            v-for="item in navigation"
            :key="item.name"
            @click="selectTab(item)"
            :class="[
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block w-full text-left rounded-md px-3 py-2 text-base font-medium',
            ]"
          >
            {{ item.name }}
          </button>
        </div>
        <div class="border-t border-gray-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                :src="user.imageUrl"
                alt="User Avatar"
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-white">
                {{ user.name }}
              </div>
              <div class="text-sm font-medium text-gray-400">
                {{ user.email }}
              </div>
            </div>
            <button
              type="button"
              class="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <a
              v-for="item in userNavigation"
              :key="item.name"
              :href="item.href"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              {{ item.name }}
            </a>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <!-- Header con Título de la Pestaña Actual -->
    <div class="bg-gray-800 pb-32">
      <header class="py-10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-white">
            {{ currentTabTitle }}
          </h1>
        </div>
      </header>
    </div>

    <!-- Contenido Principal -->
    <main class="-mt-32">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <!-- Título de la Tabla -->
          <h2 class="text-lg font-medium leading-6 text-gray-900 mb-4">{{ currentTabTitle }}</h2>
          
          <!-- Barra de Búsqueda Agregada con Margin Bottom -->
          <div class="mb-4">
            <label for="search" class="block text-sm font-medium text-gray-900">Buscar por Identificador</label>
            <div class="relative mt-2 flex items-center">
              <input
                v-model="searchQuery"
                type="text"
                name="search"
                id="search"
                class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                placeholder="Buscar por identificador.."
              />
              <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">⌘K</kbd>
              </div>
            </div>
          </div>

            <!-- Barra de Búsqueda Agregada con Margin Bottom -->
            <div class="mb-4">
            <label for="search" class="block text-sm font-medium text-gray-900">Buscar por Nombre</label>
            <div class="relative mt-2 flex items-center">
              <input
                v-model="searchQueryName"
                type="text"
                name="searchName"
                id="searchName"
                class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                placeholder="Buscar por nombre.."
              />
              <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">⌘K</kbd>
              </div>
            </div>
          </div>

          <!-- Tabla de Datos -->
          <Table
            :data="finalFilteredData"
            :uniqueKey="uniqueKey"
            :title="currentTabTitle"
            :columns="currentColumns"
            @add-item="openAddItemModal"
            @bulk-edit="handleBulkEdit"
            @delete-all="handleDeleteAll"
            @edit-item="handleEditItem"
            @view-comments="openCommentsModal"
          />
        </div>
      </div>

      <!-- Botón Flotante para Agregar Elemento -->
      <FileUp></FileUp>
    </main>

    <!-- Modales -->
    <AddItemForm
      v-if="isModalOpen"
      :title="currentTabTitle"
      :columns="currentColumns"
      @close="closeAddItemModal"
      @submit="addItem"
    />
    <AddItemForm
      v-if="isEditModalOpen"
      :title="currentTabTitle"
      :columns="currentColumns"
      :item="itemToEdit"
      @close="closeEditItemModal"
      @submit="updateItem"
    />

    <!-- Modal de Comentarios -->
    <CommentsModal
      v-if="isCommentsModalOpen"
      :isOpen="isCommentsModalOpen"
      :clientName="selectedClient.name"
      :clientDNI="selectedClient.DNI"
      @close="closeCommentsModal"
      @comment-added="handleCommentAdded"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from '../services/axios';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import Table from '../components/Table.vue';
import AddItemForm from '../components/AddItemForm.vue';
import CommentsModal from '../components/CommentsModal.vue';
import FileUp from '../components/FileUp.vue';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

// Authentication and Router setup
const authStore = useAuthStore();
const router = useRouter();

// User data
const user = computed(() => ({
  name: authStore.user?.name || 'Usuario',
  email: authStore.user?.email || 'usuario@example.com',
  imageUrl:
    authStore.user?.imageUrl ||
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}));

// Navigation setup
const navigation = ref([
  { name: 'Entidades', key: 'entidades', uniqueKey: 'NIF', current: true },
  { name: 'Empresas', key: 'empresas', uniqueKey: 'NIF', current: false },
  { name: 'Contactos', key: 'contactos', uniqueKey: 'DNI', current: false },
]);

const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
  { name: 'Sign out', href: '#' },
];

// Table data states
const tableData = ref([]);
const uniqueKey = ref('NIF');
const currentTabTitle = ref('Entidades');

const currentTabUniqueKey = computed(() => {
  const currentTab = navigation.value.find((tab) => tab.current);
  return currentTab ? currentTab.uniqueKey : '';
});

const currentTabKey = computed(() => {
  const currentTab = navigation.value.find((tab) => tab.current);
  return currentTab ? currentTab.key : '';
});

// Search states
const searchQuery = ref('');
const searchQueryName = ref('');

// Watchers to ensure only one search is active
watch(searchQuery, (newVal) => {
  if (newVal) {
    searchQueryName.value = '';
  }
});

watch(searchQueryName, (newVal) => {
  if (newVal) {
    searchQuery.value = '';
  }
});

// Computed properties for filtering
const filteredData = computed(() => {
  if (!searchQuery.value) return tableData.value;
  const key = currentTabUniqueKey.value;
  return tableData.value.filter((item) => {
    const keyValue = item[key];
    if (keyValue) {
      return keyValue.toString().toLowerCase().includes(searchQuery.value.toLowerCase());
    }
    return false;
  });
});

const filteredDataName = computed(() => {
  if (!searchQueryName.value) return tableData.value;
  return tableData.value.filter((item) => {
    const name = item.Nombre || item.Nombre_Empresa || item.Nombre_Cliente || '';
    return name.toLowerCase().includes(searchQueryName.value.toLowerCase());
  });
});

// Final filtered data based on active search
const finalFilteredData = computed(() => {
  if (searchQuery.value) {
    return filteredData.value;
  } else if (searchQueryName.value) {
    return filteredDataName.value;
  } else {
    return tableData.value;
  }
});

// Modal states
const isModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isCommentsModalOpen = ref(false);
const itemToEdit = ref(null);
const selectedClient = ref({
  name: '',
  DNI: '',
});

// Toast notifications
const toast = useToast();

// Current columns based on tab
const currentColumns = computed(() => {
  const currentTab = navigation.value.find((tab) => tab.current);
  if (currentTab) {
    switch (currentTab.key) {
      case 'entidades':
        return [
          'NIF',
          'Tipo',
          'Nombre',
          'Direccion',
          'Sector',
          'Telefono',
          'Web',
          'Correo',
          'Valoracion_Contacto',
          'Posibilidad_Acuerdo',
        ];
      case 'empresas':
        return [
          'NIF',
          'Nombre',
          'Direccion',
          'Sector',
          'Tamano',
          'Telefono',
          'Web',
          'Correo',
          'Valoracion_Contacto',
          'Posibilidad_Acuerdo',
        ];
      case 'contactos':
        return [
          'DNI',
          'Nombre_Empresa',
          'Nombre',
          'Apellido1',
          'Apellido2',
          'Email',
          'Fecha_Contacto',
          'Fecha_SigContacto',
          'Fecha_Fin',
          'Dias_SigContacto',
          'Estado',
          'Origen',
          'Comentarios',
          'Docs',
          'NIF_entidad',
          'NIF_empresa',
          'Acciones',
        ];
      default:
        return [];
    }
  }
  return [];
});

// Function to select tab and fetch data
const selectTab = async (selectedItem) => {
  navigation.value.forEach((item) => {
    item.current = item.key === selectedItem.key;
  });
  await fetchData(selectedItem.key);
  uniqueKey.value = selectedItem.uniqueKey;
  currentTabTitle.value = selectedItem.name;
};

// Function to fetch data from backend
const fetchData = async (tabKey) => {
  try {
    let response;
    switch (tabKey) {
      case 'entidades':
        response = await axios.get('entidades/');
        break;
      case 'empresas':
        response = await axios.get('empresas/');
        break;
      case 'contactos':
        response = await axios.get('contactos/');
        break;
      default:
        response = { data: [] };
    }
    console.log(`Datos de ${tabKey}:`, response.data);
    tableData.value = response.data;
  } catch (error) {
    console.error(`Error al obtener datos de ${tabKey}:`, error);
    tableData.value = [];
    toast.error(`Error al obtener datos de ${tabKey}.`);
  }
};

// Initial data fetch
onMounted(() => {
  fetchData('entidades');
});

// Event handlers for table actions
const handleBulkEdit = async (selectedItems) => {
  alert(`Editar en lote los siguientes elementos: ${selectedItems.join(', ')}`);
};

const handleDeleteAll = async (selectedItems) => {
  const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar los ${selectedItems.length} elementos seleccionados?`);
  if (!confirmDelete) return;

  try {
    const currentTab = navigation.value.find((tab) => tab.current);
    let endpoint = '';
    let data = {};

    switch (currentTab.key) {
      case 'entidades':
        endpoint = 'entidades/bulk-delete';
        data = { NIFs: selectedItems };
        break;
      case 'empresas':
        endpoint = 'empresas/bulk-delete';
        data = { NIFs: selectedItems };
        break;
      case 'contactos':
        endpoint = 'contactos/bulk-delete';
        data = { DNIs: selectedItems };
        break;
      default:
        return;
    }

    console.log(`Eliminando elementos seleccionados de ${currentTab.key}:`, selectedItems);
    console.log('Endpoint:', endpoint);
    await axios.delete(endpoint, { data });
    await fetchData(currentTab.key);
    toast.success('Elementos eliminados correctamente.');
  } catch (error) {
    console.error('Error al eliminar elementos:', error);
    toast.error('Hubo un error al eliminar los elementos.');
  }
};

// Modal control functions
const openAddItemModal = () => {
  isModalOpen.value = true;
};

const closeAddItemModal = () => {
  isModalOpen.value = false;
};

const openEditItemModal = () => {
  isEditModalOpen.value = true;
};

const closeEditItemModal = () => {
  isEditModalOpen.value = false;
};

const addItem = async (newItem) => {
  try {
    const currentTab = navigation.value.find((tab) => tab.current);
    let endpoint = '';
    switch (currentTab.key) {
      case 'entidades':
        endpoint = 'entidades/';
        break;
      case 'empresas':
        endpoint = 'empresas/';
        break;
      case 'contactos':
        endpoint = 'contactos/';
        break;
      default:
        return;
    }

    await axios.post(endpoint, newItem);
    await fetchData(currentTab.key);
    closeAddItemModal();
    toast.success('Elemento añadido correctamente.');
  } catch (error) {
    console.error('Error al añadir el elemento:', error);
    toast.error('Hubo un error al añadir el elemento.');
  }
};

const handleEditItem = (item) => {
  itemToEdit.value = { ...item };
  openEditItemModal();
};

const updateItem = async (updatedItem) => {
  try {
    const currentTab = navigation.value.find((tab) => tab.current);
    let endpoint = '';
    switch (currentTab.key) {
      case 'entidades':
        endpoint = `entidades/${updatedItem.NIF}/`;
        break;
      case 'empresas':
        endpoint = `empresas/${updatedItem.NIF}/`;
        break;
      case 'contactos':
        endpoint = `contactos/${updatedItem.DNI}/`;
        break;
      default:
        return;
    }

    await axios.put(endpoint, updatedItem);
    await fetchData(currentTab.key);
    closeEditItemModal();
    toast.success('Elemento actualizado correctamente.');
  } catch (error) {
    console.error('Error al actualizar el elemento:', error);
    toast.error('Hubo un error al actualizar el elemento.');
  }
};

// Logout function
const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

// Comments modal functions
const openCommentsModal = (client) => {
  selectedClient.value = {
    name: client.Nombre || client.Nombre_Cliente || 'Desconocido',
    DNI: client.DNI || client.ID || '',
  };
  isCommentsModalOpen.value = true;
};

const closeCommentsModal = () => {
  isCommentsModalOpen.value = false;
};

const handleCommentAdded = () => {
  closeCommentsModal();
  fetchData(currentTab.key);
};
</script>


<style>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
