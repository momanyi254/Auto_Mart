const bcrypt = require('bcrypt');

exports.comparePassword = (hPassword, password) => bcrypt.compareSync(password, hPassword);

exports.hashPassword = (password) => bcrypt.hashSync(password, 10);

