import {Component} from 'react'
import '../../App.css'
import Header from '../Header/Header'
import CartContext from '../../CartContext/CartContext'

class Cart extends Component {
  state = {restaurantName: ''}

  async componentDidMount() {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()

    // console.log(data)

    this.setState({
      restaurantName: data[0].restaurant_name,
    })
  }

  render() {
    const {restaurantName} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {
            cartList,
            removeAllCartItems,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
            removeCartItem,
          } = value

          const handleRemoveAllEvent = () => {
            removeAllCartItems()
          }

          const handleDecrementEvent = dishName => {
            decrementCartItemQuantity(dishName)
          }

          const handleIncrementEvent = dishName => {
            incrementCartItemQuantity(dishName)
          }

          const handleCartItemRemoveEvent = dishName => {
            removeCartItem(dishName)
          }

          return (
            <div>
              <Header restaurantName={restaurantName} cartList={cartList} />
              <button className="removeAllBtn" onClick={handleRemoveAllEvent}>
                Remove All
              </button>
              {cartList.length === 0 ? (
                <div className="empty-cart-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                    alt="empty cart"
                  />
                </div>
              ) : (
                <ul className="cartRoute-list">
                  {cartList.map(item => (
                    <li key={item.dishName}>
                      <img src={item.image} alt={item.dishName} />
                      <p className="width">{item.dishName}</p>
                      <p className="width">SAR {item.price * item.quantity}</p>
                      <div className="cart-quantity-container width">
                        <button
                          onClick={() => handleDecrementEvent(item.dishName)}
                        >
                          -
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          onClick={() => handleIncrementEvent(item.dishName)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleCartItemRemoveEvent(item.dishName)}
                      >
                        Remove Item
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
