<template>
    <div class="rolePowerSetDialog">
        <el-dialog
            :visible.sync="dialogVisible"
            :append-to-body="true"
            :show-close="false"
            :close-on-click-modal="false"
            :top="'15vh'"
            width="30%">
                <dialog-header
                    :headerTitle="'分配权限'"
                    :cancel="cancel">
                </dialog-header>
                <div class="dialogBody">
                    <div class="eachItem" v-for="(item, index) in rolePowerList" :key="index">
                        <el-checkbox v-model="checkAll[index]" @change="handleCheckAllChange(index)">{{item.name}}</el-checkbox>
                        <div style="margin: 5px 0;"></div>
                        <el-checkbox-group v-if="!!item.children" v-model="checkedRoles[index]" @change="handleCheckedRolesChange(index)">
                            <el-checkbox v-for="(ite, ind) in item.children" :label="ite" :key="ind">{{ite}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <dialog-footer
                    :cancel="cancel"
                    :confirm="confirm">
                </dialog-footer>
        </el-dialog>
    </div>
</template>
<style>
    .eachItem .el-checkbox-group{
        padding-left: 25px;
    }
</style>

<style lang="less" scoped>
    .dialogBody{
        height: 350px;
    }
</style>
<script>
import dialogHeader from './dialogHeader'
import dialogFooter from './dialogFooter'
export default {
    data () {
        return{
            dialogVisible: true,
            // isIndeterminate: [true, true, true, true]
        }
    },
    methods: {
        cancel () {
            this.dialogVisible = false;
            this.$emit("rolePowerSetDialogCancel");
        },
        confirm () {
            this.dialogVisible = false;
            this.$emit("rolePowerSetDialogConfirm");
        },
        handleCheckAllChange (index) {
            this.$set(this.checkedRoles, index, this.checkAll[index] ? this.rolePowerList[index].children : []);
        },
        handleCheckedRolesChange (index) {
            let checkedCount = this.checkedRoles[index].length;
            this.$set(this.checkAll, index, checkedCount !== 0);
        }
    },
    components: {
        dialogHeader,
        dialogFooter
    },
    props: ['rolePowerList', 'checkAll', 'checkedRoles']
}
</script>

