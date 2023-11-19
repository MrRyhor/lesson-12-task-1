<template>
    <div class="list-container">
        <div v-if="getList.length">
            <div v-for="item in getList" :key="item.id" class="item-container">
                <div v-if="isMatchToTeacherPath" class="inputs-container">
                    <div>{{ item.name }}</div>
                    <div class="container">{{ item.subjectId }}</div>
                </div>
                <div v-else class="inputs-container">
                    <div>{{ item.subjectId }}</div>
                    <div class="container">{{ item.classId }}</div>
                </div>                
                <div class="btns-container">
                    <button type="button" @click="onEditAction(item.id)">Edit</button>
                    <button type="button" @click="onDeleteAction(item.id)">Delete</button>
                </div>
            </div>
            <button type="button" class="add-button" @click="onAddAction">Add</button>
        </div>
        <div v-else class="no-results">No Results</div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'ListViewer',

    computed: {
        ...mapGetters('teachers', ['teachersListToDisplay']),
        ...mapGetters('lessons', ['lessonsListToDisplay']),
        ...mapGetters('asignments', ['asignmentsListToDisplay']),
        isMatchToTeacherPath() {
            return this.$route.path === '/teachers'
        },
        
        getList() {
            if (this.isMatchToTeacherPath) return this.teachersListToDisplay
            return this.lessonsListToDisplay            
        },
    },
    methods: {
        ...mapActions('teachers', ['removeTeacher']),
        ...mapActions('lessons', ['removeLesson']),
        
        onAddAction() {
            if (this.isMatchToTeacherPath) return this.$router.push({ name: 'teacherCreate' })
            return this.$router.push({ name: 'lessonCreate' })            
        },
        onEditAction(id) {
            if (this.isMatchToTeacherPath)
                return this.$router.push({
                    name: 'teacherCreate',
                    params: {
                        teacherId: id,
                    },
                })
            return this.$router.push({
                name: 'lessonCreate',
                params: {
                    lessonId: id,
                },
            })
        },
        onDeleteAction(id) {
            if (this.isMatchToTeacherPath) return this.removeTeacher(id)
            return this.removeLesson(id)
            
        },
    },
}
</script>
<style lang="scss" scoped>
.list-container {
    max-width: 1000px;
    padding: 20px;
    & .add-button {
        margin-top: 20px;
        cursor: pointer;
    }
    & .add-button:hover {
        background-color: rgb(54, 54, 54);
        color: #fff;
    }

    & .btns-container {
        display: flex;
        gap: 5px;

        & > button {
            cursor: pointer;
        }

        & > button:hover {
            background-color: rgb(54, 54, 54);
            color: #fff;
        }
    }

    & .item-container {
        margin-top: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1000px;

        & .inputs-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 200px;
        }

        & .container {
            margin-left: auto;
        }
    }

    & .no-results {
    }
}
</style>
