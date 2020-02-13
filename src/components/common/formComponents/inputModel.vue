<template>
    <div class="inputModelPage" :style="{width:inputModelWidth, float:inputFloat, margin: inputModelMargin}">
        <div :class="{title: !!inputTitle, fl:true, noTitle: !inputTitle}">{{inputTitle}}</div>
        <div class="inputBody">
            <input :type="inputType || 'text'" :value="inputValue" v-on:input="setValue" :disabled="inputModelDisabled" :placeholder="inputPlacholder || '请输入内容'">
        </div>
    </div>
</template>
<style scoped lang="less">
    .inputModelPage{
        margin-bottom: 15px;
        .title{
            margin-bottom: 5px;
        }
        .noTitle{
            width: 100%;
            height: 19.45px;
        }
        .inputBody{
            input{
                height: 30px;
                width: 100%;
                outline:none;
                border: 1px solid #C1C7D3;
                padding-left: 10px;
                box-sizing: border-box;
                border-radius: 3px;
            }
            input::-webkit-input-placeholder{
                color: #9A9A9A;
            }
        }
    }
</style>
<script>
export default {
    name: 'inputModel',
    data () {
        return {
            
        }
    },
    methods: {
        setValue (e) {
           if (this.inputType == 'number' && !/\d/.test(e.target.value)) {
                e.target.value = '';
           }
            this.$emit('inputEvent', e.target.value);
        }
    },
    props: ['inputType', 'inputTitle', 'inputValue', 'inputModelWidth', 'inputModelDisabled', 'inputPlacholder', 'inputFloat', 'inputModelMargin']
}
</script>
