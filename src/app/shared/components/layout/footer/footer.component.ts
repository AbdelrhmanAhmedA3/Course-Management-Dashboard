import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="bg-gray-100 text-gray-600 mt-auto border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <p class="text-sm text-center md:text-left">
            &copy; 2026 Course Management Dashboard. All rights reserved.
          </p>
        </div>
        <div class="flex space-x-6">
          <a href="#" class="text-sm hover:text-gray-900 transition-colors">Privacy Policy</a>
          <a href="#" class="text-sm hover:text-gray-900 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
