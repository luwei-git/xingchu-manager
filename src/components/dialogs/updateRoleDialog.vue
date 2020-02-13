<template>
    <div class="updateRoleDialogPage">
        <el-dialog
            :visible.sync="dialogVisible"
            :append-to-body="true"
            :show-close="false"
            :close-on-click-modal="false"
            :top="'15vh'"
            width="17.7%">
                <dialog-header
                    :headerTitle="'修改角色'"
                    :cancel="cancel">
                </dialog-header>
                <div class="dialogBody">
                    <inputModel
                        :inputTitle="'角色名称 :'"
                        :inputModelWidth="'100%'"
                        :inputModelDisabled="false"
                        :inputValue="value"
                        :inputPlacholder="'请输入角色名称'"
                        v-on:inputEvent="inputEvent">
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
        height: 100px;
    }
</style>
<script>
import dialogHeader from './dialogHeader'
import dialogFooter from './dialogFooter'
import inputModel from '../common/formComponents/inputModel'
export default {
    data () {
        return{
            dialogVisible: true,
            value: ''
        }
    },
    methods: {
        cancel () {
            this.$emit('updateRoleDialogCancel');
        },
        confirm () {
            this.$emit('updateRoleDialogConfirm', this.value);
        },
        inputEvent (value) {
            this.value = value;
        }
    },
    created () {
        this.value = this.inputValue;  
    },
    components: {
        dialogHeader,
        dialogFooter,
        inputModel
    },
    props: ['inputValue']
}
</script>
