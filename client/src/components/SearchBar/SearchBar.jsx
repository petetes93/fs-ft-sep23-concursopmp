import React from 'react'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
// import { useProducts } from 'src/hooks';

function SearchBar() {
  // const {query, setQuery} = useProducts()

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        placeholder="Buscar..."
        variant="outlined"
        // value={query}
        // onChange={(e) => setQuery(e.target.value)}
        margin="normal"
        sx={{
          '& input': {
            color: 'black',
            height: '100%',
          },
          '& fieldset': {
            border: 'none',
          },
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          outline: 'none',
          width: '700px',
          height: '40px',
          lineHeight: '60px',
          display: 'flex',
          justifyContent: 'center',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
          },
        }}
      />

      {/* Agregar el icono de búsqueda */}
      <SearchIcon
        sx={{
          color: 'black',
          marginLeft: '-30px',
          alignSelf: 'center',
          marginTop: '8px',
          paddingRight: '5px',
        }}
      />
    </div>
  )
}

export default SearchBar
