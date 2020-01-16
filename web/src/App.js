import React, { useEffect, useState } from 'react';
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'
import api from './service/api'
import DevItem from './components/DevItem'
import DevForm from './components/DevForms'
//Componente: Função que retorna html,css, js  (Bloco isolado)
//Estado: renderiza alterações  Lembrar sobre a imutabilidade
//Propriedades : sao os atributos do 'html', (informações que o comp pai passa pro comp filho)



function App() {
  const [devs, setDevs] = useState([]);

 
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      setDevs(response.data);
    }

    loadDevs();
  }, [])

  async function handleSubmit(data) {
    const response = await api.post('/devs',data)

    
    setDevs([...devs, response.data]); //Como existe imutabilidade não existe push
    console.log(response.data);
  }

  return (
    <div id="app">
      {/* tag para fazer side bar */}
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem  key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
