export default function fieldMapping (field) {
  switch (field.Type.Tag) {
    case 'FieldLink':
    case 'FieldLinkToType':
      field.componentInput = 'r-input-link'
      field.componentFilter = 'r-filter-link'
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
      field.componentFilter = 'r-filter-string'
      break
    case 'FieldString':
      field.componentInput = 'r-input-string'
      field.componentFilter = 'r-filter-string'
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
      field.componentFilter = 'r-filter-money'
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
      field.componentFilter = 'r-filter-bigint'
      field.componentColumn = {
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        align: 'right'
      }
      break
    case 'FieldInt':
      field.componentInput = 'r-input-int'
      field.componentFilter = 'r-filter-int'
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
      field.componentColumn = {
        name: field.Tag,
        label: field.Name,
        field: field.Tag,
        align: 'right'
      }
      break
    case 'FieldIdentifier':
      field.componentInput = 'r-input-identifier'
      field.componentFilter = 'r-filter-bigint'
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
      field.componentFilter = 'r-filter-time'
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
      field.componentFilter = 'r-filter-datetime'
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
      field.componentFilter = 'r-filter-date'
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
      field.componentFilter = 'r-filter-color'
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
      field.componentFilter = 'r-filter-bool'
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
