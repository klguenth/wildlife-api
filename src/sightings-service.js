const SightingsService = {
    getAllSightings(knex) {
        return knex
            .select('*')
            .from('sightings')
    },
    getById(knex, sighting_id) {
        return knex
            .from('sightings')
            .select('*')
            .where('sighting_id', sighting_id)
            .first()
    },
    getBySpecies(knex, species) {
        return knex
            .from('sightings')
            .select('*')
            .where('species', species)
    },
    deleteSighting(knex, sighting_id) {
        return knex('sightings')
            .where({ sighting_id })
            .delete()
    },
    updateSighting(knex, sighting_id, newItemFields) {
        return knex('sightings')
            .where({ sighting_id })
            .update(newItemFields)
    },
    insertSighting(knex, newSighting) {
        return knex
            .insert(newSighting)
            .into('sightings')
            .returning('*')
            .then(rows => rows[0])
    },
}

module.exports = SightingsService