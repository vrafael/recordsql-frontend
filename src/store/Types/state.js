export default function () {
  return {
    typetree: [
      {
        id: 1,
        label: 'Object',
        icon: 'las la-atom',
        children: [
          {
            id: 2,
            label: 'Directory',
            icon: 'las la-book',
            children: [
              {
                id: 3,
                label: 'Field',
                icon: 'las la-tag'
              },
              {
                id: 4,
                label: 'Type',
                icon: 'las la-th-list'
              }
            ]
          },
          {
            id: 5,
            label: 'Error',
            icon: 'las la-exclamation-circle',
            children: [
              {
                id: 6,
                label: 'SystemError',
                icon: 'las la-exclamation-triangle'
              },
              {
                id: 7,
                label: 'SecurityError',
                icon: 'las la-ban'
              }
            ]
          }
        ]
      }
    ]
  }
}
