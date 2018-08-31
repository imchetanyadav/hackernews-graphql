function feed(parent, args, context, info) {
    const where = args.filter
    ? {
        OR: [
          { url_contains: args.filter },
          { description_contains: args.filter },
        ],
      }
    : {}

  return context.db.query.links({ where }, info)
}

function link(root, args, context, info) {
    return context.db.query.link({
        where: { id: args.id }
    }, info)
}

module.exports = {
    feed,
    link
}