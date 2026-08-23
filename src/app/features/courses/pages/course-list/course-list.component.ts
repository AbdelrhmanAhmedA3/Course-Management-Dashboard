import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { CourseFormComponent } from '../../components/course-form/course-form.component';
import { Course } from '../../models/course.type';

@Component({
  selector: 'app-course-list',
  imports: [RouterLink, TableModule, IconField, InputIcon, InputText, NgClass, ButtonModule, Tooltip, ConfirmDialogModule, DatePipe, CurrencyPipe],
  providers: [ConfirmationService, MessageService, DialogService],
  template: `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <p-confirmDialog></p-confirmDialog>
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 class="text-xl font-semibold text-gray-800">Courses</h2>
        <button (click)="openCourseForm()" class="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
          Add Course
        </button>
      </div>
      
      <div class="p-4">
        <p-table [globalFilterFields]="['courseName', 'category', 'instructorName', 'status']" #dt1 [value]="courses()" [tableStyle]="{ 'min-width': '50rem' }" [paginator]="true" [rows]="5">
                   <ng-template #caption>
                    <div class="flex">
                        <p-iconfield  class="ml-auto">
                          <input pInputText type="text" (input)="dt1.filterGlobal($event.target.value, 'contains')" placeholder="Search keyword" />
                          <p-inputicon>
                              <i class="pi pi-search"></i>
                          </p-inputicon>
                        </p-iconfield>
                    </div>
                </ng-template>
          <ng-template pTemplate="header">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Instructor</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Created Date</th>
              <th pSortableColumn="status" >Status
                <p-sortIcon field="status" />
              </th>
              <th>Actions</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-course>
            <tr>
              <td class="font-medium text-gray-900">{{ course.courseName }}</td>
              <td class="text-gray-600">{{ course.category }}</td>
              <td class="text-gray-600">{{ course.instructorName }}</td>
              <td class="text-gray-600">{{ course.duration }}h</td>
              <td class="text-gray-600">{{ course.price | currency }}</td>
              <td class="text-gray-600">{{ course.createdDate | date:'mediumDate' }}</td>
              <td>
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" [ngClass]="{
    'bg-green-100 text-green-800': course.status === 'Active',
    'bg-yellow-100 text-yellow-800': course.status === 'Draft',
    'bg-gray-100 text-gray-800': course.status === 'Archived'
  }">
                  {{ course.status }}
                </span>
              </td>
              <td>
                <div class="flex gap-2">
                  <p-button icon="pi pi-eye" [rounded]="true" [text]="true" severity="info" [routerLink]="['/details', course.id]" tooltipPosition="top" pTooltip="View Details"></p-button>
                  <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="success" (onClick)="openCourseForm(course)" pTooltip="Edit" tooltipPosition="top"></p-button>
                  <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger" (onClick)="confirmDelete(course.id)" tooltipPosition="top" pTooltip="Delete"></p-button>
                </div>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr >
              <td colspan="8" class="text-center! p-4 text-gray-500">No courses found.</td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </div>
  `
})
export class CourseListComponent {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private dialogService = inject(DialogService);

  // Mock data for now
courses = signal<Course[]>([
  {
    id: 1,
    courseName: 'Angular for Beginners',
    instructorName: 'John Doe',
    category: 'Frontend',
    duration: 20,
    price: 99,
    status: 'Active',
    createdDate: '2026-01-15',
  },
  {
    id: 2,
    courseName: 'Advanced React Patterns',
    instructorName: 'Jane Smith',
    category: 'Frontend',
    duration: 18,
    price: 129,
    status: 'Draft',
    createdDate: '2026-01-20',
  },
  {
    id: 3,
    courseName: 'Mastering Node.js',
    instructorName: 'Bob Johnson',
    category: 'Backend',
    duration: 24,
    price: 149,
    status: 'Archived',
    createdDate: '2026-02-01',
  },
  {
    id: 4,
    courseName: 'TypeScript Fundamentals',
    instructorName: 'Emily Davis',
    category: 'Frontend',
    duration: 12,
    price: 79,
    status: 'Active',
    createdDate: '2026-02-05',
  },
  {
    id: 5,
    courseName: 'Advanced JavaScript',
    instructorName: 'Michael Brown',
    category: 'Frontend',
    duration: 22,
    price: 119,
    status: 'Active',
    createdDate: '2026-02-10',
  },
  {
    id: 6,
    courseName: 'NestJS Complete Guide',
    instructorName: 'Sarah Wilson',
    category: 'Backend',
    duration: 26,
    price: 159,
    status: 'Draft',
    createdDate: '2026-02-15',
  },
  {
    id: 7,
    courseName: 'CSS and Flexbox Mastery',
    instructorName: 'David Miller',
    category: 'Frontend',
    duration: 10,
    price: 59,
    status: 'Active',
    createdDate: '2026-02-20',
  },
  {
    id: 8,
    courseName: 'Tailwind CSS from Scratch',
    instructorName: 'Lisa Anderson',
    category: 'Frontend',
    duration: 14,
    price: 89,
    status: 'Archived',
    createdDate: '2026-02-25',
  },
  {
    id: 9,
    courseName: 'RxJS Deep Dive',
    instructorName: 'Chris Taylor',
    category: 'Frontend',
    duration: 16,
    price: 109,
    status: 'Draft',
    createdDate: '2026-03-01',
  },
  {
    id: 10,
    courseName: 'Angular Signals and State Management',
    instructorName: 'Olivia Thomas',
    category: 'Frontend',
    duration: 20,
    price: 139,
    status: 'Active',
    createdDate: '2026-03-05',
  },
  {
    id: 11,
    courseName: 'Building REST APIs',
    instructorName: 'Daniel Moore',
    category: 'Backend',
    duration: 18,
    price: 119,
    status: 'Active',
    createdDate: '2026-03-10',
  },
  {
    id: 12,
    courseName: 'MongoDB for Developers',
    instructorName: 'Sophia Martin',
    category: 'Backend',
    duration: 15,
    price: 99,
    status: 'Archived',
    createdDate: '2026-03-15',
  },
  {
    id: 13,
    courseName: 'PostgreSQL Essentials',
    instructorName: 'James Jackson',
    category: 'Backend',
    duration: 17,
    price: 109,
    status: 'Draft',
    createdDate: '2026-03-20',
  },
  {
    id: 14,
    courseName: 'Git and GitHub Essentials',
    instructorName: 'Emma White',
    category: 'DevOps',
    duration: 8,
    price: 49,
    status: 'Active',
    createdDate: '2026-03-25',
  },
  {
    id: 15,
    courseName: 'Docker for Developers',
    instructorName: 'William Harris',
    category: 'DevOps',
    duration: 14,
    price: 99,
    status: 'Active',
    createdDate: '2026-04-01',
  },
  {
    id: 16,
    courseName: 'Unit Testing with Jest',
    instructorName: 'Ava Martin',
    category: 'Testing',
    duration: 12,
    price: 79,
    status: 'Draft',
    createdDate: '2026-04-05',
  },
  {
    id: 17,
    courseName: 'Angular Testing with Jasmine',
    instructorName: 'Ethan Thompson',
    category: 'Testing',
    duration: 14,
    price: 89,
    status: 'Archived',
    createdDate: '2026-04-10',
  },
  {
    id: 18,
    courseName: 'Clean Code Principles',
    instructorName: 'Mia Garcia',
    category: 'Programming',
    duration: 10,
    price: 69,
    status: 'Active',
    createdDate: '2026-04-15',
  },
  {
    id: 19,
    courseName: 'Micro Frontends with Angular',
    instructorName: 'Noah Martinez',
    category: 'Frontend',
    duration: 22,
    price: 149,
    status: 'Draft',
    createdDate: '2026-04-20',
  },
  {
    id: 20,
    courseName: 'Frontend Performance Optimization',
    instructorName: 'Isabella Robinson',
    category: 'Frontend',
    duration: 16,
    price: 119,
    status: 'Archived',
    createdDate: '2026-04-25',
  },
]);



confirmDelete(courseId: number): void {
  this.confirmationService.confirm({
    header: 'Delete Course',
    message: 'Are you sure you want to delete this course?',
    icon: 'pi pi-exclamation-triangle',

    rejectButtonProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },

    acceptButtonProps: {
      label: 'Delete',
      severity: 'danger',
    },

    accept: () => {
      console.log('accepted');

      this.courses.update(courses => 
        courses.filter(course => course.id !== courseId)
      );
    },
  });
}

openCourseForm(course?: Course) {
  const dialogRef = this.dialogService.open(CourseFormComponent, {
    header: course ? 'Edit Course' : 'Add Course',
    width: '50vw',
    data: course,
    contentStyle: { overflow: 'auto' },
    breakpoints: {
      '960px': '75vw',
      '640px': '90vw'
    }
  });

  dialogRef?.onClose.subscribe((result: Course | undefined) => {
    if (result) {
      if (result.id) {
        this.courses.update(courses => {
          const index = courses.findIndex(c => c.id === result.id);
          if (index !== -1) {
            const newCourses = [...courses];
            newCourses[index] = { ...newCourses[index], ...result };
            return newCourses;
          }
          return courses;
        });
      } else {
        this.courses.update(courses => {
          const newCourse = {
            ...result,
            id: courses.length > 0 ? Math.max(0, ...courses.map(c => c.id)) + 1 : 1,
            createdDate: new Date().toISOString()
          };
          return [newCourse, ...courses];
        });
      }
    }
  });
}
}
