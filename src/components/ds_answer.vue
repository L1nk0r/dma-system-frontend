<template>
  <div class="answer">
    <input
      type="text"
      class="input_weight"
      v-model="this.weight"
      @change="set_answer_weight()"
      placeholder="Вес ответа"
    />
    :
    <input
      type="text"
      class="input_field"
      v-model="this.name"
      @change="set_answer_name()"
      placeholder="Ответ"
    />
  </div>
</template>

<script>
export default {
  name: "dsAnswer",
  data() {
    return {
      weight: "",
      name: "",
    };
  },
  props: {
    answer: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    set_answer_name() {
      this.answer.set_answer(this.name);
    },
    set_answer_weight() {
      this.answer.set_weight(this.weight);
    },
  },
};
</script>

