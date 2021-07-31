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

    <div class="mt-5" v-if="student.name">
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

                <div class="d-flex align-items-center" v-if="student.registeredLessons.length == 0">
                    <span>Henüz kayıtlı ders bulunmamaktadır.</span> <button class="btn btn-primary mx-2">Ders Ekle</button>
                </div>
                
              <span
                v-for="lesson in student.registeredLessons"
                :key="lesson.lessonId"
                class="lesson badge bg-primary"
                >{{ lesson.lessonTitle }}</span
              >
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