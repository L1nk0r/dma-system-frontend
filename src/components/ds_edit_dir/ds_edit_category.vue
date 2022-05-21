<template>
  <div class="edit_categoty_container" @click="chooseCategory()">
    <input
      type="text"
      v-model="this.name"
      placeholder="Имя категории"
      class="editor_input_field"
      @change="changeCategoryName()"
      v-if="this.isEditeble === true"
    />

    <input
      type="text"
      v-model="this.name"
      placeholder="Имя категории"
      class="editor_input_field"
      @change="changeCategoryName()"
      v-else
      disabled
    />

    <div class="categories_container" v-if="category.elements_type === 'cat'">
      <ds-edit-subcategory
        v-for="sub_cat in category.categories"
        :key="sub_cat.id"
        :subCategory="sub_cat"
        :isEditeble="this.isEditeble"
      />
    </div>

    <div class="categories_container" v-if="category.elements_type === 'que'">
      <ds-edit-question
        v-for="que in category.questions"
        :key="que.id"
        :question="que"
        :isEditeble="this.isEditeble"
      />
    </div>
  </div>
</template>

<script>
import dsEditSubcategory from "./ds_edit_subcategory.vue"
import dsEditQuestion from "./ds_edit_question.vue"
export default {
  name: "editCategory",
  components: {
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
    isEditeble:{
      type: Boolean,
      default: () => {}
    }
  },
  methods: {
    changeCategoryName() {
      this.category.set_name(this.name);
    },
    chooseCategory() {
      /* console.log(this.category.name); */
    },
  },
  computed: {},
  mounted() {
     this.name = this.category.name;
  },
};
</script>
