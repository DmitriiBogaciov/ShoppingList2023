const shoppingListCreateDtoInType = shape({
  name: string().isRequired(),
});

const shoppingListRemoveDtoInType = shape({
  id: string().isRequired()
});

const shoppingListListDtoInType = shape({
  //
});

const shoppingListGetDtoInType = shape({
  id: string().isRequired(),
});

const shoppingListUpdateDtoInType = shape({
  id: string().isRequired(),
  name: string(),
  members: array(),
  items: array(string()),
  done: boolean()
});

const shoppingListListForUserDtoInType = shape({
  //
});

// const listGetDtoInType = shape({
//   id: string().isRequired()
// })

// const listUpdateDtoInType = shape({
//   name: string(1, 50).isRequired()
// })

// const listAddMemberDtoInType = shape({
//   id: string().isRequired(),
//   userId: string().isRequired()
// })

// const listAddItemDtoInType = shape({
//   name: string(1, 50).isRequired(),
//   count: number()
// })

// const listDeleteItemDtoInType = shape({
//   id: string().isRequired()
// })

// const listMarkAsDoneDtoInType = shape({
//   id: string().isRequired()
// })

// const listMarkItemAsDoneDtoInType = shape({
//   id: string().isRequired()
// })
