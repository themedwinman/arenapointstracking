CREATE TABLE points (
  id INTEGER NOT NULL PRIMARY KEY,
  associated_house TEXT NOT NULL,
  user_id TEXT,
  points_gained INTEGER,
  points_lost INTEGER
);