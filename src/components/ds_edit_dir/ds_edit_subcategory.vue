<template>
  <div class="edit_subcategoty_container">
    <input
      type="text"
      v-model="this.name"
      placeholder="Имя подкатегории"
      class="editor_input_field"
      @change="changeCategoryName()"
      v-if="this.isEditeble === true"
    />

    <input
      type="text"
      v-model="this.name"
      placeholder="Имя подкатегории"
      class="editor_input_field"
      @change="changeCategoryName()"
      v-else
      disabled
    />

    <ds-edit-question
      v-for="ques in subCategory.questions"
      :key="ques.id"
      :question="ques"
      :isEditeble="this.isEditeble"
    />
  </div>
</template>

<script>
import dsEditQuestion from "./ds_edit_question.vue"
export default {
  name: "editSubCategory",
  components: {
    dsEditQuestion
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
    isEditeble:{
      type: Boolean,
      default: () => {}
    }
  },
  methods: {
    changeCategoryName() {
      this.subCategory.set_name(this.name);
    }
  },
  mounted() {
     this.name = this.subCategory.name;
  },
};
</script>
