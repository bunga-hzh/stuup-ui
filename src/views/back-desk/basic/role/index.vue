<template>
  <base-card>
    <Table ref="table" stripe border :data="data">
      <TableColumn name="角色名称" id-key="roleName"></TableColumn>
      <TableColumn name="角色描述" id-key="roleDesc"></TableColumn>
      <TableColumn name="操作" id-key="operation" :width="300">
        <template #default="{ row }">
          <Space>
            <Button text type="primary" @click="editRole(row)">修改</Button>
            <Button text type="error">删除</Button>
            <Button text type="primary" @click="setDrawer = !setDrawer">分配权限</Button>
          </Space>
        </template>
      </TableColumn>
    </Table>
    <div style="margin: 10px 10px 0; text-align: right">
      <Pagination
        v-model:active="searchForm.current"
        :plugins="['total', , 'jump']"
        :total="data.length"
        :page-size="searchForm.size"></Pagination>
    </div>
    <Drawer v-model:active="setDrawer" transfer title="分配权限">
      <p>一些内容</p>
      <p>一些内容</p>
      <p>一些内容</p>
    </Drawer>
    <Modal v-model:active="editModel" transfer title="修改" top="auto" :width="500">
      <Form :model="form" :rules="rules" label-align="top">
        <FormItem label="角色名称" prop="roleName">
          <Input></Input>
        </FormItem>
        <FormItem label="角色描述" prop="roleDesc">
          <Input></Input>
        </FormItem>
      </Form>
    </Modal>
  </base-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { queryRole, saveRole } from '@/api/role/index';
import type { RoleQueryType, RoleFormType } from '@/api/role/index';
import { Message } from 'vexip-ui';

onMounted(() => {
  fetchRole();
});

const form = reactive<RoleFormType>({
  oid: null,
  roleName: '',
  roleDesc: '',
});

const rules = {
  roleName: {
    required: true,
    message: '请输入角色名称',
  },
};

const editModel = ref<boolean>(false);
const setDrawer = ref<boolean>(false);
const searchForm = reactive<RoleQueryType>({
  key: '',
  current: 1,
  size: 10,
});

let data = ref([]);

const fetchRole = async (key: string = '') => {
  const { data: res } = await queryRole(searchForm);
  data.value = res.records;
};

const editRole = (role: RoleFormType) => {
  form.oid = role.oid;
  form.roleName = role.roleName;
  form.roleDesc = role.roleDesc;
  editModel.value = true;
};

const setRole = async () => {
  const res = await saveRole(form);
  Message.success(res.message);
};

const assignPermissions = () => {};
</script>

<style scoped lang="scss"></style>
