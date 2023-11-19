<template>
    <asignments-selector />    
    <div class="asignments-list">
        <div v-if="asignmentsListToDisplay.length">
            <div v-for="asignment in asignmentsListToDisplay" :key="asignment.id" class="asignment">
                <div class="asignment-titles">
                    <div>{{ asignment.teacherId.name }}</div>
                    <div>{{ asignment.lessonId.subjectId }}</div>
                    <div>{{ asignment.lessonId.classId }}</div>
                </div>
                <div class="btns-container">
                    <button type="button" @click="removeAsignment(asignment.id)">Delete</button>
                </div>
            </div>
        </div>

        <div v-else class="no-results">No Results</div>
    </div>
</template>
<script>
import AsignmentsSelector from '../components/AsignmentsSelector.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'AsignmentsList',

    components: { AsignmentsSelector },

    computed: {
        ...mapGetters('asignments', ['asignmentsListToDisplay']),        
    },

    methods: {
        ...mapActions('asignments', ['removeAsignment']),
       
    },
}
</script>
<style lang="scss" scoped>
.asignments-list {
    max-width: 1000px;
    margin-top: 30px;

    & .asignment {
        margin-top: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        & .btns-container {
            display: flex;
            gap: 5px;
        }
    }

    & .asignment-titles {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 200px;
    }

    & .add-button {
        margin-top: 20px;
    }
}
</style>
