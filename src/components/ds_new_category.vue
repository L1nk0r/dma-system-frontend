<template>
  <div class="new_categoty_container" @click="chooseCategory()">
    <input
      type="text"
      v-model="this.name"
      placeholder="Имя категории"
      class="input_field"
      @change="changeCategoryName()"
    />

    <div class="categories_container" v-if="category.elements_type === 'cat'">
      <ds-sub-category
        v-for="sub_cat in category.categories"
        :key="sub_cat.id"
        :subCategory="sub_cat"
      />
    </div>

    <div class="categories_container" v-if="category.elements_type === 'que'">
      <ds-question
        v-for="que in category.questions"
        :key="que.id"
        :question="que"
      />
    </div>
  </div>
</template>

<script>
import dsSubCategory from "./ds_subcategory.vue";
import dsQuestion from "./ds_question.vue";
export default {
  name: "NewCategory",
  components: {
    dsSubCategory,
    dsQuestion,
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
      /* console.log(this.category.name); */
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style>

</style>
