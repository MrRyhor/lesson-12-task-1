import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import TeachersView from '../views/TeachersView.vue'
import LessonsView from '../views/LessonsView.vue'
import ListEditor from '../components/ListEditor.vue'
import AsignmentsView from '../views/AsignmentsView.vue'


const routes = [
    {
        path: '/',
        name: 'main',
        component: MainView,
    },
    {
        path: '/teachers',
        name: 'teachers',
        component: TeachersView,
    },
    {
        path: '/lessons',
        name: 'lessons',
        component: LessonsView,
    },
    {
        path: '/asignments',
        name: 'asignments',
        component: AsignmentsView,
    },
    {
        path: '/lessons/create/:lessonId?',
        name: 'lessonCreate',
        component: ListEditor,
    },
    {
        path: '/teachers/create/:teacherId?',
        name: 'teacherCreate',
        component: ListEditor,
    },    
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
