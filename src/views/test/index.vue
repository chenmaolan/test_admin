<template>
  <Table
    :data-source="data"
    rowKey="id"
    :columns="tableColumnList"
    :row-selection="{ selectedRowKeys: selecteds, onChange: onSelectChange }"
  />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Table } from 'ant-design-vue'

  // 初始化表头
  export const initTableColumnList: any[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
      fixed: 'left',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      align: 'center',
      width: 120,
    },
  ]
  export default defineComponent({
    components: {
      Table,
    },
    setup() {
      const tableColumnList = ref<any[]>([])
      const data = ref()

      // setTimeout 异步获取 表头 与 列表数据
      setTimeout(() => {
        tableColumnList.value = initTableColumnList
      }, 1000)

      setTimeout(() => {
        const list = [
          { id: '1', desc: 'test1' },
          { id: '2', desc: 'test2' },
          { id: '3', desc: 'test3' },
          { id: '4', desc: 'test41' },
          { id: '5', desc: 'test51' },
        ]
        data.value = list
      }, 2000)

      const selecteds = ref<string[]>([])
      console.log(initTableColumnList, data.value, '=======setup')
      const onSelectChange = (keys: string[]) => {
        selecteds.value = keys
        console.log(keys, 'keys====')
      }

      return {
        data,
        tableColumnList,
        selecteds,
        onSelectChange,
      }
    },
  })
</script>
