export interface IVenta {
    id_usuario: number;
    total_venta: number;
}

export interface IGetVentas {
    id_ticket: number;
    id_usuario: number;
    fecha_hora: string;
    total_venta: number;
}

