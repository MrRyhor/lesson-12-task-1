import { addToList, getObjById, removeFromList } from '../helpers'

export default {
    namespaced: true,
    state: {
        asignmentsList: [
            { id: 1, lessonId: 2, teacherId: 5 },
            { id: 2, lessonId: 4, teacherId: 7 },
            { id: 3, lessonId: 1, teacherId: 3 },
            { id: 4, lessonId: 6, teacherId: 2 },
            { id: 5, lessonId: 3, teacherId: 1 },
            { id: 6, lessonId: 5, teacherId: 6 },
            { id: 7, lessonId: 7, teacherId: 4 },
        ],
        selectTeacher: null,
        selectLesson: null,
    },
    getters: {
        selectTeacher: ({ selectTeacher }) => selectTeacher,
        selectLesson: ({ selectLesson }) => selectLesson,
        asignmentsListToDisplay: (state, getters, rootState, rootGetters) => {
            const lessons = rootGetters['lessons/lessonsListToDisplay']
            const teachers = rootGetters['teachers/teachersListToDisplay']
            const list = state.asignmentsList.map(
                (asignment) =>
                    (asignment = {
                        id: asignment.id,
                        lessonId: getObjById(lessons, asignment.lessonId),
                        teacherId: getObjById(teachers, asignment.teacherId),
                    })
            )
            return list
        },
    },
    mutations: {
        setSelectTeacher(state, val) {
            state.selectTeacher = val
        },
        setSelectLesson(state, val) {
            state.selectLesson = val
        },
        removeAsignment(state, asignmentId) {
            state.asignmentsList = removeFromList(state.asignmentsList, asignmentId)
        },
        addAsignment(state, obj) {
            addToList(state.asignmentsList, obj)
        },
        deleteAsignmentbyTeacherId(state, teacherId) {
            state.asignmentsList = state.asignmentsList.filter(asignment => asignment.teacherId !== teacherId)
        },
        deleteAsignmentbyLessonId(state, lessonId) {
            state.asignmentsList = state.asignmentsList.filter((asignment) => asignment.lessonId !== lessonId)
            
        },
    },
    actions: {
        setSelectTeacher({ commit }, val) {
            commit('setSelectTeacher', val)
        },
        setSelectLesson({ commit }, val) {
            commit('setSelectLesson', val)
        },
        addAsignment({ commit, state, rootGetters }) {
            const teachers = rootGetters['teachers/teachersList']
            const lessons = rootGetters['lessons/lessonsList']
            const findTeacher = teachers.find((teacher) => teacher.id === state.selectTeacher)
            const findLesson = lessons.find((lesson) => lesson.subjectId === state.selectLesson)
            commit('addAsignment', {
                id: Date.now(),
                lessonId: findLesson.id,
                teacherId: findTeacher.id,
            })
        },
        removeAsignment({ commit }, asignmentById) {
            commit('removeAsignment', asignmentById)
        },
        deleteAsignmentbyTeacherId({ commit }, teacherId) {
            commit('deleteAsignmentbyTeacherId', teacherId)
        },
        deleteAsignmentbyLessonId({ commit }, lessonId) {
            commit('deleteAsignmentbyLessonId', lessonId)
        },
    },
    modules: {},
}


 
        