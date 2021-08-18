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

  if (payload.schoolNumber == null) {

    alert("Boş bırakamazsın!");

  } else {

    let schoolNumber = payload.schoolNumber;

    axios.get('http://localhost:3000/students?schoolNumber=' + schoolNumber).then(response => {

      let student = response.data[0];

      if (student === undefined) {
        alert(schoolNumber + " Numaralı bir öğrenci bulunmamaktadır.")
      } else {
        commit('updateStudent', student);
      }
    })
  }


}

export const getLesson = ({
  commit,
  dispatch
}, payload) => {



  axios.get('http://localhost:3000/lessons/' + payload)
    .then(response => {
      return response.data
    })
}


export const addLesson = ({
  commit,
  dispatch
}, payload) => {
  let currentLesson
  let studentOldData
  let studentNewData

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
          axios.patch('http://localhost:3000/students/' + payload.studentId, studentNewData)
            .then(response => {
              console.log(response)
            })
            .catch(error => {
              console.log(error);
            })
            .finally(() => {
              dispatch("getStudent", {
                schoolNumber: payload.studentSchoolNumber
              })
            })
        })

    })


}
