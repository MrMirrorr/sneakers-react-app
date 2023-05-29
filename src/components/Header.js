import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

function Header({ onClickCart }) {
	const { totalPrice } = useCart();

	return (
		<div className='header'>
			<Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
				<div className='header__left'>
					<img
						width={40}
						height={40}
						alt='logo'
						src={process.env.PUBLIC_URL + '/img/logo.png'}
					/>
					<div className='header__info'>
						<h2 className='header__title'>React Sneakers</h2>
						<p className='header__subtitle'>Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>

			<ul className='header__right'>
				<li onClick={onClickCart}>
					<img
						width={18}
						height={18}
						alt='cart'
						src={process.env.PUBLIC_URL + '/img/cart.svg'}
					/>
					<span className='total-price'>{totalPrice} руб.</span>
				</li>
				<li>
					<Link to={'/favorites'}>
						<img
							width={18}
							height={18}
							alt='favorites-ico'
							src={process.env.PUBLIC_URL + '/img/favorite.svg'}
						/>
					</Link>
				</li>
				<li>
					<Link to={'/orders'}>
						<img
							width={18}
							height={18}
							alt='profile-ico'
							src={process.env.PUBLIC_URL + '/img/profile.svg'}
						/>
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default Header;
