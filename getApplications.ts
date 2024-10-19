import db from "./db";

//TODO should be get user to do auth
export const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM User`, (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
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
    db.all(baseQuery, params, (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
};

export const RegisterApplications = (data: any) => {
  console.log(data, "data");
  return new Promise((resolve, reject) => {
    const { appId, companyName, stage, position, link, day, id } = data;

    const sql = `
        INSERT INTO APPLICATION (appId, companyName, stage, position, link, day, id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

    db.all(
      sql,
      [appId, companyName, stage, position, link, day, id],
      function (err, applications) {
        if (err) {
          reject(err);
        } else {
          resolve(applications);
        }
      }
    );
  });
};

export const UpdateApplication = (data: string, id: number) => {
  console.log(data, id);
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE APPLICATION 
      SET  stage = ?
      WHERE appId = ?
    `;

    db.all(sql, [data, id], function (err, apps) {
      if (err) {
        reject(err);
      } else {
        resolve(apps);
      }
    });
  });
};

export const removeApplication = (appId: number) => {
  return new Promise((resolve, reject) => {
    const sql = `
    DELETE FROM APPLICATION WHERE appId = ? RETURNING *
    `;

    db.all(sql, [appId], function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
