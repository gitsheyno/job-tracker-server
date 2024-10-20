import { createClient } from "@libsql/client";
import "dotenv/config";

// Initialize Turso client
export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

// Get all users
export const getUsers = async () => {
  try {
    const result = await turso.execute("SELECT * FROM User");
    return result.rows;
  } catch (err) {
    throw err;
  }
};

// Type for query filtering
type M = {
  position?: string;
  limit?: string;
};

// Get applications with optional query filters
export const getApplications = async (query?: M) => {
  let baseQuery = `SELECT * from APPLICATION`;
  const args: Record<string, string> = {};

  if (query) {
    const filterConditions: string[] = [];

    if (query.position) {
      filterConditions.push(`position LIKE :position`);
      args.position = `%${query.position}%`;
    }

    if (query.limit) {
      filterConditions.push(`stage = :limit`);
      args.limit = `${query.limit}`;
    }

    if (filterConditions.length > 0) {
      baseQuery += ` WHERE ${filterConditions.join(" AND ")}`;
    }
  }

  try {
    const result = await turso.execute({
      sql: baseQuery,
      args,
    });
    return result.rows;
  } catch (err) {
    throw err;
  }
};

// Register a new application
export const RegisterApplications = async (data: any) => {
  console.log(data, "data");
  const { companyName, stage, position, link, day, id } = data;
  const sql = `
    INSERT INTO APPLICATION ( companyName, stage, position, link, day, id)
    VALUES ( :companyName, :stage, :position, :link, :day, :id)
  `;

  try {
    const result = await turso.execute({
      sql,
      args: { companyName, stage, position, link, day, id },
    });
    return result.rowsAffected; // Number of rows affected
  } catch (err) {
    throw err;
  }
};

// Update an existing application
export const UpdateApplication = async (data: string, id: number) => {
  const sql = `
    UPDATE APPLICATION 
    SET stage = :stage
    WHERE appId = :appId
  `;

  try {
    const result = await turso.execute({
      sql,
      args: { stage: data, appId: id },
    });
    return result.rowsAffected; // Number of rows affected
  } catch (err) {
    throw err;
  }
};

// Remove an application
export const removeApplication = async (appId: number) => {
  const sql = `
    DELETE FROM APPLICATION WHERE appId = :appId RETURNING *
  `;

  try {
    const result = await turso.execute({
      sql,
      args: { appId },
    });
    return result.rows; // Returns the deleted row(s)
  } catch (err) {
    throw err;
  }
};
