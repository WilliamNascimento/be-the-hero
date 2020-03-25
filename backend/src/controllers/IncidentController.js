const connection = require("../database/connection");

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        //Metodo para pegar o primeiro elemento do array, ou então count[0]
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ong_id', '=', 'incidents.ong_id')
            //Esquema de páginação
            .limit(5)
            //A lógica é: Na primeira páginação o page  é 1 então (1-1=0)*5=0-> pegue os 5 primeiros[0,1,2,3,4]...próximo, page=2 então(2-1=1)*5=5 -> pegue os próximos 5[5,6,7,8,9]... 
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id });

    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incidents.ong_id !== ong_id) {
            return response.status(401).json({ error: 'operation not permitted.' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}