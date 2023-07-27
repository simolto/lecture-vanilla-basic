import View from './View.js'

const FormView = Object.create(View)

FormView.setup = function (el) {
  this.init(el)
  this.inputEl = this.el[0]
  this.resetEl = this.el[1]

  this.showResetBtn(false)
  this.bindEvents()
  return this
}

FormView.showResetBtn = function (show) {
  this.resetEl.style.display = show ? '' : 'none'
}

FormView.handleKeyup = function (e) {
  this.showResetBtn(e.target.value)
  if (!e.target.value) this.emit('@reset')
  if (e.key !== 'Enter') return
  if (!e.target.value.trim()) return
  this.emit('@submit', { input: e.target.value.trim() })
}

FormView.handleClick = function () {
  this.emit('@reset')
  this.showResetBtn(false)
}

FormView.bindEvents = function () {
  this.el.addEventListener('submit', e => e.preventDefault())
  this.inputEl.addEventListener('keyup', e => this.handleKeyup(e))
  this.resetEl.addEventListener('click', () => this.handleClick())
}

export default FormView
