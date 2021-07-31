import Vue from "vue";
import Vuex from "vuex";
import studentStore from "./modules/student-store"
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";

Vue.use(Vuex);

export const store = new Vuex.Store({

  state: {
    students: [{
      "id": null,
      "name": null,
      "surname": null,
      "age": null,
      "schoolNumber": null,
      "registeredDate": null
    }],
    lessons: {},
    student : {}
  },

  getters,
  mutations,
  actions,
  modules: {
    studentStore
  }

})
