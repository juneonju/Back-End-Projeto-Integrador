const db = require("../db");

module.exports = {
    buscarTodos: () =>{
        return new Promise((aceito, rejeitado)=>{

            db.query("SELECT * FROM usuarios", (error, results)=>{
                if(error) {rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUm: (id) => {
        return new Promise((aceito, rejeitado)=>{

            db.query("SELECT * FROM usuarios where id = ?", [id], (error, results)=>{
                if(error) {rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            });
        });
    },

    inserir: (nome, nascimento, cpf, email, senha, telefone) => {
        return new Promise((aceito, rejeitado)=>{

            db.query("INSERT INTO usuarios (nome, nascimento, cpf, email, senha, telefone) VALUES (?, ?, ?, ?, ?, ?)", 
                [nome, nascimento, cpf, email, senha, telefone], 
                (error, results)=>{
                    if(error) {rejeitado(error); return; }
                    aceito(results.insertCodigo);
                }
            );
        });
    },

    alterar: (nome, nascimento, cpf, email, telefone, id) => {
        return new Promise((aceito, rejeitado)=>{

            db.query('UPDATE usuarios SET nome = ?, nascimento = ?, cpf = ?, email = ?, telefone = ? WHERE id = ?', 
                [nome, nascimento, cpf, email, telefone, id], 
                (error, results)=>{
                    if(error) {rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    excluir: (id) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query("DELETE FROM usuarios WHERE id = ?", [id], (error, results)=>{
                if(error) {rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    login: (cpf, senha) =>{
        return new Promise ((sucesso, falha)=>{
            db.query('SELECT * FROM usuarios WHERE usuarios.cpf = ? && usuarios.senha = ?', [cpf, senha], (error, results)=>{
                if (error) {
                    falha(error);
                }else{
                    if (results.length > 0){
                        sucesso(results[0])
                    }else{
                        sucesso(false)
                    }
                }
            })
        })
    },
    alterarSenha: (id, senhaAtual, novaSenha) => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM usuarios WHERE usuarios.id = ? && usuarios.senha = ?', 
                [id, senhaAtual], 
                (error, results)=>{
                    if(error) {
                        rejeitado(error); 
                        return; 
                    }
                    if (results.length > 0){
                        db.query('UPDATE usuarios SET senha = ? WHERE id = ?', 
                        [novaSenha, id], 
                        (error, results)=>{
                            if(error) {
                                rejeitado(error); 
                                return; 
                            }
                            if (results.length > 0){
                                aceito(results);
                            }else{
                                aceito(false)
                            }
                        }
                    );
                    }else{
                        aceito(false)
                    }
                }
            );
        });
    }

};