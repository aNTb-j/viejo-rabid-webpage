import { TagGroups } from '../database/models/tagGroups.js';
import { Tags } from '../database/models/tags.js';
import { TagGroupTags } from '../database/models/tagGroupTags.js';

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

export const getAllTags = async (req, res) => {
	try {
		const tags = await Tags.findAll();

		return res.json(tags);
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: 'Error al obtener las tags'
		});
	}
};

export const getAllTagGroups = async (req, res) => {
	try {
		const groups = await TagGroups.findAll({
			include: [{
				model: Tags,
				as: 'tags',
				through: { attributes: [] }
			}]
		});

		return res.json(groups);
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			message: 'Error al obtener los grupos'
		});
	}
};

export const createTagGroup = async (req, res) => {
	const { title, tags } = req.body;

	try {
		const group = await TagGroups.create({
			name: title
		});

		const tagInstances = await Tags.findAll({
			where: {
				id_tag: tags
			}
		});

		if (tagInstances.length !== tags.length) {
			await group.destroy();

			return res.status(400).json({
				message: 'Una o mas tags no existen'
			});
		}

		await group.addTags(tagInstances);

		return res.status(201).json({
			message: 'Grupo creado correctamente',
			group
		});
		
	} catch (error) {
		console.error('Error al crear el grupo:', error);

		return res.status(500).json({
			message: 'Error al crear el grupo'
		});
	}
};