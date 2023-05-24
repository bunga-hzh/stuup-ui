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
          <el-form ref="searchFormRef" :model="searchForm" label-width="80px">
            <el-row>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="教师姓名" prop="key">
                  <el-input v-model="searchForm.key" placeholder="请输入教师姓名" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="所属系部" prop="facultyId">
                  <el-select v-model="searchForm.facultyId" placeholder="请选择所属系部" style="width: 100%">
                    <el-option
                      v-for="item in faculty_list"
                      :key="item.oid"
                      :label="item.facultyName"
                      :value="item.oid" />
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
            <!-- <el-button type="primary" @click="addRow">
              <el-icon><Plus /></el-icon>
              添加
            </el-button> -->
          </el-space>
          <el-space>
            <el-button :disabled="loading" circle @click="fetchList">
              <el-icon><Refresh /></el-icon>
            </el-button>
          </el-space>
        </div>
      </template>

      <el-table :data="tableData" border stripe v-loading="loading" empty-text="空空如也~~" style="width: 100%">
        <el-table-column prop="jobNo" label="教师工号" show-overflow-tooltip align="center" />
        <el-table-column prop="name" label="教师姓名" show-overflow-tooltip align="center" />
        <!-- TODO 字典 -->
        <el-table-column prop="sex" label="性别" show-overflow-tooltip align="center" />
        <el-table-column prop="facultyName" label="所属系部" show-overflow-tooltip align="center" />
        <el-table-column prop="teachGroupName" label="教研组" show-overflow-tooltip align="center" />
        <el-table-column prop="phone" label="联系方式" show-overflow-tooltip align="center" />
        <el-table-column prop="idCard" label="身份证号" show-overflow-tooltip align="center" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip align="center" />
        <!-- TODO 字典 -->
        <el-table-column prop="state" label="状态" show-overflow-tooltip align="center" />
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
      <el-form-item label="教师工号" prop="jobNo">
        <el-input v-model="form.jobNo" placeholder="请输入教师工号" />
      </el-form-item>
      <el-form-item label="教师姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入教师姓名" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="1" border>男</el-radio>
          <el-radio label="2" border>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属系部" prop="facultyId">
        <el-select v-model="form.facultyId" placeholder="请选择所属系部"></el-select>
      </el-form-item>
      <el-form-item label="教研组" prop="teachGroup">
        <el-select v-model="form.teachGroup" placeholder="请选择教研组"></el-select>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入联系方式" />
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="form.idCard" placeholder="请输入身份证号" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入地址" />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="form.state">
          <el-radio label="1" border>在职</el-radio>
          <el-radio label="2" border>停职</el-radio>
        </el-radio-group>
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
import { getTeacherPage, saveTeacher, TeacherVO } from '@/api/basic/teacher/index';
import { FacultyDictVO, getFacultyList } from '@/api/basic/faculty/index';
import { ElMessage } from 'element-plus';

onMounted(() => {
  fetchFacultyList();
  fetchList();
});

// 字典值
const faculty_list = ref<FacultyDictVO[]>();

const loading = ref<boolean>(false);
const dialog_active = ref<boolean>(false);
const dialog_title = ref<string>('');
const tableData = ref<TeacherVO[]>();
const page = ref({
  current: 1,
  size: 10,
  total: 10,
});
const searchForm = ref({
  key: '',
  facultyId: '',
});
const form = ref<TeacherVO>({
  jobNo: '',
  name: '',
  sex: undefined,
  facultyId: undefined,
  teachGroup: undefined,
  phone: '',
  idCard: '',
  address: '',
  state: undefined,
});
const rules = reactive<FormRules>({
  jobNo: [{ required: true, message: '请填写教师工号', trigger: 'blur' }],
  name: [{ required: true, message: '请填写教师姓名', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择教师性别', trigger: 'blur' }],
  facultyId: [{ required: true, message: '请选择所属系部', trigger: 'blur' }],
  teachGroup: [{ required: true, message: '请选择教研组', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
  idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  state: [{ required: true, message: '请选择专业状态', trigger: 'blur' }],
});
const searchFormRef = ref<FormInstance>();
const formRef = ref<FormInstance>();

const fetchFacultyList = async () => {
  const { data: res } = await getFacultyList();
  faculty_list.value = res;
};

const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getTeacherPage(Object.assign(page.value, searchForm.value));
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
const updateRow = (row: TeacherVO) => {
  dialog_title.value = '修改';
  dialog_active.value = true;
  form.value.oid = row.oid;
  form.value.jobNo = row.jobNo;
  form.value.name = row.name;
  form.value.sex = row.sex;
  form.value.facultyId = row.facultyId;
  form.value.teachGroup = row.teachGroup;
  form.value.phone = row.phone;
  form.value.idCard = row.idCard;
  form.value.address = row.address;
  form.value.state = row.state;
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
    const data = form.value as unknown as TeacherVO;
    const res = await saveTeacher(data);
    ElMessage.success(res.message);
    dialog_active.value = false;
    fetchList();
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  form.value = {
    jobNo: '',
    name: '',
    sex: undefined,
    facultyId: undefined,
    teachGroup: undefined,
    phone: '',
    idCard: '',
    address: '',
    state: undefined,
  };
  formRef.value?.resetFields();
};
</script>
