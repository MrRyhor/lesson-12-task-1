import { getObjById, addToList, removeFromList, updateObjInList } from '../helpers'
import { subjects } from '@/constants/data'

export default {
    namespaced: true,
    state: {
        teachersList: [
            { id: 1, name: 'John Wik', subjectId: 3 },
            { id: 2, name: 'Alice Johnson', subjectId: 5 },
            { id: 3, name: 'Bob Smith', subjectId: 2 },
            { id: 4, name: 'Eva Davis', subjectId: 8 },
            { id: 5, name: 'Michael Brown', subjectId: 1 },
            { id: 6, name: 'Sophia Miller', subjectId: 7 },
            { id: 7, name: 'David Wilson', subjectId: 4 },
            { id: 8, name: 'Olivia Anderson', subjectId: 9 },
            { id: 9, name: 'James Lee', subjectId: 6 },
            { id: 10, name: 'Emma Taylor', subjectId: 10 },
        ],
    },
    getters: {
        teachersList: ({ teachersList }) => teachersList,
        teacherById:
            ({ teachersList }) =>
            (teacherId) => {
                const obj = getObjById(teachersList, teacherId)
                return {
                    id: obj.id,
                    name: obj.name,
                    subjectId: getObjById(subjects, obj.subjectId).subject,
                    subId: getObjById(subjects, obj.subjectId).id,
                }
            },
        teachersListToDisplay: ({ teachersList }) =>
            teachersList.map(
                (teacher) =>
                    (teacher = {
                        id: teacher.id,
                        name: teacher.name,
                        subjectId: getObjById(subjects, teacher.subjectId).subject,
                    })
            ),
    },
    mutations: {
        addTeacher(state, teacherObj) {
            addToList(state.teachersList, teacherObj)
        },
        removeTeacher(state, teacherId) {
            state.teachersList = removeFromList(state.teachersList, teacherId)
        },
        updateTeacher(state, teacherObj) {
            updateObjInList(state.teachersList, teacherObj)
        },
    },
    actions: {
        addTeacher({ commit }, teacherObj) {
            addToList(subjects, { id: Date.now(), subject: teacherObj.subjectId })
            commit('addTeacher', {
                id: Date.now(),
                name: teacherObj.name,
                subjectId: subjects.find((sub) => sub.subject === teacherObj.subjectId).id,
            })
        },
        removeTeacher({ commit, dispatch }, teacherId) {
            commit('removeTeacher', teacherId)
            dispatch('asignments/deleteAsignmentbyTeacherId', teacherId, { root: true })
        },
        updateTeacher({ commit }, teacherObj) {
            const newSubjects = subjects.find((obj) => obj.id === teacherObj.subId)
            newSubjects.subject = teacherObj.subjectId
            commit('updateTeacher', {
                id: teacherObj.id,
                name: teacherObj.name,
                subjectId: teacherObj.subId,
            })
        },
    },
    modules: {},
}
