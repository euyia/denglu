const listMixin = {
  data() {
    return {
      /**
       * 列表数据
       */
      tableData: [],
      /**
       * 列表查询条件
       */
      query: {
        /**
        * 排序条件
        */
        sorting: '',
        /**
         * 跳过的数量
         */
        skipCount: 0,
        /**
         * 页面大小
         */
        maxResultCount: 20
      },
      pagination: {
        totalCount: 0,
        pageIndex: 0
      },
      sortMethodMap: new Map([
        ['ascending', 'asc'],
        ['descending', 'desc']
      ])
    }
  },
  methods: {
    /**
    * 获取列表数据
    */
    getList() {
      throw new Error('您需要在您的组件中重写此方法。')
    },
    onPagination({ page }) {
      this.query.skipCount = (page - 1) * this.query.maxResultCount
      this.getList()
    },
    updateTotalCount(count) {
      
      this.pagination.totalCount = count
    },
    ResetpageIndex(){
      this.query.skipCount=0
       this.pagination.pageIndex=0
    },
    dialogClose(refresh) {
      if (refresh) {
        this.getList()
      }
    },
    onSortChange({ column, prop, order }) {
      if (order) {
        this.query.sorting = `${prop} ${this.sortMethodMap.get(order)}`
      } else {
        this.query.sorting = ''
      }
      this.getList()
    }
  }
}

export default listMixin

