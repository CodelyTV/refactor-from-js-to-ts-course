// Primitive
type Name = string;

type Course = {
  title: string;
  url: string;
  chapters: number;
}

interface Book {
  title: string;
  url: string;
  pages: number;
}

// Union
type LearningResource = Course | Book;

// Tuple
type CourseLearners = [Course, number];
