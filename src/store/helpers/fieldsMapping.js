export default function fieldsMapping (field) {
  switch (field.Type.Tag) {
    case 'FieldLink':
    case 'FieldLinkToType':
      field.componentInput = 'r-input-link'
      /* field.componentFilter = {
        component: 'r-filter-link',
        empty: { Enable: false, IsNull: false, Value: null }
      } */
      field.componentColumn = {
        component: 'r-object',
        name: field.Tag,
        label: field.Name,
        field: field.Tag, // row => row.Type.Name,
        align: 'left',
        style: 'max-width: 200px; width: 200px'
      }
      break
    case 'FieldText':
      field.componentInput = 'r-input-text'
      break
    case 'FieldString':
      field.componentInput = 'r-input-string'
      field.componentFilter = {
        component: 'r-filter-string',
        empty: { Enable: false, IsNull: false, Value: null }
      }
      field.componentColumn = {
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        align: 'left',
        classes: 'ellipsis no-wrap',
        style: 'max-width:200px; width:200px'
      }
      break
    case 'FieldMoney':
      field.componentInput = 'r-input-money'
      field.componentFilter = {
        component: 'r-filter-money',
        empty: { Enable: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        align: 'right',
        style: 'max-width: 100px; width: 100px'
      }
      break
    case 'FieldBigint':
      field.componentInput = 'r-input-bigint'
      field.componentFilter = {
        component: 'r-filter-bigint',
        empty: { Enable: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        align: 'right'
      }
      break
    case 'FieldInt':
      field.componentInput = 'r-input-int'
      field.componentFilter = {
        component: 'r-filter-int',
        empty: { Enable: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        align: 'right'
      }
      break
    case 'FieldFloat':
      field.componentInput = 'r-input-float'
      field.componentFilter = 'r-filter-float'
      field.componentFilter = {
        component: 'r-filter-float',
        empty: { Enable: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        align: 'right'
      }
      break
    case 'FieldIdentifier':
      field.componentInput = 'r-input-identifier'
      field.componentFilter = {
        component: 'r-filter-bigint',
        empty: { Enable: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        name: field.Tag,
        required: true,
        label: field.Name,
        field: field.Tag,
        // sortable: true,
        align: 'right',
        style: 'max-width: 100px; width: 100px'
      }
      break
    case 'FieldTime':
      field.componentInput = 'r-input-time'
      field.componentFilter = {
        component: 'r-filter-time',
        empty: { Enable: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        align: 'left',
        style: 'max-width: 100px; width: 100px'
      }
      break
    case 'FieldDatetime':
      field.componentInput = 'r-input-datetime'
      field.componentFilter = {
        component: 'r-filter-datetime',
        empty: { Enable: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        format: (val) => val ? val.replace('T', ' ') : null,
        align: 'left',
        style: 'max-width: 150px; width: 150px'
      }
      break
    case 'FieldDate':
      field.componentInput = 'r-input-date'
      field.componentFilter = {
        component: 'r-filter-date',
        empty: { Enable: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        align: 'left',
        style: 'max-width: 100px; width: 100px'
      }
      break
    case 'FieldColor':
      field.componentInput = 'r-input-color'
      field.componentFilter = {
        component: 'r-filter-color',
        empty: { Enable: false, IsNull: false, Value: null }
      }
      field.componentColumn = {
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        align: 'right',
        style: 'max-width: 100px; width: 100px'
      }
      break
    case 'FieldBool':
      field.componentInput = 'r-input-bool'
      field.componentFilter = {
        component: 'r-filter-bool',
        empty: { Enable: false, IsNull: false, Value: null }
      }
      field.componentColumn = {
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        align: 'left',
        classes: 'text-uppercase',
        style: 'max-width: 100px; width: 100px'
      }
      break
  }
}
