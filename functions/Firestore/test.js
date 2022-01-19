const axios = require('axios').default;

const addOrder = async () => {
    let endpoint1 = 'https://aaf3d2d9c992a914145a7ffa6544b878:b57034dcc5f6eb15cf054ec6b91b94d8@api.shoplightspeed.com/en/categories/products.json';
    let endpoint2 = 'https://aaf3d2d9c992a914145a7ffa6544b878:b57034dcc5f6eb15cf054ec6b91b94d8@api.shoplightspeed.com/en/categories';
    let category_product = []
    let products = [
        {"id":42624288,"supplierTitle":"","brandTitle":"","productTitle":"Pray Often Mug","variantTitle":"","taxRate":0.14975,"taxRates":[{"name":"GST","rate":0.05,"amount":0.4},{"name":"QST","rate":0.09975,"amount":0.798}],"quantityOrdered":1,"quantityInvoiced":1,"quantityShipped":1,"quantityRefunded":0,"quantityReturned":0,"articleCode":"","ean":"","sku":"","weight":0,"volume":0,"colli":0,"sizeX":0,"sizeY":0,"sizeZ":0,"priceCost":5,"customExcl":0,"customIncl":0,"basePriceExcl":8,"basePriceIncl":9.198,"priceExcl":8,"priceIncl":9.2,"discountExcl":0,"discountIncl":0,"customFields":false,"product":{"resource":{"id":39914775,"url":"products/39914775","link":"http://api.shoplightspeed.com/us/products/39914775.json"}},"variant":{"resource":{"id":65592716,"url":"variants/65592716","link":"http://api.shoplightspeed.com/us/variants/65592716.json"}}},
        {"id":42624265,"supplierTitle":"","brandTitle":"","productTitle":"Pray Often Mug2","variantTitle":"","taxRate":0.14975,"taxRates":[{"name":"GST","rate":0.05,"amount":0.4},{"name":"QST","rate":0.09975,"amount":0.798}],"quantityOrdered":1,"quantityInvoiced":1,"quantityShipped":1,"quantityRefunded":0,"quantityReturned":0,"articleCode":"","ean":"","sku":"","weight":0,"volume":0,"colli":0,"sizeX":0,"sizeY":0,"sizeZ":0,"priceCost":5,"customExcl":0,"customIncl":0,"basePriceExcl":8,"basePriceIncl":9.198,"priceExcl":8,"priceIncl":9.2,"discountExcl":0,"discountIncl":0,"customFields":false,"product":{"resource":{"id":39914775,"url":"products/39914775","link":"http://api.shoplightspeed.com/us/products/39914775.json"}},"variant":{"resource":{"id":65592716,"url":"variants/65592716","link":"http://api.shoplightspeed.com/us/variants/65592716.json"}}},
        {"id":42330823,"supplierTitle":"","brandTitle":"","productTitle":"Pray Often Mug2","variantTitle":"","taxRate":0.14975,"taxRates":[{"name":"GST","rate":0.05,"amount":0.4},{"name":"QST","rate":0.09975,"amount":0.798}],"quantityOrdered":1,"quantityInvoiced":1,"quantityShipped":1,"quantityRefunded":0,"quantityReturned":0,"articleCode":"","ean":"","sku":"","weight":0,"volume":0,"colli":0,"sizeX":0,"sizeY":0,"sizeZ":0,"priceCost":5,"customExcl":0,"customIncl":0,"basePriceExcl":8,"basePriceIncl":9.198,"priceExcl":8,"priceIncl":9.2,"discountExcl":0,"discountIncl":0,"customFields":false,"product":{"resource":{"id":39914775,"url":"products/39914775","link":"http://api.shoplightspeed.com/us/products/39914775.json"}},"variant":{"resource":{"id":65592716,"url":"variants/65592716","link":"http://api.shoplightspeed.com/us/variants/65592716.json"}}}
    ]

    await axios({ method:'get', url: endpoint1 }).then((response) => {
        category_product = response.data.categoriesProducts
    }).catch(() => {
        return; 
    });

    for(const product of products){
        const found = category_product.find(element => element.product.resource.id == product.id);
        if(found){
            let categoryID = found.category.resource.id;
            await axios({ method:'get', url: `${endpoint2}/${categoryID}.json` }).then((response) => {
                product.category = response.data.category.fulltitle
            }).catch(() => {
                return; 
            });
        }
    }
    // console.log(products)
    console.log(category_product[0])
};


addOrder();