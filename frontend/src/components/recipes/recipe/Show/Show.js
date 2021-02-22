import React from 'react';
import { useParams } from 'react-router-dom';
import classes from './Show.module.css';
import recipeIcon from '../../../../assets/dinner.svg';
import Image from 'react-bootstrap/Image';
import { FaRegClock, FaRegHeart, FaHeart } from 'react-icons/fa';
import { useAuth } from '../../../../context/Auth';

const Show = () => {
  const [recipe, setRecipe] = React.useState({
    ingredientes: '',
    modo_preparo: '',
    favourite: false
  });
  const { id } = useParams();
  const user = useAuth().user;

  React.useEffect(() => {
    const getRecipe = async () => {
      const url = `${process.env.REACT_APP_SERVER_URL}/receitas/${id}`
      const response = await fetch(url);
      const data = await response.json();

      setRecipe(data);
    }

    getRecipe();
  }, [id]);

  const handleFavourite = async () => {
    if(!user){
      alert("Você precisa estar logado para favoritar receitas");
      return;
    }

    const url = `${process.env.REACT_APP_SERVER_URL}/favorite`;
    const options = {
      method: "POST",
      body: JSON.stringify({id: id}),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.access_token}`
      }
    }
    const response = await fetch(url, options);
    if(response.status !== 200){
      alert("Não foi possível favoritar a receita, tente novamente mais tarde");
    }

    setRecipe({
      ...recipe,
      favourite: !recipe.favourite
    });
  }
  return (
    <div className={[classes.container].join` `}>
      <div className={[classes.lg_header_container]}>
        <div className = {[classes.title].join` `}>
          <h3 className={[classes.recipe_name]}> {recipe.titulo}</h3>
          <button className={[classes.favourite_button].join` `} onClick={handleFavourite}>
          {
            recipe.favourite ? 
            <FaHeart className={[classes.favourite_icon].join` `}/>
            : <FaRegHeart className={[classes.favourite_icon].join` `}/> 
          }
          </button>
        </div>
        <hr className={[classes.hr].join` `}/>
        <div className={[classes.recipe_header].join` `}>
          <div className={classes.image_div}>
            <Image className={[classes.image].join` `} src={recipe.imagem || recipeIcon} fluid />
          </div>
        </div>
      </div>
      <div className={[classes.info].join` `}>
        <div className={[classes.time].join` `}>
          < FaRegClock className={[classes.clock_icon]}/> {recipe.tempo_preparo} minutos
        </div>
        <div className={[classes.servings].join` `}>
          {recipe.texto} porções
        </div>
      </div>
      <div className={[classes.ingredients].join` `}>
        <h5>INGREDIENTES</h5>
        <ul>
          {
            recipe ? recipe.ingredientes.split('\n').map((ingredient, i) => {
              return <li key={i}>{ingredient}</li>
            }) : ''
          }
        </ul>
      </div>
      <div className={[classes.howTo].join` `}>
        <h5>MODO DE PREPARO</h5> 
        <ol>
          {
            recipe ? recipe.modo_preparo.split('\n').map((step, i) => {
              return <li key={i}>{step}</li>
            }) : ''
          }
        </ol>
      </div>
    </div>
  )
}

export default Show;