DROP FUNCTION IF EXISTS get_scopes_by_locale;

CREATE OR REPLACE FUNCTION get_scopes_by_locale(locale_param TEXT)
RETURNS TABLE (
    id INTEGER,
    date DATE,
    scope TEXT,
    "signId" INTEGER,
    sign TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        h.id,
        h.date,
        h.scope,
        s.id AS "signId",
        COALESCE(
            (SELECT value FROM sign_localizations sl2 
             WHERE sl2.sign_id = s.id AND sl2.locale = locale_param),
            CASE 
                WHEN locale_param NOT IN ('re', 'fi') THEN
                    (SELECT value FROM sign_localizations sl3 
                     WHERE sl3.sign_id = s.id AND sl3.locale = 'en')
                ELSE NULL
            END,
            s.name
        ) AS sign
    FROM horoscopes h
    JOIN signs s ON h.sign_id = s.id
    WHERE h.date = CURRENT_DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
