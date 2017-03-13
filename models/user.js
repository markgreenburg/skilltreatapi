'use strict';

/**
 * User database models
 */
const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fName: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1,25],
            },
        },
        lName: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1,25],
            },
        },
        email: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: true,
                len: [1, 255],
            },
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 255],
            },
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                notEmpty: true,
            },
        },
        isSuspended: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                notEmpty: true,
            },
        },
        role: {
            type: DataTypes.ENUM('user', 'teacher', 'admin'),
            allowNull: false,
            validate: {
                notEmpty: true,
                isIn: [['user', 'teacher', 'admin']],
            },
        },
    });

    // Convert emails to lowercase
    User.afterValidate(function(user) {
        const emailLower = user.email.toLowerCase();
        user.email = emailLower;
    });

    // Hash and salt passwords before creating and updating
    User.beforeCreate(updatePassword);
    User.beforeUpdate(updatePassword);
    
    function updatePassword(user) {
        if (user.changed('password')) {
            return bcrypt.genSalt(12, function(err, salt) {
                if (err) {
                    return sequelize.Promise.reject(err);
                }
                bcrypt.hash(user.password, salt, function(err, hash) {
                    if (err) {
                        return sequelize.Promise.reject(err);
                    }
                    user.password = hash;
                    return sequelize.Promise.resolve(user);
                });
            });
        } 
    }

    return User;
}



