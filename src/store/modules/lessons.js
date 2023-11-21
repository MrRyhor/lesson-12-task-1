import { getObjById, addToList, removeFromList, updateObjInList } from '../helpers'
import { subjects, classesList } from '@/constants/data'

export default {
    namespaced: true,
    state: {
        lessonsList: [
            { id: 1, subjectId: 3, classId: 5 },
            { id: 2, subjectId: 2, classId: 4 },
            { id: 3, subjectId: 5, classId: 6 },
            { id: 4, subjectId: 1, classId: 3 },
            { id: 5, subjectId: 4, classId: 2 },
            { id: 6, subjectId: 6, classId: 1 },
            { id: 7, subjectId: 7, classId: 7 },
            { id: 8, subjectId: 9, classId: 8 },
            { id: 9, subjectId: 8, classId: 10 },
            { id: 10, subjectId: 10, classId: 9 },
        ],
    },
    getters: {
        lessonsList: ({ lessonsList }) => lessonsList,
        lessonById:
            ({ lessonsList }) =>
            (lessonId) => {
                const obj = getObjById(lessonsList, lessonId)
                return {
                    id: obj.id,
                    subjectId: getObjById(subjects, obj.subjectId).subject,
                    classId: getObjById(classesList, obj.classId).classTitle,
                    subId: getObjById(subjects, obj.subjectId).id,
                    clsId: getObjById(classesList, obj.classId).id,
                }
            },

        lessonsListToDisplay: ({ lessonsList }) =>
            lessonsList.map(
                (lesson) =>
                    (lesson = {
                        id: lesson.id,
                        subjectId: getObjById(subjects, lesson.subjectId).subject,
                        classId: getObjById(classesList, lesson.classId).classTitle,
                    })
            ),
    },
    mutations: {
        addLesson(state, lesson) {
            state.lessonsList.push(lesson)
        },
        removeLesson(state, lessonId) {
            state.lessonsList = removeFromList(state.lessonsList, lessonId)
        },
        updateLesson(state, lesson) {
            updateObjInList(state.lessonsList, lesson)
        },
    },
    actions: {
        addLesson({ commit }, lesson) {
            addToList(subjects, { id: Date.now(), subject: lesson.subjectId })
            addToList(classesList, { id: Date.now(), classTitle: lesson.classId })
            commit('addLesson', {
                id: Date.now(),
                subjectId: subjects.find((sub) => sub.subject === lesson.subjectId).id,
                classId: classesList.find((cls) => cls.classTitle === lesson.classId).id,
            })
        },
        removeLesson({ commit, dispatch }, lessonId) {
            commit('removeLesson', lessonId)
            dispatch('asignments/deleteAsignmentbyLessonId', lessonId, { root: true })
        },
        updateLesson({ commit }, lesson) {
            const newSubjects = subjects.find((obj) => obj.id === lesson.subId)
            newSubjects.subject = lesson.subjectId
            const newClasses = classesList.find((obj) => obj.id === lesson.clsId)
            newClasses.classTitle = lesson.classId
            commit('updateLesson', { id: lesson.id, subjectId: lesson.subId, classId: lesson.clsId })
        },
    },
    modules: {},
}
