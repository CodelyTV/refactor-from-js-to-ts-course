<template>
  <div class="App">
    <header class="App-header">
      <h1>Courses</h1>
    </header>
    <div id="courses" class="courses-grid">
      <CourseInfo
        v-for="course in courses"
        :key="course.title"
        :course="course"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCourses } from "@/useCourses";
import CourseInfo from "@/components/CourseInfo.vue";

export default defineComponent({
  name: "App",
  components: {
    CourseInfo,
  },
  setup() {
    return useCourses();
  },
});
</script>
