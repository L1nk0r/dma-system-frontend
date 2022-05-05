<template>
  <div class="edit_answer">
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
      class="editor_input_field"
      v-model="this.name"
      @change="set_answer_name()"
      placeholder="Ответ"
    />
  </div>
</template>

<script>
export default {
  name: "dsEditAnswer",
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
    set_answer_name() { },
    set_answer_weight() { }
  },
  mounted(){
     this.weight = this.answer.weight;
     this.name = this.answer.text;
  }
};
</script>

<style>
.edit_answer {
  width: 90%;
  padding: 20px;
  margin: 15px;
  
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
