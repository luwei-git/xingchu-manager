<template>
    <div class="addUserDialogPage">
        <el-dialog
            :visible.sync="dialogVisible"
            :append-to-body="true"
            :show-close="false"
            :close-on-click-modal="false"
            :top="'15vh'"
            width="34.7%">
                <dialog-header
                    :headerTitle="'新增用户'"
                    :cancel="cancel">
                </dialog-header>
                <div class="dialogBody">
                    <inputModel
                        :inputTitle="'姓名 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="false"
                        :inputValue="name"
                        :inputPlacholder="'请输入姓名, 不多于10个字符'"
                        v-on:inputEvent="setName"
                        :inputFloat="'left'">
                    </inputModel>
                    <inputModel
                        :inputTitle="'账号 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="false"
                        :inputValue="userNumber"
                        :inputPlacholder="'请输入6-20位账号'"
                        v-on:inputEvent="setUserNumber"
                        :inputFloat="'right'">
                    </inputModel>
                    <inputModel
                        :inputType="'password'"
                        :inputTitle="'密码 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="false"
                        :inputValue="password"
                        :inputPlacholder="'请输入6-20位密码'"
                        v-on:inputEvent="setPassword"
                        :inputFloat="'left'">
                    </inputModel>
                    <inputModel
                        :inputType="'password'"
                        :inputTitle="'确认密码 :'"
                        :inputModelWidth="'47.5%'"
                        :inputModelDisabled="false"
                        :inputValue="passwordAgain"
                        :inputPlacholder="'请再次输入密码'"
                        v-on:inputEvent="setPasswordAgain"
                        :inputFloat="'right'">
                    </inputModel>
                    <selectModel
                        :selectTitle="'角色'"
                        :selectValue="selectText"
                        :selectList="roleList"
                        :selectModelWidth="'47.5%'"
                        :selectFloat="'left'"
                        :selectPlaceholder="'请选择角色'"
                        v-on:selectChoose="selectChoose">
                    </selectModel>
                </div>
                <dialog-footer
                    :cancel="cancel"
                    :confirm="confirm">
                </dialog-footer>
        </el-dialog>
    </div>
</template>
<style lang="less" scoped>
    .dialogBody{
        height: 270px;
        z-index: 100;
    }
</style>
<script>
import dialogHeader from './dialogHeader'
import dialogFooter from './dialogFooter'
import inputModel from '../common/formComponents/inputModel'
import selectModel from '../common/formComponents/selectModel'
import {roleModelApi} from '../../api/setting'
import {validateEmptyString, hasSpace} from '../../utils/validate'
export default {
    data () {
        return{
            dialogVisible: true,
            inputValue: '',
            name: '',
            userNumber: '',
            password: '',
            passwordAgain: '',
            roleId: '',
            roleList: [],
            selectText: ''
        }
    },
    methods: {
        cancel () {
            this.$emit('addUserDialogCancel');
        },
        confirm () {
            if (validateEmptyString(this.name)) {
                this.$message('请填写用户姓名');
            } else if (this.name.length > 10 || hasSpace(this.name)) {
                this.$message('用户名不能多于10个字符, 且不能有空格')
            } else if (this.userNumber.length > 20 || this.userNumber.length < 6 || hasSpace(this.userNumber)) {
                this.$message('请填写6-20位账号, 且不能有空格');
            } else if (!isNaN(this.userNumber)) {
                this.$message('账号不能全为数字');
            } else if (!/^[A-Za-z0-9_]+$/.test(this.userNumber)) {
                this.$message('账号由英文数字和下划线组成');
            } else if (this.password.length > 20 || this.password.length < 6 || hasSpace(this.password)) {
                this.$message('请填写6-20位密码, 且不能有空格');
            } else if (this.password !== this.passwordAgain) {
                this.$message('确认密码不一致');
            } else if (validateEmptyString(this.roleId)) {
                this.$message('请选择角色');
            } else {
                let data = {nickname: this.name, username: this.userNumber, password: this.password, roleIds: [this.roleId]};
                this.$emit('addUserDialogConfirm', data);
            }
        },
        setName (value) {
            this.name =value;
        },
        setUserNumber (value) {
            this.userNumber =value;
        },
        setPassword (value) {
            this.password =value;
        },
        setPasswordAgain (value) {
            this.passwordAgain =value;
        },
        selectChoose (value) {
            this.selectText = value.name;
            this.roleId = value.roleId;
        },
        getRoleList () {
            this.roleList = [];
            roleModelApi.getAllRoleData({}, res => {
                res.data.data.forEach(element => {
                    this.roleList.push({name: element.roleName, roleId: element.roleId});
                });
            });  
        }
    },
    created () {
        this.getRoleList();
    },
    components: {
        dialogHeader,
        dialogFooter,
        inputModel,
        selectModel
    },
    props: ['selectList']
}
</script>
