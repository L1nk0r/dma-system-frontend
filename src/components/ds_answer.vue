<template>
  <div class="answer">
    <input
      type="text"
      class="input_weight"
      v-model="this.weight"
      @change="set_answer_weight()"
    />
    :
    <input
      type="text"
      class="input_field"
      v-model="this.name"
      @change="set_answer_name()"
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
      console.log(this.name);
      this.answer.set_answer(this.name);
    },
    set_answer_weight() {
      console.log(this.weight);
      this.answer.set_weight(this.weight);
    },
  },
};
</script>

<style>
.answer {
  width: 90%;
  padding: 20px;
  margin: 15px;
  border: 1px solid green;
  border-radius: 15px;
}

.input_weight {
  border: 1px solid black;
  width: 15px;
}

.input_weight:focus {
  outline: none;
}

.input_weight:not(:placeholder-shown) {
  border: none;
  color: rgba(63, 63, 63, 0.7);
}
</style>
