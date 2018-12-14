<template>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <el-card class="box-card" v-for="question in questions">
            <div>
                {{question.id}}
            </div>
            <div v-html="question.question">

            </div>
            <hr class="splitline"/>
            <div v-html="question.answer">
            </div>
            <hr class="splitline"/>
            <div>
                <div class="operateBar" style="float: left">
                    <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="handleEdit(question)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini"  circle @click="handleDelete(question.id)"></el-button>
                </div>
                <div style="float: right">
                    <el-tag type="info">{{question.bank_name}}</el-tag>
                    <el-tag type="info">{{question.type_name}}</el-tag>
                </div>
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
                busy: false,
            }
        },
        methods: {
            loadMore () {
                this.busy = true
                setTimeout(()=>{
                    this.getQuestions();
                    this.page ++
                    // this.busy = false
                },500)
            },
            getQuestions () {
              this.axios.get(`/v1/questions?page=${this.page}`).then(response => {
                  let res = response.data.data
                  if(this.page == 0){
                      this.questions = res.questions
                  } else {
                      if(this.page >= (res.page_count)){
                          this.busy = true
                      } else {
                          this.busy = false
                      }
                      this.questions = this.questions.concat(res.questions)
                  }
              })
            },
            getFirstPageQuestions () {
                this.page = 0
                this.busy = false
                this.getQuestions()
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
                    this.axios.delete(`/v1/questions/${id}`).then(()=>{
                        this.getFirstPageQuestions()
                    }).catch(response => this.$message.error(response.data.message))
                }).catch(()=> {

                })

            },
        },
        mounted () {
            // this.getQuestions()
        }
    }
</script>

<style scoped>

</style>
