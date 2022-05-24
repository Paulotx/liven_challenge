import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuid();
  const password = await hash('123456', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, created_at, updated_at)
            values('${id}', 'Paulo André', 'paulo@gmail.com', '${password}', 'now()', 'now()')
        `,
  );

  await connection.close();
}

create().then(() => console.log('User admin created!'));
