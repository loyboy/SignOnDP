'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route');
const Helpers = use('Helpers');
const Database = use('Database');

Route.get('/', 'HomeController.homepage');
Route.get('/about', 'HomeController.aboutpage');

Route.post('signon', async ({ request, view }) => {
  const nameofperson = request.input('name')
  //const subject = request.input('subject')
  const profilePic = request.file('image', {
    types: ['image'],
    size: '5mb'
  })
  const mytypes = ["jpg", "jpeg", "png"];
  var mytypebool = (mytypes.indexOf(profilePic.subtype) > -1);

  if (!mytypebool){
     return  view.render('home.first',{ done: 'filenotimage' })
  }
 
 const randomdigit = new Date().getTime()+Math.floor(Math.random() * 1000);
 const imagepath = '/profile/' + randomdigit + '.' + profilePic.subtype;
  
  await profilePic.move(Helpers.publicPath('profile'), {
    name:   randomdigit + '.'+profilePic.subtype ,
    overwrite: false
  })
 
  if (!profilePic.moved()) {
    //return profilePic.error()
    return view.render('home.first',{ done: 'filetoobig' })
  }
  const imagesrc = 'src= '+ imagepath + '';
   
  const userId = await Database.insert({username: nameofperson, email: '', password: '' ,path: imagepath}).into('users')
  return view.render('home.first',{ done: 'true' , username: nameofperson , pimage: imagesrc })
 // return response.redirect('back');
});

