<template>
    <h1>Add to list</h1>
    <div class="selector-container">
        <div>
            <h3>Teacher:</h3>
            <select v-model="selectTeacherVal">
                <option v-for="option in teachersList" :key="option.id" :value="option.id">{{ option.name }}</option>
            </select>
        </div>
        <div>
            <h3>Lessons:</h3>
            <select v-model="selectLessonVal">
                <option v-for="option in subjects" :key="option.id" :value="option.id">{{ option.subject }}</option>
            </select>
        </div>
    </div>
</template>
<script>
import { subjects } from '../constants/data'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'AsignmentsSelector',

    data() {
        return {
            asignmentSelectObj: {},
        }
    },

    computed: {
        ...mapGetters('teachers', ['teachersList']),
        ...mapGetters('asignments', ['selectTeacher', 'selectLesson']),
        subjects() {
            return subjects
        },
        selectTeacherVal: {
            get() {
                return this.selectTeacher
            },
            set(val) {
                return this.setSelectTeacher(val)
            },
        },
        selectLessonVal: {
            get() {
                return this.selectLesson
            },
            set(val) {
                return this.setSelectLesson(val)
            },
        },
    },

    methods: {
        ...mapActions('asignments', ['setSelectTeacher', 'setSelectLesson']),
    },
}
</script>
<style lang="scss" scoped>
.selector-container {
    display: flex;
    align-items: center;
    gap: 20px;
}
</style>
