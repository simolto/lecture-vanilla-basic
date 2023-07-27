import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'

const tag = ['MainController']

export default {
  async init() {
    FormView.setup(document.querySelector('form'))
      .on('@submit', e => this.onSubmitForm(e.detail.input))
      .on('@reset', () => this.onResetForm())

    ResultView.setup(document.querySelector('#search-result'))

    TabView.setup(document.querySelector('#tabs'))

    KeywordView.setup(document.querySelector('#search-keyword'))
      .render(await this.onSearchKeyword())
      .on('@click', e => this.onClickKeyword(e.detail.keyword))
  },

  search(value) {
    this.onSearchResult(value)
  },

  onSearchResult(query) {
    SearchModel.list(query).then(res => {
      ResultView.show()
      ResultView.render(res)
    })
  },

  async onSearchKeyword() {
    const data = await KeywordModel.list()
    return data
  },

  onClickKeyword(keyword) {
    this.search(keyword)
    KeywordView.hide()
    TabView.hide()
  },

  onSubmitForm(input) {
    this.search(input)
  },

  onResetForm() {
    ResultView.hide()
  },
}
