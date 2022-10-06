import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  const { user } = useAuthValue()

  const { insertDocument, response } = useInsertDocument('posts')

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    setFormError('')

    //validar url image
    try {
      new URL(image)
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.')
    }

    //array de tags
    const tagsArray = tags.split(',').map((tag)=> tag.trim().toLowerCase())

    //checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError('Por favor, preencha todos os campos!')
    }
    if (formError) return

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    // redirecionar para home
    navigate("/")
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Compartilhe o que quiser conosco</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="pense em um bom título..."
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>Url da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="insira aqui o link da imagem do post..."
            onChange={e => setImage(e.target.value)}
            value={image}
          />
        </label>

        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Escreva o seu post aqui..."
            onChange={e => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>

        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="insira as tags separadas por vírgula..."
            onChange={e => setTags(e.target.value)}
            value={tags}
          />
        </label>

        {!response.loading && <button className="btn">Criar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost
