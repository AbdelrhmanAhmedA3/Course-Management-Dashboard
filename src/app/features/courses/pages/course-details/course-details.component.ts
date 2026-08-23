import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-details',
  imports: [RouterLink],
  template: `
    <div class="max-w-4xl mx-auto">
      <div class="mb-6 flex items-center justify-between">
        <a routerLink="/" class="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
          <i class="pi pi-arrow-left mr-2"></i> Back to Courses
        </a>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-8 border-b border-gray-100 bg-gray-50">
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Course Details</h1>
              <p class="text-gray-500">ID: {{ courseId }}</p>
            </div>
            <span class="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
        
        <div class="p-8 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Title</h3>
              <p class="text-lg text-gray-900">Advanced Angular Patterns</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Category</h3>
              <p class="text-lg text-gray-900">Web Development</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Instructor</h3>
              <p class="text-lg text-gray-900">Sarah Drasner</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Enrolled Students</h3>
              <p class="text-lg text-gray-900">1,245</p>
            </div>
          </div>
          
          <div class="pt-6 border-t border-gray-100">
            <h3 class="text-sm font-medium text-gray-500 mb-2">Description</h3>
            <p class="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CourseDetailsComponent {
  private route = inject(ActivatedRoute);
  
  // Example of capturing route param if we configure it like 'details/:id'
  courseId = this.route.snapshot.paramMap.get('id');
}
