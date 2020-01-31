const bcrypt = require('bcrypt');

function makeUsersArray() {
    return [
      {
        user_name: 'test-user-1',
        full_name: 'Test user 1',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        user_name: 'test-user-2',
        full_name: 'Test user 2',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        user_name: 'test-user-3',
        full_name: 'Test user 3',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        user_name: 'test-user-4',
        full_name: 'Test user 4',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
    ]
  }
  
  function makeSightingsArray() {
    return [
        {
            id: 1,
            title: 'Title One',
            species: 'Humpback Whale',
            brief_description: 'Brief Description Text',
            detailed_description: 'Detailed Description Text',
            sighting_date: 2020-1-29,
            sighting_location: 'San Francisco, CA'
        },
        {
            id: 2,
            title: 'Title Two',
            species: 'Northern Sea Otter',
            brief_description: 'Brief Description Text',
            detailed_description: 'Detailed Description Text',
            sighting_date: 2020-1-15,
            sighting_location: 'Monterey, CA'
        },
        {
            id: 3,
            title: 'Title Three',
            species: 'Right Whale',
            brief_description: 'Brief Description Text',
            detailed_description: 'Detailed Description Text',
            sighting_date: 2019-10-23,
            sighting_location: 'Cocoa Beach, FL'
        },
        {
            id: 4,
            title: 'Title Four',
            species: 'Florida Manatee',
            brief_description: 'Brief Description Text',
            detailed_description: 'Detailed Description Text',
            sighting_date: 2019-8-30,
            sighting_location: 'Crystal River, FL'
        },
        {
            id: 5,
            title: 'Title Five',
            species: 'Atlantic Bottlenose Dolphin',
            brief_description:'Brief Description Text',
            detailed_description: 'Detailed Description Text',
            sighting_date: 2019-7-11,
            sighting_location: 'Sanibel Island, FL'
        }
    ]
}
  
  function makeExpectedSighting(users, sightings=[]) {
    const author = users
      .find(user => user.id === sighting.author_id)
  
    const number_of_comments = comments
      .filter(comment => comment.article_id === article.id)
      .length
  
    return {
      id: sighting.id,
      title: sighting.title,
      species: sighting.species,
      brief_description: sighting.brief_description,
      detailed_description: sighting.detailed_description,
      sighting_date: sighting.sighting_date,
      sighting_location: sighting.sighting_location
    }
  }
  
  function makeMaliciousSighting(user) {
    const maliciousSighting = {
      id: 911,
      title: 'I am malicious<script>alert("xss");</script>',
      species: 'The worst species',
      brief_description: 'I am bad news bears',
      detailed_description: `Bears, Beets, Battlestar Galactica onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
      sighting_date: 1999-12-31,
      sighting_location: 'The Worst Place, Ever',
    }
    const expectedSighting = {
      ...makeExpectedSighting([user], maliciousSighting),
      title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      detailed_description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
    }
    return {
      maliciousSighting,
      expectedSighting,
    }
  }
  
  function makeSightingsFixtures() {
    const testUsers = makeUsersArray()
    const testSightings = makeSightingsArray(testUsers)
    return { testUsers, testSightings }
  }

  function seedUsers(db, users) {
      const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
      }))
      return db.into('users').insert(preppedUsers)
        .then(() =>
          // update the auto sequence to stay in sync
          db.raw(
            `SELECT setval('user_id', ?)`,
            [users[users.length - 1].id],
          )
        )
    }
  
  function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
          users,
          sightings,
          species
        `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE sightings_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('sightings_id_seq', 0)`),
          trx.raw(`SELECT setval('users_id_seq', 0)`),
        ])
      )
    )
  }
  
  function seedSightingsTables(db, users, sightings=[]) {
    // use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
      await trx.into('users').insert(users)
      await trx.into('sightings').insert(sightings)
      // update the auto sequence to match the forced id values
      await Promise.all([
        trx.raw(
          `SELECT setval('users_id_seq', ?)`,
          [users[users.length - 1].id],
        ),
        trx.raw(
          `SELECT setval('sightings_id_seq', ?)`,
          [sightings[sightings.length - 1].id],
        ),
      ])
    })
  }
  
  function seedMaliciousSighting(db, user, sighting) {
    return db
      .into('sightings')
      .insert([user])
      .then(() =>
        db
          .into('sightings')
          .insert([sighting])
      )
  }
  
  module.exports = {
    makeUsersArray,
    makeSightingsArray,
    makeExpectedSighting,
    makeMaliciousSighting,
  
    makeSightingsFixtures,
    cleanTables,
    seedUsers,
    seedSightingsTables,
    seedMaliciousSighting,
  }