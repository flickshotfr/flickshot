<!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
<div class="bg-white w-full">
    <div class="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8 ">
      <div class="flex px-2 justify-between lg:px-0">
        <div class="flex items-center gap-6">
          <a href="/" class="flex justify-center h-16">
            <div class="flex-shrink-0 flex items-center">
              <img class="block h-8 w-auto" src="/logo.png" alt="Workflow" />
            </div>
          </a>
          <div class="flex gap-3">
            <div>
              <a class=" text-black uppercase text-sm font-bold hover:underline" href="/">Articles</a>
            </div>
            <div class=" align-middle">
              <a class="text-black uppercase text-sm font-bold hover:underline" href="/albums">Albums</a>
            </div>
          </div>
        </div>
        <div class="my-auto">
          <a target="_blank" href="https://github.com/flickshotfr/flickshot">
            <svg width="24" height="24" fill="currentColor" class="text-gray-800 mr-3 transform"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"></path></svg>
          </a>
        </div>
      </div>
    </div>
</div>

</template>

<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { SearchIcon } from '@heroicons/vue/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'

const items = [
    {
        name: '',
        route: '',
    }
]
</script>

<style>
  .bg-header {
    background-color: #ffb64d;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fe8b00' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
  }
</style>