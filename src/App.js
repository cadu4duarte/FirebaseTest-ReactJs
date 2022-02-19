import {useState, useEffect} from "react";
import "./style.css";
import firebase from "./firebaseConnection";
import 'firebase/firestore';

function App() {
  const [idPost, setIdPost] = useState("");
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    async function loadPosts() {
      await firebase.firestore().collection("posts")
      .onSnapshot((doc) => {
        let meusPosts = [];
        
        doc.forEach((item) => {
          meusPosts.push({
            id: item.id,
            titulo: item.data().titulo,
            autor: item.data().autor,
          })
        });
        
        setPosts(meusPosts);

      })
    }

    loadPosts();

  }, []);

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
    /*await firebase.firestore().collection("posts")
    .doc("123")
    .get()
    .then( (snapshot) => {
      setTitulo(snapshot.data().titulo);
      setAutor(snapshot.data().autor);
    })
    .catch( () => {
      console.log("erro");
    })*/

    await firebase.firestore().collection("posts")
    .get()
    .then((snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })
      })

      setPosts(lista);
    })
    .catch(() => {
      console.log("Erro");
    })
  }

  async function editarPost() {
    await firebase.firestore().collection("posts")
    .doc(idPost)
    .update({
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      console.log("dados atualizados com sucesso");
      setIdPost("");
      setTitulo("");
      setAutor("");
    })
  }

  async function excluirPost(id) {
    await firebase.firestore().collection("posts").doc(id)
    .delete()
    .then(() => {
      alert("Post excluido com sucesso!")
    })
  }

  async function novoUsuario() {
   await firebase.auth().createUserWithEmailAndPassword(email, senha)
   .then(() => {
     console.log("usuário cadastrado com sucesso");
   })
   .catch((error) => {
     console.log("error" + error);
   })
  }

  return (
    <div className="App">
      <h1>ReactJs + Firebase :)</h1> <br/>


      <div className="container">
        <label>Email</label>
        <input type="text" value={email} onChange={ (e) => setEmail(e.target.value) }/>

        <label>Senha</label>
        <input type="password" value={senha} onChange={ (e) => setSenha(e.target.value) }/>

        <button onClick={ novoUsuario }>Cadastrar</button>

      </div>


      <div className="container">

        <h2>Banco de dados:</h2>

        <label>ID: </label>
        <input type="text" value={idPost} onChange={(e) => setIdPost(e.target.value)}/>


        <label>Titulo: </label>
        <textarea type="text" value={titulo} onChange={ (e) => setTitulo(e.target.value) }></textarea>

        <label>Autor: </label>
        <input type="text" value={autor} onChange={ (e) => setAutor(e.target.value) }/>

        <button onClick={ handleAdd }>Cadastrar</button>
        <button onClick={ buscaPost }>Buscar post</button>
        <button onClick={ editarPost }>Editar</button> <br/>

        <ul>
          {posts.map((post) => {
            return(
              <li key={post.id}>
                <span>ID - {post.id}</span> <br/>
                <span>Titulo: {post.titulo}</span> <br/>
                <span>Autor: {post.autor}</span> <br/>
                <button onClick={() => excluirPost(post.id)}>Excluir post</button> <br/> <br/>
              </li>
            )
          })}
        </ul>

      </div>
      
    </div>
  );
}

export default App;
