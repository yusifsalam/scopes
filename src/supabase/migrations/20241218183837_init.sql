-- Main horoscopes table
CREATE TABLE signs
(
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE sign_localizations
(
    id      SERIAL PRIMARY KEY,
    sign_id INTEGER REFERENCES signs (id),
    locale  TEXT NOT NULL,
    value   TEXT NOT NULL,

    UNIQUE (sign_id, locale)
);

CREATE TABLE horoscopes
(
    id         SERIAL PRIMARY KEY,
    sign_id    INTEGER REFERENCES signs (id),
    date       DATE NOT NULL,
    scope      TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (sign_id, date)
);

-- Create index for common queries
CREATE INDEX idx_horoscopes_date_sign ON horoscopes (date, sign_id);

INSERT INTO signs (name)
VALUES ('capricorn'),
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


INSERT INTO sign_localizations (sign_id, locale, value)
VALUES (1, 'fi', 'kauris'),
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
