<template>
    <el-table
            :data="banks"
            style="width: 100%">
        <el-table-column
                prop="id"
                label="序号"
                width="60">
        </el-table-column>
        <el-table-column
                prop="name"
                label="名称"
                width="180">
        </el-table-column>
        <el-table-column
                prop="coment"
                label="说明">
        </el-table-column>
        <el-table-column
                prop="coment"
                label="说明"
                width="100">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="handleEdit(scope)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini"  circle @click="handleDelete(scope)"></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "Banks",
        data () {
            return {
                banks: []
            }
        },
        methods: {
          getBanks () {
              this.axios.get('/v1/banks').then(response => {
                  this.banks = response.data.data
              })
          },
          handleEdit (scope) {
            this.$confirm('编辑该题库, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=> {
                this.$emit('editBank',scope.row)
            }).catch(()=> {
            })
        },
        handleDelete(scope) {
            this.$confirm('删除题库, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.delete(`/v1/banks/${scope.row.id}`).then(this.getBanks()).catch(response => this.$message.error(response.data.message))
            }).catch(()=> {

            })
          }
        },
        mounted () {
            this.getBanks()
        }
    }
</script>

<style scoped>

</style>
