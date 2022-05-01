<template>
  <div class="edit_categoty_container" @click="chooseCategory()">
    <input
      type="text"
      v-model="this.name"
      placeholder="Имя категории"
      class="editor_input_field"
      @change="changeCategoryName()"
    />

    <div class="categories_container" v-if="category.elements_type === 'cat'">
      <ds-edit-subcategory
        v-for="sub_cat in category.categories"
        :key="sub_cat.id"
        :subCategory="sub_cat"
      />
    </div>

    <div class="categories_container" v-if="category.elements_type === 'que'">
      <ds-edit-question
        v-for="que in category.questions"
        :key="que.id"
        :question="que"
      />
    </div>
  </div>
</template>

<script>
/* import dsSubCategory from "./ds_subcategory.vue";
import dsQuestion from "./ds_question.vue"; */
import dsEditSubcategory from "./ds_edit_subcategory.vue"
import dsEditQuestion from "./ds_edit_question.vue"
export default {
  name: "editCategory",
  components: {
    /* dsSubCategory,
    dsQuestion, */
    dsEditSubcategory,
    dsEditQuestion
  },
  data() {
    return {
      name: "",
    };
  },
  props: {
    category: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    changeCategoryName() {
      this.category.set_name(this.name);
    },
    chooseCategory() {
      console.log(this.category.name);
    },
  },
  computed: {},
  mounted() {
     this.name = this.category.name;
  },
};
</script>

<style>
.edit_categoty_container {
  width: 90%;
  padding: 20px;
  margin: 15px;
  /* border: 1px solid blue; */
  border-radius: 15px;
}
</style>
