const Persons = (props) => {
    return (
        <>
        {props.personsToShow.map((person) => {
            return (
                <div key={person.name}>{person.name} {person.number}
                    <button style={{margin: 3}} onClick={() => props.handlePersonDelete(person)}>delete</button>
                </div>
            )
        })}
        </>
    )
}

export default Persons