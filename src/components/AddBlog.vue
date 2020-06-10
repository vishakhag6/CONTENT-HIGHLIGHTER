<template>
  <div class="container--small">
    <div class="add-blog">
      <h2 class="heading">Add a new blog post</h2>
      <form>
        <div class="my-12">
          <label>ID</label>
          <input type="text" placeholder="Enter ID" v-model="id" />
        </div>
        <div class="my-12">
          <label>Title</label>
          <input type="text" placeholder="Enter title" v-model="title" />
        </div>
        <div class="my-12">
          <label>Author</label>
          <input type="text" placeholder="Enter author name" v-model="author" />
        </div>
        <div class="my-12">
          <label>Content</label>
          <textarea placeholder="Enter blog content" v-model="content"></textarea>
        </div>
      </form>
      <div class="my-12">
        <button class="button button--primary" @click="create">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "AddBlog",
  data() {
    return {};
  },
  computed: {
    ...mapState(["blogObj", "submitted"]),
    id: {
      get() {
        return this.blogObj.id;
      },
      set(value) {
        this.$store.commit("updateBlogObj", { key: "id", value });
      }
    },
    title: {
      get() {
        return this.blogObj.title;
      },
      set(value) {
        this.$store.commit("updateBlogObj", { key: "title", value });
      }
    },
    author: {
      get() {
        return this.blogObj.author;
      },
      set(value) {
        this.$store.commit("updateBlogObj", { key: "author", value });
      }
    },
    content: {
      get() {
        return this.blogObj.content;
      },
      set(value) {
        this.$store.commit("updateBlogObj", { key: "content", value });
      }
    }
  },
  methods: {
    create() {
      const payload = {
        ...this.blogObj
      };
      axios
        .post(
          `https://jsonplaceholder.typicode.com/posts/${this.blogObj.id}`,
          payload
        )
        .then(value => {
          if (value.status === 201) {
            alert("created successfully");
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
</style>
