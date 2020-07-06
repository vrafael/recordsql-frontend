export default function () {
  return {
    links: [
      {
        label: 'Home',
        icon: 'mdi-home',
        link: '/',
        separator: true
      },
      {
        label: 'Types',
        icon: 'mdi-puzzle',
        link: '/types',
        separator: false
      },
      {
        label: 'Records',
        icon: 'mdi-database',
        link: '/record',
        separator: false
      }
    ]
  }
}
