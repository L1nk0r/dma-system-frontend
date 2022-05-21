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
              <p @click="add_redactor()" class="p">+</p>
              <div
                class="redactors_container"
                v-if="this.test_redactors_amount > 0"
              >
                <ds-new-redactor
                  v-for="red in NEW_TEST.redactors"
                  :key="red"
                  :redactor="red"
                />
              </div>
            </div>

            <!-- New test recipients input-file field -->

            <div class="raw">
              <el-popover
                placement="top-start"
                title="Файлы"
                :width="200"
                trigger="hover"
                content="Пожалуйста, используйте только файлы формата .txt"
              >
                <template #reference>
                  <h3>Получатели</h3>
                </template>
              </el-popover>
              <input
                type="file"
                accept=".txt"
                placeholder="Add file"
                id="recInput"
                ref="recFiles"
                @change="handleFiles()"
                multiple
              />
            </div>

            <!-- New test main elements -->

            <div class="raw buttons-container">
              <h3>Вопросы</h3>

              <button class="add_button" @click="add_category()">
                Добавить категорию
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
                v-for="elem in NEW_TEST.categories"
                :key="elem.id"
                :category="elem"
              />
            </div>

            <button @click="submitForm()" class="submitBtn">Submit</button>
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
import dsNewRedactor from "./ds_new_redactor.vue";
import { mapActions, mapGetters } from "vuex";

import Category from "../elements/category";
import SubCategory from "../elements/subcategory";
import Question from "../elements/question";
import Answer from "../elements/answer";
import Redactor from "../elements/redactor";

export default {
  name: "Profile_tests",
  components: {
    dsTestCart,
    dsNewCategory,
    dsNewRedactor,
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
          label: "Approved",
          value: "APPROVED",
        },
        {
          label: "Published",
          value: "PUBLISHED",
        },
        {
          label: "Closed",
          value: "CLOSED",
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
      test_commentators_amount: 0,
      file_res: "",
      testId: null,
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
    ...mapGetters(["TESTS", "NEW_TEST", "getServerUrl"]),
  },
  methods: {
    ...mapActions([
      "GET_TESTS_FROM_API",
      "ADD_NEW_ELEMENT_TO_NEW_TEST",
      "SET_NEW_TEST_NAME",
      "SET_NEW_TEST_DESCRIPTION",
      "SET_NEW_TEST_RESPONSIBLE_USER",
      "ADD_NEW_TEST_REDACTOR",
      "ADD_NEW_TEST_NEW_RECIPIENT",
      "REMOVE_ALL_NEW_TEST_RECIPIENTS",
      "SET_NEW_TEST_CREACTION_DATE",
      "SET_NEW_TEST",
    ]),
    add_category() {
      if (this.current_category === null) {
        let new_cat = new Category(undefined);
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
          let new_sub_cat = new SubCategory();
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
      let resp = new Redactor();
      resp.set_login(this.test_responsible_user);
      this.SET_NEW_TEST_RESPONSIBLE_USER(resp);
    },
    add_redactor() {
      this.test_redactors_amount++;
      let new_red = new Redactor();
      this.ADD_NEW_TEST_REDACTOR(new_red);
    },
    print_str(str) {
      this.ADD_NEW_TEST_NEW_RECIPIENT(str);
    },
    handleFiles() {
      this.REMOVE_ALL_NEW_TEST_RECIPIENTS();
      if (this.$refs.recFiles === undefined) {
        console.log("no file");
      } else {
        let upload = this.$refs.recFiles;

        let reader = new FileReader();
        reader.onload = function () {
          let res = reader.result;
          let string_arr = res.split("\n");
          for (let i = 0; i < string_arr.length; i++) {
            this.print_str(string_arr[i]);
          }
        }.bind(this);

        reader.onerror = function () {
          console.log(reader.error);
        };

        reader.readAsText(upload.files[0]);
      }
    },
    submitForm() {
      let today = new Date().toISOString().slice(0, 10);
      this.SET_NEW_TEST_CREACTION_DATE(today);

      this.SET_NEW_TEST();
    },
  },
};
</script>
