
export type Measure = {
    idMedida: number,
    descripcion: string
    estado: boolean,
    codigo: string 
}

export type MeasureRead = Measure & {
    totalRecords: number
}