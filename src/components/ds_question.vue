<template>
  <div class="question">
    <input
      v-model="this.name"
      placeholder="Вопрос"
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

