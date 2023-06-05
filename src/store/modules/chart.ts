import { defineStore } from 'pinia';
import { storeNames } from '../store-name';
import { data } from '@/views/portrait/data/rank';

export interface ChartState {
  chart1: number[];
  chart2: any[];
  chart3: any[];
}

export const useChartStore = defineStore(storeNames.CHART, {
  state: (): ChartState => {
    return {
      chart1: [65, 34, 78, 45, 87],
      chart2: data,
      chart3: [],
    };
  },
  getters: {
    getChart1(): any[] {
      return this.chart1;
    },
    getChart2(): any[] {
      return this.chart2;
    },
    getChart3(): any[] {
      return this.chart3;
    },
  },
  actions: {
    setChart1(data: number[]) {
      this.chart1 = data;
    },
    setChart2(data: any[]) {
      this.chart2 = data;
    },
    setChart3(data: any[]) {
      this.chart3 = data;
    },
  },
});
