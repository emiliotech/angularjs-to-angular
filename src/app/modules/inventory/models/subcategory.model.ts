
export type SubCategory = {
    idSubFamilia: number
    descripcion: string
}
 

export type SubCategoryRead = SubCategory & {
    siglas: string
}