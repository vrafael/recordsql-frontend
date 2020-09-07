export default function fieldsMapping (field) {
  switch (field.Type.Tag) {
    case 'FieldIdentifier':
      field.componentInput = 'r-input-identifier'
      field.componentFilter = {
        component: 'r-filter-bigint',
        empty: { isChanged: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        component: 'r-column-identifier',
        filter: 'r-header-filter-bigint',
        name: field.Tag,
        required: true,
        label: field.Name,
        field: '_record', // field.Tag,
        sortable: false,
        align: 'left',
        style: 'max-width: 150px; width: 150px; overflow: hidden;'
      }
      break
    case 'FieldLink':
    case 'FieldLinkToType':
      field.componentInput = 'r-input-link'
      field.componentFilter = {
        component: 'r-filter-link',
        empty: { isChanged: false, IsNull: false, Value: null },
        format: filter => ({ ...filter, Value: filter.Value ? filter.Value.map(item => item.ID) : [] })
      }
      field.componentColumn = {
        component: 'r-object',
        filter: 'r-header-filter-link',
        name: field.Tag,
        label: field.Name,
        field: field.Tag, // row => row.Type.Name,
        sortable: false,
        align: 'left',
        style: 'max-width: 200px; width: 200px; overflow: hidden;'
      }
      break
    case 'FieldText':
      field.componentInput = 'r-input-text'
      break
    case 'FieldString':
      field.componentInput = 'r-input-string'
      field.componentFilter = {
        component: 'r-filter-string',
        empty: { isChanged: false, IsNull: false, Value: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-string',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        align: 'left',
        classes: 'ellipsis no-wrap',
        style: 'max-width:200px; width:200px; overflow: hidden;'
      }
      break
    case 'FieldMoney':
      field.componentInput = 'r-input-money'
      field.componentFilter = {
        component: 'r-filter-money',
        empty: { isChanged: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-money',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        align: 'right',
        style: 'max-width: 100px; width: 100px; overflow: hidden;'
      }
      break
    case 'FieldBigint':
      field.componentInput = 'r-input-bigint'
      field.componentFilter = {
        component: 'r-filter-bigint',
        empty: { isChanged: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-bigint',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        align: 'right'
      }
      break
    case 'FieldInt':
      field.componentInput = 'r-input-int'
      field.componentFilter = {
        component: 'r-filter-int',
        empty: { isChanged: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-int',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        align: 'right'
      }
      break
    case 'FieldFloat':
      field.componentInput = 'r-input-float'
      field.componentFilter = 'r-filter-float'
      field.componentFilter = {
        component: 'r-filter-float',
        empty: { isChanged: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-float',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        align: 'right'
      }
      break
    case 'FieldTime':
      field.componentInput = 'r-input-time'
      field.componentFilter = {
        component: 'r-filter-time',
        empty: { isChanged: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-time',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        align: 'left',
        style: 'max-width: 100px; width: 100px; overflow: hidden;'
      }
      break
    case 'FieldDatetime':
      field.componentInput = 'r-input-datetime'
      field.componentFilter = {
        component: 'r-filter-datetime',
        empty: { isChanged: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-datetime',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        format: (val) => val ? val.replace('T', ' ') : null,
        align: 'left',
        style: 'max-width: 160px; width: 150px; overflow: hidden;'
      }
      break
    case 'FieldDate':
      field.componentInput = 'r-input-date'
      field.componentFilter = {
        component: 'r-filter-date',
        empty: { isChanged: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-date',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        align: 'left',
        style: 'max-width: 100px; width: 100px; overflow: hidden;'
      }
      break
    case 'FieldColor':
      field.componentInput = 'r-input-color'
      field.componentFilter = {
        component: 'r-filter-color',
        empty: { isChanged: false, IsNull: false, Value: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-color',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        align: 'right',
        style: 'max-width: 100px; width: 100px; overflow: hidden;'
      }
      break
    case 'FieldBool':
      field.componentInput = 'r-input-bool'
      field.componentFilter = {
        component: 'r-filter-bool',
        empty: { isChanged: false, IsNull: false, Value: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-bool',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        align: 'left',
        classes: 'text-uppercase',
        style: 'max-width: 100px; width: 100px; overflow: hidden;'
      }
      break
  }
}
