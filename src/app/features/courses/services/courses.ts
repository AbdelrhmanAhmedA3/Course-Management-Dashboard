import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Course } from '../models/course.type';

@Service()
export class Courses {
    http = inject(HttpClient);
    apiURL= 'https://6a8b19f955d899aede9ba1a9.mockapi.io/courses/courses'

getcourses(search:string) {
  return this.http.get<Course[]>(this.apiURL, {
    params: search.trim()
      ? { search: search.trim() }
      : {},
  });
}
getcoursesById(id: string) {
        return this.http.get<Course>(`${this.apiURL}/${id}`)
    }
    
    addcourse(course: Course) {
        return this.http.post(this.apiURL, course)
    }
    
    updatecourse(id: string, course: Course) {
        return this.http.put(`${this.apiURL}/${id}`, course)
    } 

    deletecourse(id: string) {
        console.log(id);
        
        return this.http.delete(`${this.apiURL}/${id}`)
    }
}
