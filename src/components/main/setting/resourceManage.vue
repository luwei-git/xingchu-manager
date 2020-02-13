<template>
    <div>
        <div class="contentTitleBottom">
            <div class="contentStyle">
                <div class="searchModel clearfix">
                    <inputModel
                        :inputTitle="'医院名称 :'"
                        :inputModelWidth="'200px'"
                        :inputValue="hospitalName"
                        :inputPlacholder="'请输入医院名称'"
                        :inputModelMargin="'0 20px 0 0'"
                        :inputFloat="'left'"
                        v-on:inputEvent="setHospitalName">
                    </inputModel>
                    <inputModel
                        :inputTitle="'销售代表 :'"
                        :inputModelWidth="'200px'"
                        :inputValue="sellingAgentName"
                        :inputPlacholder="'请输入销售代表'"
                        :inputFloat="'left'"
                        v-on:inputEvent="setSellingAgentName">
                    </inputModel>
                    <div class="search fl tac cursorPointer" @click="searchCallback">查询</div >
                    <div class="reset fl tac cursorPointer" @click="resetCallback">重置</div >
                </div>
                <eleTable :tableData="tableData1" :tableHeaderData="tableHeaderData1" :callbackObj="callbackObj"></eleTable>
                <pagination 
                    :total="total"
                    :pageSize="tableColumnSize"
                    :currentChangeCallback="currentChangeCallback2"
                    v-on:paginationSizeChange="paginationSizeChange">
                </pagination>
            </div>
        </div>
        <el-dialog
            title="更改销售代理"
            :visible.sync="dialogVisible"
            width="220px"
            :modal-append-to-body='true'
            :append-to-body='true'
            :before-close="handleClose">
            <el-select v-model="value" placeholder="请选择" @change="chooseSellingAgent(value)">
                <el-option
                v-for="(item, index) in sellingAgent"
                :key="index"
                :value="item.userId"
                :label="item.nickname">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeAgent">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style scoped lang='less'>
</style>
<script>
import inputModel from '../../common/formComponents/inputModel'
import eleTable from '../../common/eleTable'
import pagination from '../../common/pagination'
import {tableHeaderData1} from '../../../config/resourceManage'
import {hospitalStatisticModel} from '../../../api/hospitalStatistic'
import {formatDate} from '../../../utils/formatDate'
import eventBus from '../../../utils/eventBus'
export default {
    data () {
        return {
            tableData1: [],
            tableHeaderData1: [],
            // inputListData: [
            //     {label:'医院名称', value: '', placeholder: '请输入医院名称'},
            //     {label:'销售代表', value: '', placeholder: '请输入销售代表'}
            // ], // 生成搜索框的数据
            dialogVisible: false,
            value: '', // 更换销售代理的显示值
            sellingAgent: [],
            selectedOrgId: '', // 点击更换代理的当前机构id
            selectedSellingAgentId: '', // 下拉框选择销售代理的id
            selectedSellingAgentName:'', // 下拉框选择销售代理的名字
            selectedRowIndex:'', // 点击更换代理的当前行的index
            total: 0, // 分页总数目
            tableColumnSize: 10,
            currentPage: 1,
            callbackObj: {edit: [this.eleTableClickCallback]},
            hospitalName: '',
            sellingAgentName: ''
        }
    },
    methods: {
        // 获取所有机构
        getAllOrg (organizationName, saleManagerName) {
            let data = {
                currentPage: this.currentPage,
                pageSize: this.tableColumnSize
            }
            if (organizationName) {
                data.organizationName = organizationName;
            }
            if (saleManagerName) {
                data.saleManagerName = saleManagerName;
            }
            hospitalStatisticModel.getAllHospitalResource(data, res => {
                this.total = res.data.data.totalNum;
                this.tableData1 = res.data.data.items.map(item => {
                    item.createTime = formatDate.getDate(item.createTime, 'YYYY-MM-DD');
                    item.edit = [{name: '更改销售代理'}];
                    return item;
                })
            });
        },
        handleClose () {
            this.dialogVisible = false;
        },
        // 点击弹出更换销售代理窗口
        eleTableClickCallback (row, index) {
            this.dialogVisible = true;
            this.selectedOrgId = row.organizationId;
            this.selectedRowIndex = index;
            this.value = row.saleManagerName;
            if (this.sellingAgent.length == 0) {
                hospitalStatisticModel.getAllSellingAgent({}, res => {
                    this.sellingAgent = res.data.data.map(item => {
                        item.createTime = formatDate.getDate(item.createTime, 'YYYY-MM-DD');
                        return item;
                    });
                });
            }
        },
        // 点击选择下拉框销售代理
        chooseSellingAgent (id) {
            this.selectedSellingAgentId = id;
            this.sellingAgent.forEach(item => {
                if (item.userId == id) {
                    this.selectedSellingAgentName = item.nickname;
                }
            })
        },
        // 点击确定更换销售代理
        changeAgent () {
            this.dialogVisible = false;
            if (!!this.selectedSellingAgentName && !!this.selectedOrgId) {
                let data = {
                    saleManagerName: this.selectedSellingAgentName,
                    organizationId: this.selectedOrgId,
                    saleManagerId: this.selectedSellingAgentId
                }
                hospitalStatisticModel.changeSellingAgent(data,res => {
                    this.tableData1[this.selectedRowIndex].saleManagerName = this.selectedSellingAgentName;
                    this.value = ''; // 更新销售代表之后下拉框默认值置空
                    this.selectedSellingAgentName = ''; // 更新销售代表之后选中的销售代理
                    this.selectedSellingAgentId = ''; // 更新销售代表之后选中销售代理id置空
                });
            }
        },
        // 点击搜索回调
        searchCallback () {
            this.getAllOrg(this.hospitalName.trim(), this.sellingAgentName.trim());
        },
        currentChangeCallback2 (currentPage) {
            this.currentPage = currentPage;
            this.getAllOrg();
        },
        // 点击清空回调
        resetCallback () {
            this.hospitalName = '';
            this.sellingAgentName = '';
            this.getAllOrg();
        },
        setHospitalName (value) {
            this.hospitalName = value;
        },
        setSellingAgentName (value) {
            this.sellingAgentName = value;
        },
        paginationSizeChange (value) {
            this.tableColumnSize = value;
            this.getAllOrg();
        }
    },
    created () {
        this.tableHeaderData1 = tableHeaderData1;
        eventBus.$emit('setBreadcrumbs', '设置', '机构管理');
        this.getAllOrg();
    },
    components: {
        inputModel,
        eleTable,
        pagination
    }
}
</script>
