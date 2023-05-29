import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

function Orders() {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const { data } = await axios.get(
					'https://6461393a185dd9877e399c4d.mockapi.io/orders'
				);
				setOrders(data);
				setIsLoading(false);
			} catch (error) {
				alert('не удалось загрузить заказы');
				console.log(error);
			}
		}
		fetchData();
	}, []);

	const renderItems = () => {
		if (isLoading) {
			return [...Array(8)].map((_, index) => <Card key={index} />);
		} else if (orders.length > 0) {
			return orders.map((order, index) => (
				<div className='orderBlock' key={index}>
					<h3 className='orderTitle'>Заказ # {order.id}</h3>
					<div className='sneakersOrder'>
						{order.items.map((item, index) => (
							<Card key={index} loading={isLoading} {...item} />
						))}
					</div>
				</div>
			));
		} else {
			return (
				<div className='flex-center'>
					<div className='favoritesEmpty'>
						<img
							width={70}
							src={process.env.PUBLIC_URL + '/img/orders-empty.png'}
							alt='smile-sad'
						/>
						<h3>У вас нет заказов</h3>
						<p>
							Все еще не купили наши кроссовки? <br /> Оформите хотя бы один
							заказ.
						</p>
						<Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
							<button className='green-btn'>
								Вернуться назад
								<img
									src={process.env.PUBLIC_URL + '/img/arrow-back.svg'}
									alt='arrow'
								/>
							</button>
						</Link>
					</div>
				</div>
			);
		}
	};

	return (
		<div className='content'>
			<div className='content__header'>
				<h1 className='content__header-title'>Мои заказы</h1>
			</div>
			<div className={`sneakers ${!isLoading && 'sneakers--orders'}`}>
				{renderItems()}
			</div>
		</div>
	);
}

export default Orders;
