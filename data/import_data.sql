BEGIN;

INSERT INTO "user" ("pseudo", "password", "twitch") VALUES 
('Deviltifa', 'blaba', 'Deviltifa'),
('Lyliya', 'blaba', 'Lyliya'),
('Skunkoff', 'blabla', 'skunkoff01'),
('Ker Pouic-Pouic', 'blabla', 'ker_pouic_pouic'),
('Faraziel', 'blabla', 'faraziel');


INSERT INTO "game" ("name") VALUES 
('Super Mario World'),
('Refunct'),
('Action Henk'),
('Another Perscpective'),
('Neo Turf Master'),
('Doom'),
('SEUM'),
('WitchEye'),
('A Link to the Past'),
('Spelunky 2');


INSERT INTO "race" ("date", "player_number", "game_id") VALUES
('2016-06-22 19:10:25-07', 0, 21),
('2019-06-22 19:10:25-07', 2 ,29),
('2020-08-25 19:10:25-07', 5, 25);

COMMIT;