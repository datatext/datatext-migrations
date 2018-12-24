/**
 * Bootstrap transaction used to create the proper tables, indexes and other postgres objects the migration system
 * relies on.
 */
export const BOOTSTRAP_TRANSACTION = `
BEGIN;

CREATE OR REPLACE FUNCTION string_is_valid_semver(version TEXT)
  RETURNS BOOLEAN AS $$
  SELECT version ~ '^([1-9]\\d*|0)\.([1-9]\\d*|0)\.([1-9]\\d*|0)$';
$$ LANGUAGE 'sql';


COMMIT;`;

/**
 * Teardown query that drops any postgres object the migration system relies on. Mostly useful for integration tests.
 */
export const TEARDOWN_TRANSACTION = `
BEGIN;

DROP FUNCTION IF EXISTS string_is_valid_semver(TEXT);

COMMIT;
`;
