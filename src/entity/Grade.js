const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name : 'Grade',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        rating: {
            type: 'int',
        },
    },
    relations: {
        skills: {
            target: 'Skill',
            type: 'many-to-one',
        },
        wilders: {
            target: 'Wilder',
            type: 'many-to-one',
        },
    },
});