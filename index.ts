import { PrismaClient } from "@prisma/client";
import express, {Request, Response }  from "express";
import createHttpError from "http-errors";

const prisma = new PrismaClient()
const app = express()
const port = 3005

app.use(express.json())

// --> Routing POST
app.get('/post', async(req: Request, res: Response)=> {
  const posts = await prisma.post.findMany({
    include: {author: true}
  })
  res.json(posts)
})

app.get('/post/:id', async (req: Request, res: Response) => {
  const {id} = req.params
  const post = await prisma.post.findUnique({
    where: {id: Number(id)},
    include: {author: true}
  })
  res.json(post)
})

app.post('/post', async (req: Request, res: Response) => {
const {content, authorEmail} = req.body
const result = await prisma.post.create({
  data: {
    content,
    author: {connect: {email: authorEmail}}
  }
})
res.json(result)
})

app.put('/post/:id', async (req: Request, res: Response) => {
  const {id} = req.params
  const post = await prisma.post.update({
    where: {id: Number(id)},
    data: {...req.body}
  })
  res.json(post)
})

app.delete(`/post/:id`, async (req:Request, res: Response) => {
  const {id} = req.params
  const post = await prisma.post.delete({
    where: {id: Number(id)}
  })
  res.json(post)
})

// --> Routing USER
app.get('/user', async(req: Request, res: Response)=> {
  const users = await prisma.user.findMany({
  })
  res.json(users)
})

app.get('/user/:username', async(req: Request, res: Response) => {
  const {username} = req.params
  const user  = await prisma.user.findUnique({
    where: {username: String(username)}
  })
  res.json(user)
})

app.post('/user', async(req: Request, res: Response) => {
  const result = await prisma.user.create({
    data: {...req.body}
  })
  res.json(result)
})

app.put('/user/:username', async (req: Request, res: Response) => {
  const {username} = req.params
  const user = await prisma.user.update({
    where: {username: String(username)},
    data: {...req.body}
  })
  res.json(user)
})

app.delete(`/user/:username`, async (req:Request, res: Response) => {
  const {username} = req.params
  const user = await prisma.user.delete({
    where: {username: String(username)}
  })
  res.json(user)
})

// Handler 404 error
// app.use((req: Request, res: Response, next: Function) => {
//   next(createHttpError(404))
// })


app.listen(port, () => console.log(`[server]: Server is running at http://localhost:${port}`))