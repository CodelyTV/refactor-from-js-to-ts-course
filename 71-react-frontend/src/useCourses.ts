import { Course } from "./types";
import CoursesData from './courses.json';
import { useEffect, useState } from "react";

export const useCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        setCourses(CoursesData.data as Course[]);
    }, []);

    return {
        courses
    }
};