const pool = require("../../utils/db-pool");

module.exports = (req, res) => {
  const rw = req.query.rw;

  if (rw != null) {
    pool.query(
      `
            SELECT * FROM app.warga
            WHERE rw = $1
        ORDER BY kode_kelurahan, rw, rt
        `,
      [rw],
      (dbError, dbResponse) => {
        if (dbError) throw dbError;
        res.json(dbResponse.rows);
      }
    );
  } else {
    pool.query(
      `
        SELECT * FROM app.warga
        ORDER BY kode_kelurahan, rw, rt
        `,
      [],
      (dbError, dbResponse) => {
        if (dbError) throw dbError;
        res.json(dbResponse.rows);
      }
    );
  }
};
