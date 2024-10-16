import { Link } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  return (
    <main className='text-center'>
      <header className='bg-dark text-light py-2 display-6 sticky-top'><p><strong>Email + Visualization App</strong></p></header>
      <section className='container my-5'>
        <div className='row'>
          <div className='col-md-6'>
            <h2 className="py-5">Email Client App</h2>
            <p id="PARAX1" className='container'>Build an email client app with a master-slave layout, displaying an email list and detailed view. Features include email filtering, marking favorites, read/unread styling, and real-time email body loading.</p>
            <Link className='btn btn-dark me-5' to='/email'>Go Live</Link>
            <Link className='btn btn-dark' to="https://replit.com/@jd241524/Email-Visualization#src/pages/Email.jsx">View Code</Link>
          </div>
          <div className='col-md-6'>
            <h2 className="py-5">Data Visualization Dashboard
</h2>
            <p id="PARAX1" className='container'>Develop a front-end product analytics platform featuring interactive data visualization, filters, and real-time analytics. Enable chart sharing via URL, store preferences using cookies, and integrate basic user authentication.</p>
            <Link className='btn btn-dark me-5' to='/visualization'>Go Live</Link>
            <Link className='btn btn-dark'>View Code</Link>
          </div>
        </div>
      </section>
      <footer className='bg-dark text-light fixed-bottom'>
        <div className='py-5'>
          <p className='h6'>&copy; 2024 Email + Visualization App. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
