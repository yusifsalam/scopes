-- Main horoscopes table
CREATE TABLE signs (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE);

CREATE TABLE sign_localizations (
    id SERIAL PRIMARY KEY,
    sign_id INTEGER REFERENCES signs (id),
    locale TEXT NOT NULL,
    value TEXT NOT NULL,
    UNIQUE (sign_id, locale)
);

CREATE TABLE horoscopes (
    id SERIAL PRIMARY KEY,
    sign_id INTEGER REFERENCES signs (id),
    date DATE NOT NULL,
    scope TEXT NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (sign_id, date)
);

CREATE TABLE scope_updates (
    id SERIAL PRIMARY KEY,
    updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for common queries
CREATE INDEX idx_horoscopes_date_sign ON horoscopes (date, sign_id);

CREATE INDEX idx_horoscope_updates_timestamp ON scope_updates (updated_at);

INSERT INTO
    signs (name)
VALUES
    ('capricorn'),
    ('aquarius'),
    ('pisces'),
    ('aries'),
    ('taurus'),
    ('gemini'),
    ('cancer'),
    ('leo'),
    ('virgo'),
    ('libra'),
    ('scorpio'),
    ('sagittarius');

INSERT INTO
    sign_localizations (sign_id, locale, value)
VALUES
    (1, 'fi', 'kauris'),
    (2, 'fi', 'vesimies'),
    (3, 'fi', 'kalat'),
    (4, 'fi', 'oinas'),
    (5, 'fi', 'härkä'),
    (6, 'fi', 'kaksoset'),
    (7, 'fi', 'rapu'),
    (8, 'fi', 'leijona'),
    (9, 'fi', 'neitsyt'),
    (10, 'fi', 'vaaka'),
    (11, 'fi', 'skorpioni'),
    (12, 'fi', 'jousimies');

INSERT INTO
    sign_localizations (sign_id, locale, value)
VALUES
    (1, 're', 'capricorn'),
    (2, 're', 'aquarius'),
    (3, 're', 'pisces fishes'),
    (4, 're', 'ram'),
    (5, 're', 'bull'),
    (6, 're', 'twin'),
    (7, 're', 'crab'),
    (8, 're', 'lion'),
    (9, 're', 'virgin'),
    (10, 're', 'horizontal'),
    (11, 're', 'scorpion'),
    (12, 're', 'centaur');

CREATE VIEW scopes_today AS
SELECT
    h.id,
    h.date,
    h.scope,
    sl.value AS "sign"
FROM
    horoscopes h
    JOIN signs s ON h.sign_id = s.id
    JOIN sign_localizations sl ON s.id = sl.sign_id
WHERE
    sl.locale = 're'
    AND h.date = CURRENT_DATE;
