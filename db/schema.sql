DROP TABLE IF EXISTS tournaments CASCADE;
DROP TABLE IF EXISTS competitors CASCADE;
DROP TABLE IF EXISTS matches CASCADE;

CREATE TABLE tournaments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(25),
  num_comp INT
);
-- the foreign keys for competitors and tournaments have ON DELETE CASCADE because when you delete a tournament,
-- I want all the associated information to be removed as well.
CREATE TABLE competitors (
  id SERIAL PRIMARY KEY,
  comp_name VARCHAR(25),
  tournament_id INT REFERENCES tournaments (id) ON DELETE CASCADE
);

CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  comp_a_id INT REFERENCES competitors (id) ON DELETE CASCADE,
  comp_b_id INT REFERENCES competitors (id) ON DELETE CASCADE,
  tournament_id INT NOT NULL REFERENCES tournaments (id) ON DELETE CASCADE,
  comp_a_score INT,
  comp_b_score INT,
  round_id INT
);
-- alter table line is necessary for adding the tournament_champion column to the tournaments table because
-- the competitors table doesnt exist until after it is created
ALTER TABLE tournaments ADD COLUMN tournament_champion INT REFERENCES competitors (id) ON DELETE CASCADE;

