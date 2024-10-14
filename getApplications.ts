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

export const getApplications = (query?: any) => {
  let baseQuery = `SELECT * from APPLICATION`;
  const params: string[] = [];

  if (query) {
    const filterConditions: string[] = [];

    filterConditions.push(`position LIKE ?`);
    params.push(`%${query.position}%`);

    if (filterConditions.length > 0) {
      baseQuery += ` WHERE ${filterConditions.join()}`;
    }
  }

  console.log(baseQuery, params);

  return new Promise((resolve, reject) => {
    db.all(baseQuery, params, (err, users) => {
      if (err) {
        reject(err);
      } else {
        console.log("users,", users);
        resolve(users);
      }
    });
  });
};

export const RegisterApplications = (data: any) => {
  return new Promise((resolve, reject) => {
    const { companyName, stage, position, link, day, id } = data;

    const sql = `
        INSERT INTO APPLICATION (companyName, stage, position, link, day, id)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

    db.all(
      sql,
      [companyName, stage, position, link, day, id],
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

export const UpdateApplication = (data: any) => {
  return new Promise((resolve, reject) => {
    const { companyName, stage, position, link, day, appId } = data;

    const sql = `
      UPDATE APPLICATION 
      SET companyName = ?, 
          stage = ?, 
          position = ?, 
          link = ?, 
          day = ?
      WHERE appId = ?
    `;

    db.all(
      sql,
      [companyName, stage, position, link, day, appId],
      function (err, apps) {
        if (err) {
          reject(err);
        } else {
          resolve(apps);
        }
      }
    );
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
