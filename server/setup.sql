DROP TABLE IF EXISTS wizard;
DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS incident;

CREATE TABLE location (
    id INT GENERATED ALWAYS AS IDENTITY,
    world VARCHAR(100) NOT NULL,
    setting VARCHAR(100),
    PRIMARY KEY (id)
);

INSERT INTO location (world, setting)
VALUES ('Middle Earth', 'Vast'), ('Hogwarts', 'Mysterious school castle'), ('Hyrule', 'Elven land'), ('Camelot', 'Medieval');

CREATE TABLE wizard (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (100) NOT NULL,
    age INT NOT NULL,
    power VARCHAR (100) NOT NULL,
    location_id INT NOT NULL,
    weapon VARCHAR (100),
    PRIMARY KEY (id),
    FOREIGN KEY (location_id) REFERENCES location(id)
);

INSERT INTO wizard (name, age, power, location_id, weapon)
VALUES ('Alatar', 101, 'Blue Magic', 1, 'Maia staff'), ('Albus', 116, 'All magic', 2, 'Elder wand'), ('Gandalf', 24000, 'Magic', 1, 'Glamdring'), ('Ganondorf', 1000, 'Evil power', 3, 'The Sword of the Six Sages'), ('Merlin', 20, 'Magic', 4, 'Wand');

CREATE TABLE incident (
    id INT GENERATED ALWAYS AS IDENTITY,
    wizard_id INT NOT NULL,
    location_id INT NOT NULL,
    time TIMESTAMP,
    description VARCHAR(1000) NOT NULL,
    severity_level INT,
    PRIMARY KEY (id),
    FOREIGN KEY (wizard_id) REFERENCES wizard(id),
    FOREIGN KEY (location_id) REFERENCES location(id)
);

INSERT INTO incident (wizard_id, location_id, time, description, severity_level)
VALUES (1, 1, '3018-10-19 10:23:54', 'Alatar was attacked by a giant bee, who feasts on wizards.', 3), (5, 2, '2014-12-10 00:01:59', 'All of the school''s chickens suddenly exploded in a cloud of feathers. The caretaker, Filch, spent the next week cleaning it up.', 2), (4, 4, '5000-11-21 13:00:05', 'Ganon was at a tea party with Link, when Link suddenly poured hot scalding tea over Ganon head.', 4), (3, 3, '1100-01-24 23:23:23', 'A small town at the edge of Hyrule was faced with disaster as the Moon fell on it. Luckily, a passing wizard managed to stop the Moon in it''s tracks and send it back.', 4);
