import * as express from "express";
import * as bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {

    const body = req.body.Body;
    console.log(req);
    res.end();
});

app.listen(8000, (err: express.Errback) => {
    if (err)
        console.error(err);

    console.log("Started on port 8000");
});