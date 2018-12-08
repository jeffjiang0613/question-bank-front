<template>
    <div>
        <div class="questionBox">
            <el-form label-position="left" label-width="50px">
                <el-form-item label="题目">
                    <vue-ueditor-wrap v-model="question" :config="questionConfig"></vue-ueditor-wrap>
                </el-form-item>
                <el-form-item label="答案">
                    <vue-ueditor-wrap v-model="answer" :config="questionConfig"></vue-ueditor-wrap>
                </el-form-item>
            </el-form>
        </div>
        <div class="submitBox" @click="submit">
            <el-select v-model="currentBank">
                <el-option v-for="bank in banks" :label="bank.name" :key="bank.id" :value="bank.id" :title="bank.coment">

                </el-option>
            </el-select>
            <el-button>提交</el-button>
        </div>
        <div class="papers">
            <div v-html="question"></div>
        </div>
    </div>
</template>

<script>
    import VueUeditorWrap from "vue-ueditor-wrap";
    export default {
        name: "NewQuestion",
        components: {VueUeditorWrap},
        data () {
            return {
                question: '',
                answer: '',
                currentBank: {},
                banks: [
                    {
                        key: '1',
                        value: '1',
                        label: '11111'
                    }
                ],
                questionConfig: {
                    autoHeightEnabled: false,
                    initialFrameHeight: '320',
                    // initialFrameWidth: '100%',
                    // autoHeight: true,
                    serverUrl: 'http://35.201.165.105:8000/controller.php',
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
                this.axios.post('/question',{
                    question: this.question,
                    answer: this.answer
                })
            },
            getBanks () {
                this.banks = [
                    {
                        id: '1',
                        name: '初中数学',
                        label: '这是一套初中数学卷子'
                    },
                    {
                        id: '2',
                        name: '初中语文',
                        label: '这是一套初中语文卷子'
                    }
                ]
            }
        },
        mounted () {
            this.getBanks();
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
        float: left;
        width: 10%;
        /*height: 300px;*/
        /*margin: 0 auto;*/
        /*vertical-align: center;*/
    }
    .papers {
        text-align: left;
        float: right;
        width: 45%;
        /*background-color: red;*/
    }
</style>