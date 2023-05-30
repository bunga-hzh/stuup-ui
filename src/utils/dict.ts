import { PERIOD, CALCULATE_TYPE, LEVEL, MILITARY_LEVEL, WHETHER } from './constant';

export const PERIOD_NAMES = {
  [PERIOD.UNLIMITED]: '不限',
  [PERIOD.DAY]: '每天',
  [PERIOD.WEEK]: '每周',
  [PERIOD.MONTH]: '每月',
  [PERIOD.SEMESTER]: '每学期',
  [PERIOD.YEAR]: '每年',
  [PERIOD.THREE_YEAR]: '三年',
};

export const CALCULATE_TYPE_NAMES = {
  [CALCULATE_TYPE.ADD]: '录入加分',
  [CALCULATE_TYPE.SUBTRACT]: '录入减分',
};

export const LEVEL_NAMES = {
  [LEVEL.SCHOOL]: '校级',
  [LEVEL.DISTRICT]: '区（行级）',
  [LEVEL.CITY]: '市级',
  [LEVEL.COUNTRY]: '国家',
  [LEVEL.INTERNATIONAL]: '国际',
};

export const MILITARY_LEVEL_NAMES = {
  [MILITARY_LEVEL.QUALIFIED]: '合格',
  [MILITARY_LEVEL.UNQUALIFIED]: '不合格',
};

export const WHETHER_NAMES = {
  [WHETHER.YES]: '是',
  [WHETHER.NO]: '否',
};
