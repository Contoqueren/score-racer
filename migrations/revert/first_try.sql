-- Revert score-racer:first_try from pg

BEGIN;

DROP TABLE "user", "race", "scoring", "game", "user_participate_race"

COMMIT;
