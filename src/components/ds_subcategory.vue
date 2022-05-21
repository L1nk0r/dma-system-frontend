<template>
  <div class="new_subcategoty_container">
    <input
      v-model="this.name"
      placeholder="Имя подкатегории"
      class="input_field"
      @change="changeCategoryName()"
    />

    <ds-question
      v-for="ques in subCategory.questions"
      :key="ques.id"
      :question="ques"
    />
  </div>
</template>

<script>
import dsQuestion from "./ds_question.vue";

export default {
  name: "SubCategory",
  components: {
    dsQuestion,
  },
  data() {
    return {
      name: "",
    };
  },
  props: {
    subCategory: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    changeCategoryName() {
      this.subCategory.set_name(this.name);
    },
  },
  mounted() {},
};
</script>

