const typeorm = require('typeorm');
const Grade = require('./entity/Grade');
const Skill = require('./entity/Skill');
const Wilder = require("./entity/Wilder");

module.exports = {
    dataSource: new typeorm.DataSource({
        type: 'sqlite',
        database: './wildersdb.sqlite',
        // TODO check for more info =>
        /* 
        * true makes db to adapt to the entities defined by typeORM
        * only use it while dev, not on prod to avoid losing data
        */ 
        synchronize: true,
        // [Wilder], = [require('./entity/Wilder')],
        entities: [Wilder, Skill, Grade],
        
        /*
        * adding logging options to obtain logs from
        * successful and failed queries
        */
       logging: ['query', 'error']
    }),
};