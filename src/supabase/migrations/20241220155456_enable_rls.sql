-- First, enable RLS on all tables
ALTER TABLE "public"."signs"
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."sign_localizations"
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."horoscopes"
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."scope_updates"
    ENABLE ROW LEVEL SECURITY;
ALTER VIEW "public"."scopes_today" SET (security_invoker = on);


-- Signs table policy
CREATE POLICY "Allow public read access for signs"
    ON "public"."signs"
    AS PERMISSIVE
    FOR SELECT
    TO PUBLIC
    USING (TRUE);

-- Sign localizations table policy
CREATE POLICY "Allow public read access for sign_localizations"
    ON "public"."sign_localizations"
    AS PERMISSIVE
    FOR SELECT
    TO PUBLIC
    USING (TRUE);

-- Horoscopes table policy
CREATE POLICY "Allow public read access for horoscopes"
    ON "public"."horoscopes"
    AS PERMISSIVE
    FOR SELECT
    TO PUBLIC
    USING (TRUE);

-- Scope updates table policy
CREATE POLICY "Allow public read access for scope_updates"
    ON "public"."scope_updates"
    AS PERMISSIVE
    FOR SELECT
    TO PUBLIC
    USING (TRUE);

