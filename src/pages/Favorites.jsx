import { useContext } from 'react';
import Card from '../components/Card';
import AppContext from '../context';
import { Link } from 'react-router-dom';

function Favorites() {
	const { favorites, onFavorite, onAddToCart, isLoading } =
		useContext(AppContext);

	return (
		<div className='content'>
			<div className='content__header'>
				<h1 className='content__header-title'>Мои закладки</h1>
			</div>

			{favorites.length > 0 ? (
				<div className='sneakers'>
					{favorites.map((item, index) => (
						<Card
							key={index}
							favorited={true}
							onFavorite={onFavorite}
							onPlus={obj => onAddToCart(obj)}
							loading={isLoading}
							{...item}
						/>
					))}
				</div>
			) : (
				<div className='flex-center'>
					<div className='favoritesEmpty'>
						<img width={70} src='/img/favorites-empty.png' alt='smile-sad' />
						<h3>Закладок нет</h3>
						<p>Вы ничего не добавляли в закладки</p>
						<Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
							<button className='green-btn'>
								Вернуться назад
								<img src='/img/arrow-back.svg' alt='arrow' />
							</button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}

export default Favorites;
