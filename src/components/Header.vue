<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <router-link class="nav-link" to="/" tag="a">Ana Sayfa</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/addStudent" tag="a">Öğrenci Ekle</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/addLessonStudent" tag="a">Ders Ekle</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/Students" tag="a">Öğrenciler</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>
<script>
export default {};
</script>
<style lang="scss">
</style>