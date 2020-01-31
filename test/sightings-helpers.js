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

module.exports = {
    makeSightingsArray
}