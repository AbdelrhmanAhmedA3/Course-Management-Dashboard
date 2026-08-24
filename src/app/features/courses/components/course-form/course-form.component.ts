import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { ValidationError } from 'shared/components/error/validation-error';
import { Course } from '../../models/course.type';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputText,
    InputNumber,
    Select,
    Textarea,
    Button,
    ValidationError
  ],
  template: `
    <form [formGroup]="courseForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label for="courseName">Course Name</label>
        <input pInputText id="courseName" formControlName="courseName" />
        <validation-error [control]="courseForm.controls['courseName']" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="instructorName">Instructor Name</label>
        <input pInputText id="instructorName" formControlName="instructorName" />
        <validation-error [control]="courseForm.controls['instructorName']" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="category">Category</label>
        <input pInputText id="category" formControlName="category" />
        <validation-error [control]="courseForm.controls['category']" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="duration">Duration (Hours)</label>
        <p-inputNumber inputId="duration" formControlName="duration" [min]="1" />
        <validation-error [control]="courseForm.controls['duration']" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="price">Price</label>
        <p-inputNumber inputId="price" formControlName="price" mode="currency" currency="USD" locale="en-US" [min]="0" />
        <validation-error [control]="courseForm.controls['price']" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="status">Status</label>
        <p-select id="status" formControlName="status" [options]="statusOptions" placeholder="Select Status"></p-select>
        <validation-error [control]="courseForm.controls['status']" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="description">Description</label>
        <textarea pInputTextarea id="description" formControlName="description" rows="3" [maxlength]="500"></textarea>
        <validation-error [control]="courseForm.controls['description']" />
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <p-button label="Cancel" severity="secondary" (click)="onCancel()" />
        <p-button label="Save" type="submit" [disabled]="courseForm.invalid" />
      </div>
    </form>
  `
})
export class CourseFormComponent {
  private fb = inject(FormBuilder);
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  statusOptions = ['Active', 'Draft', 'Archived'];

  courseForm = this.fb.nonNullable.group({
    id: [null as string | null],
    courseName: ['', [Validators.required, Validators.minLength(3)]],
    instructorName: ['', Validators.required],
    category: ['', Validators.required],
    duration: [null as number | null, [Validators.required, Validators.min(1)]],
    price: [null as number | null, [Validators.required, Validators.min(0)]],
    status: ['', Validators.required],
    description: ['', Validators.maxLength(500)]
  });

  constructor() {
    const data: Course = this.config.data;
    if (data) {
      this.courseForm.patchValue(data as any);
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.ref.close(this.courseForm.value);
    }
  }

  onCancel() {
    this.ref.close();
  }
}
