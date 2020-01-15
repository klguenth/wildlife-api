CREATE TABLE sightings (
    sighting_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    species TEXT NOT NULL,
    brief_description TEXT NOT NULL,
    detailed_description TEXT NOT NULL,
    sighting_date DATE,
    sighting_location TEXT NOT NULL,
    user_id INTEGER REFERENCES users(user_id)
);