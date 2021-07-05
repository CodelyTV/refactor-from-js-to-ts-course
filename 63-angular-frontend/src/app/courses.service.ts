import { Injectable } from '@angular/core';
import CoursesData from './courses.json';
import { Course } from './types';

@Injectable({ providedIn: 'root', })
export class CoursesService {
    getCourses() {
        return CoursesData.data as Course[];
    }
}
