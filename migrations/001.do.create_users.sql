CREATE TABLE users (
    user_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    full_name TEXT NOT NULL,
    user_name TEXT NOT NULL,
    password TEXT NOT NULL
    -- date_created DATETIME DEFAULT GETDATE(),
);