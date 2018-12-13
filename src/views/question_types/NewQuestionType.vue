<template>
    <div>
        <div class="question_types">
            <div  v-for="qt in questionTypes" @dblclick="dbClickHandler(qt)">
                <div style="float:left;margin-left: 10px">
                    <el-tag
                            :key="qt.name"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(qt)" :title="qt.title">{{qt.name}}
                    </el-tag>
                </div>
            </div>
            <el-form v-if="true" :model="questionTypeForm" :rules="rules" ref="questionTypeForm" label-position="right" label-width="80px" :inline="true">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="questionTypeForm.name" placeholder="请输入题型名称"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="name">
                    <el-input v-model="questionTypeForm.title" placeholder="请输入题型标题"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click='submit("questionTypeForm")' size="mini">{{editMode?'保存题型':'新增题型'}}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click='cancel()' size="mini" v-if="editMode">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        name: "NewQuestionType",
        data () {
            return {
                editMode: false,
                editQuestionType: null,
                questionTypes: [
                    {
                        id: 1,
                        name: '计算题',
                        title:'计算题123'
                    }
                ],
                currentBankId: {},
                banks: [],
                questionTypeForm: {},
                rules: {
                    name:[
                        {required:true, message: '请输入题型名称', trigger: 'blur'},
                        {min: 2, message: '长度必须2个字符',trigger: 'blur'}
                    ],
                    bank_id:[
                        {required:true, message: '请选择题库名称', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            handleClose(qt) {
                this.questionTypes.splice(this.questionTypes.indexOf(qt), 1);
            },
            dbClickHandler (qt) {
                this.editMode = true
                this.editQuestionType = qt
                this.questionTypeForm = {...qt}
            },
            getBanks () {
                this.axios.get('/v1/banks').then(response => this.banks = response.data.data)
            },
            cancel () {
                this.editMode = false
                this.editQuestionType = null
                this.questionTypeForm = {}
            },
            submit () {
                if(this.editMode){
                    this.editQuestionType.name = this.questionTypeForm.name
                    this.editQuestionType.title = this.questionTypeForm.title
                } else {
                    this.questionTypes.push({
                        name: this.questionTypeForm.name,
                        title: this.questionTypeForm.title,
                    })
                }
                window.console.log(this.questionTypes)
                this.editMode = false
                this.editQuestionType = null
                this.questionTypeForm = {}
            }
        },
        mounted () {
            this.getBanks()
        }
    }
</script>

<style scoped>

</style>
