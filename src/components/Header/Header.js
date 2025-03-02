import {FaShoppingCart} from 'react-icons/fa'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const {cartList, restaurantName} = props

  const RedirectToHomeRoute = () => {
    console.log('home')
    const {history} = props
    return history.push('/')
  }

  const RedirectToCartRoute = () => {
    console.log('cart')
    const {history} = props
    return history.push('/cart')
  }

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header">
      <h1 onClick={RedirectToHomeRoute}>{restaurantName}</h1>
      <div className="cart-container">
        <p>My Orders</p>
        <button onClick={RedirectToCartRoute} data-testid="cart">
          <FaShoppingCart />
        </button>
        <p>{cartList.length}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default withRouter(Header)
