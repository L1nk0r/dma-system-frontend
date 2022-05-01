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

<style>
.new_subcategoty_container {
  width: 90%;
  padding: 20px;
  margin: 15px;
  border: 1px solid yellow;
  border-radius: 15px;
}

.input_field {
  border: none;
  border-bottom: 2px solid rgba(120, 120, 249, 0);
  font-size: 12px;

  width: 50%;

  transition: 0.4s;

  color: rgba(120, 120, 249, 0.4);
}

.input_field:not(:placeholder-shown) {
  border: none;
  color: black;

  width: 100%;
}

.input_field:focus {
  outline: none;
  border-bottom: 2px solid rgba(120, 120, 249, 0.7);
  width: 50%;

  color: rgba(120, 120, 249, 0.9);

  padding: 5px;
}
</style>
