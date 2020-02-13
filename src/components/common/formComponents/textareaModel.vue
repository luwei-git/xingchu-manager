<template>
    <div class="textareaModelPage" :style="{width:textareaModelWidth, float:textareaFloat, marginBottom: textareaMarginBottom || '15px'}">
        <div class="title">{{textareaTitle}}</div>
        <div class="textareaBody">
            <textarea type="text"
                :style="{height: textareaHeight || '60px'}"
                :value="textareaValue"
                v-on:input="setValue"
                :disabled="textareaModelDisabled"
                :placeholder="textareaPlacholder || '请输入内容'">
            </textarea>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .textareaModelPage{
        .title{
            margin-bottom: 5px;
        }
        .textareaBody{
            textarea{
                padding-top: 5px;
                line-height: 20px;
                width: 100%;
                padding-left: 10px;
                box-sizing: border-box;
            }
            textarea::-webkit-input-placeholder{
                color: #9A9A9A;
            }
        }
    }
</style>
<script>
export default {
    name: 'textareaModel',
    data () {
        return {

        }
    },
    methods: {
        setValue (e) {
            this.$emit('textareaInputEvent', e.target.value);
        }  
    },
    props: ['textareaTitle', 'textareaValue', 'textareaModelWidth', 'textareaMarginBottom', 'textareaHeight', 'textareaModelDisabled', 'textareaPlacholder', 'textareaFloat']
}
</script>
