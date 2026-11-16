import { Products } from './Product.js';
import { Tags } from './Tag.js';
import { ProductTags } from './ProductTag.js';

// "Tablas intermedias"
/*
	https://sequelize.org/docs/v6/core-concepts/assocs/

	Cumple la funcion de asociar la tabla Productos con la tabla Tags
	para su categorizacion 

	const A = sequelize.define('A'  ... );
	const B = sequelize.define('B'  .../);

	A.hasOne(B); // A HasOne B
	A.belongsTo(B); // A BelongsTo B
	A.hasMany(B); // A HasMany B
	A.belongsToMany(B, { through: 'C' }); // A BelongsToMany B through the junction table C

*/


// Asociacion entre products y tags
Products.belongsToMany(Tags, {
    through: ProductTags,
    foreignKey: 'id_product_fk',
    otherKey: 'id_tag_fk'
});

Tags.belongsToMany(Products, {
    through: ProductTags,
    foreignKey: 'id_tag_fk',
    otherKey: 'id_product_fk'
});

// Asociacion entre tags y tagGroups
TagGroups.belongsToMany(Tags, {
    through: TagGroupTags,
    foreignKey: 'id_group_fk',
    otherKey: 'id_tag_fk',
    as: 'tags'
});

Tags.belongsToMany(TagGroups, {
    through: TagGroupTags,
    foreignKey: 'id_tag_fk',
    otherKey: 'id_group_fk',
    as: 'groups'
});

// Supliers y Product List
Suppliers.belongsToMany(ProductList, {
	through: SuppliersProducts,
	foreignKey: "id_supplier_fk",
	otherKey: "id_product_list_fk",
	sourceKey: "id_supplier",
	targetKey: "id_product_list",
	as: "productList"
});

ProductList.belongsToMany(Suppliers, {
	through: SuppliersProducts,
	foreignKey: "id_product_list_fk",
	otherKey: "id_supplier_fk",
	sourceKey: "id_product_list",
	targetKey: "id_supplier",
	as: "suppliers"
});

// Supliers y Purchases
Suppliers.hasMany(Purchases, {
	foreignKey: "id_supplier_fk",
	sourceKey: "id_supplier",
	as: "purchases"
});

Purchases.belongsTo(Suppliers, {
	foreignKey: "id_supplier_fk",
	targetKey: "id_supplier",
	as: "supplier"
});

// Purchases y PurchaseItems
Purchases.hasMany(PurchaseItems, {
	foreignKey: "id_purchase_fk",
	as: "items"
});

PurchaseItems.belongsTo(Purchases, {
	foreignKey: "id_purchase_fk",
	as: "purchase"
});

// PurchaseItems Y ProductList
PurchaseItems.belongsTo(ProductList, {
	foreignKey: "id_product_list_fk",
	as: "catalogProduct"
});
