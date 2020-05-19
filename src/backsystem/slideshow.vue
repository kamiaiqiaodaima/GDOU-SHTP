 <template>
    <div>
        <el-row style="padding:10px 10px 0">
        <h3 style="float:left;margin-left:10px">轮播图信息表</h3>
         <el-button style="float:right" type="primary" round @click="addlunbo">添加商品到轮播图</el-button>
        </el-row>

    <el-table
        v-loading ='loading'
        ref="multipleTable"
        tooltip-effect="dark"
        :row-key="getRowKeys"
        :expand-row-keys="[10]"
        :data="tableData"
        style="width: 100%;padding-left:50px;margin-top:20px;"
        >
        <el-table-column label="商品ID" width="200">
            <template slot-scope="scope">
            <el-tag>{{scope.row._id}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="商品名" width="150">
            <template slot-scope="scope">
            <el-tag  contenteditable='true'>{{scope.row.PRODUCT_NAME}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="商品价格" width="100">
            <template slot-scope="scope">
            <el-tag  contenteditable='true'>{{scope.row.PRODUCT_PRICE}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="商品数量" width="50">
            <template slot-scope="scope">
            <el-tag contenteditable='true' >{{scope.row.PRODUCT_NUM}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="商品图片" width="400">
            <template slot-scope="scope">
            <el-carousel :interval="4000" type="card" height="150px">
                <el-carousel-item v-for="item in scope.row.PRODUCT_PIC" :key="item">
                 <img :src="item" style="width:100%;height:100%">
                </el-carousel-item>
            </el-carousel>
            </template>
        </el-table-column>
        <el-table-column label="商品类型" width="100">
            <template slot-scope="scope">
            <el-tag  contenteditable='true'>{{translateType2(scope.row.PRODUCT_CLASS)}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="发布用户" width="100">
            <template slot-scope="scope">
            <el-tag  contenteditable='true'>{{scope.row.SELLER_NAME}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="用户宿舍" width="100">
            <template slot-scope="scope">
            <el-tag  contenteditable='true'>{{scope.row.SELLER_DORM}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="用户电话" width="150">
            <template slot-scope="scope">
            <el-tag  contenteditable='true'>{{scope.row.SELLER_PHONE}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="用户微信" width="150">
            <template slot-scope="scope">
            <el-tag  contenteditable='true'>{{scope.row.SELLER_WECHAT}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="用户班级" width="150">
            <template slot-scope="scope">
            <el-tag  contenteditable='true'>{{scope.row.SELLER_CLASS}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="用户学号" width="150">
            <template slot-scope="scope">
            <el-tag  contenteditable='true'>{{scope.row.SELLER_SNO}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="发布日期" width="250">
            <template slot-scope="scope">
            <span>{{scope.row.RELEASE_DATE}}</span>
            </template>
        </el-table-column>
        <el-table-column label="截止日期" width="250">
            <template slot-scope="scope">
            <el-tag contenteditable='true'>{{scope.row.DEADLINE}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="描述" width="150">
            <template slot-scope="scope">
            <span contenteditable='true'>{{scope.row.DESCRIBE}}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作" width="250">
            <template slot-scope="scope">
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope)"
            >删除</el-button>
            </template>
        </el-table-column>
        </el-table>
    </div>
</template>
    <script>
    const {getLunboList,delLunboList,addLunboList} = require('../api');
    const {translateType} = require('../utils');
    export default {
    data() {
        return {
        loading:false,
        tableData: [],
        arrdelete: [],
        multipleSelection: [],
        datalength: 0,
        inputshow: true,
        inputshow1: true,
        inputshow2: true,
        inputshow3: true,
        deleteAll: [],
        pagesize:5,
        getRowKeys(row) {
            return row.id;
        },
        // expands: [1, 2, 3, , 4, 5]
        };
    },
    methods: {
        addlunbo () {
            this.$prompt('请输入商品ID', '添加商品到轮播图列表', {
                confirmButtonText: '添加',
                cancelButtonText: '取消',
                inputPattern: /[a-zA-Z0-9]{24}/,
                inputErrorMessage: '商品ID格式不正确'
                }).then(async ({ value }) => {
                    this.loading = true;
                    try{
                       let data = await addLunboList({id:value});
                       window.console.log(data);
                       if(data.code == 1){
                           this.$message({
                                type: 'success',
                                message: '你已成功添加ID为' + value+'的商品'
                            });
                       }else{
                           this.$message({
                            type: 'warn',
                            message: '添加失败'
                        });
                       }
                    }catch{
                        this.$message({
                            type: 'warn',
                            message: '添加失败'
                        });
                    }
                    this.$forceUpdate(this.tableData);
                    this.loading = false;
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
        });
        },
        translateType2 (val){
            return translateType(val);
        },
        hopo() {
        this.inputshow1 = !this.inputshow1;
        },
        popo() {
        this.inputshow = !this.inputshow;
        },
        dopo() {
        this.inputshow2 = !this.inputshow2;
        },
        topo() {
        this.inputshow3 = !this.inputshow3;
        },
        //删除功能
        // eslint-disable-next-line no-unused-vars
        async handleDelete(scope) {
        this.tableData.splice(scope.$index, 1);
        let data = await delLunboList({id:scope.row._id});
        if(data.code ===1){
            return;
        }else{
            alert("删除失败");
        }
        this.$forceUpdate(this.tableData);
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
    async created() {
        this.loading = true;
        let data  = await getLunboList({});
        this.tableData = data;
        this.loading = false;
    }
    };
    </script>
    <style lang="scss" scoped>
    </style>