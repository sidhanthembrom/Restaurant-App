import {Component} from 'react'

class FoodListItem extends Component {
  handleDecrement = () => {
    const {handleCartItemDecrement, quantity} = this.props

    if (quantity >= 1) {
      const {el} = this.props
      handleCartItemDecrement(el)
    }
  }

  handleIncrement = () => {
    const {handleCartItemIncrement, el} = this.props
    handleCartItemIncrement(el)
  }

  render() {
    const {el, quantity} = this.props
    // if (el !== undefined) {
    //   console.log(el.dish_calories)
    // }

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
              <div className="button-container">
                <button onClick={this.handleDecrement}>-</button>
                <p>{quantity}</p>
                <button onClick={this.handleIncrement}>+</button>
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
