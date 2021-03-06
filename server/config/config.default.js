/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1618451200552_5461';

    // add your middleware config here
    config.middleware = [];

    config.security = {
            csrf: {
                enable: false,
            }
        },

        config.cors = {
            origin: '*',
            allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
        }

    // 漫游数据库
    // config.sequelize = {
    //         dialect: 'mysql',
    //         host: '192.168.5.176',
    //         port: 3306,
    //         username: 'ych',
    //         password: 'ych',
    //         database: 'oa',
    //         timezone: '+08:00'
    //     },
    // 我的数据库
    config.sequelize = {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        database: 'oa',
        password: '123456',
        timezone: '+08:00'
    }

    config.jwt = {
        secret: 'cbl'
    }

    config.redis = {
        client: {
            port: 6379,
            host: 'localhost',
            password: null,
            db: 0,
        }
    }

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    return {
        ...config,
        ...userConfig,
    };
};