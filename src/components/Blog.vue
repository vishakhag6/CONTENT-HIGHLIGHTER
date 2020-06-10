<template>
  <div class="container--small">
    <div class="blog" v-if="loading">
      <h1 class="heading">Blog Detail</h1>
      <h2
        class="subheading"
      >You can highlight the text by clicking on tooltip and if you will click on highlighted text then you can get the matched blog list</h2>
      <div class="my-12">
        <router-link to="/" class="button button--text">Back</router-link>
      </div>

      <HighLight @highlight="onHighlight">
        <p v-html="blog.body" id="para" ref="para"></p>
      </HighLight>

      <!-- Preview -->
      <div class="card" v-for="pre in previewObj" :key="pre.id">
        <div class="card__inner">
          <div class="card__header">
            <div class="card__author-img"></div>
            <div>
              <h1 class="card__title">{{ pre.title }}</h1>
              <h2 class="card__author">author</h2>
            </div>
          </div>
          <div class="card__body">{{ pre.body }}</div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <img src="../assets/loader.gif" alt="loader" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import HighLight from "./HighLight";

export default {
  name: "Blog",
  components: {
    HighLight
  },
  data() {
    return {
      loading: false,
      id: this.$route.params.id,
      blog: {},
      highLightArr: [],
      tempArr: [],
      previewObj: []
    };
  },
  created() {
    if (this.blogArr.length <= 0) {
      axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
        this.loading = true;
        this.blogs = response.data.slice(0, 10);
        this.$store.commit("setBlogData", this.blogs);
      });
    }
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${this.id}`)
        .then(response => {
          this.loading = true;
          this.blog = response.data;
        });
      this.loading = false;
    },
    onHighlight(text) {
      if (window.getSelection().rangeCount > 0) {
        if (
          text.match(/[a-z]/i) ||
          text.match(/[A-Z]/i) ||
          text.match(/[0-9]/i)
        ) {
          this.tempArr.push(text);
          this.highLightArr = [...new Set(this.tempArr)];

          const selection = window.getSelection();
          const range = selection.getRangeAt(0);
          if (range && !selection.isCollapsed) {
            if (
              selection.anchorNode.parentNode == selection.focusNode.parentNode
            ) {
              const span = document.createElement("span");
              span.className = "highlight";
              span.appendChild(range.extractContents());
              range.insertNode(span);
              span.onclick = this.previewHandler;
            }
          }
        } else {
          alert("can not be highlighted");
        }
      }
    },
    previewHandler() {
      this.previewObj = this.blogArr.filter(item => {
        for (const key in this.highLightArr) {
          if (item.body.toLowerCase().includes(this.highLightArr[key])) {
            return true;
          }
        }
      });
    }
  },
  computed: {
    ...mapState(["blogArr"])
  }
};
</script>

<style scoped lang="scss">
.card {
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin: 24px 0;

  &__header,
  &__body,
  &__footer {
    padding: 0.75rem 1.25rem;
    color: #333;
  }

  &__header,
  &__footer {
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &__title {
    color: #333;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  &__author {
    color: #666;
    font-size: 13px;

    &-img {
      width: 50px;
      height: 50px;
      background: #666;
      border-radius: 50%;
      margin-right: 12px;
    }
  }

  .edit-icon {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: none;
    margin-left: 12px;
    background: url("../assets/edit.svg") #e1ecf4 no-repeat;
    display: inline-block;
    background-size: 20px;
    background-position: center center;

    &:hover {
      background: url("../assets/edit.svg") #d1e5f1 no-repeat;
      background-size: 20px;
      background-position: center center;
    }
  }

  .delete-icon {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: none;
    margin-left: 12px;
    background: url("../assets/delete.svg") #e1ecf4 no-repeat;
    display: inline-block;
    background-size: 20px;
    background-position: center center;

    &:hover {
      background: url("../assets/delete.svg") #d1e5f1 no-repeat;
      background-size: 20px;
      background-position: center center;
    }
  }
}
</style>

<style>
.highlight {
  background: #f3c1c1;
  border-radius: 4px;
  cursor: pointer;
}

.button--text {
  background: url("../assets/arrow.svg") #e1ecf4 no-repeat 18% center;
  background-size: 20px;
}
</style>