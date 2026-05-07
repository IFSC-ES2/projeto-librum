CREATE TABLE genres (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    slug        VARCHAR(50)  UNIQUE NOT NULL,
    icon_emoji  VARCHAR(10),
    description TEXT
);

CREATE TABLE books (
    id          BIGSERIAL PRIMARY KEY,
    genre_id    BIGINT NOT NULL REFERENCES genres(id),
    title       VARCHAR(200) NOT NULL,
    author      VARCHAR(150) NOT NULL
);

CREATE TABLE phases (
    id           BIGSERIAL PRIMARY KEY,
    book_id      BIGINT NOT NULL REFERENCES books(id),
    phase_number INT    NOT NULL,
    title        VARCHAR(200) NOT NULL
);

CREATE TABLE phase_segments (
    id               BIGSERIAL PRIMARY KEY,
    phase_id         BIGINT NOT NULL REFERENCES phases(id),
    segment_number   INT    NOT NULL,
    content          TEXT   NOT NULL,
    estimated_minutes INT   NOT NULL DEFAULT 3
);

CREATE TABLE user_progress (
    id                BIGSERIAL PRIMARY KEY,
    user_id           UUID   NOT NULL REFERENCES users(id),
    phase_id          BIGINT NOT NULL REFERENCES phases(id),
    last_segment_read INT    NOT NULL DEFAULT 0,
    is_completed      BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at      TIMESTAMP,
    UNIQUE(user_id, phase_id)
);