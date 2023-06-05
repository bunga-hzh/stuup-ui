<template>
  <div class="bunga-portrait">
    <div class="bunga-portrait-header">
      <el-avatar :size="150" :src="avatar" />
      <p class="bunga-portrait-header__name">
        张三
        <el-tag size="mini">男</el-tag>
      </p>
      <p class="bunga-portrait-header__class">
        <span>班级：</span>
        二年三班
        <br />
        <span>班主任：</span>
        李四
      </p>
      <p class="bunga-portrait-header__major">
        <span>专业名称：</span>
        专业一
      </p>
    </div>

    <div class="bunga-portrait-content">
      <div class="bunga-portrait-content__info">
        <el-descriptions
          title="用户信息"
          :column="5"
          direction="vertical"
          label-class-name="lebel"
          content-class-name="value">
          <el-descriptions-item label="班主任">李四</el-descriptions-item>
          <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
          <el-descriptions-item label="学习成绩">100分</el-descriptions-item>
          <el-descriptions-item label="学习课程">测试数据</el-descriptions-item>
          <el-descriptions-item label="上学期课程成绩">100分</el-descriptions-item>
          <el-descriptions-item label="德育" :label-style="labelStyle">100分</el-descriptions-item>
          <el-descriptions-item label="智育" :label-style="labelStyle">100分</el-descriptions-item>
          <el-descriptions-item label="体育" :label-style="labelStyle">100分</el-descriptions-item>
          <el-descriptions-item label="美育" :label-style="labelStyle">100分</el-descriptions-item>
          <el-descriptions-item label="劳育" :label-style="labelStyle">100分</el-descriptions-item>
        </el-descriptions>
        <el-row style="margin-top: 10px">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-card>
              <span style="font-size: 20px; font-weight: bold">当前学期心理评测结果：</span>
              100分
              <p style="margin-top: 5px">你很棒👍,要保持哦❗</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div id="radar-chart" class="bunga-portrait-content__radar" />
    </div>

    <div class="bunga-portrait-footer">
      <div class="bunga-portrait-footer__rank">
        <el-table :data="chartStore.getChart2" border height="400">
          <el-table-column prop="index" label="排名" align="center" />
          <el-table-column prop="name" label="专业" align="major" />
          <el-table-column prop="class" label="班级" align="center" />
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="value" label="分数" align="center"></el-table-column>
        </el-table>
      </div>
      <div id="line-chart" class="bunga-portrait-footer__score" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import avatar from '@/assets/flower_icons/bm_cg.png';
import * as echarts from 'echarts';
import { useChartStore } from '@/store/modules/chart';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

const chartStore = useChartStore();
const labelStyle = ref({ paddingTop: '100px' });

const now = ref();
const value = ref();
const oneDay = ref();

const randomData = () => {
  now.value = new Date(+now.value + oneDay.value);
  value.value = value.value + Math.random() * 21 - 10;
  return {
    name: now.value.toString(),
    value: [
      [now.value.getFullYear(), now.value.getMonth() + 1, now.value.getDate()].join('/'),
      Math.round(value.value),
    ],
  };
};

onMounted(() => {
  initRadarChart();
  initLineChart();
});

const initRadarChart = () => {
  const charts = echarts.init(document.querySelector('#radar-chart') as HTMLDivElement);
  charts.setOption({
    title: {
      show: true,
      text: '德智体美劳',
      textStyle: {
        color: '#409EFF',
        fontWeight: 'bold',
        fontSize: 16,
      },
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ['得分'],
    },
    radar: {
      indicator: [
        { name: '德育', max: 100 },
        { name: '智育', max: 100 },
        { name: '体育', max: 100 },
        { name: '美育', max: 100 },
        { name: '劳育', max: 100 },
      ],
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: chartStore.getChart1,
            name: '得分',
          },
        ],
        label: {
          show: true,
          formatter: '{c}分',
          align: 'top',
          verticalAlign: 'middle',
          position: 'insideTop',
          fontWeight: 'bold',
        },
      },
    ],
  });
};

const initLineChart = () => {
  let data = [];
  now.value = new Date(1997, 9, 3);
  oneDay.value = 24 * 3600 * 1000;
  value.value = Math.random() * 1000;
  for (var i = 0; i < 1000; i++) {
    data.push(randomData());
  }

  const charts = echarts.init(document.querySelector('#line-chart') as HTMLDivElement);
  charts.setOption({
    title: {
      show: true,
      text: '得分情况',
      textStyle: {
        color: '#409EFF',
        fontWeight: 'bold',
        fontSize: 16,
      },
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        params = params[0];
        var date = new Date(params.name);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
      },
      axisPointer: {
        animation: false,
      },
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        showSymbol: false,
        data: data,
      },
    ],
  });

  setInterval(() => {
    for (var i = 0; i < 5; i++) {
      data.shift();
      data.push(randomData());
    }
    charts.setOption({
      series: [
        {
          data: data,
        },
      ],
    });
  }, 1000);
};
</script>

<style lang="scss" scoped>
@include b(portrait) {
  background-color: white;
  margin: 20px;

  @include b(portrait-header) {
    text-align: center;
    @include e(name) {
      font-size: 1.5rem;
      font-weight: bold;
      color: #40485b;

      .el-tag {
        margin-left: 15px;
      }
    }
    @include e(class) {
      font-size: 1rem;
      color: #464b5b;

      span {
        font-weight: bold;
      }
    }
    @include e(major) {
      font-size: 1rem;
      color: gray;
      span {
        font-weight: bold;
      }
    }
  }

  @include b(portrait-content) {
    margin: 20px;
    padding: 20px;
    display: flex;
    height: 400px;
    border: 1px solid #eee;
    border-radius: 8px;

    @include e(info) {
      flex: 2;
      height: 100%;
    }

    @include e(radar) {
      flex: 1;
      height: 100%;
    }
  }

  @include b(portrait-footer) {
    display: flex;
    height: 400px;

    @include e(rank) {
      flex: 1;
      height: 100%;
      border: 1px solid #eee;
      margin: 0px 10px 0 20px;
      overflow: hidden;
    }
    @include e(score) {
      flex: 2;
      height: 100%;
      border: 1px solid #eee;
      margin: 0px 20px 0 10px;
    }
  }
}
</style>
