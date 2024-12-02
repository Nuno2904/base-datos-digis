<template>
    <div class="flex flex-col items-center justify-center w-full">
      <!-- Dropzone Area -->
      <div
        class="w-full max-w-md p-6 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        @click="triggerFileSelect"
        :class="{'border-blue-400 bg-blue-50 dark:bg-blue-700': isDragging}"
      >
        <div class="flex flex-col items-center justify-center">
          <!-- SVG Icon -->
          <svg
            class="w-12 h-12 mb-4 text-gray-500 dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <p class="text-center text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            CSV files (MAX. 5MB)
          </p>
        </div>
        <!-- Hidden File Input -->
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          @change="handleFileSelect"
          multiple
          accept=".csv,text/csv"
        />
      </div>
  
      <!-- Uploaded Files List -->
      <div class="mt-4 w-full max-w-md">
        <ul>
          <li
            v-for="(file, index) in files"
            :key="index"
            class="flex items-center justify-between p-2 mb-2 bg-white dark:bg-gray-800 rounded shadow"
          >
            <div class="flex flex-col">
              <span class="text-gray-700 dark:text-gray-200">{{ file.name }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatFileSize(file.size) }}
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <!-- Upload Button -->
              <button
                v-if="uploadStatus[file.name] === 'pending'"
                @click="uploadFile(file)"
                class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Upload
              </button>
              <!-- Delete Button -->
              <button
                v-if="uploadStatus[file.name] !== 'uploading'"
                @click="deleteFile(file)"
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
              <!-- Uploading Indicator -->
              <span
                v-if="uploadStatus[file.name] === 'uploading'"
                class="text-blue-500 text-sm"
              >
                Uploading...
              </span>
              <!-- Success Indicator -->
              <span
                v-else-if="uploadStatus[file.name] === 'success'"
                class="text-green-500 text-sm"
              >
                Uploaded
              </span>
              <!-- Error Indicator -->
              <span
                v-else-if="uploadStatus[file.name] === 'error'"
                class="text-red-500 text-sm"
              >
                Error
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'FileUp',
    setup() {
      const fileInput = ref(null);
      const isDragging = ref(false);
      const files = ref([]);
      const uploadStatus = reactive({});
  
      // Trigger the hidden file input when the dropzone is clicked
      const triggerFileSelect = () => {
        fileInput.value.click();
      };
  
      // Handle files dropped into the dropzone
      const handleDrop = (event) => {
        const droppedFiles = Array.from(event.dataTransfer.files);
        handleFiles(droppedFiles);
        isDragging.value = false;
      };
  
      // Handle files selected via the file input
      const handleFileSelect = (event) => {
        const selectedFiles = Array.from(event.target.files);
        handleFiles(selectedFiles);
        // Reset the file input value to allow re-uploading the same file if needed
        event.target.value = '';
      };
  
      // Process and add files to the list without uploading
      const handleFiles = (selectedFiles) => {
        selectedFiles.forEach((file) => {
          // Validate file type
          if (!isValidFileType(file)) {
            alert(`Invalid file type: ${file.name}`);
            return;
          }
  
          // Validate file size (e.g., max 5MB)
          if (file.size > 5 * 1024 * 1024) {
            alert(`File is too large (max 5MB): ${file.name}`);
            return;
          }
  
          // Check for duplicate files
          if (files.value.some((f) => f.name === file.name && f.size === file.size)) {
            alert(`File already added: ${file.name}`);
            return;
          }
  
          // Add file to the list with initial status
          files.value.push(file);
          uploadStatus[file.name] = 'pending';
        });
      };
  
      // Validate if the file is a CSV
      const isValidFileType = (file) => {
        const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/csv'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        return (
          allowedTypes.includes(file.type) || fileExtension === 'csv'
        );
      };
      
  
      // Upload a single file
      const uploadFile = async (file) => {
        uploadStatus[file.name] = 'uploading';
        const formData = new FormData();
        formData.append('file', file);
  
        try {
          const response = await axios.post(
            'http://localhost:3000/api/upload-data',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          console.log('Upload Success:', response.data);
          uploadStatus[file.name] = 'success';
        } catch (error) {
          console.error('Upload Error:', error);
          uploadStatus[file.name] = 'error';
        }
      };
  
      // Delete a file from the list
      const deleteFile = (file) => {
        const index = files.value.findIndex(
          (f) => f.name === file.name && f.size === file.size
        );
        if (index !== -1) {
          files.value.splice(index, 1);
          delete uploadStatus[file.name];
        }
      };
  
      // Format file size in a readable format
      const formatFileSize = (size) => {
        const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        let i = 0;
        let readableSize = size;
        while (readableSize >= 1024 && i < units.length - 1) {
          readableSize /= 1024;
          i++;
        }
        return `${readableSize.toFixed(2)} ${units[i]}`;
      };
  
      return {
        fileInput,
        isDragging,
        triggerFileSelect,
        handleDrop,
        handleFileSelect,
        files,
        uploadStatus,
        uploadFile,
        deleteFile,
        formatFileSize,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Optional: Add any additional component-specific styles here */
  </style>
  