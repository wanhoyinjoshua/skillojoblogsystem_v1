import { ApolloServer } from "apollo-server";

// 1
import { schema } from "./schema";
import { context } from './context'
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { generateUploadURL } from './s3'



let app1 = express();



app1.use(express.json());
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app1.use(cors(options)); /* NEW */

app1.use(express.json());


app1.get('/s3Url', async (req: Request, res: Response) => {
    const url = await generateUploadURL()
    res.send({url})
  });
app1.listen(3001, () => {
    console.log("Started server on 6000");
  });



export const server = new ApolloServer({
    schema,
    context,   
});

const port = 4000;
// 2



server.listen({port}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});



