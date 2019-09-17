const faker = require('faker')

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function getRandomBoolean(chance = 0.5) {
  return Math.random() <= chance
}

function bodyText(headingWordCount, paragraphCount) {
  return (
    '<h2>' +
    faker.lorem.words(getRandomInt(headingWordCount, headingWordCount + 5)) +
    '</h2><p>' +
    faker.lorem.paragraphs(getRandomInt(paragraphCount, paragraphCount + 2), '</p><p>') +
    '</p><h3>' +
    faker.lorem.words(getRandomInt(headingWordCount, headingWordCount + 5)) +
    '</h3><p>' +
    faker.lorem.paragraphs(getRandomInt(paragraphCount, paragraphCount + 2), '</p><p>') +
    '</p>'
  )
}

function postedDate(days) {
  return faker.date.recent(days)
}

const avatarUrl = 'http://localhost:3000/assets/avatar.png'

const imageUrls = [
  'http://localhost:3000/assets/animals1.png',
  'http://localhost:3000/assets/animals2.png',
  'http://localhost:3000/assets/animals3.png',
  'http://localhost:3000/assets/cats1.png',
  'http://localhost:3000/assets/cats2.png',
  'http://localhost:3000/assets/cats3.png',
  'http://localhost:3000/assets/nature1.png',
  'http://localhost:3000/assets/nature2.png',
  'http://localhost:3000/assets/nature3.png',
  'http://localhost:3000/assets/transport1.png',
]

const authors = Array.from(
  { length: 9 },
  (v, id) => ({
    id: id,
    name: `News Author ${id}`,
    bio: faker.lorem.paragraph(getRandomInt(5, 7)),
    avatarUrl: avatarUrl,
    articles: []
  }))

const articles = Array.from(
  { length: 9 },
  (v, id) => ({
    id: id,
    title: `Headline for News Article ${id}`,
    summary: faker.lorem.paragraph(getRandomInt(3, 5)),
    body: bodyText(3, 8),
    imageUrl: imageUrls[getRandomInt(0, 9)],
    postedDate: postedDate(getRandomInt(1, 3)),
    authors: []
  }))

// Create random associations between authors and articles
for (const article of articles) {
  for (const author of authors) {
    if (getRandomBoolean(1/3)) {
      article.authors.push(author.id)
      author.articles.push(article.id)
    }
  }
}

const _id = id => parseInt(id)

const _filter = (items, filters) =>
  filters.reduce((results, filter) => results.filter(filter), items)

const _slice = (results, skip, first) =>
  results
    .slice(skip)
    .slice(0, first || results.length)

module.exports = {
  getArticle(id) {
    return articles.find(x => x.id === _id(id))
  },
  getAuthor(id) {
    return authors.find(x => x.id === _id(id))
  },
  getArticles({ filter = {}, skip = 0, first = 0 } = {}) {
    const filters = []

    console.info(filter)

    if (filter.id >= 0) {
      filters.push(x => x.id === _id(filter.id))
    }

    if (filter.authors && filter.authors.id >= 0) {
      filters.push(x => x.authors.some(y => y === _id(filter.authors.id)))
    }

    if (filter.authors && !!filter.authors.name) {
      filters.push(x => x.authors.some(y => y.name === filter.authors.name))
    }

    return _slice(_filter(articles, filters), skip, first)
  },
  getAuthors({ filter = {}, skip = 0, first = 0 } = {}) {
    const filters = []

    console.info(filter)

    if (filter.id >= 0) {
      filters.push(x => x.id === _id(filter.id))
    }

    if (filter.name) {
      filters.push(x => x.name === filter.name)
    }

    if (filter.articles && filter.articles.id >= 0) {
      filters.push(x => x.articles.some(y => y === _id(filter.articles.id)))
    }

    return _slice(_filter(authors, filters), skip, first)
  },
  updateArticle(id, input) {
    const article = articles.find(x => x.id === _id(id))

    for (const prop in input) {
      if (prop !== 'id') {
        article[prop] = input[prop]
      }
    }

    return article
  },
  updateAuthor(id, input) {
    const author = authors.find(x => x.id === _id(id))

    for (const prop in input) {
      if (prop !== 'id') {
        author[prop] = input[prop]
      }
    }

    return author
  }
}
