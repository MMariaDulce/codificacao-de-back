console.log('Olá, maravilhosa')


import http from 'http'
import fs from 'fs'
import { url } from 'inspector'

const PORT = 3333

const server = http.createServer((request, response) => {
    const { method, url } = request

    if (method === 'GET' && url === '/empregados') {
        fs.readFile('empregados.json', 'utf-8', (err, data) => {
            if (err) {
                response.writeHead(500, { "Content-Type": "application/json" })
                response.end(JSON.stringify({ message: "Não foi possível ler o arquivo" }))
                return
            }
            response.writeHead(200, { "Content-Type": "application/json" })
            response.end(data)
        })
    } else if (method === "POST" && url === "/empregados") {
        let body = "";
        request.on("data", (chunk) => {
            body += chunk
        })
        request.on('end', () => {
            const novoEmpregado = JSON.parse(body)
            fs.readFile("empregados.json", "utf8", (err, data) => {
                if (err) {
                    response.writeHead(500, { "Content-Type": "application/json" });
                    response.end(JSON.stringify({ message: "Não foi possível acessar os dados" }))
                    return
                }
                const empregados = JSON.parse(data)
                livros.push(novoEmpregado)
                .id = empregados.length + 1
                empregados.push(novoEmpregado)

                fs.writeFile('empregados.json', JSON.stringify(empregados, null, 2), (err) => {
                    if (novoEmpregados.idade >= 18) {
                        response.writeHead(200, { "Content-Type": "application/json" });
                        response.end(JSON.stringify(novoEmpregados));
                        return
                      }
                      response.writeHead(403, { "Content-Type": "application/json" });
                      response.end(JSON.stringify({ message: "ERRO, usuário precisa ter uma idade superior a 18anos" }));
                      if(novoEmpregado.senha !== novoEmpregado.confirmarSenha)
                      response.writeHead(400, {'Contet-Type': 'application/json'})
                      response.end(JSON.stringify({message: 'Senha não correspondem'}))
                    })

                })
                console.log(empregados)
                return response.end()
            })
    }else if (method === 'GET' && url.startsWith('/empregados/')) {
        const id = parseInt(url.split('/')[2])
        console.log(id)
        fs.readFile('empregados.json', 'utf8', (err, data) => {
            if (err) {
                response.writeHead(500, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({ message: "Erro ao pesquisar o arquivo" }))
                return
            }
            const empregados = JSON.parse(data)
            console.log(encontrarEmpregados)
            if (!encontrarEmpregados) {
                response.writeHead(404, { 'Content-Type': 'application/json' })
                response.end(JSON.stringify({ message: "empregado não encontrado"}))
                return
            } 
            response.writeHead(200,{'Content-Type': 'application/json'})
            response.end(JSON.stringify(encontrarEmpregados))
        })
    } else if {
        response.writeHead(404, { "Content-Type": "application/json" })
        response.end(JSON.stringify({ message: "Página não encontrada" }))
    }
}) 
} else if (url.startsWith(`/empregados/`) && method === "GET") {
    //Buscar um único usuário
    const empregadosId = url.split("/")[2];
    const empregado = empregados.find((empregado) => empregado.id == empregadosId);

    if (empregado) {
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(empregado));
    } else {
      response.write(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Usuário não encontrado" }));
    }
  }


server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})