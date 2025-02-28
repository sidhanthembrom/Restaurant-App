const Tabs = props => {
  const {el, categorySelected, handleTabChange} = props

  const colorOfTab = categorySelected === el ? 'selected' : 'unSelected'

  const changeTab = () => {
    handleTabChange(el)
  }

  return (
    // <li>
    <button onClick={changeTab} className={`tab-item ${colorOfTab}`}>
      {el}
    </button>
    // </li>
  )
}

export default Tabs
