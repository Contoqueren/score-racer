-- Deploy score-racer:first_try to pg

BEGIN;

CREATE TABLE "user" (
    "id" serial PRIMARY KEY,
    "pseudo" text NOT NULL,
    "password" text NOT NULL,
    "twitch" text,
    "avatar" text
);

CREATE TABLE "game" (
    "id" serial PRIMARY KEY,
    "name" text NOT NULL,
    "image" text,
    "time_wr" time,
    "time_200" time,
    "time_100" time
);

CREATE TABLE "race" (
    "id" serial PRIMARY KEY,
    "date" timestamptz NOT NULL,
    "player_number" integer NOT NULL,
    "game_id" integer NOT NULL REFERENCES "game"("id")
);

CREATE TABLE "scoring" (
    "id" serial PRIMARY KEY,
    "score" float NOT NULL,
    "game_id" integer NOT NULL REFERENCES "game"("id"),
    "user_id" integer NOT NULL REFERENCES "user"("id")
);

CREATE TABLE "user_participate_race" (
    "race_id" integer NOT NULL REFERENCES "race"("id"),
    "user_id" integer NOT NULL REFERENCES "user"("id"),
    "place" integer,
    "time" date
);

COMMIT;
