import { createStore } from 'vuex'
import teachers from './modules/teachers'
import lessons from './modules/lessons'
import asignments from './modules/asignments'

export default createStore({
    modules: {
        teachers,
        lessons,
        asignments,
    },
})
