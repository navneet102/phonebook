const Filter = (props) => {
    return (
      <div>
        filter shown with <input value={props.searchName} onChange={props.handleSearchNameChange}/>
      </div>
    )
}

export default Filter