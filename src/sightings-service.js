const SightingsService = {
    getAllSightings(knex) {
        return knex
            .select('*')
            .from('sightings')
    },
    getById(knex, id) {
        return knex
            .from('sightings')
            .select('*')
            .where('id', id)
            .first()
    },
    deleteSighting(knex, id) {
        return knex('sightings')
            .where({ id })
            .delete()
    },
    /*updateSighting(knex, id, newItemFields) {
        return knex('sightings')
            .where({ id })
            .update(newItemFields)
    },*/
    insertSighting(knex, newSighting) {
        return knex
            .insert(newSighting)
            .into('sightings')
            .returning('*')
            .then(rows => rows[0])
    },
}

module.exports = SightingsService