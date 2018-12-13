<template>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <el-card class="box-card" v-for="question in questions">
            <div class="title">
                {{question.id}}
            </div>
            <hr class="splitline"/>
            <div v-html="question.question">

            </div>
            <hr class="splitline"/>
            <div v-html="question.answer">
            </div>
            <hr class="splitline"/>
            <div class="operateBar">
                <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="handleEdit(question)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini"  circle @click="handleDelete(question.id)"></el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        name: "Questions",
        data () {
            return {
                questions: [],
                page:0,
            }
        },
        methods: {
            loadMore:function () {
                this.page ++
                this.busy=true;
                this.loadingShow =true
                setTimeout(()=>{
                    this.getQuestionsByPages(true);
                    this.loadingShow = false
                },500)
            },
            getQuestions () {
                this.page = 0
              this.axios.get(`/v1/questions?page=${this.page}`).then(response => this.questions = response.data.data)
            },
            getQuestionsByPages () {
                this.axios.get(`/v1/questions?page=${this.page}`).then(response => this.questions =this.questions.concat(response.data.data))
            },
            handleEdit (question) {
                this.$confirm('编辑该问题, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=> {
                    this.$emit('changeCurrentQuestion',question)
                }).catch(()=> {

                })
            },
            handleDelete(id) {
                this.$confirm('删除问题, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=> {
                    this.axios.delete(`/v1/questions/${id}`).then(this.getQuestions).catch(response => this.$message.error(response.data.message))
                }).catch(()=> {

                })

            }
        },
        mounted () {
            this.getQuestions()
        }

    }
</script>

<style scoped>

</style>
