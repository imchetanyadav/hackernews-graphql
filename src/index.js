const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, args) => links.filter(link => link.id === args.id)[0]
  },
  Mutation: {
    post: (root, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (root, args) => {
        const link = links.filter(link => link.id === args.id).map(link => {
            link.url = args.url ? args.url : link.url
            link.description = args.description ? args.description : link.description
            return link
        })[0]
        return link
    },
    deleteLink: (root, args) => {
        const link = links.filter(link => link.id === args.id)[0]
        links = links.filter(link => link.id !== args.id)
        return link
    }
  }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))