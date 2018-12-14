<template>
    <div>
        <el-select v-model="bank_id" @change="changeBank" label="请选择题型">
            <el-option v-for="bank in banks" :label="bank.name" :key="bank.id" :value="bank.id" :title="bank.coment">
            </el-option>
        </el-select>
        <el-form v-model="questionTypeForm" ref="questionTypeForm" inline>
            <el-form-item v-for="questionType in questionTypes" :label="questionType.name" :title="questionType.title" prop="questionTypeForm[questionType.id]">
                <el-input-number v-model="questionTypeForm[questionType.id]" :min="1" :max="20"></el-input-number>
            </el-form-item>
        </el-form>

        <el-button type="primary" @click="submit">出卷</el-button>
    </div>
</template>

<script>
    export default {
        name: "Papers",
        data () {
            return {
                bank_id: '',
                banks: [],
                questionTypes: [],
                questionTypeForm: {}
            }
        },
        methods: {
            getBanks () {
                this.axios.get('/v1/banks').then(response => {
                    this.banks = response.data.data
                })
            },
            getQuestionTypes () {
                this.axios.get('/v1/question_types/'+this.bank_id).then(response => this.questionTypes = response.data.data)
            },
            changeBank () {
                this.getQuestionTypes()
                this.questionTypeForm = {}
            },
            submit () {
                window.console.log(this.questionTypeForm)
                this.axios.post('/v1/papers',{
                    datas: Object.keys(this.questionTypeForm).map(key=>{
                    return {
                        id: String(key),
                        count: this.questionTypeForm[key] ? Number(this.questionTypeForm[key]):0
                    }
                    })
                })

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
