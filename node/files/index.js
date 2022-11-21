const express = require('express')
const { faker } = require('@faker-js/faker')
const { queryPromise } = require('./queryPromise')

async function createApp() {
    const app = express()

    const create_table_sql = 'create table if not exists people (id int not null auto_increment, name varchar(255), primary key(id))';
    const insert_sql = `INSERT INTO people(name) values (?)`
    const select_sql = 'select * from people';

    app.get('/', async (req, res) => {
        await queryPromise.query(create_table_sql);
        await queryPromise.queryInsert(insert_sql, `${faker.name.firstName()} ${faker.name.lastName()}`);

        const allUsers = await queryPromise.query(select_sql);

        const html = `<h1>Full Cycle Rocks!</h1>\n
            <ul>
                ${allUsers.map(user => `<li>${user.name}</li>`).join('')}
            </ul>
        `;

        res.send(html)
    })

    return app;
}

module.exports = createApp
