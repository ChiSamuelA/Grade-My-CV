import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/'>
        <p className="text-2xl font-bold text-gradient uppercase">grade my cv</p>
      </Link>

      <Link to='/upload' className='capitalize primary-button w-fit'>
        upload resume
      </Link>
    </nav>
  )
}

export default Navbar
