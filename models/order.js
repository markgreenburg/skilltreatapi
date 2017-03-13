'use strict';

/**
 * Order models
 */

module.exports = function(sequelize, DataTypes) {
    const Order = sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        stripeId: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        total: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        isRefunded: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    })
}