import { useContext } from 'react';
import AppContext from '../context';

function Info({ img, title, description }) {
	const { setCartOpened } = useContext(AppContext);

	return (
		<div className='cartEmpty'>
			<img className='cartEmptyImg' width={120} src={img} alt='cart-empty' />
			<h3>{title}</h3>
			<p>{description}</p>
			<button onClick={() => setCartOpened(false)} className='green-btn'>
				Вернуться назад
				<img src={process.env.PUBLIC_URL + '/img/arrow-back.svg'} alt='arrow' />
			</button>
		</div>
	);
}

export default Info;
