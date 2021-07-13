export interface Course {
  teachers: string;
  title: string;
  description: string;
  image: string;
  category: "tooling" | "frontend" | "backend";
  link: string;
}
