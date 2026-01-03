const Person = ({name, number, deletePerson}) => {
    return <li key={name}>{name} {number} 
     <button onClick={deletePerson}>delete</button>
    </li>
   }  


   export default Person;