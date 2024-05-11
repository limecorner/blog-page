<template>
  <div id="app" class="font-roboto bg-gray-100">
    <div class="px-6 py-8">
      <div class="flex justify-between container mx-auto">
        <div class="w-full lg:w-8/12">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="Category">
              <el-select
                v-model="form.category"
                placeholder="please select the category"
              >
                <el-option label="Zone one" value="shanghai"></el-option>
                <el-option label="Zone ones" value="shanghais"></el-option>
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
              <el-button type="primary" @click="handleSubmit"
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
import UsersList from './../components/sections-blog-users-list'
import Categories from './../components/sections-categories-list'
import RecentPost from './../components/sections-recent-article'
// import articlesAPI from './../apis/articles'
// import { Toast } from './../utils/helpers'

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
        category: '',
        content: ''
      }
    }
  },
  methods: {
    async handleSubmit() {}
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
</style>
