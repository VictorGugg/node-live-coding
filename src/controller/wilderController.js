const dataSource = require('../utils').dataSource;
const { In } = require('typeorm');
const Grade = require('../entity/Grade');
const Skill = require('../entity/Skill');
const Wilder = require('../entity/Wilder');

module.exports = {
    create: async (req, res) => {
        try {
            await dataSource
            .getRepository(Wilder)
            .save(req.body)
            // If the operation is a success, THEN send a response X
            res.send('Wilder created with success.');
        } catch (err) {
            // If the operation is a failure, CATCH the error (and send a response)
                res.send('Error while creating the wilder.');
            };
    },

    read: async (req, res) => {
        try {
        const allWilders = await dataSource
            .getRepository(Wilder)
            // find parameters to display newly added first
            .find({order: {id: 'DESC'}});
            res.send(allWilders);
            } catch (err) {
                console.log('Errors while reading the wilders.');
            }
        },

    update: async (req, res) => {
        try {
            await dataSource
            .getRepository(Wilder)
            .update(req.params.id, req.body)
            res.send('Wilder updated with success !');
        } catch (err) {
            console.log('Failed to update the wilder.')
        }
    },

    delete: async (req, res) => {
        try {
            await dataSource
            .getRepository(Wilder)
            .delete(req.params.id);
            res.send('Wilder deleted.');
        } catch (err) {
            console.log('Error while deleting the wilder.');
        }
    },

    addSkills: async (req, res) => {
        try {
            const wilderToUpdate = await dataSource
                .getRepository(Wilder)
                .findOneByOrFail({ name: req.body.wilder });
            // console.log to make sure we've got a wilder
            console.log(wilderToUpdate);
            const skillsToAdd = await dataSource
                .getRepository(Skill)
                // findBy and In to get an array from the request (to allow multiple skills selection)
                .findBy({ name: In(req.body.skill) });
            // console.log to make sure we've got skills
            console.log(skillsToAdd);
            // We have an array, so we need to use the spread syntax ('...')
            // to split the elements of an array (and push them into our skills array).
            wilderToUpdate.skills.push(...skillsToAdd);
            await dataSource
                .getRepository(Wilder)
                .save(wilderToUpdate);
            res.send('Skills successfully added to the Wilder !');
        } catch (err) {
            console.log(err);
            res.send('Error while adding the skill.');
        }
    },

    rateSkill: async (req, res) => {
        try {
            const wilderToUpdate = await dataSource
                .getRepository(Wilder)
                .findOneByOrFail({ name: req.body.wilderName });
            // console.log to make sure we've got a wilder
            console.log(wilderToUpdate);
            const skillToRate = await dataSource
                .getRepository(Skill)
                .findOneByOrFail({ name: req.body.skillName });
            // console.log to make sure we've got a skill
            console.log(skillToRate);
            const rating = await dataSource
                .getRepository(Grade)
                .save({ rating: req.body.rating, skills: skillToRate, wilders: wilderToUpdate });
            res.send('Skill successfully rated !');
        } catch (err) {
            console.log(err);
            res.send('Error while rating the skill.');
        }
    },
};