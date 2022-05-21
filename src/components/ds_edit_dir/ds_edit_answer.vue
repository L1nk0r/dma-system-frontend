<template>
  <div class="edit_answer" v-if="this.isEditeble === true">
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

  <div class="edit_answer" v-else>
    <input
      type="text"
      class="input_weight"
      v-model="this.weight"
      @change="set_answer_weight()"
      placeholder="Вес ответа"
      disabled
    />
    :
    <input
      type="text"
      class="editor_input_field"
      v-model="this.name"
      @change="set_answer_name()"
      placeholder="Ответ"
      disabled
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
    isEditeble:{
      type: Boolean,
      default: () => {}
    }
  },
  methods: {
    set_answer_name() {
      this.answer.set_answer(this.name);
    },
    set_answer_weight() {
      this.answer.set_weight(this.weight);
    },
  },
  mounted(){
     this.weight = this.answer.weight;
     this.name = this.answer.text;
  }
};
</script>
