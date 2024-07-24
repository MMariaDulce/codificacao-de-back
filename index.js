import http, { request } from "node:http";

const PORT = 3333;

//Códigos
let count = 0
let countParticipante = 0
const users = [];
const server = http.createServer((request, response) => {
  const { method, url } = request;

  if (method === "GET" && url === "/participants") {
    //Buscar todos os usuários
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(users));
  } else if (url.startsWith(`/participants/`) && method === "GET") {
    //Buscar um único usuário
    const userId = url.split("/")[2];
    const user = users.find((user) => user.id == userId);

    if (user) {
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(user));
    } else {
      response.write(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Usuário não encontrado" }));
    }
  } else if (url === "/participants" && method === "POST") {
    //Responsável por cadastrar um usuário
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      const novoUsario = JSON.parse(body);
      if(novoUsario.idade >= 16){
        novoUsario.id = users.length + 1;
        users.push(novoUsario);
        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify(novoUsario));
        countParticipante ++
        console.log(`Número de participantes: ${countParticipante} `)

         if(novoUsario.idade >= 18){
          count += 1
          console.log(`Pessoas maiores de idade = ${count}`)
          
         }
      }else{
        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify({message:"ERRO, usuário precisa ter 16 anos"}));
      }
     
    });
  } else if (url.startsWith(`/participants/`) && method === "PUT") {
    //Atualizar um usuário
    const userId = url.split("/")[2];

    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      const updateUser = JSON.parse(body);
      const index = users.findIndex((user) => user.id == userId )
      if (index !== -1 && updateUser.idade >= 16) {
        users[index] = { ...users[index], updateUser };
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify(users[index]));
      } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Erro ao tentar atualizar" }));
      }
    });
  } else if (url.startsWith(`/participants/`) && method === "DELETE") {
    const userId = url.split("/")[2];
    const index = users.findIndex((user) => user.id == userId);
    if (index !== -1) {
      users.splice(index, 1);
      
      countParticipante --
      console.log(`Número de participantes: ${countParticipante} `)

      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify({ message: "Usuário excluído" }));
    } else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Erro ao tentar excluir" }));
    }
  } else  {
    //Recurso não encontrado
  }

});
server.listen(PORT, () => {
  console.log(`Servidor on PORT: ${PORT}`);
});
