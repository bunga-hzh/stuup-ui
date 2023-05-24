import { ApiResult, get, post, del } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface GrowthTreeVO {
  id?: number;
  pid?: number;
  name: string;
  description?: string;
  sort: number;
  children?: GrowthTreeVO[] | [];
}

export interface GrowthVO {
  id?: number;
  pid?: number;
  name: string;
  description?: string;
  sort?: number;
}

export interface CrowthItemVO {
  id?: number;
  growthId?: number;
  name: string;
  description?: string;
  fillPeriod?: number;
  fillPeriodNum?: number;
  scorePeriod?: number;
  scoreUpperLimit?: number;
  calculateType?: number;
  score?: number;
}

export const getGrowthTree = async (): Promise<ApiResult<GrowthTreeVO[]>> => {
  return await get('/growth/tree');
};

export const saveOrUpdateGrowth = async (data: GrowthVO): Promise<ApiResult<number>> => {
  return await post('/growth/saveOrUpdate', data);
};

export const delGrowth = async (id: number) => {
  return await post('/growth/del/' + id);
};

export const getGrowthItemPage = async (params: Page): Promise<ApiResult<PageResult<CrowthItemVO[]>>> => {
  return await get('/growthItem/page', params);
};

export const saveOrUpdateGrowthItem = async (data: CrowthItemVO): Promise<ApiResult<number>> => {
  return await post('/growthItem/saveOrUpdate', data);
};

export const delGrowthItem = async (id: number) => {
  return await del('/growthItem/del/' + id);
};
