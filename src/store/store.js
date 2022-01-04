import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Swal from 'sweetalert2'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {

    students: [],
    lessons: [],
    isLoading: true,
    studentByNumber: {}

  },
  actions: {
    initApp({
      commit
    }) {
      axios.get('http://localhost:3000/students').then(response => {
        let students = response.data;

        commit('SET_STUDENTLIST', students);
      });
      axios.get('http://localhost:3000/lessons').then(response => {
        let lessons = response.data;

        commit('SET_LESSONLIST', lessons);
      })
    },

    async addStudent({
      dispatch
    }, payload) {

      if (payload.student.name == "" || payload.student.surname == "" || payload.student.age == "" || payload.student.schoolNumber == "") {

        Swal.fire({
          title: 'Hata!',
          text: 'Boş alan bırakamazsın!',
          icon: 'warning',
          confirmButtonText: 'Tamam'
        })

      } else {

        const isStudent = async (number) => {

          return await axios.get('http://localhost:3000/students?schoolNumber=' + number)
            .then(response => {
              if (response.data.length === 0) {
                return true;
              }

              return false;
            })

        }

        let student = {
          "name": payload.student.name,
          "surname": payload.student.surname,
          "age": payload.student.age,
          "schoolNumber": payload.student.schoolNumber,
          "registeredLessons": [],
          "registeredDate": new Date().toISOString().slice(0, 10)
        }


        if (await isStudent(payload.student.schoolNumber) == true) {
          axios.post('http://localhost:3000/students',
            student
          ).finally(() => {

            Swal.fire({
              title: 'İşlem başarılı!',
              text: 'Tebrikler, ' + student.name + ' başarıyla kayıt oldunuz.',
              icon: 'success',
              confirmButtonText: 'Tamam'
            })

            dispatch("initApp")
          })
        } else {

          Swal.fire({
            title: 'Hata!',
            text: 'Bu okul numarasını kullanamazsın!',
            icon: 'error',
            confirmButtonText: 'Tamam'
          })

        }


      }

    },

    getStudent({
      commit,
      dispatch
    }, payload) {


      if (payload.schoolNumber == null) {

        Swal.fire({
          title: 'Hata!',
          text: 'Boş bırakamazsın!',
          icon: 'warning',
          confirmButtonText: 'Tamam'
        })

      } else {


        let schoolNumber = payload.schoolNumber;

        axios.get('http://localhost:3000/students?schoolNumber=' + schoolNumber).then(response => {

          let student = response.data[0];

          if (student === undefined) {
            alert(schoolNumber + " Numaralı bir öğrenci bulunmamaktadır.")
          } else {
            commit('SET_STUDENT', student);
          }
        })
      }


    },

    addLesson({
      commit,
      dispatch
    }, payload) {

      let currentLesson
      let studentOldData
      let studentNewData

      const isUnique = (studentOldData, currentLesson) => {

        return studentOldData.registeredLessons.findIndex((lesson) => {
          if (lesson.lessonId == currentLesson.id)
            return true;
        });

      }

      axios.get('http://localhost:3000/lessons/' + payload.lessonId)

        .then(response => {
          currentLesson = response.data
        })

        .finally(() => {

          axios.get('http://localhost:3000/students/' + payload.studentId)
            .then(response => {
              studentOldData = response.data

              const lesson = {
                "lessonId": currentLesson.id,
                "lessonCode": currentLesson.lessonCode,
                "lessonTitle": currentLesson.lessonTitle
              }

              studentNewData = {
                "name": studentOldData.name,
                "surname": studentOldData.surname,
                "age": studentOldData.age,
                "schoolNumber": studentOldData.schoolNumber,
                "registeredDate": studentOldData.registeredDate,
                // İkisini de kullanabilirsin abicim üstteki daha kullanışlı ;)
                "registeredLessons": [...studentOldData.registeredLessons, lesson]
                // "registeredLessons": studentOldData.registeredLessons.concat(lesson)
              }

            })

            .finally(() => {

              if (isUnique(studentOldData, currentLesson) == -1) {

                axios.patch('http://localhost:3000/students/' + payload.studentId, studentNewData)
                  .catch(error => {
                    console.log(error);
                  })
                  .finally(() => {
                    dispatch("getStudent", {
                      schoolNumber: payload.studentSchoolNumber
                    })

                    dispatch("initApp")
                  })
              } else {


                Swal.fire({
                  title: 'Hata!',
                  text: 'Öğrenci bu derse zaten kayıtlı!',
                  icon: 'warning',
                  confirmButtonText: 'Tamam'
                })


              }

            })

        })
    },

    async delLesson({
      dispatch
    }, payload) {

      let studentOldData
      let studentNewData

      const newLessonData = async (lessondata, lessonId) => {

        let newlessons

        newlessons = lessondata.registeredLessons

        newlessons = newlessons.filter((el) => {
          return el.lessonId != lessonId
        })

        return await newlessons
      }



      axios.get('http://localhost:3000/students/' + payload.studentId)
        .then(async response => {
          studentOldData = response.data

          studentNewData = {
            "name": studentOldData.name,
            "surname": studentOldData.surname,
            "age": studentOldData.age,
            "schoolNumber": studentOldData.schoolNumber,
            "registeredDate": studentOldData.registeredDate,
            "registeredLessons": await newLessonData(studentOldData, payload.lessonId)
          }

          axios.patch('http://localhost:3000/students/' + payload.studentId, studentNewData)
            .then(() => {
              dispatch('getStudent', {
                schoolNumber: payload.studentSchoolNumber
              })

              dispatch("initApp")
            })
        })
    }
  },
  mutations: {
    SET_STUDENTLIST(state, students) {
      state.students = students
    },

    SET_LESSONLIST(state, lessons) {
      state.lessons = lessons
    },
    SET_STUDENT(state, studentByNumber) {
      state.studentByNumber = studentByNumber
    }
  },
  getters: {
    getStudents(state) {
      return state.students
    },

    getLessons(state) {
      return state.lessons
    },

    studentByNumber(state) {
      return state.studentByNumber
    }
  },

})
