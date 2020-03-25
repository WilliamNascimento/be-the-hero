
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();//Pegando o id da ONG que criou, por ser uma string aqui também deve ser

        table.foreign('ong_id').references('id').inTable('ongs');//Criando uma chave estrangeira
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
