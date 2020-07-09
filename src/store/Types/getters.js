function TYPETREE_GET (state) {
  return state.typeTree
}

function TYPE_LIST_GET (state) {
  return state.typeList
}

function TYPE_LIST_NESTED_GET (state) {
  const typeList = state.typeList
  const filteredArr = typeList.map((item) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!item.hasOwnProperty('OwnerID')) {
      // eslint-disable-next-line no-return-assign
      return {
        ...item,
        OwnerID: null
      }
    } else {
      return {
        ...item
      }
    }
  })
  const typesParser = (ownerID) => {
    return filteredArr
      .filter(type => type.OwnerID === ownerID)
      .map(type => {
        return ({
          ...type,
          children: typesParser(type.ID)
        })
      })
  }
  return [typesParser(null)]
}

export default {
  TYPETREE_GET,
  TYPE_LIST_GET,
  TYPE_LIST_NESTED_GET
}
