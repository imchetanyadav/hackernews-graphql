const { Prisma } = require('prisma-binding')
const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
        return context.db.query.links({}, info)
    },
    link: (root, args, context, info) => {
        return context.db.query.link({
            where: { id: args.id }
        }, info)
    }
  },
  Mutation: {
    post: (root, args, context, info) => {
        return context.db.mutation.createLink({
          data: {
            url: args.url,
            description: args.description,
          },
        }, info)
    },
    updateLink: (root, args, context, info) => {
        return context.db.mutation.updateLink({
            where: { id: args.id },
            data: {
                url: args.url,
                description: args.description,
            },
        }, info)
    },
    deleteLink: (root, args, context, info) => {
        return context.db.mutation.deleteLink({
            where: { id: args.id }
        }, info)
    }
  }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
          typeDefs: 'src/generated/prisma.graphql',
          endpoint: 'https://us1.prisma.sh/chetan-yadav-f96054/hackernews-node/dev',
          secret: 'mysecret123',
          debug: true,
        }),
    }),
    
})
server.start(() => console.log(`Server is running on http://localhost:4000`))