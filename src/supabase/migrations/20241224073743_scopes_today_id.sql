DROP VIEW IF EXISTS scopes_today;

CREATE VIEW scopes_today AS
SELECT h.id,
       h.date,
       h.scope,
       s.id     AS "signId",
       sl.value AS "sign"
FROM horoscopes h
         JOIN signs s ON h.sign_id = s.id
         JOIN sign_localizations sl ON s.id = sl.sign_id
WHERE sl.locale = 're'
  AND h.date = CURRENT_DATE;
