import {app} from "./infra/app";
const port = 3000;

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});