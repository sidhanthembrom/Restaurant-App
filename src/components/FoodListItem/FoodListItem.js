import {Component} from 'react'

class FoodListItem extends Component {
  state = {count: 0}

  handleDecrement = () => {
    const {handleCartItemDecrement, quantity} = this.props
    const {count} = this.state

    if (count >= 1) {
      const {el} = this.props
      // handleCartItemDecrement(el)
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  handleIncrement = () => {
    const {handleCartItemIncrement, el} = this.props
    // handleCartItemIncrement(el)

    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  handleAddCartItemEvent = () => {
    const {el, addCartItem} = this.props
    const {count} = this.state
    // console.log(el)
    addCartItem(el.dish_image, el.dish_name, el.dish_price, count)
  }

  render() {
    const {el, quantity} = this.props

    const {count} = this.state

    return (
      <li className="list-item-for-dish-name">
        <div className="left-box">
          <div
            className={
              el.dish_Type === 1
                ? 'square-outline-nonveg'
                : 'square-outline-veg'
            }
          >
            <div
              className={
                el.dish_Type === 1
                  ? 'circle-interior-nonveg'
                  : 'circle-interior-veg'
              }
            />
          </div>
          <div>
            <h1 className="dish-name">{el.dish_name}</h1>
            <p>
              {el.dish_currency}
              {` ${el.dish_price}`}
            </p>
            <p>{el.dish_description}</p>
            {el.dish_Availability ? (
              <div>
                <div className="button-container">
                  <button onClick={this.handleDecrement}>-</button>
                  <p>{count}</p>
                  <button onClick={this.handleIncrement}>+</button>
                </div>
                {count > 0 ? (
                  <button onClick={this.handleAddCartItemEvent}>
                    ADD TO CART
                  </button>
                ) : null}
              </div>
            ) : (
              <p className="red-text">Not available</p>
            )}
            {el.addonCat.length !== 0 ? (
              <p className="blue-text">Customizations available</p>
            ) : null}
          </div>
        </div>
        <div className="calorie-with-img">
          <p>{el.dish_calories} calories</p>
          <img
            height="100px"
            width="100px"
            src={`${el.dish_image}`}
            alt={`${el.dish_name}`}
          />
        </div>
      </li>
    )
  }
}

export default FoodListItem
