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
                @keypress.enter="getStudent({ schoolNumber : searchInput })"
              />
              <button
                @click="getStudent({ schoolNumber : searchInput })"
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
              >
                <div class="d-flex align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    class="me-1"
                    fill="#fff"
                    height="15"
                    viewBox="0 0 20 20"
                  >
                    <g id="Group_2" data-name="Group 2">
                      <g id="Group_1" data-name="Group 1">
                        <path
                          id="Path_1"
                          data-name="Path 1"
                          d="M10,0A10,10,0,1,0,20,10,10.011,10.011,0,0,0,10,0Zm0,18.571A8.571,8.571,0,1,1,18.571,10,8.581,8.581,0,0,1,10,18.571Z"
                        />
                      </g>
                    </g>
                    <g
                      id="Group_6"
                      data-name="Group 6"
                      transform="translate(5.238 9.286)"
                    >
                      <g id="Group_5" data-name="Group 5">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M142.9,237.714h-8.1a.714.714,0,0,0,0,1.429h8.1a.714.714,0,0,0,0-1.429Z"
                          transform="translate(-134.095 -237.714)"
                        />
                      </g>
                    </g>
                  </svg>
                  {{ lesson.lessonTitle }}
                </div>
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
                        addLesson({ lessonId: lesson.id, studentId: student.id , studentSchoolNumber : student.schoolNumber })
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
    ...mapActions(["getStudent", "addLesson"]),
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