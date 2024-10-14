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

//TODO add filter and sort and limit
export const getApplications = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM APPLICATION`, (err, users) => {
      if (err) {
        reject(err);
      } else {
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
