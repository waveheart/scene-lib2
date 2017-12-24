<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <el-dialog title="信息提交页" :visible.sync="dialogFormVisible">
    <el-form :model="sceneForm" :rules="rules" ref="sceneForm">
      <el-form-item label="电影/电视剧名称（必填）" prop="name">
        <el-input v-model="sceneForm.name" placeholder="请输入电影/电视剧名称"></el-input>
      </el-form-item>
      <el-form-item label="导演名称（必填）" prop="director">
        <el-input v-model="sceneForm.director" placeholder="请输入导演名称"></el-input>
      </el-form-item>
      <el-form-item label="场景点（必填）" prop="scenicArea" v-if="isScenicArea">
        <el-input v-model="sceneForm.scenicArea" placeholder="请输入场景点名称"></el-input>
      </el-form-item>
      <el-form-item >
        <p>拍摄时间（选填）</p>
        <el-date-picker v-model="sceneForm.time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" default-value="2010-10-01">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitForm('sceneForm')">提交</el-button>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialogFormVisible: false,
        sceneForm: {
          name: '',
          director: '',
          scenicArea: '',
          time: ''
        },
        rules: {
          name: [
            {
              required: true,
              message: '请输入电影名称',
              trigger: 'blur'
            }
          ],
          director: [
            {
              required: true,
              message: '请输入导演名称',
              trigger: 'blur'
            }
          ],
          scenicArea: [
            {
              required: true,
              message: '请输入场景点名称',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    props: {
      isScenicArea: {
        type: Boolean,
        default: () => {
          return false
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit')
          } else {
            alert('提交失败')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="sass" type="text/css">
  .el-dialog
    width: 620px
    padding: 32px 110px 60px
    .el-dialog__header
      text-align: center
      padding-bottom: 0
    .el-dialog__title
      color: #768C7F
      font-size: 32px
    .el-form-item
      margin-bottom: 10px
    .el-date-editor--daterange.el-input__inner
      width: 100%
    .el-button--primary
      width: 100%
      margin-top: 20px
      background-color: #E2614E
      border: none
</style>
