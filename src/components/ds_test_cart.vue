<template>
  <div class="cart" @click="modalVisible = true">
    <div class="cart_header">
      <h3>{{ cart_data.name }}</h3>

      <el-tag v-if="this.getStatus() === 'Closed'" type="success">
        Closed
      </el-tag>

      <el-tag v-if="this.getStatus() === 'Published'" type="info">
        Published
      </el-tag>

      <el-tag
        v-if="
          this.getStatus() === 'In process' || this.getStatus() === 'Approved'
        "
      >
        {{ this.getStatus() }}
      </el-tag>
    </div>
    <div class="description">
      <p>
        {{ cart_data.description }}
      </p>
    </div>
    <div class="test_progress" v-if="this.getStatus() === 'Published'">
      <p>
        {{ this.getPeopleAmount() }}
      </p>
    </div>
  </div>

  <el-dialog v-model="modalVisible" title="Edit test">
    <div class="test_edit_container">
      <el-steps :active="this.active" finish-status="success">
        <el-step
          title="In process"
          @click="setStatus('IN_PROCESS')"
          class="step"
        />
        <el-step title="Approved" @click="setStatus('APPROVED')" class="step" />
        <el-step
          title="Published"
          @click="setStatus('PUBLISHED')"
          class="step"
        />
        <el-step title="Closed" @click="setStatus('CLOSED')" class="step" />
      </el-steps>
      <h1>{{ cart_data.name }}</h1>
      <p class="desc_p">{{ cart_data.description }}</p>
      <div class="desc_p">
        Responsible user:
        <div class="br">{{ cart_data.responsible.login }}</div>
      </div>
      <h4>Redactors:</h4>
      <ul class="zebra">
        <li v-for="item in cart_data.redactors" :key="item">
          {{ item.login }}
        </li>
      </ul>
      <div class="questions_container" v-if="cart_data.test_status != 'CLOSED'">
        <ds-edit-category
          v-for="elem in cart_data.categories"
          :key="elem.id"
          :category="elem"
          :isEditeble="this.isEditeble"
        />
      </div>
      <button
        class="submitBtn"
        @click="saveEditedTest()"
        v-if="this.isEditeble === true"
      >
        Save
      </button>

      <button
        class="submitBtn"
        @click="analyzeVisible = true"
        v-if="this.cart_data.test_status === 'CLOSED'"
      >
        Analyze
      </button>

      <el-dialog v-model="analyzeVisible" title="Test analyze">
        <RadarChart :chartData="this.getDataSet()" />
      </el-dialog>
    </div>
  </el-dialog>
</template>

<script>
import dsEditCategory from "./ds_edit_dir/ds_edit_category.vue";
import RadarChart from "./chart_elements/ds_radar_chart.ts";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import authHeader from "../services/auth-header"
export default {
  name: "testCart",
  components: {
    dsEditCategory,
    RadarChart,
  },
  data() {
    return {
      modalVisible: false,
      form: "",
      active: 2,
      isEditeble: true,
      analyzeVisible: false,
    };
  },
  props: {
    cart_data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(["getServerUrl", "ANALYZE"]),
  },
  methods: {
    ...mapActions(["GET_TEST_ANALYZE_DATA_FROM_API"]),
    getQuestionsAmount() {
      return this.cart_data.questins.length;
    },
    getPeopleAmount() {
      return this.cart_data.already_finished + "/" + this.getAllUsersAmount();
    },
    getStatus() {
      let s = this.cart_data.test_status;
      if (s === "IN_PROCESS") {
        this.isEditeble = true;
        this.active = 0;
        return "In process";
      } else if (s === "CLOSED") {
        this.isEditeble = false;
        this.active = 3;
        return "Closed";
      } else if (s === "APPROVED") {
        this.isEditeble = true;
        this.active = 1;
        return "Approved";
      } else {
        this.isEditeble = false;
        this.active = 2;
        return "Published";
      }
    },
    saveEditedTest() {
      const data = this.getData();
      const config = {
        headers: authHeader()
      };
      axios
        .put(`${this.getServerUrl}/test`, data, config)
        .then((response) => (this.testId = response.data.id))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    getData() {
      let today = new Date().toISOString().slice(0, 10);

      const data = {
        name: this.cart_data.name,
        description: this.cart_data.description,
        creator: this.cart_data.creator,
        responsible: this.cart_data.responsible,
        test_status: this.cart_data.test_status,
        redactors: this.cart_data.redactors,
        creation_date: this.cart_data.creation_date,
        passing: this.cart_data.passing,
        categories: this.cart_data.categories,
        last_modified_date: today,
        last_modified_person: "<ThisUserLogin>",
      };

      return data;
    },
    setStatus(str) {
      this.cart_data.setStatus(str);
    },
    getAllUsersAmount() {
      return this.cart_data.passing.length;
    },
    getDataSet() {
      const chartData = {
        labels: this.cart_data.analyze.lables,
        datasets: [
          {
            label: "Test analyze",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: this.cart_data.analyze.stats,
          },
        ],
      };

      return chartData;
    },
  },
  created() {},
  mounted() {
    /* this.GET_TEST_ANALYZE_DATA_FROM_API(this.cart_data.id); */
  },
};
</script>
