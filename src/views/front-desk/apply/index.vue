<template>
  <base-card>
    <section class="form-structrue">
      <ConfigProvider :props="providedProps">
        <Form :model="form" label-align="top">
          <FormItem label="申请项目" prop="projectId">
            <Cascader :options="project" clearable />
          </FormItem>
          <FormItem label="申请说明" prop="description">
            <Textarea :max-length="1000" />
          </FormItem>
          <FormItem label="上传附件" prop="fileIds">
            <Upload multiple allow-drag manual url="//jsonplaceholder.typicode.com/posts/" />
          </FormItem>
          <FormItem action>
            <FormSubmit @submit="handleSubmit" @error="handleError"></FormSubmit>
            <FormReset></FormReset>
          </FormItem>
        </Form>
      </ConfigProvider>
    </section>
  </base-card>
</template>

<script setup lang="ts">
import { Message } from 'vexip-ui';
import { reactive } from 'vue';

const providedProps = {
  default: { clearable: true },
  formItem: { required: true },
};

const form = reactive({});

const project: Array<Record<string, any>> = [
  {
    label: '时政学习',
    children: [
      {
        label: '参加时政学习(1分)',
        value: 1,
      },
      {
        label: '时政比赛(2分)',
        value: 2,
      },
    ],
  },
  {
    label: '各类各级比赛',
    children: [
      {
        label: '国家级(4分))',
        value: 3,
      },
      {
        label: '市级(3分)',
        value: 4,
      },
      {
        label: '区级(2分)',
        value: 4,
      },
      {
        label: '校级(1分)',
        value: 4,
      },
    ],
  },
];

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
