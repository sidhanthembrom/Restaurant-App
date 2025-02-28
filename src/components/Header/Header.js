import {FaShoppingCart} from 'react-icons/fa'

const Header = props => {
  const {cartList, restaurantName} = props

  return (
    <div className="header">
      <h1>{restaurantName}</h1>
      <div className="cart-container">
        <p>My Orders</p>
        <FaShoppingCart />
        <p>{cartList.length}</p>
      </div>
    </div>
  )
}

export default Header
