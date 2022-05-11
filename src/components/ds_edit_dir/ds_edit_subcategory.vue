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

<style>
.edit_subcategoty_container {
  width: 90%;
  padding: 5px;
  margin: 10px;
  /* border: 1px solid yellow; */
  border-radius: 15px;
}

.editor_input_field {
  border: none;
  border-bottom: 2px solid rgba(120, 120, 249, 0);
  font-size: 17px;

  width: 90%;

  transition: 0.4s;

  color: rgba(120, 120, 249, 0.4);
}

.editor_input_field:not(:placeholder-shown) {
  border: none;
  color: black;

  width: 90%;
}

.editor_input_field:focus {
  outline: none;
  border-bottom: 2px solid rgba(120, 120, 249, 0.7);
  width: 70%;

  color: rgba(120, 120, 249, 0.9);

  padding: 5px;
}
</style>
