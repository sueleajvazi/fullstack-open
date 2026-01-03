const PersonForm = ({newName,
    newNr,
    addName,
    handleNameChange,
    handleNrChange,
}) => {
    return (
     <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>number: <input onChange={handleNrChange} value={newNr}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm;