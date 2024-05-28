<template>
  <div class="font-roboto bg-gray-100">
    <div class="px-6 py-8">
      <div class="flex justify-between container mx-auto">
        <div class="w-full lg:w-8/12">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="Category">
              <el-select
                v-model="form.categoryId"
                placeholder="please select the category"
              >
                <el-option
                  v-for="{ name, id } in categories"
                  :key="name"
                  :label="name"
                  :value="id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Permission">
              <el-select
                v-model="form.permission"
                placeholder="please select the permission"
              >
                <el-option
                  v-for="permission in permissions"
                  :key="permission"
                  :label="permission"
                  :value="permission"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Content">
              <el-input
                type="textarea"
                :autosize="{ minRows: 15 }"
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
                >編輯</el-button
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
import { permissions } from './../constants'
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
      permissions
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchArticle(id)
    this.fetchCategories()
  },
  methods: {
    async fetchArticle(id) {
      try {
        const { data } = await articlesAPI.getArticle({ id })
        this.form = { ...data.article }
        this.isLoading = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法閱讀此文章，請稍後再試'
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
    async handleSubmit() {
      try {
        this.isProcessing = true

        const { id } = this.$route.params
        const { categoryId, title, permission, content } = this.form
        if (!categoryId || !title.trim() || !permission || !content.trim()) {
          this.isProcessing = false
          Toast.fire({
            icon: 'error',
            title: '標題、文章類別、觀看權限、內容皆為必填欄位'
          })
          return
        }

        const { data } = await articlesAPI.putArticles(id, {
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
          title: errorMessage ? errorMessage : '無法編輯文章'
        })
      }
    }
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
