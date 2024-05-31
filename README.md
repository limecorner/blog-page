# iBlog
iBlog 是一個簡單版的 blog，前端框架使用 Vue，搭配 Tailwind CSS、Meraki UI、Element UI，對應的後端 [repo](https://github.com/limecorner/blog-backend)。

## 功能
### 一般使用者:
- 使用者可以 註冊/登入/登出
- 使用者可以 新增/刪除/修改/查看 文章 
- 使用者可以 新增/刪除/修改/查看 回覆 (某篇文章的回覆) 
- 使用者可以 追蹤/取消追蹤 其他使用者

### 可使用帳號:
Email | Password | 使用者名稱 | 權限
--- | --- | --- | ---
blue@gmail.com | 123 | 藍秋 | login


## 開始使用

1. 請先確認有安裝 [node.js](https://nodejs.org/en/download/)
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：

  ```
  $ npm install
  ```

4. 安裝完畢後，繼續輸入：

  ```
  $ npm run serve
  ```
  
5. 若看見這些訊息則代表順利運行
  ```
  Done Compiled successfully in xxxx ms

  App running at:
  - Local:   http://localhost:8080/
  - Network: http://x.x.x.x:8080/
  ```

6. 複製 Local 端網址，貼到瀏覽器，即可進行開發

7. 欲暫停使用

  ```
  ctrl + c
  ```

## Contributor
* [李建賦](https://github.com/limecorner)