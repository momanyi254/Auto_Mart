import bcrypt from'bcrypt';

const comparePassword = (hPassword, password) => bcrypt.compareSync(password, hPassword);
const hashPassword = (password) => bcrypt.hashSync(password, 10);

module.exports = {
    comparePassword,
    hashPassword
}

