import {apiGet, apiPost} from '../utils/request'


export const dictionaryModel = {
  SPLIT_CHAR: '@#@',

  TYPE_CODE_FOOD_CATEGORY: 'menuCategory',
  TYPE_NAME_FOOD_CATEGORY: '菜品类别',
  TYPE_SORT_FOOD_CATEGORY: 1,

  TYPE_CODE_BANNER: "homeBanner",
  TYPE_NAME_BANNER: "首页banner",
  TYPE_SORT_BANNER: 2,

  pagedQueryListForType: function (currentPage, pageSize, typeCode, success, fail) {
    const data = {
      currentPage: currentPage,
      pageSize: pageSize,
      typeCode: typeCode,
    }
    apiPost("/dictionarytype/pagedQueryList", data, success, fail)
  },

  addType: function(typeCode, typeName, typeSort, success, fail){
    const data = {
      typeCode: typeCode,
      typeName: typeName,
      typeSort: typeSort,
    }
    apiPost("/dictionarytype/add", data, success, fail)
  },

  pagedQueryListForItem: function (currentPage, pageSize, typeCode, success, fail) {
    const data = {
      currentPage: currentPage,
      pageSize: pageSize,
      typeCode: typeCode
    }
    apiPost("/dictionaryitem/pagedQueryList", data, success, fail)
  },

  addItem: function (itemKey, itemValue, itemSort, typeCode, description, success, fail) {
    const data = {
      itemKey: itemKey,
      itemValue: itemValue,
      itemSort: itemSort,
      typeCode: typeCode,
      description: description
    }
    apiPost("/dictionaryitem/add", data, success, fail)
  },

  editItem: function (itemId, itemKey, itemValue, itemSort, typeCode, description, success, fail) {
    const data = {
      itemId: itemId,
      itemKey: itemKey,
      itemValue: itemValue,
      itemSort: itemSort,
      typeCode: typeCode,
      description: description
    }
    apiPost("/dictionaryitem/updateById", data, success, fail)
  },

  deleteItem: function(itemId, success, fail){
    const data = {
      itemId: itemId
    }
    apiPost("/dictionaryitem/deleteById", data, success, fail)
  },

  queryList: function(typeCode, success, fail){
    const data = {
      typeCode: typeCode
    }
    apiPost("/dictionaryitem/queryList", data, success, fail)
  }

}
