import React, { useState , useEffect} from 'react';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(async () => {
    const response = await fetch('http://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const data = await response.json();

    setRepositories(data);
  }, []);

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);
    document.title = `Voce tem ${filtered.length} favoritos`;
  }, [repositories]);

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? {...repo, favorite: !repo.favorite} : repo;
    });
    setRepositories(newRepositories);
  }

  return (  
    <>
    <h1> Estados, selecione o Favorito! </h1>
    <ul>
      {repositories.map(repo => (  
        <li key={repo.id}>
          {repo.nome}
          {repo.favorite && <span> * Favorito * </span>}
          <button onClick={() => handleFavorite(repo.id)}>
            Favoritar 
          </button>
        </li>
      ))}
    </ul>
  </>
  );
}


