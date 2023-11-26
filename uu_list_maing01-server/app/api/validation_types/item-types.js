const itemCreateDtoInType = shape({
    name: string().isRequired(),
    count: number()
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