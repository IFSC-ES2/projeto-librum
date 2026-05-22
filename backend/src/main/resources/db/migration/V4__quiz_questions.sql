CREATE TABLE quiz_questions (
    id              BIGSERIAL PRIMARY KEY,
    phase_id        BIGINT NOT NULL REFERENCES phases(id),
    question_text   TEXT NOT NULL,
    option_a        VARCHAR(500) NOT NULL,
    option_b        VARCHAR(500) NOT NULL,
    option_c        VARCHAR(500) NOT NULL,
    option_d        VARCHAR(500) NOT NULL,
    correct_option  CHAR(1) NOT NULL CHECK (correct_option IN ('A','B','C','D')),
    order_index     INT NOT NULL DEFAULT 0
);
