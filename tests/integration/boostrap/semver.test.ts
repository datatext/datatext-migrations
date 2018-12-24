import { Client } from "pg";
import { BOOTSTRAP_TRANSACTION, TEARDOWN_TRANSACTION } from "../../../src/bootstrap/queries";

let client: Client;

describe('Semantic version verification function `string_is_valid_semver`', () => {

  beforeAll(async () => {
    client = new Client({
      connectionString: process.env['DATABASE_URL']
    });

    return await client.connect()
      .then(() => client.query(BOOTSTRAP_TRANSACTION))
  });

  afterAll(async () => {
    try {
      return await client.query(TEARDOWN_TRANSACTION);
    } finally {
      await client.end();
    }
  });

  test('Should be composed of exactly 3 parts : major, minor and patch', async () => {
    await client.query("SELECT string_is_valid_semver('0.1.2.1') AS valid")
      .then(result => result.rows[0])
      .then(result => expect(result.valid).toBe(false));

    await client.query("SELECT string_is_valid_semver('0.1') AS valid")
      .then(result => result.rows[0])
      .then(result => expect(result.valid).toBe(false));

    return await client.query("SELECT string_is_valid_semver('0.1.2') AS valid")
      .then(result => result.rows[0])
      .then(result => expect(result.valid).toBe(true));
  });

  test('Should only accept parts that are positive integers', async () => {
    await client.query("SELECT string_is_valid_semver('0.-1.2') AS valid")
      .then(result => result.rows[0])
      .then(result => expect(result.valid).toBe(false));

    await client.query("SELECT string_is_valid_semver('a.b.c') AS valid")
      .then(result => result.rows[0])
      .then(result => expect(result.valid).toBe(false));

    return await client.query("SELECT string_is_valid_semver('12.0.42') AS valid")
      .then(result => result.rows[0])
      .then(result => expect(result.valid).toBe(true));
  });

  test('Should not accept leading zeroes', async () => {
    await client.query("SELECT string_is_valid_semver('01.1.2') AS valid")
      .then(result => result.rows[0])
      .then(result => expect(result.valid).toBe(false));

    return await client.query("SELECT string_is_valid_semver('1.01.1') AS valid")
      .then(result => result.rows[0])
      .then(result => expect(result.valid).toBe(false));
  });
});

