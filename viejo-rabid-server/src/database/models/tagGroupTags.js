import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const TagGroupTags = sequelize.define("TagGroupTags", {
    id_group_fk: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_tag_fk: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});