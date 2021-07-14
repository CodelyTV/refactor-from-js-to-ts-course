import { CourseImage } from "./CourseImage";
import { Course } from "./types";

interface CourseInfoProps {
  course: Course;
}

export const CourseInfo = ({ course }: CourseInfoProps) => {
  return (
    <div className="course-card js-filtered-item" data-category={course.category}>
      <CourseImage image={course.image} title={course.title} />
      <div className="course-card__info">
        <h6 className="course-card__title">
          <a
            href={course.link}
            rel="noreferrer"
            target="_blank"
          >
            {course.title}
          </a>
        </h6>
        <strong>{course.teachers}</strong>
        <p>
          {course.description}
        </p>
      </div>
    </div >
  );
};