export default function fieldsMapping (field) {
  switch (field.Type.Tag) {
    case 'FieldIdentifier':
      field.componentInput = { component: 'r-input-identifier' }
      field.componentFilter = {
        component: 'r-filter-bigint',
        empty: { Enable: false, IsNull: false, ValueFrom: null, ValueTo: null }
      }
      field.componentColumn = {
        component: 'r-column-identifier',
        name: field.Tag,
        required: true,
        label: field.Name,
        field: '_record', // field.Tag,
        // sortable: true,
        align: 'left',
        style: 'max-width: 150px; width: 150px'
      }
      break
    case 'FieldLink':
    case 'FieldLinkToType':
      field.componentInput = { component: 'r-input-link' }
      field.componentFilter = {
        component: 'r-filter-link',
        empty: { Enable: false, IsNull: false, Value: null },
        format: filter => ({ ...filter, Value: filter.Value ? filter.Value.map(item => item.ID) : [] })
      }
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
      field.componentInput = { component: 'r-input-text' }
      break
    case 'FieldString':
      field.componentInput = { component: 'r-input-string' }
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
      field.componentInput = {
        component: 'r-input-money',
        format: value => (value ? Number(value) : null)
      }
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
      field.componentInput = {
        component: 'r-input-bigint',
        format: value => (value ? Number(value) : null)
      }
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
      field.componentInput = {
        component: 'r-input-int',
        format: value => (value ? Number(value) : null)
      }
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
      field.componentInput = {
        component: 'r-input-float',
        format: value => (value ? Number(value) : null)
      }
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
    case 'FieldTime':
      field.componentInput = {
        component: 'r-input-time',
        format: value => (value ? value.padEnd(12, '00:00:00.000'.slice(value.length, 12)) : null)
      }
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
      field.componentInput = {
        component: 'r-input-datetime',
        format: value => (value ? value.padEnd(23, '1000-01-01 00:00:00.000'.slice(value.length, 23)) : null)
      }
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
      field.componentInput = {
        component: 'r-input-date',
        format: value => (value ? value.padEnd(10, '1000-01-01'.slice(value.length, 10)) : null)
      }
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
      field.componentInput = {
        component: 'r-input-color'
      }
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
      field.componentInput = { component: 'r-input-bool' }
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
