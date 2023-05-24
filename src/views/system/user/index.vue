<template>
  <div style="padding: 10px 20px">
    <!-- <el-card style="margin: 10px 0">
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
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
                <el-form-item label="用户名" prop="userName">
                  <el-input v-model="searchForm.userName" placeholder="请输入用户名" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="性别" prop="sex">
                  <el-select v-model="searchForm.sex" placeholder="请输入性别" style="width: 100%"></el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="教师类型" prop="teacherType">
                  <el-select
                    v-model="searchForm.teacherType"
                    placeholder="请选择教师类型"
                    style="width: 100%"></el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="用户类型" prop="userType">
                  <el-select v-model="searchForm.userType" placeholder="请选择用户类型" style="width: 100%"></el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="所属部门" prop="deptId">
                  <el-select v-model="searchForm.deptId" placeholder="请选择所属部门" style="width: 100%"></el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12" :xl="8">
                <el-form-item label="状态" prop="state">
                  <el-select v-model="searchForm.state" placeholder="请选择状态" style="width: 100%"></el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-card> -->
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
        <el-table-column prop="loginName" label="登入账号" show-overflow-tooltip align="center" />
        <el-table-column prop="userName" label="用户姓名" show-overflow-tooltip align="center" />
        <el-table-column prop="sex" label="性别" show-overflow-tooltip align="center" />
        <el-table-column prop="mobile" label="手机号" show-overflow-tooltip align="center" />
        <el-table-column prop="degree" label="文化程度" show-overflow-tooltip align="center" />
        <el-table-column prop="teacherType" label="教师类型" show-overflow-tooltip align="center" />
        <el-table-column prop="userType" label="用户类型" show-overflow-tooltip align="center" />
        <el-table-column prop="deptName" label="所属部门" show-overflow-tooltip align="center" />
        <el-table-column prop="idCard" label="身份证号" show-overflow-tooltip align="center" />
        <el-table-column prop="birthday" label="出生年月" show-overflow-tooltip align="center" />
        <el-table-column prop="state" label="状态" show-overflow-tooltip align="center" />
        <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button @click="updateRow(row)">修改</el-button>
            <el-button @click="delRow(row.oid)" type="danger">删除</el-button>
          </template>
        </el-table-column>
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
      <el-form-item label="用户账号" prop="loginName">
        <el-input v-model="form.loginName" placeholder="请输入用户账号" />
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入用户名" />
      </el-form-item>
      <!-- TODO 字典 -->
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="1" border>男</el-radio>
          <el-radio label="2" border>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="文化程度" prop="degree">
        <el-input v-model="form.degree" placeholder="请选择文化程度" />
      </el-form-item>
      <!-- TODO 字典 -->
      <el-form-item label="教师类型" prop="teacherType">
        <el-select v-model="form.teacherType" placeholder="请选择教师类型" style="width: 100%">
          <el-option label="在职在编" value="1" />
          <el-option label="编外运行" value="2" />
          <el-option label="行政外编" value="3" />
        </el-select>
      </el-form-item>
      <!-- TODO 字典 -->
      <el-form-item label="用户类型" prop="userType">
        <el-select v-model="form.userType" placeholder="请选择用户类型" style="width: 100%">
          <el-option label="学生" value="1" />
          <el-option label="教师" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属部门" prop="deptId">
        <el-select v-model="form.deptId" placeholder="请选择所属部门" style="width: 100%">
          <el-option v-for="item in dept_list" :key="item.oid" :label="item.value" :value="item.oid" />
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="form.idCard" placeholder="请输入身份证号" />
      </el-form-item>
      <el-form-item label="出生年月" prop="birthday">
        <el-date-picker v-model="form.birthday" type="date" placeholder="请选择出生年月" style="width: 100%" />
      </el-form-item>
      <el-form-item label="用户角色" prop="roles">
        <el-select v-model="form.roles" placeholder="请选择用户角色" multiple style="width: 100%">
          <el-option v-for="item in role_list" :label="item.value" :value="item.oid" />
        </el-select>
      </el-form-item>
      <!-- TODO 字典 -->
      <el-form-item label="状态" prop="state">
        <el-select v-model="form.state" placeholder="请选择状态" style="width: 100%">
          <el-option label="正常" value="1" />
          <el-option label="禁用" value="2" />
        </el-select>
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
import { UserVO, getUserPage, saveOrUpdateUser, delUser } from '@/api/system/user/index';
import { DeptDictVO, getDeptList } from '@/api/basic/dept';
import { RoleDictVO, getRoleList } from '@/api/system/role/index';
import { ElMessage, ElMessageBox } from 'element-plus';

onMounted(() => {
  initDeptList();
  initRoleList();
  fetchList();
});

//字典
const dept_list = ref<DeptDictVO[]>();
const role_list = ref<RoleDictVO[]>();

const loading = ref<boolean>(false);
const dialog_active = ref<boolean>(false);
const dialog_title = ref<string>('');
const tableData = ref<UserVO[]>();
const page = ref({
  current: 1,
  size: 10,
  total: 10,
});
const searchForm = ref({
  userName: '',
  sex: undefined,
  teacherType: undefined,
  userType: '',
  deptId: undefined,
  state: undefined,
});
const form = ref<UserVO>({
  oid: undefined,
  loginName: '',
  userName: '',
  sex: undefined,
  mobile: '',
  degree: '',
  teacherType: undefined,
  userType: undefined,
  deptId: undefined,
  idCard: '',
  birthday: undefined,
  roles: [],
  state: undefined,
});
const rules = reactive<FormRules>({
  loginName: [{ required: true, message: '请输入用户账号', trigger: 'blur' }],
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  roles: [{ required: true, message: '请选择用户角色', trigger: 'blur' }],
});
const searchFormRef = ref<FormInstance>();
const formRef = ref<FormInstance>();

const initDeptList = async () => {
  const { data: res } = await getDeptList();
  dept_list.value = res;
};

const initRoleList = async () => {
  const { data: res } = await getRoleList();
  role_list.value = res;
};

const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getUserPage(Object.assign(page.value, searchForm.value));
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
const updateRow = (row: UserVO) => {
  dialog_title.value = '修改';
  dialog_active.value = true;
  form.value.oid = row.oid;
  form.value.loginName = row.loginName;
  form.value.userName = row.userName;
  form.value.sex = row.sex;
  form.value.mobile = row.mobile;
  form.value.degree = row.degree;
  form.value.teacherType = row.teacherType;
  form.value.userType = row.userType;
  form.value.deptId = row.deptId;
  form.value.idCard = row.idCard;
  form.value.birthday = row.birthday;
  form.value.roles = row.roles;
  form.value.state = row.state;
};
const delRow = (oid: number) => {
  ElMessageBox.confirm('确认删除？', '删除学年', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true;
      try {
        const res = await delUser(oid.toString());
        ElMessage.success(res.message);
        fetchList();
      } finally {
        loading.value = false;
      }
    })
    .catch(() => {});
};

const submitForm = async () => {
  if (!formRef) return;
  const valid = await formRef.value?.validate();
  if (!valid) return;
  loading.value = true;
  try {
    const data = form.value as unknown as UserVO;
    const res = await saveOrUpdateUser(data);
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
    loginName: '',
    userName: '',
    sex: undefined,
    mobile: '',
    degree: '',
    teacherType: undefined,
    userType: undefined,
    deptId: undefined,
    idCard: '',
    birthday: undefined,
    roles: [],
    state: undefined,
  };
  formRef.value?.resetFields();
};
</script>
