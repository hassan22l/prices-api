import { config } from "../config/env.config";

export class GovernmentPricesClient {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = config.governmentApiUrl;
  }

  async getPrice(productId: string): Promise<any> {
    const shops =
      "15-1-145,15-1-5506,61-1-25,64-1-19,15-1-179,15-1-81,23-1-6204,12-1-197,15-1-116,9-2-61,12-1-155,12-1-184,12-1-162,15-1-149,15-1-89,9-3-662,15-1-92,15-1-66,15-1-5528,9-3-5214,15-1-125,15-1-1036,15-1-137,15-1-5123,15-1-5473,15-1-5567,24-1-287,12-1-154,15-1-194,15-1-1003";
    const response = await fetch(
      `${this.baseUrl}/producto?id_producto=${productId}&array_sucursales=${shops}&limit=6`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:149.0) Gecko/20100101 Firefox/149.0",
          Accept: "application/json",
          "x-api-key": "zIgFou7Gta7g87VFGL9dZ4BEEs19gNYS1SOQZt96",
          Referer: "https://d3e6htiiul5ek9.cloudfront.net/",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch price for product ${productId}: ${response.status} ${response.statusText}`,
      );
    }

    const data: any = await response.json();
    const product = {
      barcode: data.producto.id,
      image: `https://imagenes.preciosclaros.gob.ar/productos/${productId}.jpg`,
      name: data.producto.nombre,
      prices: data.sucursales
        .filter((s: any) => {
          return (
            s.banderaDescripcion &&
            (s.preciosProducto?.precioLista ||
              s.preciosProducto?.precio ||
              s.preciosProducto?.precio_unitario_con_iva)
          );
        })
        .filter(
          (s: any, index: number, self: any[]) =>
            index === self.findIndex((x: any) => x.banderaDescripcion === s.banderaDescripcion),
        )
        .slice(0, 6)
        .map((s: any) => ({
          shop: s.banderaDescripcion,
          logo: `https://imagenes.preciosclaros.gob.ar/comercios/${s.comercioId}-1.jpg`,
          price:
            s.preciosProducto?.precioLista ||
            s.preciosProducto?.precio ||
            s.preciosProducto?.precio_unitario_con_iva,
        })),
    };
    console.log(product);

    return product;
  }
}
