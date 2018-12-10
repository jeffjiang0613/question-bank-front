<template>
    <div>
        <el-container>
            <el-header>
                <div class="submitBox" @click="submit">
                    <el-select v-model="currentBank">
                        <el-option v-for="bank in banks" :label="bank.name" :key="bank.id" :value="bank.id" :title="bank.coment">

                        </el-option>
                    </el-select>
                    <el-select v-model="currentType">
                        <el-option v-for="t in types" :label="t.name" :key="t.id" :value="t.id" :title="t.name"></el-option>
                    </el-select>
                    <el-button>提交</el-button>
                </div>
            </el-header>
            <el-main>
                <div class="questionBox">

                    <el-form label-position="left" label-width="40px">
                        <el-form-item label="题目">
                            <vue-ueditor-wrap v-model="question" :config="questionConfig"></vue-ueditor-wrap>
                        </el-form-item>
                        <el-form-item label="答案">
                            <vue-ueditor-wrap v-model="answer" :config="questionConfig"></vue-ueditor-wrap>
                        </el-form-item>
                    </el-form>
                </div>

                <div class="papers">
                    <!--<div v-for="q in questions" :key="q">-->
                        <!--<div type="color:red">{{q.id}}</div>-->
                        <!--<div v-html="q.question"></div>-->
                        <!--<div v-html="q.answer"></div>-->
                    <!--</div>-->

                    <Papers></Papers>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import VueUeditorWrap from "vue-ueditor-wrap";
    import Papers from "../../components/Papers";
    export default {
        name: "NewQuestion",
        components: {Papers, VueUeditorWrap},
        data () {
            return {
                questions: [],
                question: '',
                answer: '',
                currentBank: {},
                banks: [],
                currentType: {},
                types: [],
                questionConfig: {
                    autoHeightEnabled: false,
                    initialFrameHeight: '320',
                    // initialFrameWidth: '100%',
                    // autoHeight: true,
                    serverUrl: 'http://localhost:8081/v1/ueditors',
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
            submit () {
                // this.axios.post('/question',{
                //     question: this.question,
                //     answer: this.answer
                // })
                this.questions.push({
                    id: this.questions.length+1,
                    question:this.question,
                    answer: this.answer
                })
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
        white-space:normal;
        word-break:break-all;
        word-wrap:break-word;
        /*background-color: red;*/
    }
</style>
