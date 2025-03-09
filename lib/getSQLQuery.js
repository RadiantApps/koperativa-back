const { databaseTables } = require("./databaseHelper/tables");
const getSQLQuery = (queryCode, vars = "") => {
  var query = "";

  for (var i = 0; i < queryCode.length; i++) {
    var code = queryCode[i] + "";
    var code_type = code.substring(0, 1);

    switch (code_type) {
      case "1":
        // SELECT
        query += getSelectQuery(code, vars);
        break;
      case "2":
        // INSERT
        query += getInsertQuery(code, vars);
        break;
      case "3":
        // UPDATE
        query += getUpdateQuery(code, vars);
        break;
      case "4":
        // DELETE
        query += getDeleteQuery(code, vars);
        break;
      case "9":
        query += getAnalyticsQuery(code, vars);
        break;
      default:
        return false;
    }
  }
  return query;
};

const getSelectQuery = (code, vars = "") => {
  const queries = {
    1000: `SELECT * FROM ${databaseTables.USERS}`,
    1001: `SELECT * FROM ${databaseTables.USERS} WHERE email = ?;`,
    1002: `SELECT name, surname, role, phone, email FROM ${databaseTables.USERS} WHERE id = ?;`,
    1003: `SELECT 
            p.id, 
            p.title, 
            p.photo, 
            p.order, 
            pi.title AS portfolio_title 
            FROM ${databaseTables.PORTFOLIO} p 
            LEFT JOIN 
            ${databaseTables.PORTFOLIOITEM} 
            pi ON p.id = pi.portfolio_id;`,
    1004: `SELECT * FROM ${databaseTables.PORTFOLIO} WHERE id = ?;`,
    1005: `SELECT * FROM ${databaseTables.PORTFOLIOIDELIVERABLES} WHERE portfolio_id = ? ORDER BY \`order\` ASC;`,
    1006: `SELECT * FROM ${databaseTables.PORTFOLIOCONTENT} WHERE portfolio_id = ? ORDER BY \`order\` ASC;`,
    1007: `SELECT * FROM ${databaseTables.PORTFOLIOITEM} WHERE portfolio_id = ?`,
    1008: `
        SELECT 
            p.id AS portfolio_id, 
            p.title AS portfolio_title, 
            p.photo AS portfolio_photo, 
            p.created_at AS portfolio_created_at,

            pi.description AS description, 
            pi.title AS item_title, 
            pi.subtitle AS item_subtitle, 
            pi.icon AS item_icon,

            pc.id AS content_id, 
            pc.content_type, 
            pc.content_data, 
            pc.order AS content_order,

            pd.id AS deliverable_id, 
            pd.name AS deliverable_name, 
            pd.order AS deliverable_order

        FROM 
            ${databaseTables.PORTFOLIO} p
        LEFT JOIN 
            ${databaseTables.PORTFOLIOITEM} pi ON p.id = pi.portfolio_id
        LEFT JOIN 
            ${databaseTables.PORTFOLIOCONTENT} pc ON p.id = pc.portfolio_id
        LEFT JOIN 
            ${databaseTables.PORTFOLIOIDELIVERABLES} pd ON p.id = pd.portfolio_id

        WHERE 
            p.id = ?;

          `,
    1009: `SELECT * FROM ${databaseTables.HOMEPAGECONTENT}`,
    1010: `SELECT * FROM ${databaseTables.WHATWEDO}`,
    1011: `SELECT * FROM ${databaseTables.PARTNERS}`,
    1012: `SELECT * FROM ${databaseTables.COMMENT}`,
    1013: `SELECT * FROM ${databaseTables.AWARDS}`,
    1014: `SELECT * FROM ${databaseTables.TEAMS}`,
    1015: `SELECT * FROM ${databaseTables.JOBS} ORDER BY id DESC`,
    1016: `SELECT * FROM ${databaseTables.JOBS} WHERE id = ?;`,
    1017: `SELECT * FROM ${databaseTables.COMMENTSTAFF}`,
    1018: `SELECT * FROM ${databaseTables.BLOG} ORDER BY id DESC`,
    1019: `SELECT * FROM ${databaseTables.BLOGDETAILS} WHERE blog_id = ?;`,
    1020: `SELECT * FROM ${databaseTables.BLOG} WHERE id = ?;`,
    1021: `SELECT * FROM ${databaseTables.ABOUT}`,
    1022: `SELECT * FROM ${databaseTables.ABOUTS_SLIDER}`,
    1023: `SELECT * FROM ${databaseTables.BANNER};`,
    1024: `SELECT * FROM ${databaseTables.CAREER_SLIDER}`,
    1025: `SELECT 
    np.*,
    p.* 
      FROM 
          ${databaseTables.NEXT_POST} AS np
      JOIN 
          ${databaseTables.PORTFOLIO} AS p
      ON 
          np.portfolio_id = p.id
      WHERE 
          np.portfolio_id = ?; `,
    1026: `SELECT * FROM ${databaseTables.PARTNER_LOGO}`,
    1027: `SELECT * FROM ${databaseTables.BANNER_HOME}`,
    1028: `
     SELECT 
        p.id,
        p.photo,
        p.title,
        pi.description
      FROM 
        ${databaseTables.PORTFOLIO} AS p
      JOIN 
        ${databaseTables.PORTFOLIOITEM} AS pi
      ON 
        pi.portfolio_id = p.id
      WHERE 
        p.id = ?;
    `,
    1029: `SELECT * FROM ${databaseTables.CATEGORY_WORK}`,
    1030: `SELECT * FROM ${databaseTables.PORTFOLIO_MAPPING_CATEGORY}`,
    1031: `SELECT * FROM ${databaseTables.PORTFOLIO_MAPPING_CATEGORY} WHERE portfolio_id = ?;`,
    1032: `
        SELECT DISTINCT p.*, pi.title AS portfolio_title
        FROM ${databaseTables.PORTFOLIO} p
        LEFT JOIN ${databaseTables.PORTFOLIO_MAPPING_CATEGORY} pmc ON p.id = pmc.portfolio_id
        LEFT JOIN ${databaseTables.CATEGORY_WORK} c ON pmc.category_id = c.id
        LEFT JOIN ${databaseTables.PORTFOLIOITEM} pi ON p.id = pi.portfolio_id 
        WHERE 
            (c.id = ? OR ? IS NULL)
        ORDER BY p.order;
    `,
  };
  return queries[code];
};
const getInsertQuery = (code, vars) => {
  const queries = {
    2000: `INSERT INTO ${databaseTables.USERS} (name, surname, email, phone, password, role) VALUES (?, ?, ?, ?, ?,? )`,
    2001: `INSERT INTO ${databaseTables.PORTFOLIO} (title, photo) VALUES (?, ?)`,
    2002: `INSERT INTO ${databaseTables.PORTFOLIOITEM} (portfolio_id, description, title, subtitle, icon) VALUES (?, ?, ?, ?, ?);`,
    2003: `INSERT INTO ${databaseTables.PORTFOLIOIDELIVERABLES} (portfolio_id, name, \`order\`) VALUES (?, ?, ?);`,
    2004: `INSERT INTO ${databaseTables.PORTFOLIOCONTENT} (portfolio_id, content_type, content_data, \`order\`) VALUES (?, ?, ?, ?);`,
    2005: `INSERT INTO ${databaseTables.HOMEPAGECONTENT} (type, content) VALUES (?, ?);`,
    2006: `INSERT INTO ${databaseTables.WHATWEDO} (title, description) VALUES (?, ?);`,
    2007: `INSERT INTO ${databaseTables.PARTNERS} (title, photo) VALUES (?, ?);`,
    2008: `INSERT INTO ${databaseTables.COMMENT} (name, title, comments, photo) VALUES (?, ?, ?, ?);`,
    2009: `INSERT INTO ${databaseTables.AWARDS} (organization, project, award, year) VALUES (?, ?, ?, ?);`,
    2010: `INSERT INTO ${databaseTables.TEAMS} (name, surname, title, subtitle, photo) VALUES (?, ?, ?, ?, ?)`,
    2011: `INSERT INTO ${databaseTables.JOBS} (title, city, job_type, description) VALUES (?, ?, ?, ?);`,
    2012: `INSERT INTO ${databaseTables.COMMENTSTAFF} (name, position, comment, photo) VALUES (?, ?, ?, ?);`,
    2013: `INSERT INTO ${databaseTables.BLOG} (title, photo) VALUES (?, ?);`,
    2014: `INSERT INTO ${databaseTables.BLOGDETAILS} (blog_id, content_type, content_data, \`order\`) VALUES (?, ?, ?, ?);`,
    2015: `INSERT INTO ${databaseTables.ABOUT} (type, content) VALUES (?, ?);`,
    2016: `INSERT INTO ${databaseTables.ABOUTS_SLIDER} (url) VALUES (?); `,
    2017: `INSERT INTO ${databaseTables.BANNER} (url, type) VALUES (?, ?);`,
    2018: `INSERT INTO ${databaseTables.CAREER_SLIDER} (url) VALUES (?);`,
    2019: `INSERT INTO ${databaseTables.NEXT_POST} (portfolio_id, content_data, nextId) VALUES (?, ?, ?);`,
    2020: `INSERT INTO ${databaseTables.PARTNER_LOGO} (path) VALUES (?)`,
    2021: `INSERT INTO ${databaseTables.BANNER_HOME} (url) VALUES (?); `,
    2022: `INSERT INTO ${databaseTables.CATEGORY_WORK} (name) VALUES (?);`,
    2023: `INSERT INTO ${databaseTables.PORTFOLIO_MAPPING_CATEGORY} (portfolio_id, category_id) VALUES (?, ?);`,
  };
  return queries[code];
};
const getUpdateQuery = (code, vars) => {
  const queries = {
    3000: `UPDATE ${databaseTables.PORTFOLIOIDELIVERABLES} SET \`order\` = ? WHERE id = ?;`,
    3001: `UPDATE ${databaseTables.PORTFOLIOCONTENT} SET \`order\` = ? WHERE id = ?;`,
    3002: `UPDATE ${databaseTables.HOMEPAGECONTENT} SET content = ? WHERE id = ?`,
    3003: `UPDATE ${databaseTables.USERS} SET 
      name = COALESCE(?, name),
      surname = COALESCE(?, surname),
      email = COALESCE(?, email),
      phone = COALESCE(?, phone),
      role = COALESCE(?, role)
    WHERE id = ? `,
    3004: `UPDATE ${databaseTables.ABOUT} SET content = ? WHERE id = ?;`,
    3005: `UPDATE ${databaseTables.BANNER} SET url = ? WHERE id = ?;`,
    3006: `
     UPDATE ${databaseTables.PORTFOLIOITEM} SET
          description = COALESCE(?, description),
          title = COALESCE(?, title),
          subtitle = COALESCE(?, subtitle)
        WHERE portfolio_id = ?;
    `,
    3007: `UPDATE ${databaseTables.PORTFOLIO} SET 
          title = COALESCE(?, title),
          photo = COALESCE(?, photo)
          WHERE id = ?;
    `,
    3008: `UPDATE ${databaseTables.PORTFOLIOCONTENT}
            SET 
                content_type = COALESCE(?, content_type),
                content_data = COALESCE(?, content_data)
            WHERE 
                id = ?;`,
    3009: `UPDATE ${databaseTables.AWARDS}
            SET
              organization = COALESCE(?, organization),
              project = COALESCE(?, project),
              award = COALESCE(?, award),
              year = COALESCE(?, year)
              WHERE
                id = ?;`,
    3010: `UPDATE ${databaseTables.TEAMS}
            SET
                name = COALESCE(?, name),
                surname = COALESCE(?, surname),
                title = COALESCE(?, title),
                subtitle = COALESCE(?, subtitle),
                photo = COALESCE(?, photo)
            WHERE id = ?;`,
    3011: `UPDATE ${databaseTables.BLOGDETAILS}
           SET
              content_type = COALESCE(?, content_type),
              content_data = COALESCE(?, content_data)
            WHERE 
                id = ?; 
      `,
    3012: `UPDATE ${databaseTables.PORTFOLIO} SET \`order\` = ? WHERE id = ?;`,
    3013: `UPDATE ${databaseTables.COMMENT} 
             SET
                name = COALESCE(?, name),
                title = COALESCE(?, title),
                comments = COALESCE(?, comments),
                photo = COALESCE(?, photo)
            WHERE id = ?;`,
    3014: `UPDATE ${databaseTables.BLOG}
            SET
                title = COALESCE(?, title),
                photo = COALESCE(?, photo)
            WHERE id = ?;`,
    3015: `UPDATE ${databaseTables.TEAMS} SET \`order\` = ? WHERE id = ?;`,
  };
  return queries[code];
};
const getDeleteQuery = (code, vars) => {
  const queries = {
    4000: `DELETE FROM ${databaseTables.USERS} WHERE id = ?;`,
    4001: `DELETE FROM ${databaseTables.PORTFOLIO} WHERE id = ?;`,
    4002: `DELETE FROM ${databaseTables.WHATWEDO} WHERE id = ?;`,
    4003: `DELETE FROM ${databaseTables.PARTNERS} WHERE id = ?;`,
    4004: `DELETE FROM ${databaseTables.COMMENT} WHERE id = ?;`,
    4005: `DELETE FROM ${databaseTables.AWARDS} WHERE id = ?;`,
    4006: `DELETE FROM ${databaseTables.TEAMS} WHERE id = ?;`,
    4007: `DELETE FROM ${databaseTables.JOBS} WHERE id = ?;`,
    4008: `DELETE FROM ${databaseTables.COMMENTSTAFF} WHERE id = ?;`,
    4009: `DELETE FROM ${databaseTables.BLOG} WHERE id = ?;`,
    4010: `DELETE FROM ${databaseTables.BLOGDETAILS} WHERE id = ?;`,
    4011: `DELETE FROM ${databaseTables.PORTFOLIOIDELIVERABLES} WHERE id = ?;`,
    4012: `DELETE FROM ${databaseTables.ABOUTS_SLIDER} WHERE id = ?;`,
    4013: `DELETE FROM ${databaseTables.CAREER_SLIDER} WHERE id = ?;`,
    4014: `DELETE FROM ${databaseTables.PORTFOLIOCONTENT} WHERE id = ?;`,
    4015: `DELETE FROM ${databaseTables.NEXT_POST} WHERE portfolio_id = ?;`,
    4016: `DELETE FROM ${databaseTables.PARTNER_LOGO} WHERE id = ?;`,
    4017: `DELETE FROM ${databaseTables.BANNER_HOME} WHERE id = ?;`,
    4018: `DELETE FROM ${databaseTables.CATEGORY_WORK} WHERE id = ?;`,
    4019: `DELETE FROM ${databaseTables.PORTFOLIO_MAPPING_CATEGORY} WHERE category_id = ? AND portfolio_id = ?;`,
    4020: `DELETE FROM ${databaseTables.BANNER} WHERE id = ?;`,
  };
  return queries[code];
};
const getAnalyticsQuery = (code, vars) => {
  const queries = {
    9000: ``,
  };
  return queries[code];
};
module.exports = { getSQLQuery };
