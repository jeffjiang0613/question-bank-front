<template>
    <div>
        <el-container>
            <el-header>
                <div class="submitBox">
                    <el-select v-model="currentQuestion.bank_id" @change="changeBank">
                        <el-option v-for="bank in banks" :label="bank.name" :key="bank.id" :value="bank.id" :title="bank.coment">

                        </el-option>
                    </el-select>
                    <el-select v-model="currentQuestion.type_id">
                        <el-option v-for="t in questionTypes" :label="t.name" :key="t.id" :value="t.id" :title="t.name"></el-option>
                    </el-select>
                    <el-button @click="submit">{{editMode?"保存":"新增"}}</el-button>
                    <el-button @click="cancel" v-if="editMode">取消</el-button>
                    <div class="links">
                        <router-link to="/banks/new">题库</router-link>
                        <div></div>
                        <el-dialog :visible.sync="gernerateMode">
                            <Papers></Papers>
                        </el-dialog>
                        <el-button @click="gernerateMode = true">出卷</el-button>
                    </div>
                </div>
            </el-header>
            <el-main>
                <div class="questionBox">

                    <el-form label-position="left" label-width="40px">
                        <el-form-item label="题目">
                            <vue-ueditor-wrap v-model="currentQuestion.question" :config="questionConfig"></vue-ueditor-wrap>
                        </el-form-item>
                        <el-form-item label="答案">
                            <vue-ueditor-wrap v-model="currentQuestion.answer" :config="questionConfig"></vue-ueditor-wrap>
                        </el-form-item>
                    </el-form>
                </div>

                <div class="papers">
                    <!--<div v-for="q in questions" :key="q">-->
                        <!--<div type="color:red">{{q.id}}</div>-->
                        <!--<div v-html="q.question"></div>-->
                        <!--<div v-html="q.answer"></div>-->
                    <!--</div>-->

                    <Questions ref="myQuestions" @changeCurrentQuestion="changeCurrentQuestion"></Questions>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import VueUeditorWrap from "vue-ueditor-wrap";
    import Questions from "@/components/Questions";
    import Papers from "../../components/Papers";
    export default {
        name: "NewQuestion",
        components: {Papers, Questions, VueUeditorWrap},
        data () {
            return {
                gernerateMode: false,
                questions: [],
                currentQuestion: {
                    question: '',
                    answer: '',
                    bank_id: '',
                    type_id: ''
                },
                banks: [],
                questionTypes: [],
                editMode: false,
                questionConfig: {
                    autoHeightEnabled: false,
                    initialFrameHeight: '320',
                    // initialFrameWidth: '100%',
                    // autoHeight: true,
                    serverUrl: '/v1/ueditors',
                    UEDITOR_HOME_URL: '/UEditor/',
                    toolbars: [[
                        'source','bold', 'italic', 'underline', 'strikethrough',
                         'removeformat', 'formatmatch', 'pasteplain', '|', 'forecolor', 'backcolor',  '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                        'simpleupload', 'insertimage', 'scrawl'
                    ]]
                }
            }
        },
        methods: {
            clear () {
                this.currentQuestion.question = ''
                this.currentQuestion.answer = ''
                this.currentQuestion.id = undefined
            },
            changeBank () {
                this.getQuestionTypes(this.currentQuestion.bank_id)
            },
            changeCurrentQuestion (res) {
                window.console.log(res)
                this.editMode = true
                this.currentQuestion = {...res}
                this.getQuestionTypes(res.bank_id)
            },
            submit () {
                if(this.currentQuestion.id == undefined) {
                    this.axios.post('/v1/questions',{...this.currentQuestion}).then(response => {
                        this.$message.success(response.data.data)
                        this.$refs.myQuestions.getFirstPageQuestions()
                    }).catch(response => this.$message.error(response.data.message))
                } else {
                    this.axios.patch('/v1/questions',{...this.currentQuestion}).then(response => {
                        this.$message.success(response.data.data)
                        this.$refs.myQuestions.getFirstPageQuestions()
                    }).catch(response => this.$message.error(response.data.message))
                }
                this.clear()
                this.editMode = false
            },
            cancel () {
                this.editMode = false
                this.clear()
            },
            getBanks () {
                this.axios.get('/v1/banks').then(response => this.banks = response.data.data)
            },
            getQuestionTypes (bank_id) {
                this.axios.get('/v1/question_types/'+bank_id).then(response => this.questionTypes = response.data.data)
            }
        },
        mounted () {
            this.getBanks()
            this.getQuestionTypes()
            this.$on('changeCurrentQuestion',question => {
                this.currentQuestion = question
            })
        }
    }
</script>

<style scoped>
    .questionBox{
        width: 45%;
        float: left;
        /*display: inline;*/
        /*height: 800px;*/
        /*background: red;*/
    }
    .submitBox {
        /*float: left;*/
        /*width: 10%;*/
        /*height: 300px;*/
        /*margin: 0 auto;*/
        /*vertical-align: center;*/
    }
    .papers {
        margin-left: 5%;
        text-align: left;
        float: left;
        width: 50%;
        height: 800px;
        white-space:normal;
        word-break:break-all;
        word-wrap:break-word;
        overflow-x: hidden;
        overflow-y: auto;
        /*background-color: red;*/
    }
    .papers::-webkit-scrollbar{
        display: none;
    }
    .links {
        float: right;
    }
</style>
