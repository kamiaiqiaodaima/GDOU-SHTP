 <template>
    <div>
        <el-row>
        <h3 style="float:left;margin-left:10px">商品信息表</h3>
        </el-row>

        <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        :row-key="getRowKeys"
        :expand-row-keys="[10]"
        :data="tableData"
        style="width: 100%;padding-left:50px;margin-top:20px;"
        >
        <el-table-column label="商品名" width="150">
            <template slot-scope="scope">
            <el-tag  contenteditable='true' style="margin-left: 10px">{{scope.row.PRODUCT_NAME}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="商品价格" width="150">
            <template slot-scope="scope">
            <el-tag  contenteditable='true' style="margin-left: 10px">{{scope.row.PRODUCT_PRICE}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="商品数量" width="50">
            <template slot-scope="scope">
            <el-tag contenteditable='true'  style="margin-left: 10px">{{scope.row.PRODUCT_NUM}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="商品图片" width="350">
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
            <el-tag  style="margin-left: 10px" contenteditable='true'>{{translateType2(scope.row.PRODUCT_CLASS)}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="发布用户" width="150">
            <template slot-scope="scope">
            <el-tag  style="margin-left: 10px" contenteditable='true'>{{scope.row.SELLER_NAME}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="用户宿舍" width="150">
            <template slot-scope="scope">
            <el-tag  style="margin-left: 10px" contenteditable='true'>{{scope.row.SELLER_DORM}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="用户电话" width="150">
            <template slot-scope="scope">
            <el-tag  style="margin-left: 10px" contenteditable='true'>{{scope.row.SELLER_PHONE}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="用户微信" width="150">
            <template slot-scope="scope">
            <el-tag  style="margin-left: 10px" contenteditable='true'>{{scope.row.SELLER_WECHAT}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="用户班级" width="150">
            <template slot-scope="scope">
            <el-tag  style="margin-left: 10px" contenteditable='true'>{{scope.row.SELLER_CLASS}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="用户学号" width="150">
            <template slot-scope="scope">
            <el-tag  style="margin-left: 10px" contenteditable='true'>{{scope.row.SELLER_SNO}}</el-tag >
            </template>
        </el-table-column>
        <el-table-column label="发布日期" width="150">
            <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.RELEASE_DATE}}</span>
            </template>
        </el-table-column>
        <el-table-column label="截止日期" width="150">
            <template slot-scope="scope">
            <el-tag style="margin-left: 10px" contenteditable='true'>{{scope.row.DEADLINE}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="描述" width="150">
            <template slot-scope="scope">
            <span style="margin-left: 10px" contenteditable='true'>{{scope.row.DESCRIBE}}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作" width="350">
            <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope)"
            >确认编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope)"
            >删除</el-button>
            </template>
        </el-table-column>
        </el-table>
        <el-pagination
        style="margin-top:30px;float:right; margin-right:200px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="preChange"
        @next-click="nextChange"
        background
        layout="prev, pager, next"
        :total="datalength"
        ></el-pagination>
    </div>
</template>
    <script>
    const {searchProduct,updateProduct,delProduct} = require('../api');
    const {translateType} = require('../utils');
    export default {
    data() {
        return {
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
        translateType2 (val){
            return translateType(val);
        },
        async handleEdit(scope) {
        let data = await updateProduct({
            productid:scope.row._id,
            porductname:scope.row.PRODUCT_NAME,
            productprice:scope.row.PRODUCT_PRICE,
            productnum:scope.row.PRODUCT_NUM,
            productclass:scope.row.PRODUCT_CLASS,
            sellername:scope.row.SELLER_NAME,
            sellerdorm:scope.row.SELLER_DORM,
            sellerphone:scope.row.SELLER_PHONE,
            sellerwechat:scope.row.SELLER_WECHAT,
            sellerclass:scope.row.SELLER_CLASS,
            sellersno:scope.row.SELLER_SNO,
            deadline:scope.row.DEADLINE,
            describe:scope.row.DESCRIBE
        })
        if (data.code === 1) {
            return;
        } else {
            alert("修改失败!");
        }
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
        let data = await delProduct(scope.row._id);
        if(data.code ===1){
            return;
        }else{
            alert("删除失败");
        }
        this.$forceUpdate(this.tableData);
        },
        //上一页
        async preChange(val) {
        let { data } = await searchProduct({
             pagenum:val,
             pagesize:this.pagesize
        });
        //console.log("e",data.data)
        this.tableData = data;
        this.$forceUpdate();
        },

        //下一页
        async nextChange(val) {
        let { data } =await searchProduct({
             pagenum:val,
             pagesize:this.pagesize
        });
        // console.log("e",data.data)
        this.tableData = data;
        this.$forceUpdate();
        },
        //pageSize变化事件
        // eslint-disable-next-line no-unused-vars
        handleSizeChange(val) {},

        //pageNum变化事件
        async handleCurrentChange(val) {
        let { data } = await searchProduct({
             pagenum:val,
             pagesize:this.pagesize
        });
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
    async created() {
        let { data } = await searchProduct({
             pagenum:1,
             pagesize:this.pagesize
        });
        let length = await searchProduct({});
        this.tableData = data;
        this.datalength = length.data;
    }
    };
    </script>
    <style lang="scss" scoped>
    </style>