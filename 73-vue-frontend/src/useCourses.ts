import { Course } from "./types";
import CoursesData from "./courses.json";
import { reactive } from "vue";

export const useCourses = (): { courses: Course[] } => {
  const courses = reactive(CoursesData.data as Course[]);

  return {
    courses,
  };
};
