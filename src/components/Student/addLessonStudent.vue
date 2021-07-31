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
              <button @click="getStudent({searchInput})" class="btn btn-success searchBtn">Ara</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <table v-if="!studentByNumber == null" class="table table-border">
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
              <td>{{studentByNumber}}</td>
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
      studentByNumber : null
    };
  },
  methods: {
    ...mapActions(["getStudent"]),
    ...mapGetters({
      student: "getStudent"
    })
  },
};
</script>
<style lang="scss">
.searchBtn {
  margin-left: 15px;
}
</style>