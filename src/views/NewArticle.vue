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
                >Publish</el-button
              >
              <!-- <el-button>Cancel</el-button> -->
            </el-form-item>
          </el-form>
        </div>
        <div class="-mx-8 w-4/12 hidden lg:block">
          <div class="px-8">
            <h1 class="mb-4 text-xl font-bold text-gray-700">Authors</h1>
            <users-list></users-list>
          </div>
          <div class="mt-10 px-8">
            <h1 class="mb-4 text-xl font-bold text-gray-700">Categories</h1>
            <categories></categories>
          </div>
          <div class="mt-10 px-8">
            <h1 class="mb-4 text-xl font-bold text-gray-700">Recent Post</h1>
            <recent-post></recent-post>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersList from './../components/sections-blog-users-list.vue'
import Categories from './../components/sections-categories-list.vue'
import RecentPost from './../components/sections-recent-article.vue'
import { permissions, categories } from './../constants'
import articlesAPI from './../apis/articles'
import { Toast } from './../utils/helpers'

export default {
  name: 'Articles',
  components: {
    UsersList,
    Categories,
    RecentPost
  },
  data() {
    return {
      form: {
        title: '',
        categoryId: '',
        permission: '',
        content: ''
      },
      isProcessing: false,
      categories,
      permissions
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.isProcessing = true

        const { data } = await articlesAPI.postArticles({
          categoryId: this.form.categoryId,
          title: this.form.title,
          permission: this.form.permission,
          content: this.form.content
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
    }
  }
}
</script>

<style>
@import '../assets/css/app.css';

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #2d3748;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e0;
}

::-webkit-scrollbar-thumb:hover {
  background: #2d3748;
}

.el-select-dropdown__wrap {
  overflow: auto;
}
.small-spinner {
  width: 1rem;
  height: 1rem;
}
</style>
