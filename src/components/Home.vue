<template>
  <div class="row">
    <div
      class="col-12 mt-5 d-flex justify-content-around align-items-center"
      style="height: 500px"
    >
      <router-link
        tag="div"
        to="/addStudent"
        class="btn home-btn btn-outline-success"
      >
      Öğrenci Ekle
      </router-link>
      <router-link
        tag="div"
        to="/addLessonStudent"
        class="btn home-btn btn-outline-success"
      >
      Öğrenciye Ders Ekle
      </router-link>
      <router-link
        tag="div"
        to="/Students"
        class="btn home-btn btn-outline-success"
      >
      Öğrenciler
      </router-link>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scope>
.home-btn {
  font-size: 55px;
}
</style>