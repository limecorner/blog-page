<template>
  <div class="font-roboto bg-gray-100 overflow-auto" style="height: 85%;">
    <div class="px-6 py-8">
      <div class="flex justify-center container mx-auto">
        <div class="w-full lg:w-8/12">
          <div class="mt-6">
            <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
              <h1 class="text-4xl text-gray-700 font-bold">
                {{ article.title }}
              </h1>
              <!-- <div>
                <a class="flex items-center" href="#">
                  <img
                    class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                    :src="article.image"
                    alt="avatar"
                  />
                </a>
              </div> -->
              <div class="">
                <h2 class="text-gray-700 font-bold hover:underline">
                  {{ article.User.name }}
                </h2>

                <!-- <a
                  class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
                  href="#"
                  >{{ article.Category.name }}</a
                > -->
              </div>
              <div class="flex justify-between items-center">
                <span class="font-light text-gray-600">{{
                  relativeTimeFromNow(article.createdAt)
                }}</span>
                <router-link
                  :to="{
                    name: 'categories',
                    params: { id: article.Category.id }
                  }"
                  class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
                  >{{ article.Category.name }}</router-link
                >
              </div>
              <div class="mt-2">
                <div class="">
                  <p class="mt-2 text-orange-500">
                    觀看權限: {{ article.permission }}
                  </p>
                </div>
                <p class="mt-2 text-gray-600 truncate">{{ article.content }}</p>
              </div>
              <div class="flex justify-between items-center mt-4">
                <p class="mt-2 text-gray-600"></p>
                <!-- {{ article.clapCount }} -->

                <div>
                  <button
                    @click="isShowResponse = !isShowResponse"
                    class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-yellow-600 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-80 mr-5"
                  >
                    回覆
                  </button>
                  <template v-if="currentUser.id === article.User.id">
                    <button
                      class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 mr-5"
                    >
                      <router-link
                        :to="{
                          name: 'edit-article',
                          params: { id: article.id }
                        }"
                        >編輯</router-link
                      >
                    </button>

                    <button
                      @click.stop.prevent="
                        removeArticle(article.id, article.title)
                      "
                      class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
                    >
                      刪除
                    </button>
                  </template>
                </div>
              </div>
            </div>

            <!-- 回覆表格 start -->
            <div
              v-show="isShowResponse"
              class="max-w-4xl px-10 py-6 rounded-lg shadow-md mt-5"
            >
              <el-form ref="form" :model="form" label-width="120px">
                <p>{{ currentUser.name }} 想回覆</p>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2 }"
                  v-model="form.content"
                  class="mt-4"
                ></el-input>
                <el-button v-if="isProcessing" type="primary" class="w-24">
                  <span class="spinner small-spinner"></span>
                </el-button>
                <el-button
                  v-else
                  type="primary"
                  class="w-24 mt-3"
                  @click="handleSubmit(article.id)"
                  >送出回覆</el-button
                >
                <!-- <el-button>Cancel</el-button> -->
              </el-form>
            </div>
            <!-- 回覆表格 end-->
          </div>
        </div>
      </div>

      <!-- 所有回覆 start -->
      <div class="flex justify-center container mx-auto">
        <div class="w-full lg:w-8/12">
          <div class="mt-6">
            <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
              <h3 class="text-xl text-gray-700">回覆</h3>
            </div>
          </div>
        </div>
      </div>
      <div
        v-for="{ content, id, createdAt, User } in article.Responses"
        :key="id"
        class="flex justify-center container mx-auto"
      >
        <div class="w-full lg:w-8/12">
          <div class="mt-6">
            <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
              <!-- <div>
                <a class="flex items-center" href="#">
                  <img
                    class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                    :src="article.image"
                    alt="avatar"
                  />
                </a>
              </div> -->

              <div class="">
                <h2 class="text-gray-700 font-bold hover:underline">
                  {{ User.name }}
                </h2>
                <span class="font-light text-gray-600">{{
                  relativeTimeFromNow(createdAt)
                }}</span>
              </div>
              <h1 class="text-2xl text-gray-700">
                {{ content }}
              </h1>
              <div
                v-show="currentUser.id === User.id"
                class="flex justify-end items-center mt-4"
              >
                <button
                  @click="
                    dialogVisible = true
                    editResponseId = id
                    reviseForm.content = content
                  "
                  class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 mr-5"
                >
                  編輯
                </button>
                <button
                  @click.stop.prevent="removeReponse(id, content)"
                  class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
                >
                  刪除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 所有回覆 end -->
      <el-dialog
        title="回覆"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="30%"
      >
        <span>修改內容為</span>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2 }"
          v-model="reviseForm.content"
          class="mt-2"
        ></el-input>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button @click="editResponse()" type="primary">送出</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import articlesAPI from './../apis/articles'
import responsesAPI from './../apis/responses'
import { Toast, relativeTimeFromNow } from './../utils/helpers'
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'Article',

  data() {
    return {
      article: {
        Category: {
          name: ''
        },
        Responses: [
          {
            User: {
              name: ''
            }
          }
        ],
        User: {
          name: ''
        }
      },
      relativeTimeFromNow,
      isDeleteProcessing: false,
      isShowResponse: false,
      form: {
        content: ''
      },
      isProcessing: false,
      dialogVisible: false,
      editResponseId: 0,
      editResponseContent: '',
      reviseForm: {
        content: ''
      }
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchArticle(id)
  },
  methods: {
    async fetchArticle(id) {
      try {
        this.isLoading = true
        const { data } = await articlesAPI.getArticle({ id })
        this.article = data.article
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法閱讀此文章，請稍後再試'
        })
      }
    },
    async removeArticle(id, title) {
      Swal.fire({
        text: `確定要刪除 ${title} 這篇文章嗎?`,
        icon: 'warning',
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: '確定',
        customClass: {
          confirmButton:
            'px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80',
          cancelButton:
            'px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80 mr-5'
        },
        cancelButtonText: '取消',
        reverseButtons: true,
        allowOutsideClick: false,
        heightAuto: false
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            this.isDeleteProcessing = true
            const { data } = await articlesAPI.deletArticle(id)

            if (data.success === true) {
              Toast.fire({
                icon: 'success',
                title: '刪除文章成功'
              })
              setTimeout(() => this.$router.push('/articles'), 1000)
            }
          } catch (error) {
            this.isDeleteProcessing = false
            const errorMessage = error.response.data.message
            Toast.fire({
              icon: 'error',
              title: errorMessage ? errorMessage : '無法刪除文章，請稍後再試'
            })
          }
        }
      })
    },
    async handleSubmit(articleId) {
      try {
        this.isProcessing = true
        const { content } = this.form
        const { data } = await responsesAPI.postResponse(articleId, {
          content
        })
        if (data.success === true) {
          const addedResponse = {
            ...data.response,
            User: {
              name: this.currentUser.name,
              id: this.currentUser.id
            }
          }
          this.article.Responses.unshift(addedResponse)
          this.form.content = ''
          // this.$router.go()
        }
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        const errorMessage = error.response.data.message
        Toast.fire({
          icon: 'error',
          title: errorMessage ? errorMessage : '無法回覆文章'
        })
      }
    },
    async editResponse() {
      try {
        const { content } = this.reviseForm
        const { data } = await responsesAPI.putResponse(this.editResponseId, {
          content
        })

        if (data.success === true) {
          const editResponseIndex = this.article.Responses.findIndex(
            (r) => r.id === this.editResponseId
          )
          this.article.Responses[editResponseIndex].content = content
          Toast.fire({
            icon: 'success',
            title: '編輯回覆成功'
          })
        }
        this.dialogVisible = false
      } catch (error) {
        const errorMessage = error.response.data.message
        Toast.fire({
          icon: 'error',
          title: errorMessage ? errorMessage : '無法編輯回覆'
        })
      }
    },
    async removeReponse(id, content) {
      Swal.fire({
        text: `確定要刪除 ${content} 這篇回復嗎?`,
        icon: 'warning',
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: '確定',
        customClass: {
          confirmButton:
            'px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80',
          cancelButton:
            'px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80 mr-5'
        },
        cancelButtonText: '取消',
        reverseButtons: true,
        allowOutsideClick: false,
        heightAuto: false
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const { data } = await responsesAPI.deleteResponse(id)

            if (data.success === true) {
              Toast.fire({
                icon: 'success',
                title: '刪除回覆成功'
              })
              this.article.Responses = this.article.Responses.filter(
                (r) => r.id !== id
              )
            }
          } catch (error) {
            const errorMessage = error.response.data.message
            Toast.fire({
              icon: 'error',
              title: errorMessage ? errorMessage : '無法刪除回覆，請稍後再試'
            })
          }
        }
      })
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  }
}
</script>

<style scoped>
.small-spinner {
  width: 1rem;
  height: 1rem;
}
</style>
