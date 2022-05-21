<template>
  <div class="edit_question">
    <input
      type="text"
      v-model="this.name"
      placeholder="Вопрос"
      class="editor_input_field"
      @change="changeQuestionName()"
      v-if="this.isEditeble === true"
    />

    <input
      type="text"
      v-model="this.name"
      placeholder="Вопрос"
      class="editor_input_field"
      @change="changeQuestionName()"
      v-else
      disabled
    />

    <!--               Answers                -->

    <ds-edit-answer 
      v-for="ans in question.answers" 
      :key="ans.id" 
      :answer="ans"
      :isEditeble="this.isEditeble" />
  </div>
</template>

<script>
import dsEditAnswer from "./ds_edit_answer.vue"
export default {
  name: "dsEditQuestion",
  components: {
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
    isEditeble:{
      type: Boolean,
      default: () => {}
    }
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
