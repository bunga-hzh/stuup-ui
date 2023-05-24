<template>
  <div style="padding: 10px 20px">
    <el-card style="margin: 10px 0">
      <template #header>
        <div class="card-header">
          <span>年份管理</span>
          <el-space>
            <el-button type="primary" @click="fetchList" :loading="loading">查询</el-button>
            <el-button @click="searchFormRef?.resetFields()">清空</el-button>
          </el-space>
        </div>
      </template>
      <el-row>
        <el-col :span="24">
          <el-form ref="searchFormRef" :model="searchForm" label-width="140px">
            <el-row>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="学生姓名/班级名称" prop="key">
                  <el-input v-model="searchForm.key" placeholder="请输入学生姓名/班级名称" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="所属年级" prop="gradeId">
                  <el-select v-model="searchForm.gradeId" placeholder="请选择所属年级" style="width: 100%">
                    <el-option v-for="item in grade_list" :key="item.oid" :label="item.gradeName" :value="item.oid" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="所属专业" prop="majorId">
                  <el-select v-model="searchForm.majorId" placeholder="请选择所属专业" style="width: 100%">
                    <el-option v-for="item in major_list" :key="item.oid" :label="item.majorName" :value="item.oid" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <template #header>
        <div class="card-header">
          <el-space>
            <el-button type="primary" @click="addRow">
              <el-icon><Plus /></el-icon>
              添加
            </el-button>
          </el-space>
          <el-space>
            <el-button :disabled="loading" circle @click="fetchList">
              <el-icon><Refresh /></el-icon>
            </el-button>
          </el-space>
        </div>
      </template>

      <el-table :data="tableData" border stripe v-loading="loading" empty-text="空空如也~~" style="width: 100%">
        <el-table-column prop="studentNo" label="学号" show-overflow-tooltip align="center" />
        <el-table-column prop="name" label="学生姓名" show-overflow-tooltip align="center" />
        <el-table-column prop="sex" label="性别" show-overflow-tooltip align="center" />
        <el-table-column prop="className" label="所属班级" show-overflow-tooltip align="center" />
        <el-table-column prop="gradeName" label="所属年级" show-overflow-tooltip align="center" />
        <el-table-column prop="majorName" label="所属专业" show-overflow-tooltip align="center" />
        <el-table-column prop="idCard" label="身份证号" show-overflow-tooltip align="center" />
        <el-table-column prop="nation" label="民族" show-overflow-tooltip align="center" />
        <el-table-column prop="phone" label="联系方式" show-overflow-tooltip align="center" />
        <el-table-column prop="status" label="学业状态" show-overflow-tooltip align="center" />
        <!-- <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button @click="updateRow(row)">修改</el-button>
            <el-button @click="delRow(row.oid)" type="danger">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="page-box">
        <el-pagination
          background
          :total="page.total"
          v-model:current-page="page.current"
          v-model:page-size="page.size"
          :page-sizes="[10, 20, 30, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next" />
      </div>
    </el-card>
  </div>
  <el-dialog v-model="dialog_active" :title="dialog_title" width="500" draggable @close="resetForm">
    <el-form ref="formRef" :model="form" :rules="rules" :disabled="loading" label-position="top">
      <el-form-item label="学号" prop="studentNo">
        <el-input v-model="form.studentNo" placeholder="请输入学号" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="1" border>男</el-radio>
          <el-radio label="2" border>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属班级" prop="classId">
        <el-select v-model="form.classId" placeholder="请选择所属班级" style="width: 100%"></el-select>
      </el-form-item>
      <el-form-item label="所属年级" prop="gradeId">
        <el-select v-model="form.gradeId" placeholder="请选择所属年级" style="width: 100%"></el-select>
      </el-form-item>
      <el-form-item label="所属专业" prop="majorId">
        <el-select v-model="form.majorId" placeholder="请选择所属专业" style="width: 100%"></el-select>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="form.idCard" placeholder="请输入身份证号" />
      </el-form-item>
      <el-form-item label="民族" prop="nation">
        <el-select v-model="form.nation" placeholder="请选择民族" style="width: 100%"></el-select>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="学业状态" prop="statue">
        <el-select v-model="form.statue" placeholder="请选择学业状态" style="width: 100%"></el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialog_active = false">
        <el-icon><Close /></el-icon>
        取消
      </el-button>
      <el-button type="primary" :loading="loading" @click="submitForm">
        <el-icon><Check /></el-icon>
        提交
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { getStudentPage, saveStudent, StudentVO } from '@/api/basic/student/index';
import { GradeDictVO, getGraderList } from '@/api/basic/grade/index';
import { MajorDictVO, getMajorList } from '@/api/basic/major/index';
import { ElMessage } from 'element-plus';

onMounted(() => {
  initGradeList();
  initMajorList();
  fetchList();
});

// 字典
const grade_list = ref<GradeDictVO[]>();
const major_list = ref<MajorDictVO[]>();

const loading = ref<boolean>(false);
const dialog_active = ref<boolean>(false);
const dialog_title = ref<string>('');
const tableData = ref<StudentVO[]>();
const page = ref({
  current: 1,
  size: 10,
  total: 10,
});
const searchForm = ref({
  key: '',
  gradeId: undefined,
  majorId: undefined,
});
const form = ref<StudentVO>({
  oid: undefined,
  studentNo: '',
  name: '',
  sex: undefined,
  classId: undefined,
  gradeId: undefined,
  majorId: undefined,
  idCard: '',
  nation: undefined,
  phone: '',
  statue: undefined,
});
const rules = reactive<FormRules>({
  studentNo: [{ required: true, message: '请填写学号', trigger: 'blur' }],
  name: [{ required: true, message: '请填写学生姓名', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  classId: [{ required: true, message: '请选择所属班级', trigger: 'blur' }],
  gradeId: [{ required: true, message: '请选择所属年级', trigger: 'blur' }],
  majorId: [{ required: true, message: '请选择所属专业', trigger: 'blur' }],
  idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
  nation: [{ required: true, message: '请选择民族', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
  statue: [{ required: true, message: '请选择学业状态', trigger: 'blur' }],
});
const searchFormRef = ref<FormInstance>();
const formRef = ref<FormInstance>();

const initGradeList = async () => {
  const { data: res } = await getGraderList();
  grade_list.value = res;
};
const initMajorList = async () => {
  const { data: res } = await getMajorList();
  major_list.value = res;
};

const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getStudentPage(Object.assign(page.value, searchForm.value));
    page.value.total = res.total;
    tableData.value = res.records;
  } finally {
    loading.value = false;
  }
};

const handleCurrentChange = (val: number) => {
  page.value.current = val;
  fetchList();
};
const handleSizeChange = (val: number) => {
  page.value.size = val;
  fetchList();
};

const addRow = () => {
  dialog_title.value = '添加';
  dialog_active.value = true;
};
const updateRow = (row: StudentVO) => {
  dialog_title.value = '修改';
  dialog_active.value = true;
  form.value.oid = row.oid;
  form.value.studentNo = row.studentNo;
  form.value.name = row.name;
  form.value.sex = row.sex;
  form.value.classId = row.classId;
  form.value.gradeId = row.gradeId;
  form.value.majorId = row.majorId;
  form.value.idCard = row.idCard;
  form.value.nation = row.nation;
  form.value.phone = row.phone;
  form.value.statue = row.statue;
};
const delRow = (oid: number) => {
  console.log(oid);
};

const submitForm = async () => {
  if (!formRef) return;
  const valid = await formRef.value?.validate();
  if (!valid) return;
  loading.value = true;
  try {
    const data = form.value as unknown as StudentVO;
    const res = await saveStudent(data);
    ElMessage.success(res.message);
    dialog_active.value = false;
    fetchList();
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  form.value = {
    oid: undefined,
    studentNo: '',
    name: '',
    sex: undefined,
    classId: undefined,
    gradeId: undefined,
    majorId: undefined,
    idCard: '',
    nation: undefined,
    phone: '',
    statue: undefined,
  };
  formRef.value?.resetFields();
};
</script>
