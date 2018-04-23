\c tournament

DROP TABLE IF EXISTS tournaments CASCADE;
DROP TABLE IF EXISTS competitors CASCADE;
DROP TABLE IF EXISTS matches CASCADE;

CREATE TABLE tournaments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(25),
  num_comp INT
);

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

ALTER TABLE tournaments ADD COLUMN tournament_champion INT REFERENCES competitors (id) ON DELETE CASCADE;

