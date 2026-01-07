export function Forbidden() {
  return (
    <div style={styles.container}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
        alt="gatito triste"
        style={styles.image}
      />

      <h1 style={styles.title}>403 - Acceso prohibido</h1>

      <p style={styles.text}>
        Ups… este lugar está protegido 🐾  
        <br />
        No tienes permiso para estar aquí.
      </p>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#e3f2fd',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2rem',
  },
  image: {
    width: '150px',
    marginBottom: '1.5rem',
  },
  title: {
    color: '#0d47a1',
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  text: {
    color: '#1565c0',
    fontSize: '1.1rem',
  },
}