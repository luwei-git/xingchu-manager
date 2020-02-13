<template>
    <div class="resetPasswordDialogPage">
        <el-dialog
        :visible.sync="dialogVisible"
        :append-to-body="true"
        :show-close="false"
        :close-on-click-modal="false"
        :top="'10vh'"
        width="17.7%">
            <dialog-header
                :headerTitle="'重置密码'"
                :cancel="cancel">
            </dialog-header>
            <div class="dialogBody">
                <inputModel
                    :inputType="'password'"
                    :inputTitle="'密码 :'"
                    :inputModelWidth="'100%'"
                    :inputModelDisabled="false"
                    :inputValue="password"
                    :inputPlacholder="'请输入6-20位密码'"
                    v-on:inputEvent="inputPassword">
                </inputModel>
                <inputModel
                    :inputType="'password'"
                    :inputTitle="'确认密码 :'"
                    :inputModelWidth="'100%'"
                    :inputModelDisabled="false"
                    :inputValue="confirmPassword"
                    :inputPlacholder="'请再次输入密码'"
                    v-on:inputEvent="inputPasswordAgain">
                </inputModel>
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
        height: 150px;
    }
</style>
<script>
import dialogHeader from './dialogHeader'
import dialogFooter from './dialogFooter'
import inputModel from '../common/formComponents/inputModel'
import {validateEmptyString, hasSpace} from '../../utils/validate'
export default {
    data () {
        return{
            dialogVisible: true,
            password: '',
            confirmPassword: ''
        }
    },
    methods: {
        cancel () {
            this.$emit('resetPasswordDialogCancel');
        },
        confirm () {
            if (this.password.length > 20 || this.password.length < 6 || hasSpace(this.password)) {
                this.$message('请输入6-20位密码, 且不能有空格');
            } else if (this.password !== this.confirmPassword) {
                this.$message('确认密码不一致');
            } else {
                this.$emit('resetPasswordDialogConfirm', this.password);
            }
        },
        inputPassword (value) {
            this.password = value;
        },
        inputPasswordAgain (value) {
            this.confirmPassword = value;
        }
    },
    components: {
        dialogHeader,
        dialogFooter,
        inputModel
    }
}
</script>
