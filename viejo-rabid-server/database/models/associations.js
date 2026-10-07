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