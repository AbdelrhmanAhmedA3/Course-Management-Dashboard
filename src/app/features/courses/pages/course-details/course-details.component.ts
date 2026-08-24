import {
  Component,
  inject,
  input,
} from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';

import { RouterLink } from '@angular/router';

import { Courses } from 'features/courses/services/courses';

@Component({
  selector: 'app-course-details',
  imports: [RouterLink],
  templateUrl: './course-details.html',
})
export class CourseDetailsComponent {
  private readonly courseService = inject(Courses);

  readonly id = input.required<string>();

  readonly course = rxResource({
    params: () => ({
      id: this.id(),
    }),

    stream: ({ params }) =>
      this.courseService.getcoursesById(params.id),
  });
}