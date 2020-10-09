export default function fieldsMapping (field) {
  switch (field.Type.Tag) {
    case 'FieldIdentifier':
      field.componentInput = { component: 'r-input-identifier' }
      field.componentFilter = {
        component: 'r-filter-bigint',
        empty: { isEnabled: false, IsNull: false, ValueFrom: null, ValueTo: null }
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
        style: 'max-width: 150px; width: 150px;'
      }
      break
    case 'FieldLink':
    case 'FieldLinkToType':
      field.componentInput = { component: 'r-input-link' }
      field.componentFilter = {
        component: 'r-filter-link',
        empty: { isEnabled: false, IsNull: false, Value: null },
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
        style: 'max-width: 200px; width: 200px;'
      }
      break
    case 'FieldText':
      field.componentInput = { component: 'r-input-text' }
      break
    case 'FieldString':
      field.componentInput = { component: 'r-input-string' }
      field.componentFilter = {
        component: 'r-filter-string',
        empty: { isEnabled: false, IsNull: false, Value: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-string',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        align: 'left',
        classes: 'ellipsis no-wrap',
        style: 'max-width:200px; width:200px;'
      }
      break
    case 'FieldMoney':
      field.componentInput = {
        component: 'r-input-money',
        format: value => (value ? Number(value) : null)
      }
      field.componentFilter = {
        component: 'r-filter-money',
        empty: { isEnabled: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-money',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        align: 'right',
        style: 'max-width: 100px; width: 100px;'
      }
      break
    case 'FieldBigint':
      field.componentInput = {
        component: 'r-input-bigint',
        format: value => (value ? Number(value) : null)
      }
      field.componentFilter = {
        component: 'r-filter-bigint',
        empty: { isEnabled: false, IsNull: false, ValueFrom: null, ValueTo: null }
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
      field.componentInput = {
        component: 'r-input-int',
        format: value => (value ? Number(value) : null)
      }
      field.componentFilter = {
        component: 'r-filter-int',
        empty: { isEnabled: false, IsNull: false, ValueFrom: null, ValueTo: null }
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
      field.componentInput = {
        component: 'r-input-float',
        format: value => (value ? Number(value) : null)
      }
      field.componentFilter = {
        component: 'r-filter-float',
        empty: { isEnabled: false, IsNull: false, ValueFrom: null, ValueTo: null }
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
      field.componentInput = {
        component: 'r-input-time',
        format: value => (value ? value.padEnd(12, '00:00:00.000'.slice(value.length, 12)) : null)
      }
      field.componentFilter = {
        component: 'r-filter-time',
        empty: { isEnabled: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-time',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        align: 'left',
        style: 'max-width: 100px; width: 100px;'
      }
      break
    case 'FieldDatetime':
      field.componentInput = {
        component: 'r-input-datetime',
        format: value => (value ? value.padEnd(23, '1000-01-01 00:00:00.000'.slice(value.length, 23)) : null)
      }
      field.componentFilter = {
        component: 'r-filter-datetime',
        empty: { isEnabled: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-datetime',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        format: (val) => val ? val.replace('T', ' ') : null,
        align: 'left',
        style: 'max-width: 160px; width: 150px;'
      }
      break
    case 'FieldDate':
      field.componentInput = {
        component: 'r-input-date',
        format: value => (value ? value.padEnd(10, '1000-01-01'.slice(value.length, 10)) : null)
      }
      field.componentFilter = {
        component: 'r-filter-date',
        empty: { isEnabled: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-date',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        align: 'left',
        style: 'max-width: 100px; width: 100px;'
      }
      break
    case 'FieldColor':
      field.componentInput = {
        component: 'r-input-color'
      }
      field.componentFilter = {
        component: 'r-filter-color',
        empty: { isEnabled: false, IsNull: false, Value: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-color',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        align: 'right',
        style: 'max-width: 100px; width: 100px;'
      }
      break
    case 'FieldBool':
      field.componentInput = { component: 'r-input-bool' }
      field.componentFilter = {
        component: 'r-filter-bool',
        empty: { isEnabled: false, IsNull: false, Value: null }
      }
      field.componentColumn = {
        filter: 'r-header-filter-bool',
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        sortable: false,
        align: 'left',
        classes: 'text-uppercase',
        style: 'max-width: 100px; width: 100px;'
      }
      break
  }
}
