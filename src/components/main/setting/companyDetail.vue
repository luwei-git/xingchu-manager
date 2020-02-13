<template>
    <div class="companyDetailPage">
        <div class="contentTitleBottom">
            <div class="contentStyle">
                <div class="top">
                    <div class="button cursorPointer tac fr" v-show="!editFlage" @click="edit">修改</div>
                    <div class="button cursorPointer tac fr" v-show="editFlage" @click="save">保存</div>
                </div>
                <div class="editContent" v-show="editFlage">
                    <inputModel
                        :inputTitle="'企业名称 :'"
                        :inputModelWidth="'240px'"
                        :inputModelDisabled="true"
                        :inputFloat="'left'"
                        :inputValue="organName">
                    </inputModel>
                    <inputModel
                        :inputTitle="'营业执照注册号 :'"
                        :inputModelWidth="'240px'"
                        :inputModelDisabled="true"
                        :inputFloat="'right'"
                        :inputValue="businessLicenceCode">
                    </inputModel>
                    <inputModel
                        :inputTitle="'联系电话 :'"
                        :inputModelWidth="'240px'"
                        :inputModelDisabled="false"
                        :inputFloat="'left'"
                        :inputPlacholder="'请输入联系电话'"
                        :inputValue="contactPhone"
                        v-on:inputEvent="setContactPhone">
                    </inputModel>
                    <inputModel
                        :inputType="'email'"
                        :inputTitle="'邮箱 :'"
                        :inputModelWidth="'240px'"
                        :inputModelDisabled="false"
                        :inputFloat="'right'"
                        :inputPlacholder="'请输入邮箱'"
                        :inputValue="email"
                        v-on:inputEvent="setEmail">
                    </inputModel>
                    <div class="businessLicence fl">
                        <div class="title">营业执照 :</div>
                        <div>
                            <img :src="businessLicenceUrl" alt="">
                        </div>
                    </div>
                </div>
                <div class="saveContent clearfix" v-show="!editFlage">
                    <div class="eachItem fl">
                        <div class="title">企业名称 :</div>
                        <h4>{{organName}}</h4>
                    </div>
                    <div class="eachItem fr">
                        <div class="title">营业执照注册号 :</div>
                        <h4>{{businessLicenceCode}}</h4>
                    </div>
                    <div class="eachItem fl">
                        <div class="title">联系电话 :</div>
                        <h4>{{contactPhone || '未填写'}}</h4>
                    </div>
                    <div class="eachItem fr">
                        <div class="title">邮箱 :</div>
                        <h4>{{email || '未填写'}}</h4>
                    </div>
                    <div class="eachItem fl">
                        <div class="title">营业执照 :</div>
                        <img :src="businessLicenceUrl" alt="">
                    </div>
                    <!-- <div class="eachItem fr">
                        <div class="title">邮箱 :</div>
                        <h4>635412584@qq.com</h4>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .top{
        height: 60px;
        border-bottom: 1px solid #E6EFF8;
        .button{
            width: 84px;
            height: 30px;
            margin-top: 15px;
            line-height: 30px;
            color: #78AEF8;
            border: 1px solid #78AEF8;
        }
    }
    .editContent, .saveContent{
        width: 670px;
        padding-top: 20px;
        .businessLicence{
            width: 240px;
            img{
                width: 200px;
                height: 280px;
            }
        }
        .eachItem{
            width: 240px;
            margin-bottom: 20px;
            .title{
                margin-bottom: 15px;
            }
            img{
                width: 200px;
                height: 280px;
            }
        }
        .eachItem.fl{
            margin-right: 100px;
        }
    }
</style>
<script>
import {orgModel} from '../../../api/orgApi'
import {Cookie} from "../../../utils/cookie";
import inputModel from '../../common/formComponents/inputModel'
import {validateEmptyString, validatePhoneNumber, validateEmail, valitateTel} from '../../../utils/validate'
import eventBus from '../../../utils/eventBus'
export default {
    data () {
        return{
            editFlage: false,
            organName: '',
            businessLicenceCode: '',
            businessLicenceUrl: '',
            contactPhone: '',
            email: '',
            infoId: ''
        }
    },
    methods: {
        setContactPhone (value) {
            this.contactPhone = value;
        },
        setEmail (value) {
            this.email = value;
        },
        edit () {
            this.editFlage = true;
        },
        save () {
            if (!validateEmptyString(this.contactPhone) && !validatePhoneNumber(this.contactPhone) && !valitateTel(this.contactPhone)) {
                this.$message('请输入正确手机号或固定电话');
            } else if (!validateEmptyString(this.email) && !validateEmail(this.email)) {
                this.$message('请输入正确格式的邮箱');
            } else {
                let data = {
                    infoId: this.infoId,
                    contactPhone: this.contactPhone,
                    businessLicenceCode: this.businessLicenceCode,
                    email: this.email,
                    organName: this.organName
                };
                orgModel.updateOrgDetail(data, res => {
                    this.editFlage = false;
                }, err => {
                    this.$message(err.data.errMsg);
                })
            }
        },
        getCompanyDetail (data) {
            orgModel.queryByOrganId(data, res => {
                this.organName = res.data.data.organName;
                this.businessLicenceCode = res.data.data.businessLicenceCode;
                this.businessLicenceUrl = res.data.data.businessLicenceUrl;
                this.phone = res.data.data.contactPhone;
                this.email = res.data.data.email;
                this.infoId = res.data.data.infoId;
            }, (err) => {
                this.$message(err.data.errMsg);
            })  
        }
    },
    created () {
        this.getCompanyDetail({organId: Cookie.get(Cookie.organIdKey)});
        eventBus.$emit('setBreadcrumbs', '设置', '企业详情');
    },
    components: {
        inputModel
    }
}
</script>
