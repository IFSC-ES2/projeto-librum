ALTER TABLE quiz_questions ADD COLUMN explanation TEXT;

ALTER TABLE user_progress ADD COLUMN quiz_completed BOOLEAN NOT NULL DEFAULT FALSE;
