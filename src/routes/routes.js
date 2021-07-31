import Home from '../components/Home';
import addStudent from '../components/Student/addStudent';
import addLessonStudent from '../components/Student/addLessonStudent';
import Students from '../components/Student/Students';



export const routes = [{
    path: '/',
    component: Home,
  },
  {
    path: '/addStudent',
    component: addStudent
  },
  {
    path: '/addLessonStudent',
    component: addLessonStudent
  },
  {
    path: '/students',
    component: Students
  },
  {
    path: '*',
    redirect: "/"
  }
];
