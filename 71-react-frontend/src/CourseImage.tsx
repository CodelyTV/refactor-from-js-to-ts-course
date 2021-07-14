import { Component } from "react";

interface CourseImageProps {
  image: string;
  title: string;
}

export class CourseImage extends Component<CourseImageProps> {
  render() {
    return (
      < img
        className="course-card__img"
        alt={this.props.title}
        src={`img/cursos/${this.props.image}`}
      />
    )
  }
}