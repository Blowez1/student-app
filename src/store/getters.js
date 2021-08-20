export const getStudents = (state) => {
    return state.students
}

export const getLessons = (state) => {
    return state.lessons
}

export const checkTrue = (state,payload) => {
    if (payload.number > 20) 
      return "bigger"
     else 
      return "lesser"
}

export const studentByNumber = (state) => {
    return state.studentByNumber
}