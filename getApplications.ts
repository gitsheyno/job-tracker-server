import db from "./db";

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM User`, (err, users) => {
      if (err) {
        reject(err); // Reject the promise if there's an error
      } else {
        resolve(users); // Resolve the promise with the result
      }
    });
  });
};

export const getApplications = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM APPLICATION`, (err, users) => {
      if (err) {
        reject(err); // Reject the promise if there's an error
      } else {
        resolve(users); // Resolve the promise with the result
      }
    });
  });
};

export const RegisterApplications = (data: any) => {
  return new Promise((resolve, reject) => {
    const { companyName, stage, postion, link, day, id } = data;

    const sql = `
        INSERT INTO APPLICATION (companyName, stage, postion, link, day, id)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

    db.all(
      sql,
      [companyName, stage, postion, link, day, id],
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
