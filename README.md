# shop_BE
Small shop - BE

#Getting Started

1. Get the repository for shop_BE
2. Installing packages from package.json
3. Upload the script to the database from the shop_BE / DB / shop_sql.sql directory
4. Dodać plik config/config.ts do folderu głównego: shop_be  -> shop_be / config / config.ts
5. Add configurations according to the example below.

export const config = {
  dbHost: 'localhost',
  dbUser: 'root',
  // dbPassword: '',
  dbDatabase: 'small_shop',
  smallShopCorsOrigin: 'http://localhost:3000',
};

6. Run scrypt from package.json start: dev
7. Pobrac do tej samej lokalizacji co shop_BE git clone https://github.com/Mojon1979/shop_fe.git
./
  shop_BE
  shop_fe

8. Installing packages from package.json
9. Run the npm start application

## Short description

A small shop where support has been added:

1. Displaying products to the customer (pagination)
2. View product details
3. Adding a product
4. Displaying all products for Admin (pagination)
5. Possibility to remove the product
6. Product modification card

