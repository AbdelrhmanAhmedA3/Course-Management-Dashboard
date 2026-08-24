import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Courses } from 'features/courses/services/courses';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { of } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';
import { CourseFormComponent } from '../../components';
import { Course } from '../../models';

@Component({
  selector: 'app-course-list',
  imports: [RouterLink, TableModule, IconField, InputIcon, InputText, NgClass, ButtonModule, Tooltip, ConfirmDialogModule, DatePipe, CurrencyPipe, ReactiveFormsModule],
  providers: [ConfirmationService, DialogService],
  styles:[
    `
       ::ng-deep .p-datatable-table-container {
    flex: 1 ;
  }
  `
  ],
  templateUrl: './course-list.html',
})
export class CourseListComponent {
  private confirmationService = inject(ConfirmationService);
  private dialogService = inject(DialogService);
  private courseService = inject(Courses);

  searchControl = new FormControl<string>('');
  search = toSignal(this.searchControl.valueChanges.pipe(debounceTime(300)), { initialValue: '' });
  allCoursesResource = rxResource({
    params: () => ({ search: this.search() ?? '' }),
    stream: ({ params }) => this.courseService.getcourses(params.search).pipe(catchError(() => {
      return of([]);
    })),
  });




confirmDelete(courseId: string): void {
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
      this.courseService.deletecourse(courseId).subscribe({
        next: () => {
          this.allCoursesResource.reload();
        },

      });
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
        this.courseService.updatecourse(result.id, result).subscribe({
          next: () => {
            this.allCoursesResource.reload();
          },
        });
      } else {
        this.courseService.addcourse(result).subscribe({
          next: () => {
            this.allCoursesResource.reload();
          },
        });
      }
    }
  });
}
}
