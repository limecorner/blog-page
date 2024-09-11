<template>
  <div class="font-roboto bg-gray-100 overflow-auto" style="height: 80%;">
    <div class="px-6 py-8">
      <div class="flex justify-between container mx-auto">
        <div class="w-full lg:w-8/12">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="標題">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="分類">
              <el-select v-model="form.categoryId" placeholder="請選擇分類">
                <el-option
                  v-for="{ name, id } in categories"
                  :key="name"
                  :label="name"
                  :value="id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="權限">
              <el-select v-model="form.permission" placeholder="請選擇權限">
                <el-option
                  v-for="permission in permissions"
                  :key="permission"
                  :label="permission"
                  :value="permission"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="內容">
              <el-input
                type="textarea"
                :autosize="{ minRows: 12 }"
                v-model="form.content"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button v-if="isProcessing" type="primary" class="w-24">
                <span class="spinner small-spinner"></span>
              </el-button>
              <el-button
                v-else
                type="primary"
                class="w-24"
                @click="handleSubmit()"
                >發布</el-button
              >
              <!-- <el-button>Cancel</el-button> -->
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { permissions, permissionsWithMember } from './../constants'
import articlesAPI from './../apis/articles'
import categoriesAPI from './../apis/categories'
import { Toast } from './../utils/helpers'

export default {
  name: 'Articles',

  data() {
    return {
      form: {
        title: '',
        categoryId: '',
        permission: '',
        content: ''
      },
      isProcessing: false,
      categories: [],
      permissions: []
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.isProcessing = true
        const { categoryId, title, permission, content } = this.form
        if (!categoryId || !title.trim() || !permission || !content.trim()) {
          this.isProcessing = false
          Toast.fire({
            icon: 'error',
            title: '標題、文章類別、觀看權限、內容皆為必填欄位'
          })
          return
        }

        const { data } = await articlesAPI.postArticles({
          categoryId,
          title,
          permission,
          content
        })

        if (data.success === true) {
          this.$router.push('/articles')
        }
      } catch (error) {
        this.isProcessing = false
        const errorMessage = error.response.data.message
        Toast.fire({
          icon: 'error',
          title: errorMessage ? errorMessage : '無法發布文章'
        })
      }
    },
    async fetchCategories() {
      try {
        const { data } = await categoriesAPI.getCategories()
        if (data.success === true) {
          this.categories = [...data.categories]
        }
      } catch (error) {
        this.categories = []
        Toast.fire({
          icon: 'error',
          title: '無法取得分類，請稍後再試'
        })
      }
    },
    fetchPermissions() {
      this.permissions =
        this.currentUser.permission === 'member'
          ? permissionsWithMember
          : permissions
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    this.fetchCategories()
    this.fetchPermissions()
  }
}
</script>

<style>
@import '../assets/css/app.css';

.el-select-dropdown__wrap {
  overflow: auto;
}
.small-spinner {
  width: 1rem;
  height: 1rem;
}
</style>
