<template>
  <div>
    <div class="row mt-5">
      <div class="col-6">
        <div class="row input-group">
          <div class="col-12">
            <label class="form-label">Öğrenci Numarası</label>
            <div class="d-flex">
              <input
                type="number"
                v-model="searchInput"
                placeholder="716"
                class="form-control"
                @keypress.enter="getStudent({ schoolNumber: searchInput })"
              />
              <button
                @click="getStudent({ schoolNumber: searchInput })"
                class="btn btn-success searchBtn"
              >
                Ara
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5" v-if="isEmpty(student)">
      <table class="table table-border">
        <thead>
          <tr>
            <th>Okul Numarası</th>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Kayıtlı Olduğu Dersler</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ student.schoolNumber }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.surname }}</td>
            <td class="lessons">
              <span
                v-for="lesson in student.registeredLessons"
                :key="lesson.lessonId"
                class="lesson badge bg-success"
                @click="
                  delLesson({
                    lessonId: lesson.lessonId,
                    studentId: student.id,
                    studentSchoolNumber: student.schoolNumber,
                  })
                "
              >
                {{ lesson.lessonTitle }}
              </span>
              <span
                class="
                  badge
                  d-inline-block
                  rounded-pill
                  bg-primary
                  ms-2
                  lesson-card
                "
              >
                <div class="lesson-card-body">
                  <ul>
                    <li
                      v-for="lesson in lessons"
                      :key="lesson.id"
                      @click="
                        addLesson({
                          lessonId: lesson.id,
                          studentId: student.id,
                          studentSchoolNumber: student.schoolNumber,
                        })
                      "
                    >
                      {{ lesson.lessonCode }} - {{ lesson.lessonTitle }}
                    </li>
                  </ul>
                </div>
                <div
                  class="d-flex align-items-center lesson-add-btn"
                  @click="toggleLesson()"
                >
                  <span>Ders Ekle</span>
                </div>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      searchInput: null,
      isStudent: false,
    };
  },
  methods: {
    ...mapActions(["getStudent", "addLesson", "delLesson"]),
    toggleLesson() {
      const addLessonBody = document.querySelector(".lesson-card-body");
      addLessonBody.classList.toggle("active");
    },
    isEmpty() {
      if (Object.keys(this.student).length === 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  computed: {
    ...mapGetters({
      student: "studentByNumber",
      lessons: "getLessons",
    }),
  },
};
</script>
<style lang="scss">
.searchBtn {
  margin-left: 15px;
}

.lessons {
  .lesson {
    margin-right: 8px;
    &:hover {
      text-decoration: line-through;
      opacity: 0.7;
      cursor: pointer;
    }

    &:nth-last-child(1) {
      margin-right: 0px;
    }
  }
}

.lesson-add-btn {
  cursor: pointer;
}

.lesson-card {
  position: relative;

  .lesson-card-body {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 30px;
    display: inline-block;
    width: auto;
    background-color: #0d6efd;
    padding: 15px;
    opacity: 0;
    visibility: hidden;

    ul {
      list-style-type: none;
      margin: 0px;
      padding: 0px;
      li {
        margin: 0px;
        padding: 0px;
        margin-bottom: 10px;
        cursor: pointer;

        &:nth-last-child(1) {
          margin-bottom: 0px;
        }
      }
    }
  }

  .active {
    opacity: 1;
    visibility: visible;
  }
}
</style>