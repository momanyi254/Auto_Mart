import bcrypt from'bcrypt';

export const comparePassword = (hPassword, password) => bcrypt.compareSync(password, hPassword);

export const hashPassword = (password) => bcrypt.hashSync(password, 10);

