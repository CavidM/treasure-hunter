import app from "./App";
let PORT: number | null = 3001;

async function runServer() {

    app.listen(PORT);
}

runServer().then(() => {

    console.log('🚀 Server listening on port ' + PORT);
})