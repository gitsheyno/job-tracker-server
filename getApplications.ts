// import db from "./db";
import { eq } from "drizzle-orm";
import { db } from "./db/db";
import { application } from "./db/schema";
//TODO should be get user to do auth
export const getUsers = () => {
  return new Promise((resolve, reject) => {
    // db.all(`SELECT * FROM User`, (err, users) => {
    //   if (err) {
    //     reject(err);
    //   } else {
    //     resolve(users);
    //   }
    // });
  });
};

type M = {
  position?: string;
  limit?: string;
};
export const getApplications = (query?: M) => {
  let baseQuery = `SELECT * from APPLICATION`;
  const params: string[] = [];
  if (query) {
    const filterConditions: string[] = [];

    if (query.position) {
      filterConditions.push(`position LIKE ?`);
      params.push(`%${query.position}%`);
    }

    if (query.limit) {
      filterConditions.push(`stage = ?`);
      params.push(`${query.limit}`);
    }

    if (filterConditions.length > 0) {
      baseQuery += ` WHERE ${filterConditions.join(" AND ")}`;
    }
  }

  return new Promise((resolve, reject) => {
    // db.all(baseQuery, params, (err, users) => {
    //   if (err) {
    //     reject(err);
    //   } else {
    //     resolve(users);
    //   }
    // });
  });
};

export const RegisterApplications = async (data: any) => {
  console.log(data, "data");

  const { appId, companyName, stage, position, link, day, id } = data;

  try {
    const newApplication = await db.insert(application).values({
      companyName,
      stage,
      position,
      link,
      day,
      userId: id,
    });

    return newApplication; // Return the result of the insert operation
  } catch (err) {
    console.error(`Error inserting application: ${err.message}`); // Log the error for debugging
    throw new Error(`Error inserting application: ${err.message}`); // Re-throw the error for handling upstream
  }
};

export const UpdateApplication = async (data: string, id: string) => {
  const updated = await db
    .update(application)
    .set({ stage: data })
    .where(eq(application.appId, id));
};

export const removeApplication = async (appId: string) => {
  await db.delete(application).where(eq(application.appId, appId));
};
