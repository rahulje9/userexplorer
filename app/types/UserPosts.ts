type Reactions = {
  likes: number
  dislikes: number
}

type Post = {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  views: number
  userId: number
}
