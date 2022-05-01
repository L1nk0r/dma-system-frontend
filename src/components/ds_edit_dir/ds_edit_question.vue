<template>
  <div class="edit_question">
    <input
      v-model="this.name"
      placeholder="Вопрос"
      class="editor_input_field"
      @change="changeQuestionName()"
    />

    <!--               Answers                -->

    <ds-edit-answer v-for="ans in question.answers" :key="ans.id" :answer="ans" />
  </div>
</template>

<script>
/* import dsAnswer from "./ds_answer.vue"; */
import dsEditAnswer from "./ds_edit_answer.vue"
export default {
  name: "dsEditQuestion",
  components: {
    /* dsAnswer, */
    dsEditAnswer
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
  mounted() {
     this.name = this.question.question;
  },
  computed: {},
};
</script>

<style>
.edit_question {
  width: 90%;
  padding: 20px;
  margin: 15px;
  /* border: 1px solid red; */
  border-radius: 15px;
}
</style>
