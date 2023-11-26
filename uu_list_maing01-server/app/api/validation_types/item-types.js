const itemCreateDtoInType = shape({
    name: string().isRequired(),
    count: number()
});

const itemRemoveDtoInType = shape({
id: string().isRequired()
});
  
const itemListDtoInType = shape({
 //
});

const itemListByIdsDtoInType = shape({
    idList: array()
});
  
const itemGetDtoInType = shape({
id: string().isRequired(),
});

const itemUpdateDtoInType = shape({
    id: string().isRequired(),
    name: string(),
    count: number(),
    done: boolean()
});