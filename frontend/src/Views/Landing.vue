<!-- src/views/Home.vue -->

<template>
    <div class="bg-white">
      <!-- Header -->
      <header class="absolute inset-x-0 top-0 z-50">
        <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div class="flex lg:flex-1">
            <router-link to="/" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </router-link>
          </div>
          <div class="flex lg:hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon class="size-6" aria-hidden="true" />
            </button>
          </div>
          <div class="hidden lg:flex lg:gap-x-12">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="text-sm/6 font-semibold text-gray-900"
            >
              {{ item.name }}
            </router-link>
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <router-link to="/login" class="text-sm/6 font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </router-link>
          </div>
        </nav>
        <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
          <div class="fixed inset-0 z-50" />
          <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div class="flex items-center justify-between">
              <router-link to="/" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" />
              </router-link>
              <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                <span class="sr-only">Close menu</span>
                <XMarkIcon class="size-6" aria-hidden="true" />
              </button>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div class="space-y-2 py-6">
                  <router-link
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.href"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {{ item.name }}
                  </router-link>
                </div>
                <div class="py-6">
                  <router-link to="/login" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Log in
                  </router-link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
  
      <main class="isolate">
        <!-- Hero section -->
        <div class="relative pt-14">
          <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div
              class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            />
          </div>
          <div class="py-24 sm:py-32 lg:pb-40">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
              <div class="mx-auto max-w-2xl text-center">
                <h1 class="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                  Deploy to the cloud with confidence
                </h1>
                <p class="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
                </p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                  <router-link
                    to="/get-started"
                    class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </router-link>
                  <router-link to="/learn-more" class="text-sm/6 font-semibold text-gray-900">
                    Learn more <span aria-hidden="true">→</span>
                  </router-link>
                </div>
              </div>
              <div class="mt-16 flow-root sm:mt-24">
                <div class="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <img
                    src="https://tailwindui.com/plus/img/component-images/project-app-screenshot.png"
                    alt="App screenshot"
                    width="2432"
                    height="1442"
                    class="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            />
          </div>
        </div>
  
        <!-- Feature section -->
        <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
          <div class="mx-auto max-w-2xl lg:text-center">
            <h2 class="text-base/7 font-semibold text-indigo-600">Deploy faster</h2>
            <p class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
              Everything you need to deploy your app
            </p>
            <p class="mt-6 text-pretty text-lg/8 text-gray-600">
              Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.
            </p>
          </div>
          <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div v-for="feature in features" :key="feature.name" class="relative pl-16">
                <dt class="text-base/7 font-semibold text-gray-900">
                  <div class="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <component :is="feature.icon" class="size-6 text-white" aria-hidden="true" />
                  </div>
                  {{ feature.name }}
                </dt>
                <dd class="mt-2 text-base/7 text-gray-600">{{ feature.description }}</dd>
              </div>
            </dl>
          </div>
        </div>
  
        <!-- FAQs -->
        <div class="mx-auto max-w-2xl divide-y divide-gray-900/10 px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:pb-32">
          <h2 class="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Frequently asked questions</h2>
          <dl class="mt-10 space-y-8 divide-y divide-gray-900/10">
            <div v-for="faq in faqs" :key="faq.id" class="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt class="text-base/7 font-semibold text-gray-900 lg:col-span-5">{{ faq.question }}</dt>
              <dd class="mt-4 lg:col-span-7 lg:mt-0">
                <p class="text-base/7 text-gray-600">{{ faq.answer }}</p>
              </dd>
            </div>
          </dl>
        </div>
      </main>
  
      <!-- Footer -->
      <footer class="mx-auto mt-32 max-w-7xl px-6 lg:px-8">
        <div class="border-t border-gray-900/10 py-16 sm:py-24 lg:py-32">
          <div class="xl:grid xl:grid-cols-3 xl:gap-8">
            <img class="h-9" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Company name" />
            <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div class="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 class="text-sm/6 font-semibold text-gray-900">Solutions</h3>
                  <ul role="list" class="mt-6 space-y-4">
                    <li v-for="item in footerNavigation.solutions" :key="item.name">
                      <router-link :to="item.href" class="text-sm/6 text-gray-600 hover:text-gray-900">
                        {{ item.name }}
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div class="mt-10 md:mt-0">
                  <h3 class="text-sm/6 font-semibold text-gray-900">Support</h3>
                  <ul role="list" class="mt-6 space-y-4">
                    <li v-for="item in footerNavigation.support" :key="item.name">
                      <router-link :to="item.href" class="text-sm/6 text-gray-600 hover:text-gray-900">
                        {{ item.name }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 class="text-sm/6 font-semibold text-gray-900">Company</h3>
                  <ul role="list" class="mt-6 space-y-4">
                    <li v-for="item in footerNavigation.company" :key="item.name">
                      <router-link :to="item.href" class="text-sm/6 text-gray-600 hover:text-gray-900">
                        {{ item.name }}
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div class="mt-10 md:mt-0">
                  <h3 class="text-sm/6 font-semibold text-gray-900">Legal</h3>
                  <ul role="list" class="mt-6 space-y-4">
                    <li v-for="item in footerNavigation.legal" :key="item.name">
                      <router-link :to="item.href" class="text-sm/6 text-gray-600 hover:text-gray-900">
                        {{ item.name }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Dialog, DialogPanel } from '@headlessui/vue'
  import {
    ArrowPathIcon,
    Bars3Icon,
    CloudArrowUpIcon,
    FingerPrintIcon,
    LockClosedIcon,
    XMarkIcon,
  } from '@heroicons/vue/24/outline'
  
  // Definir las rutas de navegación
  const navigation = [
    { name: 'Documentacion', href: '/documentacion' },
    // Añade más elementos de navegación si es necesario
  ]
  
  // Definir las características
  const features = [
    {
      name: 'Push to deploy',
      description:
        'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'SSL certificates',
      description:
        'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
      icon: LockClosedIcon,
    },
    {
      name: 'Simple queues',
      description:
        'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
      icon: ArrowPathIcon,
    },
    {
      name: 'Advanced security',
      description:
        'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
      icon: FingerPrintIcon,
    },
  ]
  
  // Definir las preguntas frecuentes
  const faqs = [
    {
      id: 1,
      question: "What's the best thing about Switzerland?",
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      id: 2,
      question: "What do you call a fake noodle?",
      answer:
        "An Impasta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      id: 3,
      question: "How does a penguin build its house?",
      answer:
        "Igloos it together. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    // Más preguntas...
  ]
  
  // Definir la navegación del footer
  const footerNavigation = {
    solutions: [
      { name: 'Hosting', href: '/hosting' },
      { name: 'Data services', href: '/data-services' },
      { name: 'Uptime monitoring', href: '/uptime-monitoring' },
      { name: 'Enterprise services', href: '/enterprise-services' },
      { name: 'Analytics', href: '/analytics' },
    ],
    support: [
      { name: 'Submit ticket', href: '/submit-ticket' },
      { name: 'Documentation', href: '/documentation' },
      { name: 'Guides', href: '/guides' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Jobs', href: '/jobs' },
      { name: 'Press', href: '/press' },
    ],
    legal: [
      { name: 'Terms of service', href: '/terms-of-service' },
      { name: 'Privacy policy', href: '/privacy-policy' },
      { name: 'License', href: '/license' },
    ],
  }
  
  const mobileMenuOpen = ref(false)
  </script>
  