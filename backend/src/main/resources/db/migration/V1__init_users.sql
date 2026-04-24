CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
    id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(255) UNIQUE NOT NULL,
    password   VARCHAR(255) NOT NULL,
    xp         INTEGER      NOT NULL DEFAULT 0,
    level      INTEGER      NOT NULL DEFAULT 1,
    created_at TIMESTAMP    NOT NULL DEFAULT NOW()
);
