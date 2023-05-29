import { useState } from 'react';
import axios from 'axios';

import { useCart } from '../../hooks/useCart';
import Info from '../Info';

import styles from './Drawer.module.scss';

function Drawer({ onClose, onRemove, items = [], opened }) {
	const { cartItems, setCartItems, totalPrice } = useCart();
	const [orderId, setOrderId] = useState(null);
	const [isOrderComplete, setIsOrderComplete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post(
				'https://6461393a185dd9877e399c4d.mockapi.io/orders',
				{ items: cartItems }
			);
			setOrderId(data.id);
			setIsOrderComplete(true);
			setCartItems([]); // НО на сервере останется из-за особенностей mockAPI - нет запроса на очистку ресурса
		} catch (error) {
			alert('ошибка при создании заказа :(');
		}
		setIsLoading(false);
	};

	return (
		<div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
			<div className={styles.drawer}>
				<h2>
					Корзина
					<img
						onClick={onClose}
						className={styles.cartItemRemoveBtn}
						width={32}
						height={32}
						src='/img/remove-btn.svg'
						alt='close'
					/>
				</h2>

				{items.length > 0 ? (
					<>
						<div className={styles.cartItems}>
							{items.map((item, index) => (
								<div key={index} className={styles.cartItem}>
									<img
										width={70}
										height={70}
										src={item.imgUrl}
										alt='sneakers'
									/>
									<div className={styles.cartItemText}>
										<p>{item.name}</p>
										<b>{item.price} руб.</b>
									</div>
									<img
										onClick={() => onRemove(item.id)}
										className={styles.cartItemRemoveBtn}
										width={32}
										height={32}
										src='/img/remove-btn.svg'
										alt='remove'
									/>
								</div>
							))}
						</div>

						<div className={styles.cartBottom}>
							<ul className={styles.cartBottomItems}>
								<li className={styles.cartBottomItem}>
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice} руб.</b>
								</li>
								<li className={styles.cartBottomItem}>
									<span>Налог 5%:</span>
									<div></div>
									<b>{((totalPrice / 100) * 5).toFixed(2)} руб.</b>
								</li>
							</ul>
							<button
								disabled={isLoading}
								onClick={onClickOrder}
								className={'green-btn ' + styles.greenBtn}
							>
								Оформить заказ
								<img src='/img/arrow.svg' alt='arrow' />
							</button>
						</div>
					</>
				) : (
					<Info
						title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
						description={
							isOrderComplete
								? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
								: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
						}
						img={
							isOrderComplete
								? '/img/order-complete.png'
								: '/img/cart-empty.jpg'
						}
					/>
				)}
			</div>
		</div>
	);
}

export default Drawer;
