import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Navbar from './Navbar/Navbar'
import Contact from './Contact/Contact'
import Morebooks from './MoreBooks/Morebooks'
import BookDetails from './Detailspage/BookDetails'
import Loginpage from './Login/Loginpage'
import Signuppage from './Login/Signuppage'
import Order from './Order/Order'
import Protected from './Order/Protected'
import AdminLogin from './Admin/AdminLogin'
import AbminResister from './Admin/AbminResister'
import Adminpanel from './Admin/Adminpanel'
import Create from './Admin/Create'
import Edit from './Admin/Edit'
import Read from './Admin/Read'
import BooksCategoery from './MoreBooks/BooksCategoery'


function Routerwrapper() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/morebook" element={<Morebooks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signin" element={<Signuppage />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/order" element={<Protected><Order /></Protected>} />
          <Route path='/adminlogin' element={<AdminLogin />}/>
          <Route path='/adminresister' element={<AbminResister />}/>
          <Route path='/adminpanel' element={<Adminpanel />}/>
          <Route path='/create' element={<Create />}/>
          <Route path='/edit/:id' element={<Edit />}/>
          <Route path='/read/:id' element={<Read />}/>
          <Route path="/books/:category" element={<BooksCategoery />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routerwrapper
