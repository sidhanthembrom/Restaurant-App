import '../../App.css'
import {Component} from 'react'
import Header from '../Header/Header'
// import Tabs from './components/Tabs/Tabs'
import FoodListItem from '../FoodListItem/FoodListItem'
import CartContext from '../../CartContext/CartContext'

class App extends Component {
  state = {
    categoryOfFood: [],
    categorySelected: '',
    finalData: [],
    isLoading: true,
    restaurantName: '',
  }

  async componentDidMount() {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()

    // console.log(data)

    if (data.length > 0) {
      const menuCategories = data[0].table_menu_list.map(
        obj => obj.menu_category,
      )

      this.setState({
        finalData: data[0].table_menu_list,
        categoryOfFood: menuCategories,
        categorySelected: menuCategories[0], // default category
        isLoading: false,
        restaurantName: data[0].restaurant_name,
      })
    }
  }

  handleTabChange = newTab => {
    this.setState({categorySelected: newTab})
  }

  render() {
    const {
      categoryOfFood,
      categorySelected,
      finalData,
      isLoading,
      restaurantName,
    } = this.state

    // console.log(restaurantName)

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, addCartItem} = value

          const filteredData = finalData.find(
            data => data.menu_category === categorySelected,
          )
          const dishes = filteredData ? filteredData.category_dishes : []

          const handleCartItemIncrement = dish => {
            console.log(dish)
            // cartList.push(dish)
          }

          const handleCartItemDecrement = dish => {
            console.log(dish)
          }

          console.log(cartList)

          return (
            <div>
              {isLoading ? (
                <p>LOADING...</p>
              ) : (
                <>
                  <Header restaurantName={restaurantName} cartList={cartList} />
                  <ul className="list">
                    {categoryOfFood.map(category => (
                      <li key={category}>
                        <button
                          key={category}
                          className={
                            categorySelected === category
                              ? 'selected'
                              : 'unSelected'
                          }
                          onClick={() => this.handleTabChange(category)}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {dishes.length > 0 && (
                <ul className="foodlist">
                  {dishes.map(dish => {
                    const dishInCart = cartList.find(
                      obj => obj.dishId === dish.dish_id,
                    )
                    const dishQuantity = dishInCart
                      ? dishInCart.dishQuantity
                      : 0

                    return (
                      <FoodListItem
                        key={dish.dish_id}
                        el={dish}
                        quantity={dishQuantity}
                        handleCartItemIncrement={handleCartItemIncrement}
                        handleCartItemDecrement={handleCartItemDecrement}
                        addCartItem={addCartItem}
                      />
                    )
                  })}
                </ul>
              )}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default App

// const handleCartItemIncrement = () => {
//   this.setState(prevState => {
//     // Searching for the item
//     const itemIndex = cartList.findIndex(item => item.dishId === dish.dish_id)

//     if (itemIndex !== -1) {
//       // Update existing item quantity
//       const updatedCart = cartList.map(item =>
//         item.dishId === dish.dish_id
//           ? {...item, dishQuantity: item.dishQuantity + 1}
//           : item,
//       )

//       return {cartList: updatedCart}
//     }
//     // Add new item
//     return {
//       cartList: [...cartList, {dishId: dish.dish_id, dishQuantity: 1}],
//     }
//   })
// }

// const handleCartItemDecrement = dish => {
//   this.setState(prevState => {
//     const updatedCart = cartList
//       .map(item =>
//         item.dishId === dish.dish_id
//           ? {...item, dishQuantity: item.dishQuantity - 1}
//           : item,
//       )
//       .filter(item => item.dishQuantity > 0) // Remove items with 0 quantity

//     return {cartList: updatedCart}
//   })
// }
