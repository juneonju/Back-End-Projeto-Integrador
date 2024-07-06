const usuarioService = require("../services/usuarioService")

module.exports = {
    buscarTodos: async (req, res) => {
        let json = {error:"", result:[]};

        let usuarios = await usuarioService.buscarTodos();

        for (let i in usuarios){
            json.result.push({
                id: usuarios[i].id,
                nome: usuarios[i].nome,
                nascimento: usuarios[i].nascimento,
                cpf: usuarios[i].cpf,
                email: usuarios[i].email,
                senha: usuarios[i].senha,
                telefone: usuarios[i].telefone
            });
        }
        res.json(json);
    },
    buscarUm: async(req, res) => {
        let json = {error:"", result:{}};

        let id = req.params.id;
        let usuario = await usuarioService.buscarUm(id);

        if(usuario){
            json.result = usuario;
        }

        res.json(json);
    },

    inserir: async(req, res) => {
        let json = {error:"", result:{}};

        let nome = req.body.nome;
        let nascimento = req.body.nascimento;
        let cpf = req.body.cpf;
        let email = req.body.email;
        let senha = req.body.senha;
        let telefone = req.body.telefone;
        console.log(req.body)
        
        if(nome && nascimento && cpf && email && senha && telefone){
            let usuarioCodigo = await usuarioService.inserir(nome, nascimento, cpf, email, senha, telefone);
            json.result = {
                id: usuarioCodigo,
                nome,
                nascimento,
                cpf,
                email,
                senha,
                telefone
            };
        }else{
            json.error = "campos não enviados"
        }

        res.json(json);
    },

    alterar: async(req, res) => {
        let json = {error:"", result:{}};

        let id = req.body.id;
        let nome = req.body.nome;
        let nascimento = req.body.nascimento;
        let cpf = req.body.cpf;
        let email = req.body.email;
        let telefone = req.body.telefone;
        console.log(req.body.id)
        
        if(id && nome && nascimento && cpf && email && telefone){
            await usuarioService.alterar(nome, nascimento, cpf, email, telefone,id);
            json.result = {
                id,
                nome,
                nascimento,
                cpf,
                email,
                telefone
            };
        }else{
            json.error = "campos não enviados"
        }

        res.json(json);
    },

    excluir: async(req, res) => {
        let json = {error:"", result:{}};

        await usuarioService.excluir(req.params.id);

        res.json(json);
    },

    login: async(req, res) => {
        let json ={ error: '', result:{}};

        let cpf = req.body.cpf;
        let senha = req.body.senha;
        console.log(req.body)
        if (cpf && senha){
            let usuario = await usuarioService.login(cpf,senha);
            if (usuario){
                json.result = usuario;
            }else{
                json.error = 'nenhum registro encontrado';
            }
            json.result = usuario;
        }else{
            json.error = 'Falha ao logar, revise os dados e tente novamente'
        }
        res.json(json);
    },

    alterarSenha: async(req, res) => {
        let json = {error:"", result:{}};

        let id = req.body.id;
        let senhaAtual = req.body.senhaAtual;
        let novaSenha = req.body.novaSenha;

        if(senhaAtual && novaSenha){
            await usuarioService.alterarSenha(id, senhaAtual, novaSenha);
            json.result = {
                novaSenha: novaSenha
            };
        }else{
            json.error = "campos não enviados"
        }

        res.json(json);
    }
}