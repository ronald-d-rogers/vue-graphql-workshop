import { storiesOf } from '@storybook/vue'
import TheHeader from '../components/TheHeader.vue'
import menu from '../data/menu.json'
import TheFooter from '../components/TheFooter.vue'

storiesOf('Globals', module)
.add('TheHeader', () => ({
  components: { TheHeader },
  template: '<TheHeader v-bind="{ menu }"/>',
  data() {
    return {
      menu: menu
    }
  }
}))
.add('TheFooter', () => ({
  components: { TheFooter },
  template: '<TheFooter/>'
}))

