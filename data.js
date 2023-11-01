// Lista de productos en oferta
const productsOffer = [
    {
        id: 1,
        titulo: 'BICICLETA RALEIGH MOJAVE 2.0 DISK E.R 29″',
        imagen: 'https://canaglia.com/wp-content/uploads/2021/05/Raleigh-Mojave-2-0-R29-Negro-Naranja-600x600.jpg',
        precio: '$269.880,00',
        oferta: '$236.560,00',
        category: 'bicicletas',
    },
    {
        id: 2,
        titulo: 'BICICLETA VENZO THORN EVO 21VEL DISK HIDRAULICO',
        imagen: 'https://rodadosmassa.com.ar/wp-content/uploads/2020/04/THORSH-500x315.jpg',
        precio: 328800.00,
        oferta: '$296.600.00',
        category: 'bicicletas',
    },
    {
        id: 3,
        titulo: 'BICICLETA RALEIGH URBAN 1.1 HIBRIDA CON DISK HIDRAULICO',
        imagen: 'https://rodadosmassa.com.ar/wp-content/uploads/2020/06/bicicleta-raleigh-urban-11-aluminio-D_NQ_NP_878014-MLA41892583717_052020-F-500x290.jpg',
        precio: '$330.900,00',
        oferta: '$298.790,00',
        category: 'bicicletas',
    },
    {
        id: 4,
        titulo: 'PIÑON SHIMANO CS-HG400-9 9 VEL',
        imagen: 'https://newsport.vtexassets.com/arquivos/ids/16480213-800-auto?v=638271027728230000&width=800&height=auto&aspect=true',
        precio: '$26.399,00',
        oferta: '$23.400,00',
        category: 'componentes',
    },
    {
        id: 5,
        titulo: 'CUBIERTA MAXXIS CICLISMO 29X2.1 PACE C/ALAMBRE',
        imagen: 'https://newsport.vtexassets.com/arquivos/ids/17160898-800-auto?v=638325584573100000&width=800&height=auto&aspect=true',
        precio: '$16.599,00',
        oferta: '$14.399,00',
        category: 'componentes',
    },
    {
        id: 6,
        titulo: 'CAJA PEDALERA SHIMANO CICLISMO MT800 PC PRESS FIT',
        imagen: 'https://newsport.vtexassets.com/arquivos/ids/14807557-800-auto?v=638035159299530000&width=800&height=auto&aspect=true',
        precio: '$22.899,00',
        oferta: '$20.700,00',
        category: 'componentes',
    },
    {
        id: 7,
        titulo: 'JERSEY URBINO',
        imagen: 'https://d1be5bwc8qcj63.cloudfront.net/img/articles/12-0160-10.jpg',
        precio: '$17.990,00',
        oferta: '$14.500,00',
        category: 'ropa',
    },
    {
        id: 8,
        titulo: 'CAMPERA ANCONA',
        imagen: 'https://d1be5bwc8qcj63.cloudfront.net/img/articles/0S-7503-03.jpg',
        precio: '$22.990,00',
        oferta: '$19.500,00',
        category: 'ropa',
    },
    {
        id: 9,
        titulo: 'REMERA TÉRMICA RIMINI',
        imagen: 'https://d1be5bwc8qcj63.cloudfront.net/img/articles/17-0503-02.jpg',
        precio: '$12.650',
        oferta: '$9.800',
        category: 'ropa',
    },
    {
        id: 10,
        titulo: 'CASCO MTB FOX – RPC MIPS FUEL',
        imagen: 'https://foxracing.ar/media/2023/06/29346-001-1-510x510.webp',
        precio: '$356.199,00',
        oferta: '$345.165,00',
        category: 'proteccion',
    },
    {
        id: 11,
        titulo: 'CASCO CICLISMO MTB FOX – FLIGHT SPORT HELMET',
        imagen: 'https://foxracing.ar/media/2022/04/26795_001_2-scaled-510x510.webp',
        precio: '$21.999,00',
        oferta: '$19.200,00',
        category: 'proteccion',
    },
    {
        id: 12,
        titulo: 'CASCO CICLISMO MTB FOX – SPEEDFRAME HELMET',
        imagen: 'https://foxracing.ar/media/2022/04/26840-001-1-510x510.webp',
        precio: '$105.999,00',
        oferta: '$100.299,00',
        category: 'proteccion',
    },
    {
        id: 13,
        titulo: 'GUANTES CICLISMO TOUCH',
        imagen: 'https://acdn.mitiendanube.com/stores/144/702/products/ciclismo-touch-amarillo-par1-c81f6989a6e9f5a01c15840405028225-480-0.webp',
        precio: '$16.755,00',
        oferta: '$15.500,00',
        category: 'accesorios',
    },
    {
        id: 14,
        titulo: 'LINGA VAN HALEN CICLISMO CABLE 18 X 1000MM',
        imagen: 'https://newsport.vtexassets.com/arquivos/ids/16981158-800-auto?v=638313916936030000&width=800&height=auto&aspect=true',
        precio: '$8.999,00',
        oferta: '$6.900,00',
        category: 'accesorios',
    },
    {
        id: 15,
        titulo: 'PORTA CELULAR VAN HALEN CICLISMO TOP TUBE BAG',
        imagen: 'https://newsport.vtexassets.com/arquivos/ids/16981162-800-auto?v=638313917195170000&width=800&height=auto&aspect=true',
        precio: 10200.00,
        oferta: '$9.199,00',
        category: 'accesorios',
    },
]

// Funcion para dividir los productos en arrays de "size" productos

const divideProducts = (size) => {
    let productList = [];
    for (let i = 0; i < productsOffer.length; i += size)
        productList.push(productsOffer.slice(i, i + size));
    return productList;
};


// concpto de ESTADO
const appState = {
    products: divideProducts(3),
    currentProductIndex: 0,
    productsLimit: divideProducts(3).length,
    activeFilter: null
}