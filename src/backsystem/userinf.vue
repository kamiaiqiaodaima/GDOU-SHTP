<template>
    <div>
        <el-row>
            <h3 style="float:left;margin-left:10px">用户信息</h3>
        </el-row>

        <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        :data="tableData"
        @selection-change="handleSelectionChange"
        style="width: 100%;padding-left:50px;margin-top:20px;">

        <el-table-column
        type="selection"
        width="150">
        </el-table-column>

        <el-table-column
        label="用户名"
        width="250">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper" >
                <el-tag size="medium">{{ scope.row.USER_NAME}}</el-tag>
            </div>
        </template>
        </el-table-column>
        <el-table-column
        label="学号"
        width="250">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper" >
                <el-tag size="medium">{{ scope.row.USER_SNO}}</el-tag>
            </div>
        </template>
        </el-table-column>
        <el-table-column
        label="宿舍"
        width="250">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper" >
                <el-tag size="medium">{{ scope.row.USER_DORM}}</el-tag>
            </div>
        </template>
        </el-table-column>
        <el-table-column
        label="班级"
        width="250">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper" >
                <el-tag size="medium">{{ scope.row.USER_CLASS}}</el-tag>
            </div>
        </template>
        </el-table-column>
        <el-table-column
        label="联系电话"
        width="250">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper" >
                <el-tag size="medium">{{ scope.row.USER_PHONE}}</el-tag>
            </div>
        </template>
        </el-table-column>
        <el-table-column
        label="微信"
        width="250">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper" >
                <el-tag size="medium">{{ scope.row.USER_WECHAT}}</el-tag>
            </div>
        </template>
        </el-table-column>
        <el-table-column
        label="密码"
        width="120" >
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
            <el-tag v-if='inputshow' size="medium" ref="wordnode" @blur.native="popo" contenteditable='true'>{{ scope.row.USER_PSW}}</el-tag>
            <el-input    v-model='scope.row.USER_PSW' style="width:200px !important;height:30px !important" @blur.native="popo" v-else>  </el-input>   
            </div>
        </template>
        </el-table-column>

        <el-table-column label="操作" width="350">
        <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleEdit(scope)">确认编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    <!-- <div style="margin-top: 20px;height:50px">
    <el-button type="primary"
    style="float:left;margin-left:20px"
    @click="deleteall">全选删除</el-button>
    </div> -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" 
        @prev-click="preChange" 
        @next-click="nextChange" 
        background
        layout="prev, pager, next"
        :total="datalength">
    </el-pagination>
    </div>
</template>
<script>
const {userSearch,modifyUser,delUser} = require('../api');
export default {
    data() {
        return {
            tableData:[],
            arrdelete:[],
            multipleSelection: [],
            datalength:0,
            showEdit: [], //显示编辑框
            showBtn: [],
            showBtnOrdinary: true,
            inputshow:true,
            pagesize:10
        }
        },
        methods: {
        async handleEdit(scope) {
            
           let {data} = await modifyUser({
               id:scope.row._id,
               username:scope.row.USER_NAME,
               usersno:scope.row.USER_SNO,
               userpsw:scope.row.USER_PSW,
               userdorm:scope.row.USER_DORM,
               userphone:scope.row.USER_PHONE,
               userwechat:scope.row.USER_WECHAT,
               userclass:scope.row.USER_CLASS,
           })
            if(data){
                alert("success");
                this.$forceUpdate();
            }else{
                alert("修改失败!")
            }
            // console.log(data)
        },
        // eslint-disable-next-line no-unused-vars
        popo(scope){
        this.inputshow = ! this.inputshow;
        },
        //删除功能
        async handleDelete(scope) {
            window.console.log(scope);
            this.tableData.splice(scope.$index,1);
            let {data} =await delUser({
                id:scope.row._id
            });
            if(data.code === 1){
                return;
            }else{
                alert("用户删除失败");
            }
        },

        //全部删除
        // async deleteall(){
        //     let arr =this.$refs.multipleTable.selection.map(item=>item.username) ;
        //     // eslint-disable-next-line no-console
        //     console.log(arr)
        //     this.tableData = this.tableData.filter(item=>arr.map(eve => eve==item));
        //         // console.log(this.tableData)
        //     let {data} =await this.$instance.get('/user/delete',{
        //         params:{
        //             username:JSON.stringify(arr)
        //         }}
        //     );
        //     this.$forceUpdate();
        //     if(data.code ===1){
        //         history.go(0);
        //     }

        // },
        //上一页
        async preChange(val){
        let {data} =await userSearch({pagesize:this.pagesize,pagenum:val});
                this.tableData = data;
                this.$forceUpdate();
        },

        //下一页
        async nextChange(val){
        let {data} =await userSearch({pagesize:this.pagesize,pagenum:val});
                this.tableData = data;
                this.$forceUpdate();
        },
         //pageSize变化事件
        // eslint-disable-next-line no-unused-vars
        handleSizeChange(val) {
            // console.log(val)
            // this.$emit("sizeChange", val);
        },

        //pageNum变化事件
        async handleCurrentChange(val) {
            // console.log(val)
            // this.$emit("pageNumCheng");
            let {data} =await userSearch({pagesize:this.pagesize,pagenum:val});
            this.tableData = data;
            this.$forceUpdate();
        },
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
        },
        async created(){
                let {data} = await userSearch({pagesize:this.pagesize,pagenum:1});
                let length = await userSearch({});
                window.console.log("ee",data)
                this.tableData = data; 
                // this.tableData = this.tableData.slice(0,10)
                // console.log(this.tableData)
                this.datalength = length.data; 
                // console.log(this.datalength)
        },
        // computed:{
        //     async tableData(){
        //         let {data} =await this.$instance.get('/user/users');
        //         console.log("e",data.data)
        //         return data.data 
        //     }
        // }
    }

</script>
<style lang="scss" scoped>
    *{
        color:black
    }
</style>