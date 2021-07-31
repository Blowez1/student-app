import axios from "axios"

export const initApp = ({
  commit
}) => {
  axios.get('http://localhost:3000/students').then(response => {
    let students = response.data;

    commit('updateStudentList', students);
  });
  axios.get('http://localhost:3000/lessons').then(response => {
    let lessons = response.data;

    commit('updateLessonList', lessons);
  })
}

export const addStudent = ({
  dispatch
}, payload) => {

  if (payload.student.name == "" || payload.student.surname == "" || payload.student.age == "" || payload.student.schoolNumber == "") {
    alert("Boş alan bırakmayın!")
  } else {

    let student = {
      "name": payload.student.name,
      "surname": payload.student.surname,
      "age": payload.student.age,
      "schoolNumber": payload.student.schoolNumber,
      "registeredLessons": [],
      "registeredDate": new Date().toISOString().slice(0, 10),
    }

    axios.post('http://localhost:3000/students',
      student
    ).finally(() => {
      dispatch("initApp")
    })
  }

}

export const getStudent = ({
  commit,
  dispatch
}, payload) => {

  if (payload.searchInput == null) {

    alert("Boş bırakamazsın!");

  } else {

    let schoolNumber = payload.searchInput;

    axios.get('http://localhost:3000/students?schoolNumber=' + schoolNumber).then(response => {
      
    let student = response.data[0];

    commit('updateStudent', student)

    })
  }



}
