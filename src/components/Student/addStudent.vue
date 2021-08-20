<template>
  <div class="row mt-5">
    <div class="col-6">
      <h3 class="mb-4">Öğrenci Ekle</h3>
      <div class="input-group row">
        <div class="col-6">
          <label class="form-label">Ad</label>
          <input type="text" v-model="student.name" class="form-control" />
        </div>
        <div class="col-6">
          <label class="form-label">Soyad</label>
          <input type="text" v-model="student.surname" class="form-control" />
        </div>
      </div>
      <div class="input-group row mt-3">
        <div class="col-12">
          <label class="form-label">Yaş</label>
          <input
            type="number"
            v-model="student.age"
            min="0"
            class="form-control"
          />
        </div>
      </div>
      <div class="input-group row mt-3">
        <div class="col-12">
          <label class="form-label">Öğrenci Numarası</label>
          <input
            type="number"
            min="0"
            v-model="student.schoolNumber"
            class="form-control"
          />
        </div>
      </div>
      <div class="input-group row mt-3">
        <div class="col-12">
          <button @click="addStudent({student})" class="btn btn-success">Ekle</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      student: {
        name: "",
        surname: "",
        age: null,
        schoolNumber: null,
        registeredLessons: [],
      },
    };
  },
  methods: {
    ...mapActions(["addStudent"]),
  },
};
</script>
<style lang="scss">
</style>