<template>
  <div class="wrapper">
    <!--                         Header                           -->
    <nav>
      <div class="header">
        <h3>Dma-system</h3>
      </div>
      <div class="user_status">
        <p>Logout</p>
      </div>
    </nav>

    <!--                         Tests part                           -->

    <div class="tests">
      <div class="group">
        <h1>Tests</h1>
        <button class="addTest" @click="createTestVisible = true">+</button>

        <!--                     New test                             -->

        <el-dialog v-model="createTestVisible" title="">
          <h1>Создать новый тест</h1>
          <div class="contaner">
            <div class="raw">

              <!-- New test name -->
              <h3>Название теста</h3>
              <input
                type="text"
                class="input_field"
                placeholder="Type here..."
                v-model="this.test_name"
                @change="changeNewTestName()"
              />
            </div>

            <!-- New test description -->
            <div class="raw">
              <h3>Описание</h3>
              <input
                type="text"
                class="input_field"
                id="description"
                placeholder="Type here..."
                v-model="this.test_description"
                @change="changeNewTestDescription()"
              />
            </div>

            <!-- New test responsible user  -->
            <div class="raw">
              <h3>Ответственный</h3>
              <input
                type="text"
                class="input_field"
                placeholder="Type here..."
                v-model="this.test_responsible_user"
                @change="changeNewTestResponsibleUser()"
              />
            </div>

            <!-- New test redactors -->
            <div class="raw">
              <h3>Редакторы</h3>
               <p
                  @click="add_redactor()"
                  class="p">+</p>
               <div 
                class="redactors_container"
                v-if="this.test_redactors_amount > 0">
                  <ds-new-redactor 
                  v-for="red in NEW_TEST.redactors"
                  :key="red"
                  :redactor="red"
               />
               </div>
            </div>

            <div class="raw buttons-container">
              <h3>Вопросы</h3>

              <button class="add_button" @click="add_category()">
                Добавить категрию
              </button>

              <button
                class="add_button"
                @click="leave_category()"
                v-if="this.deep > 0"
              >
                Выйти
              </button>

              <button
                class="add_button"
                @click="add_question()"
                v-if="this.deep > 0"
              >
                Добавить вопрос
              </button>

              <button
                class="add_button"
                @click="add_answer()"
                v-if="this.current_question != null"
              >
                Добавить ответ
              </button>
            </div>

            <div class="questions_container" v-if="this.amount > 0">
              <div v-if="this.current_category != null">
                <p>Current category: {{ this.current_category.name }}</p>
              </div>
              <ds-new-category
                v-for="elem in NEW_TEST.elements"
                :key="elem.id"
                :category="elem"
              />
            </div>
          </div>
        </el-dialog>
      </div>

      <el-select
        v-model="filter"
        class="m-2 filters_input"
        clearable
        placeholder="Filters"
      >
        <el-option
          v-for="item in filters"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
          <span> {{ item.label }} </span>
        </el-option>
      </el-select>

      <div class="tests_container">
        <ds-test-cart v-for="item in TESTS" :key="item" :cart_data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import dsTestCart from "./ds_test_cart.vue";
import dsNewCategory from "./ds_new_category.vue";
import dsNewRedactor from "./ds_new_redactor.vue"
import { mapActions, mapGetters } from "vuex";

import Category from "../elements/category";
import SubCategory from "../elements/subcategory";
import Question from "../elements/question";
import Answer from "../elements/answer";
import Redactor from "../elements/redactor"

export default {
  name: "Profile_tests",
  components: {
    dsTestCart,
    dsNewCategory,
    dsNewRedactor
  },
  data() {
    return {
      filters: [
        {
          label: "Choose filter...",
          value: "CHOOSE_FILTER",
          disabled: true,
        },
        {
          label: "In process",
          value: "IN_PROCESS",
        },
        {
          label: "Done",
          value: "DONE",
        },
        {
          label: "Approved",
          value: "APPROVED",
        },
        {
          label: "Published",
          value: "PUBLISHED",
        },
        {
          label: "Finished",
          value: "FINISHED",
        },
      ],
      filter: "",
      createTestVisible: false,
      deep: 0,
      current_category: null,
      previous_category: null,
      amount: 0,
      test_name: "",
      test_description: "",
      test_responsible_user: "",
      false_type_msg:
        "Sorry, but this category already contain sub categories. To add new question leave this category or add new sub category.",
      current_question: null,
      test_redactors_amount: 0,
    };
  },
  created() {},
  mounted() {
    this.GET_TESTS_FROM_API().then((response) => {
      if (response.data) {
        console.log("Tests arrived!");
      }
    });
  },
  computed: {
    ...mapGetters(["TESTS", "NEW_TEST"]),
  },
  methods: {
    ...mapActions([
      "GET_TESTS_FROM_API",
      "ADD_NEW_ELEMENT_TO_NEW_TEST",
      "SET_NEW_TEST_NAME",
      "SET_NEW_TEST_DESCRIPTION",
      "SET_NEW_TEST_RESPONSIBLE_USER",
      "ADD_NEW_TEST_REDACTOR"
    ]),
    add_category() {
      if (this.current_category === null) {
        let new_cat = new Category(this.amount);
        this.amount++;

        this.ADD_NEW_ELEMENT_TO_NEW_TEST(new_cat);

        this.current_category = new_cat;
        this.previous_category = null;
        this.deep++;
      } else {
        if (this.deep === 2 || this.current_category.elements_type === "que") {
          console.log("Cant add new sub category");
        } else {
          this.current_category.set_elements_type("cat");
          let new_sub_cat = new SubCategory(this.amount);
          this.amount++;

          this.current_category.add_sub_category(new_sub_cat);

          this.previous_category = this.current_category;
          this.current_category = new_sub_cat;

          this.deep = 2;
        }
      }
    },
    leave_category() {
      this.current_category = this.previous_category;
      this.previous_category = null;
      this.current_question = null;
      this.deep--;
    },
    add_question() {
      if (
        this.current_category.elements_type === "" ||
        this.current_category.elements_type === "que"
      ) {
        this.current_category.set_elements_type("que");
        let new_question = new Question();
        this.current_category.add_question(new_question);
        this.current_question = new_question;
      } else {
        console.log(this.false_type_msg);
      }
    },
    add_answer() {
      let new_ans = new Answer();
      this.current_question.add_new_answer(new_ans);
    },
    changeNewTestName() {
      this.SET_NEW_TEST_NAME(this.test_name);
    },
    changeNewTestDescription() {
      this.SET_NEW_TEST_DESCRIPTION(this.test_description);
    },
    changeNewTestResponsibleUser() {
      this.SET_NEW_TEST_RESPONSIBLE_USER(this.test_responsible_user);
    },
    checkType() {
      if (this.current_category.elements_type === "que") {
        return 0;
      } else {
        return 1;
      }
    },
    add_redactor(){
       this.test_redactors_amount ++;
       let new_red = new Redactor();
       this.ADD_NEW_TEST_REDACTOR(new_red);
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap");

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
  width: 100%;

  background-image: url("../assets/background.png");

  flex-direction: column;
  margin: 0px auto;

  align-items: flex-start;
}

.el-dialog {
  width: 70% !important;
}

.raw {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.raw h3 {
  margin-right: 15px;
  width: 200px;
}

.p{
  padding: 5px 5px;
  border: 1px solid red;
  border-radius: 1px;
  margin: 10px;
}

.p:hover{
   cursor: pointer;
}

.input_field {
  border: none;
  border-bottom: 2px solid rgba(120, 120, 249, 0.4);
  font-size: 20px;

  width: 20%;

  transition: 0.4s;

  color: rgba(120, 120, 249, 0.4);
}

.input_field:not(:placeholder-shown) {
  border: none;
  color: black;
  width: 70%;
}

.input_field:focus {
  outline: none;
  border-bottom: 2px solid rgba(120, 120, 249, 0.7);
  width: 40%;

  color: rgba(120, 120, 249, 0.9);

  padding: 5px;
}

.buttons-container {
  display: grid;
  grid-template-columns: 0.6fr 1.3fr 1fr 1fr 1fr;
}

.add_button {
  height: 40px;
  font-size: 18px;

  /* border: 1px solid rgb(120, 120, 249); */
  border: none;
  color: rgba(0, 0, 0, 0.4);

  background: none;

  font-weight: 400;
  font-family: "Montserrat", sans-serif;

  transition: 0.4s;
}

.add_button:hover {
  background-color: rgba(120, 120, 249, 0.2);
  color: rgba(120, 120, 249, 0.7);
  cursor: pointer;
}

.left {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.right {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

nav {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
}

nav .header {
  margin-left: 40px;
  text-align: left;
}

nav .header h3 {
  font-family: Snyder Speed Brush Cyr;
  font-size: 48px;
  color: rgba(191, 159, 128, 0.9);
}

nav .user_status {
  text-align: right;
  margin-right: 20px;
}

.tests .addTest {
  /* float: left; */

  height: 50px;
  width: 50px;

  cursor: pointer;

  background: white;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  color: #bf9f80;

  border: 1px solid #bf9f80;
  border-radius: 7px;

  margin: 30px;
}

.group {
  display: flex;
  align-items: center;
}

.tests {
  width: 76%;
  margin-left: 12%;
  margin-right: 12%;
}

.tests .filters_input {
  height: 30px;

  font-size: 25px;

  transition: 0.4s;
}

.el-select-dropdown__item {
  font-family: "Montserrat", sans-serif;
}

.tests .tests_container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 20px;
}

.questions_container {
  align-content: center;
}

.redactors_container{
  border: 1px solid black;
  border-radius: 15px;
  width: 50%;
}

@font-face {
  font-family: Snyder Speed Brush Cyr;
  src: url("../assets/snyderspeedbrushcyr_regular.ttf");
}
</style>
