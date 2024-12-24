echo "preparing to run ssr...";

npm run build &&\
PORT=8080 node dist/frontend/server/server.mjs
