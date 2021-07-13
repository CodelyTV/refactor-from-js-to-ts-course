<template>
  <div class="course-card">
    <CourseImage :image="course.image" :title="course.title" />
    <div class="course-card__info">
      <h6 class="course-card__title">
        <a :href="course.link" rel="noreferrer" target="_blank">
          {{ course.title }}
        </a>
      </h6>
      <strong>{{ course.teachers }}</strong>
      <p>
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Course } from "@/types";
import CourseImage from "@/components/CourseImage.vue";

export default defineComponent({
  name: "App",
  components: {
    CourseImage,
  },
  props: {
    course: {
      type: Object as PropType<Course>,
      required: true,
    },
  },
  computed: {
    description(): string {
      return this.course.description.length > 70
        ? this.course.description.substr(0, 70) + "…"
        : this.course.description;
    },
  },
});
</script>
