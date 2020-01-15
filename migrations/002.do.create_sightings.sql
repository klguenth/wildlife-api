CREATE TABLE sightings (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    species TEXT NOT NULL,
    brief_description TEXT NOT NULL,
    detailed_description TEXT NOT NULL,
    location TEXT NOT NULL,
    //TIME
);