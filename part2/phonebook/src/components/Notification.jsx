const Notification = ({ message, isSuccess }) => {
  if (message === null) {
    return null
  }

  const notifStyle = {
    color: isSuccess ? 'green' : 'red',
  background: 'grey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px'

  }

  return (
    <div style={notifStyle}>
      {message}
    </div>
  )
}

export default Notification