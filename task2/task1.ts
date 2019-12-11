import * as express from "express";

import {User} from './interfaces/user.interface';
import {imitationDB} from './imitationDB/user..imitation';

import {generatedUUIDv4} from "./utils/uuidGenerator"

const app: any = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()) 
app.use (express.urlencoded({extended: false}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/user", (req, res) => {
    try {
        const userId = req.query.id;
        const foundUser = imitationDB.getUser(userId);
        res.send(JSON.stringify(foundUser));
    } catch {
        res.send('error!!!')
    }
})

app.post("/user", (req, res) => {
    try {
        let user: User = imitationDB.addDataForAddUser(req.body);
        imitationDB.addUser(user);
        console.log(imitationDB.users);
        res.send(true)
    } catch {
        res.send('error!!!')
    }
})

app.put("/user", (req, res) => {
    try {
       /*  const userId = req.query.id;
        let user: User = req.body;
        imitationDB.addUser(user);
        console.log(imitationDB.users); */
        res.send(true)
    } catch {
        res.send('error!!!')
    }
})




app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
})