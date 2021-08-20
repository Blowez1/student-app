<template>
  <div class="row">
    <div class="col-8">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Yaş</th>
            <th>Okul Numarası</th>
            <th>Kayıtlı Ders Sayısı</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.surname }}</td>
            <td>{{ student.age }}</td>
            <td>{{ student.schoolNumber }}</td>
            <td>{{ student.registeredLessons.length }}</td>
            <td>{{ student.registeredDate }}</td>
          </tr>
        </tbody>
      </table>

      <ul>
          <li v-for="lesson in lessons" :key="lesson.id">
              {{lesson.lessonCode}} - {{lesson.lessonTitle}}
          </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      students: "getStudents",
      lessons : "getLessons"
    }),
  },
};
</script>
<style lang="scss">
</style>