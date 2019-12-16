import * as express from "express";

import {User} from './interfaces/user.interface';
import {imitationDB} from './imitationDB/user..imitation';

const app: any = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use (express.urlencoded({extended: false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/user", (req, res) => {
    try {
        if (req.query.id) {
            const userId: string = req.query.id;
            const foundUser: User = imitationDB.getUser(userId);

            res.send(JSON.stringify(foundUser));
        } else if (req.query.loginSubstring && req.query.from && req.query.to) {
            const loginSubstring: string = req.query.loginSubstring;
            const limit: {from: number, to: number} = {from: +req.query.from, to: +req.query.to};

            res.send(JSON.stringify(imitationDB.getAutoSuggestUsers(loginSubstring, limit)));
        }
    } catch {
        res.send('error!!!')
    }
});

app.post("/user", (req, res) => {
    try {
        let user: User = imitationDB.addDataForAddUser(req.body);
        imitationDB.addUser(user);
        res.send(true)
    } catch {
        res.send('error!!!')
    }
});

app.put("/user", (req, res) => {
    try {
        const userId: string = req.query.id;
        const user: User = req.body;
        imitationDB.updateUser(user, userId);
        res.send(true)
    } catch(error) {
        res.send(error)
    }
});

app.delete("/user", (req, res) => {
    try {
        const userId: string = req.query.id;
        imitationDB.deleteUser(userId);
        res.send(true);
    } catch(error) {
        res.send(error)
    }
});

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
});
