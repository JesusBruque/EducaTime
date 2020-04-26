import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import Usuario from '../models/usuario.model';

export default async function seed() {
    console.log('USUARIO SEED')

    const salt1 = randomBytes(32);
    const hashedPassword1 = await argon2.hash('admin', { salt: salt1 });
    const salt2 = randomBytes(32);
    const hashedPassword2 = await argon2.hash('user', { salt: salt2 });
    var users = [
        {
            email: 'admin@admin.com',
            username: 'admin1',
            rol:'admin',
            password: hashedPassword1,
            salt: salt1,
        }, {
            email: 'user@suser.com',
            rol:'user',
            username: 'user',
            password: hashedPassword2,
            salt: salt2,
        }
    ];
    await Usuario.deleteMany({});
    for (var i = 0; i < users.length; i++) {
        const user = users[i];
        var err, res = await new Usuario({ ...user, updated_for: null }).save();
        if (err) throw err;
        if (!res) throw Error("No se ha podido crear el usuario " + user.email);
    }
    console.log('USUARIO SEED ENDED')
}
