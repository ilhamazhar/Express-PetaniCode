const pool = require("../../utils/db-pool");

module.exports = (req, res) => {
  const id = req.params.id;

  pool.query(
    `
            SELECT * FROM app.warga
            WHERE id = $1
            `,
    [id],
    (dbError, dbResponse) => {
      if (dbError) throw dbError;
      if (dbResponse.rowCount === 1) {
        res.json(dbResponse.rows[0]);
      } else {
        res.json({});
      }
    }
  );
};
