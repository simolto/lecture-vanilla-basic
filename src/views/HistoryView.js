import View from './View.js'

const tag = '[HistoryView]'

const HistoryView = Object.create(View) //Object.create(KeywordView) 가능

HistoryView.messages = {
  NO_HISTORY: '최근 검색어가 없습니다',
}

HistoryView.setup = function (el) {
  this.init(el)

  return this
}

HistoryView.render = function (data = []) {
  this.el.innerHTML = data.length
    ? this.createHTMLString(data)
    : this.messages.NO_HISTORY

  this.bindEvents()
}

HistoryView.createHTMLString = function (items) {
  return (
    `<ul class="list">` +
    items
      .map(item => {
        return `<li data-keyword="${item.keyword}">
            ${item.keyword}
            <span class="date">${item.date}</span>
            <button class="btn-remove"></button>
          </li>`
      })
      .join('') +
    `</ul>`
  )
}

HistoryView.handleClick = function (e) {
  if (e.target !== e.currentTarget) return
  this.emit('@click', { keyword: e.target.dataset.keyword })
}

HistoryView.handleRemove = function (e) {
  this.emit('@remove', { keyword: e.target.parentNode.dataset.keyword })
}

HistoryView.bindEvents = function () {
  this.el.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', e => this.handleClick(e))
  })
  this.el.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', e => this.handleRemove(e))
  })
}

export default HistoryView
