<template>
  <Row>
    <Column :md="24" :lg="6">
      <base-card>
        <Input v-model:value="filter" />
        <Tree :data="tree" link-line="solid" :filter="filter" @node-click="handleNodeClick" />
      </base-card>
    </Column>
    <Column :md="24" :lg="18">
      <base-card>
        <section class="form-structrue">
          <Alert type="success" no-border>
            填报说明：哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
          </Alert>
          <ConfigProvider :props="providedProps">
            <Form :model="form" label-align="top">
              <FormItem label="导入记录填报" prop="fileIds">
                <Upload multiple allow-drag manual url="//jsonplaceholder.typicode.com/posts/" />
              </FormItem>
              <FormItem label="导入项目管理" prop="fileIds">
                <Upload multiple allow-drag manual url="//jsonplaceholder.typicode.com/posts/" />
              </FormItem>
              <FormItem action>
                <Button type="primary">下哉导入模板</Button>
              </FormItem>
            </Form>
          </ConfigProvider>
        </section>
      </base-card>
    </Column>
  </Row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Message, TreeNodeProps } from 'vexip-ui';
import { reactive } from 'vue';

const providedProps = {
  default: { clearable: true },
  formItem: { required: true },
};

const filter = ref<string>('');
const form = reactive({});

const tree = ref([
  {
    id: 1,
    label: '道德与公民素养',
    parent: 0,
    expanded: true,
  },
  {
    id: 2,
    label: '思想品德',
    parent: 1,
  },
  {
    id: 3,
    label: '爱国爱校',
    parent: 2,
  },
  {
    id: 4,
    label: '时政学习',
    parent: 2,
  },
  {
    id: 5,
    label: '安全法制',
    parent: 2,
  },
  {
    id: 6,
    label: '军事训练',
    parent: 2,
  },
  {
    id: 7,
    label: '其他',
    parent: 0,
  },
]);

const handleNodeClick = (data: Record<string, any>, node: TreeNodeProps) => {
  console.log(data);
};

const handleSubmit = () => {
  console.log(form);
};

const handleError = (errors: string[]) => {
  errors.forEach(error => {
    Message.error(error);
  });
};
</script>

<style scoped lang="scss">
.form-structrue {
  width: 50%;
  position: relative;
  margin: 0 auto;
}

@media (max-width: 1200px) {
  .form-structrue {
    width: 100%;
    position: relative;
    margin: 0 auto;
  }
}
</style>
