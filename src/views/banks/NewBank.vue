<template>
    <div>
        <div class="banks">
            <Banks ref="myBanks" @editBank="handleEditBank"></Banks>
        </div>
        <div class="newBank">
            <el-form :model="bankForm" :rules="bankFormRules" ref="bankForm" label-position="right" label-width="80px">
                <el-form-item label="ID" prop="id" v-if="editBankMode">
                    <el-input v-model="bankForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="bankForm.name" placeholder="请输入题库名称"></el-input>
                </el-form-item>
                <el-form-item label="说明" prop="coment">
                    <el-input type="textarea" :rows="5" v-model="bankForm.coment" placeholder="请输入题库说明"></el-input>
                </el-form-item>
                <el-form-item  label="题型">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <div  v-for="qt in questionTypes" @dblclick="dbClickHandler(qt)" style="display: inline;margin-left: 10px">
                                <el-tag
                                        :key="qt.name"
                                        closable
                                        :disable-transitions="false"
                                        @close="handleClose(qt)" :title="qt.title+'-'+qt.sort">{{qt.name}}
                                </el-tag>
                            </div>
                        </div>
                        <el-form v-if="true" :model="questionTypeForm" :rules="questionTypeFormRules" ref="questionTypeForm" label-position="right" label-width="80px" :inline="true">
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="questionTypeForm.name" placeholder="请输入题型名称"></el-input>
                            </el-form-item>
                            <el-form-item label="标题" prop="name">
                                <el-input v-model="questionTypeForm.title" placeholder="请输入题型标题"></el-input>
                            </el-form-item>
                            <el-form-item label="出题顺序" prop="sort">
                                <el-input v-model="questionTypeForm.sort" placeholder="请输入顺序号（数字越小优先级越高）" type="number"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click='questionTypeFormSubmit("questionTypeForm")' size="mini">{{editMode?'保存题型':'新增题型'}}</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click='questionTypeFormCancel()' size="mini" v-if="editMode">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-form-item>
                <el-form-item>
                    <el-button @click='submit("bankForm")'>{{editBankMode?"保存":"新增"}}</el-button>
                    <el-button @click='cancel("bankForm")' v-if="editBankMode">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Banks from '@/components/Banks'
    export default {
        name: "NewBank",
        components: {Banks},
        data () {
            return {
                bankForm: {
                    name: '',
                    coment: ''
                },
                bankFormRules: {
                    name:[
                        {required:true, message: '请输入题库名称', trigger: 'blur'},
                        {min: 2, message: '长度必须2个字符',trigger: 'blur'}
                    ]
                },
                editBankMode: false,
                editMode: false,
                editQuestionType: null,
                questionTypes: [
                ],
                currentBankId: {},
                banks: [],
                questionTypeForm: {},
                questionTypeFormRules: {
                    name:[
                        {required:true, message: '请输入题型名称', trigger: 'blur'},
                        {min: 2, message: '长度必须2个字符',trigger: 'blur'}
                    ],
                    bank_id:[
                        {required:true, message: '请选择题库名称', trigger: 'blur'},
                    ],
                    sort:[
                        {required:true, message: '请输入出题顺序', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            getBank (bankId) {
                this.axios.get('/v1/banks/'+bankId).then(response => {
                    let bank = response.data.data
                    this.bankForm = {
                        name: bank.name,
                        coment: bank.coment
                    }
                    if (bank.id !== undefined) {
                        this.bankForm.id = bank.id
                    }
                    this.questionTypes = bank.question_types
                }).catch(response => this.$message.error(response.data.message))
            },
            handleClose(qt) {
                this.questionTypes.splice(this.questionTypes.indexOf(qt), 1);
            },
            handleEditBank (bank) {
                this.editBankMode = true
              this.getBank(bank.id)
            },
            dbClickHandler (qt) {
                this.editMode = true
                this.editQuestionType = qt
                this.questionTypeForm = {...qt}
            },
            questionTypeFormCancel () {
                this.editMode = false
                this.editQuestionType = null
                this.questionTypeForm = {}
            },
            questionTypeFormSubmit () {
                if(this.editMode){
                    this.editQuestionType.name = this.questionTypeForm.name
                    this.editQuestionType.title = this.questionTypeForm.title
                    this.editQuestionType.sort = Number(this.questionTypeForm.sort)
                } else {
                    this.questionTypes.push({
                        name: this.questionTypeForm.name,
                        title: this.questionTypeForm.title,
                        sort: Number(this.questionTypeForm.sort)
                    })
                }
                this.editMode = false
                this.editQuestionType = null
                this.questionTypeForm = {}
            },
            clearBankForm () {
                this.editMode = false
                this.editBankMode = false
                this.bankForm = {
                    name: '',
                    coment: ''
                }
                this.questionTypes = []
            },
            cancel () {
              this.clearBankForm()
            },
            submit (name) {
                this.$refs[name].validate(valid =>
                {
                    if(valid) {
                        if(this.bankForm.id == undefined) {
                            this.axios.post('/v1/banks',{
                                name: this.bankForm.name,
                                coment: this.bankForm.coment,
                                question_types: this.questionTypes
                            }).then(response => {
                                this.$message.success(response.data.data)
                                this.clearBankForm()
                                this.$refs.myBanks.getBanks()
                            }).catch(response => this.$message.error(response.data.message))
                        } else {
                            this.axios.patch('/v1/banks',{
                                id: this.bankForm.id,
                                name: this.bankForm.name,
                                coment: this.bankForm.coment,
                                question_types: this.questionTypes
                            }).then(response => {
                                this.$message.success(response.data.data)
                                this.clearBankForm()
                                this.$refs.myBanks.getBanks()
                            }).catch(response => this.$message.error(response.data.message))
                        }
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .banks {
        float: left;
        width: 50%;
        height: max-content;
    }
    /*div {*/
        /*!*flex: auto;*!*/
        /*margin: 0 auto;*/
        /*!*text-align: center;*!*/
        /*vertical-align: center;*/
        /*width: 300px;*/
    /*}*/
    .newBank {
        float: left;
        width: 50%;
        height: max-content;
    }
    .question_types {
        margin-left: 5%;
    }
</style>
