const bcrypt = require("bcryptjs");
const pool = require("../../utils/db-pool");

module.exports = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  pool.query(
    `
            INSERT INTO app.warga(
                nik, nama, password, alamat, rt, rw, kode_kelurahan, tipe_user
            )
            VALUES($1,$2,$3,$4,$5,$6,$7,2)
        `,
    [
      req.body.nik,
      req.body.nama,
      hashedPassword,
      req.body.alamat,
      req.body.rt,
      req.body.rw,
      req.body.kode_kelurahan,
    ],
    (dbError, dbResponse) => {
      if (dbError) throw dbError;
      res.json(dbResponse.rows);
    }
  );
};
