<template>
    <div>
        <el-form :model="bankForm" :rules="rules" ref="bankForm" label-position="right" label-width="80px">
            <el-form-item label="名称" prop="name">
                <el-input v-model="bankForm.name" placeholder="请输入题库名称"></el-input>
            </el-form-item>
            <el-form-item label="说明" prop="coment">
                <el-input type="textarea" :rows="5" v-model="bankForm.coment" placeholder="请输入题库说明"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click='submit("bankForm")'>提交</el-button>
            </el-form-item>
        </el-form>
    </div>
    
</template>

<script>
    export default {
        name: "EditBank",
        data () {
            return {
                bankForm: {
                    name: '',
                    coment: ''
                },
                rules: {
                    name:[
                        {required:true, message: '请输入题库名称', trigger: 'blur'},
                        {min: 6, max: 12, message: '长度在6到12个字符',trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submit (name) {
                this.$refs[name].validate(valid =>
                {
                    if(valid) {
                        this.axios.post('/sasa',this.bankForm)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    div {
        /*flex: auto;*/
        margin: 0 auto;
        /*text-align: center;*/
        vertical-align: center;
        width: 300px;
    }
</style>