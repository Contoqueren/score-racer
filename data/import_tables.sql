BEGIN;

DROP TABLE IF EXISTS "user", "race", "game", "racer_participate_race", "scoring";

CREATE TABLE IF NOT EXISTS "user" (
    "id" serial PRIMARY KEY,
    "pseudo" text NOT NULL,
    "password" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "game" (
    "id" serial PRIMARY KEY,
    "name" text NOT NULL,
    "image" text NOT NULL,
    "wr_time" time NOT NULL
);

CREATE TABLE IF NOT EXISTS "race" (
    "id" serial PRIMARY KEY,
    "date" timestamptz NOT NULL,
    "player_number" integer NOT NULL,
    "game_id" integer NOT NULL REFERENCES "game"("id")
);

CREATE TABLE IF NOT EXISTS "scoring" (
    "id" serial PRIMARY KEY,
    "score" number NOT NULL,
    "game_id" integer NOT NULL REFERENCES "game"("id"),
    "user_id" integer NOT NULL REFERENCES "user"("id")
)

CREATE TABLE IF NOT EXISTS "racer_participate_race" (
    "race_id" integer NOT NULL REFERENCES "race"("id"),
    "user_id" integer NOT NULL REFERENCES "user"("id"),
    "place" integer,
    "time" date
);

COMMIT;