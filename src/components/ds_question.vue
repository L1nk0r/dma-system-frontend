<template>
  <div class="question">
    <input
      v-model="this.name"
      placeholder="type here..."
      class="input_field"
      @change="changeQuestionName()"
    />

    <!--               Answers                -->

    <ds-answer v-for="ans in question.answers" :key="ans.id" :answer="ans" />
  </div>
</template>

<script>
import dsAnswer from "./ds_answer.vue";
export default {
  name: "dsQuestion",
  components: {
    dsAnswer,
  },
  data() {
    return {
      name: "",
    };
  },
  props: {
    question: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    changeQuestionName() {
      this.question.set_question(this.name);
    },
  },
  mounted() {},
  computed: {},
};
</script>

<style>
.question {
  width: 90%;
  padding: 20px;
  margin: 15px;
  border: 1px solid red;
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
  width: 70%;

  color: rgba(120, 120, 249, 0.9);

  padding: 5px;
}
</style>
