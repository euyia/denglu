<template>
  <div class="app-container" style="padding:0 20px;">
    <div class="filter-container">
      <el-input
        v-model="filterText"
        placeholder="输入部门名称"
      />
    </div>
    <el-tree
      ref="orgTree"
      :data="orgTreeData"
      :props="orgTreeProps"
      :filter-node-method="filterOrg"
      :expand-on-click-node="false"
      :show-checkbox="showCheckbox"
      :check-strictly="checkStrictly"
      node-key="id"
      highlight-current
      default-expand-all
      @node-click="handleOrgClick"
      @check-change="checkChange"
    />
  </div>
</template>

<script>
import aiOrganizationApi from '@/api/aiOrganization'
import { Tree } from 'element-ui'
export default {
  name: 'OrgTree',
  mixins: [Tree],
  props: {
    supportSingleChecked: {
      type: Boolean,
      default: false
    },
    orgTreeNodeClick: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      orgTreeData: null,
      orgTreeProps: {
        label: 'displayName',
        children: 'children',
        disabled: '',
        isLeaf: 'isLeaf'
      },
      treeQuery: {
        sort: 'code',
        filter: undefined
      },
      filterText: ''
    }
  },
  watch: {
    filterText(val) {
      this.treeQuery.filter = val
      this.$refs.orgTree.filter(val)
    }
  },
  created() {
    console.log("text")
    this.getOrgs()
  },
  methods: {
    getOrgs() {
      aiOrganizationApi.getAllDetails(this.treeQuery).then(response => {
        this.orgTreeData = response.items
      })
    },
    handleOrgClick(data) {
      this.orgTreeNodeClick(data)
    },
    filterOrg(value, data) {
      if (!value) return true
      return data.displayName.indexOf(value) !== -1
    },
    checkChange(data, checked, indeterminate) {
      // 单个
      let keys = ''
      if (this.supportSingleChecked) {
        if (checked) {
          console.log(data, checked, indeterminate)
          keys = this.$refs.orgTree.getCheckedKeys()
          if (keys.length > 1) {
            this.$refs.orgTree.setCheckedKeys([])
            this.$refs.orgTree.setChecked(data, true)
            keys = this.$refs.orgTree.getCheckedKeys()
          }
          console.log('单个-keys:', keys)
          this.$emit('handleCheckChange', data, keys)
        }
      } else {
        keys = this.$refs.orgTree.getCheckedKeys()
        console.log('多个-keys:', keys)
        this.$emit('handleCheckChange', data, keys)
      }
    }
  }
}
</script>
