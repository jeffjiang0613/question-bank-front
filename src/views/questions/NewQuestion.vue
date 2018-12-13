<template>
    <div>
        <el-container>
            <el-header>
                <div class="submitBox" @click="submit">
                    <el-select v-model="currentQuestion.currentBank">
                        <el-option v-for="bank in banks" :label="bank.name" :key="bank.id" :value="bank.id" :title="bank.coment">

                        </el-option>
                    </el-select>
                    <el-select v-model="currentQuestion.currentType">
                        <el-option v-for="t in types" :label="t.name" :key="t.id" :value="t.id" :title="t.name"></el-option>
                    </el-select>
                    <el-button>提交</el-button>
                    <div class="links">
                        <router-link to="/banks/new">题库</router-link>
                        <div></div>
                        <router-link to="/papers/new">出卷</router-link>
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

                    <Questions ref="myQuestions" v-on:changeCurrentQuestion="changeCurrentQuestion"></Questions>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import VueUeditorWrap from "vue-ueditor-wrap";
    import Questions from "@/components/Questions";
    export default {
        name: "NewQuestion",
        components: {Questions, VueUeditorWrap},
        data () {
            return {
                questions: [],
                currentQuestion: {
                  question: '',
                  answer: '',
                    currentBank: '',
                    currentType: ''
                },
                banks: [],
                types: [],
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
            changeCurrentQuestion (res) {
                this.currentQuestion = res
            },
            submit () {
                if(this.currentQuestion.id == undefined) {
                    this.axios.post('/v1/questions',this.currentQuestion).then(response => {
                        this.$message(response.data.data)
                    })
                } else {
                    this.axios.patch('/v1/questions',this.currentQuestion).then(response => {
                        this.$message(response.data.data)
                    })
                }
                this.$refs.myQuestions.getQuestions()
                this.currentQuestion = {}
            },
            getTypes () {
                this.types = [
                    {
                        id: 1,
                        name: '单选题'
                    },
                    {
                        id: 2,
                        name: '多选题'
                    }
                    ]
            },
            getBanks () {
                this.banks = [
                    {
                        id: '1',
                        name: '初中数学',
                        coment: '这是一套初中数学卷子'
                    },
                    {
                        id: '2',
                        name: '初中语文',
                        coment: '这是一套初中语文卷子'
                    }
                ]
            }
        },
        mounted () {
            this.getBanks();
            this.getTypes();
            this.$on('changeCurrentQuestion',question => {
                this.currentQuestion = question
            })
            // this.axios.get('/v1/questions').then(response => {
            //     this.questions = response.data
            // }).catch(response => {
            //     response
            // })
            // this.currentBank = this.banks[0];
            // this.currentType = this.types[0];
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
