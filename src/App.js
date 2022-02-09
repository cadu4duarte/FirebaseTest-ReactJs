import {useState} from "react";
import "./style.css";
import firebase from "./firebaseConnection";
import 'firebase/firestore';

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");

  async function handleAdd() {
    
    await firebase.firestore().collection("posts")
    /* setando o id manualmente
    .doc("12345")
    .set({
      titulo: titulo,
      autor: autor
    })
     */

    //id aleatório
    .add({
      titulo: titulo,
      autor: autor
    })
    .then( () => {
      console.log("dados cadastrados com sucesso");
      setTitulo("");
      setAutor("");
    })
    .catch( (error) => {
      console.log("erro" + error);
    })

  }

  async function buscaPost() {
    await firebase.firestore().collection("posts")
    .doc("123")
    .get()
    .then( (snapshot) => {
      setTitulo(snapshot.data().titulo);
      setAutor(snapshot.data().autor);
    })
    .catch( () => {
      console.log("erro");
    })
  }

  return (
    <div className="App">
      <h1>ReactJs + Firebase :)</h1> <br/>


      <div className="container">
        <label>Titulo: </label>
        <textarea type="text" value={titulo} onChange={ (e) => setTitulo(e.target.value) }></textarea>

        <label>Autor: </label>
        <input type="text" value={autor} onChange={ (e) => setAutor(e.target.value) }/>

        <button onClick={ handleAdd }>Cadastrar</button>
        <button onClick={ buscaPost }>Buscar post</button>

      </div>
      
    </div>
  );
}

export default App;
