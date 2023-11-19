<template>
    <div class="editor-container">
        <label
            >{{ labelFirst }}
            <input v-if="isMatchURL" v-model="teacherObj.name" type="text" />            
            <input v-else v-model="lessonObj.subjectId" type="text" />            
        </label>
        <label
            >{{ labelSecond }}
            <input v-if="isMatchURL" v-model="teacherObj.subjectId" type="text" />
            <input v-else v-model="lessonObj.classId" type="text" />
        </label>
        <button type="button" @click = "onSaveOrCreateBtnAction">{{ buttonText }}</button>
        <button type="button" @click="onCancelAction">Cancel</button>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'ListEditor',

    data() {
        return {
            teacherObj: {},
            lessonObj: {},
        }
    },
    computed: {
        ...mapGetters('teachers', ['teacherById']),
        ...mapGetters('lessons', ['lessonById']),
        isMatchURL() {
            return this.$route.path === '/teachers/create' || this.$route.params.teacherId
        },
        isMatchParams() {
            return this.$route.params.teacherId || this.$route.params.lessonId
        },
        isMatchTeacherURL() {
            return this.$route.path === '/teachers/create'
        },
        buttonText() {
            return this.isMatchParams ? 'Save' : 'Create'
        },
        labelFirst() {
            return this.isMatchURL ? 'Teacher name' : 'Lesson title'
        },
        labelSecond() {
            return this.isMatchURL ? 'Lesson title' : 'Class title'
        },
    },

    created() {
        if (this.$route.params.teacherId)
            this.teacherObj = { ...this.teacherById(this.$route.params.teacherId) }
        if (this.$route.params.lessonId) this.lessonObj = { ...this.lessonById(this.$route.params.lessonId) }
    },
    methods: {
        ...mapActions('teachers', ['addTeacher', 'updateTeacher']),
        ...mapActions('lessons', ['addLesson', 'updateLesson']),
        onCancelAction() {
            this.isMatchURL ? this.$router.push({ name: 'teachers' }) : this.$router.push({ name: 'lessons' })
        },
        onSaveOrCreateBtnAction() {
            if (this.isMatchTeacherURL) this.addTeacher(this.teacherObj)
            else if (this.$route.params.teacherId) this.updateTeacher(this.teacherObj)
            else if (this.$route.params.lessonId) this.updateLesson(this.lessonObj)
            else this.addLesson(this.lessonObj)

            if(this.isMatchURL) this.$router.push({name: 'teachers'})
            else this.$router.push({name: 'lessons'})
        },
    },
}
</script>
<style lang="scss" scoped>
    .editor-container{

        &>button{
            cursor: pointer;
        }

        & > button:hover {
            background-color: rgb(54, 54, 54);
            color: #fff;
        }
    }
</style>
