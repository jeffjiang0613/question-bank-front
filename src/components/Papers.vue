<template>
    <el-table :data="questions">
        <el-table-column label="题号" prop="id" width="60">
        </el-table-column>
        <el-table-column label="内容" prop="content">
        </el-table-column>
        <el-table-column label="操作" width="100">
            <template slot-scope="{scope}">
                <span>{{scope}}</span>
                <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="handleEdit(scope)"></el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleEdit(scope)"></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
    export default {
        name: "Papers",
        data () {
            return {
                questions:[
                    {
                        id: 9999,
                        content: 'sasaa'
                    },
                    {
                        id: 9998,
                        content: '你好飒飒'
                    }

                ]
            }
        },
        methods: {
            handleEdit (scope) {
                alert(scope.index)
            }
        }
    }
</script>

<style scoped>

</style>