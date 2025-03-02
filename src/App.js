import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Cart from './components/Cart/Cart'
import CartContext from './CartContext/CartContext'

class App extends Component {
  state = {cartList: []}

  handleCart = updatedCart => {
    this.setState({cartList: updatedCart})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = (image, dishName, price, quantity) => {
    const {cartList} = this.state

    const idx = cartList.find(obj => obj.dishName === dishName)

    // if the data exists
    if (idx !== undefined) {
      console.log(image, dishName, price, quantity)
      const updatedCart = cartList.map(obj =>
        obj.dishName === dishName
          ? {...obj, quantity: obj.quantity + quantity}
          : obj,
      )
      this.setState({cartList: updatedCart})
    }
    // if the data doesnt exists
    else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, {image, dishName, price, quantity}],
      }))
    }
  }

  removeCartItem = dishName => {
    const {cartList} = this.state

    const updatedCart = cartList.filter(item => item.dishName !== dishName)

    this.setState({cartList: updatedCart})
  }

  decrementCartItemQuantity = dishName => {
    const {cartList} = this.state

    const updatedCart = cartList
      .map(item =>
        item.dishName === dishName
          ? {...item, quantity: item.quantity - 1}
          : item,
      )
      .filter(item => item.quantity !== 0)

    this.setState({cartList: updatedCart})
  }

  incrementCartItemQuantity = dishName => {
    const {cartList} = this.state

    const updatedCart = cartList.map(item =>
      item.dishName === dishName
        ? {...item, quantity: item.quantity + 1}
        : item,
    )
    this.setState({cartList: updatedCart})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,

          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
