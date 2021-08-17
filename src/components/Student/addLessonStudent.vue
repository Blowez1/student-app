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
                @keypress.enter="getStudent({ searchInput })"
              />
              <button
                @click="getStudent({ searchInput })"
                class="btn btn-success searchBtn"
              >
                Ara
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div class="mt-5">
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

              <span class="badge d-inline-block rounded-pill bg-primary ms-2">
                <div class="d-flex align-items-center">
                  <svg
                    id="add"
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    class="me-1"
                    fill="#fff"
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
                      id="Group_4"
                      data-name="Group 4"
                      transform="translate(9.286 5.238)"
                    >
                      <g id="Group_3" data-name="Group 3">
                        <path
                          id="Path_2"
                          data-name="Path 2"
                          d="M238.428,134.1a.714.714,0,0,0-.714.714v8.1a.714.714,0,0,0,1.429,0v-8.1A.714.714,0,0,0,238.428,134.1Z"
                          transform="translate(-237.714 -134.095)"
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
      isStudent : false
    };
  },
  methods: {
    ...mapActions(["getStudent"]),
  },
  computed: {
    ...mapGetters({
      student: "studentByNumber",
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
</style>