const dataSource = require('../utils').dataSource;
const Skill = require('../entity/Skill');

module.exports = {
    create: async (req, res) => {
        try {
            await
            dataSource
            .getRepository(Skill)
            .save(req.body)
            // If the operation is a success, THEN send a response X
            res.send('Skill created with success.');
        } catch (err) {
            // If the operation is a failure, CATCH the error (and send a response)
                res.send('Error while creating the skill.');
            };
    },

    read: async (req, res) => {
        try {
        const allSkills = await
            dataSource
            .getRepository(Skill)
            .find();
            res.send(allSkills);
            } catch (err) {
                console.log('Errors while reading the skills.');
            }
        },

    update: async (req, res) => {
        try {
            await
            dataSource
            .getRepository(Skill)
            .update(req.params.id, req.body)
            res.send('Skill updated with success !');
        } catch (err) {
            console.log('Failed to update the skill.')
        }
    },

    delete: async (req, res) => {
        try {
            await
            dataSource
            .getRepository(Skill)
            .delete(req.params.id);
            res.send('Skill deleted.');
        } catch (err) {
            console.log('Error while deleting the skill.');
        }
    },
};