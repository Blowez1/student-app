export const updateStudentList = (state,students) => {
    state.students = students
}

export const updateLessonList = (state,lessons) => {
    state.lessons = lessons
}

export const updateStudent = (state,studentByNumber) => {
    state.studentByNumber = studentByNumber
}