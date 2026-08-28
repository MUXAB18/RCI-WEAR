import os

f1 = '/Users/user/RCI-WEAR/src/app/admin/portfolio/PortfolioClient.tsx'
with open(f1, 'r') as f:
    c = f.read()
c = c.replace('order: 0,', "order: '' as string | number,")
with open(f1, 'w') as f:
    f.write(c)

f2 = '/Users/user/RCI-WEAR/src/app/admin/products/ProductsClient.tsx'
with open(f2, 'r') as f:
    c = f.read()
c = c.replace('price: product.price,', 'price: String(product.price),')
c = c.replace('stockLevel: product.stockLevel,', 'stockLevel: String(product.stockLevel),')
c = c.replace('minOrderQuantity: product.minOrderQuantity,', 'minOrderQuantity: String(product.minOrderQuantity),')
with open(f2, 'w') as f:
    f.write(c)

f3 = '/Users/user/RCI-WEAR/src/app/admin/quotes/QuotesClient.tsx'
with open(f3, 'r') as f:
    c = f.read()
c = c.replace('quoteAmount: quote.quoteAmount || 0,', "quoteAmount: String(quote.quoteAmount || ''),")
with open(f3, 'w') as f:
    f.write(c)

