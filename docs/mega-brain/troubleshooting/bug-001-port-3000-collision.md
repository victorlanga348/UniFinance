# [[troubleshooting/bug-001-port-3000-collision]] - Colisão de Porta 3000 (Grafana) e EADDRINUSE

## Sintoma
Ao iniciar a aplicação com `npm run dev` ou `tsx server.ts`, o servidor Node.js falha imediatamente com o erro:
```
Error: listen EADDRINUSE: address already in use :::3000
code: 'EADDRINUSE'
```

## Causa Raiz
No ambiente local do utilizador (Windows), existe uma instância ativa de `grafana` (PID 1144) escutando em todas as interfaces na porta 3000 (`[::]:3000`).
Como `server.ts` usa por padrão `process.env.PORT || 3000`, a ausência de um arquivo `.env` forçava a tentativa de escuta na porta 3000 já ocupada.

## Resolução e Prevenção
1. Criação do arquivo `backend/.env` e `backend/.env.example` definindo `PORT=3001`.
2. O servidor Express carrega a porta via `dotenv.config({ path: path.resolve(__dirname, '.env') })` e inicia com sucesso em `http://localhost:3001`.

## Referências Cruzadas
- Grafo Central: [[00-index]]
- Especificação Central: [[specs/modules/unifinance-core]]
