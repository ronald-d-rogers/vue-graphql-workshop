import { storiesOf } from '@storybook/vue'
import Article from '../components/Article.vue'
import ArticleCard from '../components/ArticleCard.vue'
import ArticleList from '../components/ArticleList.vue'

const article = {
  authors: [{
    id: 0,
    name: 'Author 1'
  }],
  id: 0,
  imageUrl: 'http://localhost:3000/assets/animals1.jpg',
  postedDate: 'Fri Aug 17 2018 08:17:20 GMT-0400 (EDT)',
  summary: 'Quam sed est quis distinctio quia perspiciatis eum. Quisquam ab quo mollitia. Et ut et doloremque. Aut similique aut explicabo unde neque nobis voluptatem. Quis doloremque nostrum sint distinctio expedita error.',
  title: 'Headline for Article 1'
}

storiesOf('Articles', module)
  .add(
    'Article Card with author',
    () => ({
      components: { ArticleCard },
      template: '<ArticleCard v-bind="{ article }"/>',
      data() {
        return {
          article
        }
      }
    }),
    { notes: 'The ArticleCard components is called by ArticleList and is used on most Views.' }
  )
  .add('Article Card without author',
    () => ({
      components: { ArticleCard },
      template: '<ArticleCard v-bind="{ article, showAuthor: false }"/>',
      data() {
        return {
          article
        }
      }
    }),
    { notes: 'The ArticleCard components without the author is used on the Author View.' }
  )
.add('Article Page', () => ({
  components: { Article },
  template: '<Article v-bind="{ article }"/>',
  data() {
    return {
      article: {
        authors: [{
          id: 0,
          name: 'Author'
        }],
        id: 0,
        imageUrl: 'http://localhost:3000/assets/animals1.jpg',
        postedDate: 'Fri Aug 17 2018 08:17:20 GMT-0400 (EDT)',
        body:
          '<h2>Quibusdam sed temporibus temporibus sit est occaecati</h2><p>Consequuntur porro repellat est culpa. Dolor aut omnis amet ratione quod placeat deserunt. Ipsum quaerat esse. Delectus accusantium saepe molestiae laboriosam nesciunt. Doloremque rem debitis voluptas ad hic.</p><p>Optio nihil ut adipisci dolor. Animi quia sunt non ab. Pariatur autem aut. Doloribus voluptatem veniam neque eos. Architecto mollitia id commodi consequuntur id iste.</p><h3>rerum qui consequatur omnis</h3><p>Pariatur excepturi impedit aliquam enim. Quo consequuntur maiores illum dolores at facilis. Corporis ut quibusdam ea aperiam tempore hic assumenda eos. Eos ratione expedita optio eos. A eveniet dolorem vel voluptatem ut. A natus incidunt necessitatibus totam harum.</p><p>Consequatur aut et quaerat officia corporis voluptatibus animi. Magnam eligendi corporis. Quisquam odio provident aliquid ullam doloribus et eum. Beatae quo quos sit impedit quos. Modi magnam expedita saepe quasi veritatis ut quasi quibusdam amet. Laborum veritatis quibusdam ad a molestiae qui consectetur consequatur.</p><p>Delectus beatae quas quisquam vel enim sit. Sequi cupiditate quibusdam et. Quia expedita quia unde eligendi. Nobis necessitatibus laborum cupiditate. Quia facilis officiis necessitatibus debitis laudantium vitae. Est quia fugit atque qui consectetur exercitationem aut atque.</p>',
        title: 'Headline for Article'
      }
    }
  }
}))
.add('Article List', () => ({
  components: { ArticleList },
  template: '<ArticleList v-bind="{ articles, title}"/>',
  data() {
    return {
      articles: [1, 2, 3 ].map(x => ({ ...article, id: x })),
      title: 'Recent News'
    }
  }
}))
