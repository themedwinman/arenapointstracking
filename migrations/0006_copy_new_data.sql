INSERT INTO points (id, associated_house, user_id, points_gained, points_lost)
SELECT id, associated_house, user_id, points_gained, points_lost
FROM points_old;