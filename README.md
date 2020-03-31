
# Wildlife Watch

## Summary

Wildlife watch is a fullstack CRUD app that provides users with the opportunity to create and maintain a list of wildlife sightings- specifically noting species, behavior, location, and date. 

## Motivation

Wildlife Watch centers on animal behavior and observation, with the hope that it will foster curiosity about the natural world to ultimately inspire wildlife conservation efforts. The creator of the app has worked with a wide variety of animals- specifically marine mammals- in a previous career, so the emphasis on wildlife conservation and habitat preservation were a large part of the inspiration behind the app. After all, as the landing page states:
> 
In the end we will conserve only what we love; we will love only what we understand; we will understand only what we are taught. -Baba Dioum

## Languages/Frameworks Utilized

* [React](https://reactjs.org/)
* [Javascript](https://www.javascript.com/)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)

## API Documentation

# Show Sighting
Returns sighting
* URL
/api/sightings
* Method
```
GET
```
* URL Params
None
* Data Params
None
* Success Response
    Code: 200
    Content: { sighting_id: 118, title: "Manatees Feeding", species: "Florida Manatee", brief_description: "Feeding", detailed_description: "A mother and calf manatee pair were seen feeding in the shallows of the river. They came up to breathe every few minutes and the calf was playing.↵↵:D", sighting_date: "2014-09-24T00:00:00.000Z", sighting_location: "Crystal River, FL" }
* Error Response
    Code: 404 NOT FOUND
    Content: { error: Sighting doesn't exist }

# Edit Sighting
Edits existing sighting
* URL
/api/sightings/:sighting_id
* Method
```
PATCH
```
* URL Params
sighting_id=[integer]
* Data Params
None
* Success Response:
    Code: 204
    Content: { sighting_id: 118, title: "Manatees Feeding", species: "Florida Manatee", brief_description: "Feeding", detailed_description: "A mother and calf manatee pair were seen feeding in the shallows of the river. They came up to breathe every few minutes and the calf was playing.↵↵:D", sighting_date: "2014-09-24T00:00:00.000Z", sighting_location: "Crystal River, FL" }
* Error Response
    Code: 400
    Content: { error: Request body must contain 'title', 'species', 'brief_description', 'detailed_description', 'sighting_date', or 'sighting_location' }
    
# Delete Sighting
Deletes existing sighting
* URL
/api/sightings/:sighting_id
* Method
```
DELETE
```
* URL Params
sighting_id=[integer]
* Data Params
None
* Success Response:
    Code: 204
    Content: none
* Error Response:
    Code: 400
    Content: none

## Live App
[Wildlife Watch](https://wildlife-app.klguenth.now.sh/)

## Client Repository
[Wildlife Watch Client-Side Code](https://github.com/klguenth/wildlife-app)
