<template>
  <div class="new_categoty_container" @click="chooseCategory()">
    <input
      type="text"
      v-model="this.name"
      placeholder="type here..."
      class="input_field"
      @change="changeCategoryName()"
    />

    <div class="categories_container" v-if="category.elements_type === 'cat'">
      <ds-sub-category
        v-for="sub_cat in category.elements"
        :key="sub_cat.id"
        :subCategory="sub_cat"
      />
    </div>

    <div class="categories_container" v-if="category.elements_type === 'que'">
      <ds-question
        v-for="que in category.elements"
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
      console.log(this.category.name);
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style>
.new_categoty_container {
  width: 90%;
  padding: 20px;
  margin: 15px;
  border: 1px solid blue;
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
