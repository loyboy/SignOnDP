'use strict'

//const Todo = use('App/Models/Todo');

class HomeController {

  //home page render
  async homepage({view}) {
    return view.render('home.first',{ done: 'false' })
  }

  async aboutpage({view}) {
    return view.render('home.about')
  }

  
}

module.exports = HomeController;
