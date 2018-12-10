<template>
    <div>
        <el-card class="box-card" v-for="question in questions">
            <div class="title">
                {{question.id}}
            </div>
            <hr class="splitline"/>
            <div class="question">
                {{question.question}}
            </div>
            <hr class="splitline"/>
            <div class="answer">
                {{question.answer}}
            </div>
            <hr class="splitline"/>
            <div class="operateBar">
                <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="handleEdit(question.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini"  circle @click="handleDelete(question.id)"></el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        name: "Papers",
        data () {
            return {
                questions:[
                    {
                        id: 9999,
                        question: 'saaaaaaaaaaaaaaaaaaaa',
                        answer: 'ewefwwefw'
                    },
                    {
                        id: 9998,
                        question: 'efweeeeeeeeeeeeeeee',
                        answer: 'sasaa'
                    }

                ]
            }
        },
        methods: {
            handleEdit (id) {
                alert(id)
            },
            handleDelete(id) {
                alert(id)
            }
        }
    }
</script>

<style scoped>
    .splitline {

    }

</style>
