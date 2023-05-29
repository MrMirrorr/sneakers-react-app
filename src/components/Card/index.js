import { useContext, useState } from 'react';
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';

import styles from './Card.module.scss';

function Card({
	id,
	name,
	price,
	imgUrl,
	onPlus,
	onFavorite,
	favorited = false,
	loading = true,
}) {
	const { isItemAdded, isItemFavorite } = useContext(AppContext);
	const [isFavorite, setIsFavorite] = useState(favorited);
	const itemObj = { id, parentId: id, name, imgUrl, price };

	const onClickPlus = () => {
		onPlus(itemObj);
	};

	const onClickFavorite = () => {
		onFavorite(itemObj);
		setIsFavorite(!isFavorite);
	};

	return (
		<div className={styles.card}>
			{loading ? (
				<ContentLoader
					speed={0.5}
					width={150}
					height={190}
					viewBox='0 0 150 190'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
				>
					<rect x='0' y='0' rx='10' ry='10' width='150' height='90' />
					<rect x='0' y='106' rx='3' ry='3' width='150' height='15' />
					<rect x='0' y='125' rx='3' ry='3' width='95' height='15' />
					<rect x='0' y='162' rx='8' ry='8' width='80' height='25' />
					<rect x='109' y='154' rx='8' ry='8' width='32' height='32' />
				</ContentLoader>
			) : (
				<>
					<div className={styles.favorite} onClick={onClickFavorite}>
						{onFavorite && (
							<img
								src={
									isFavorite
										? `${process.env.PUBLIC_URL}/img/heart-enabled.svg`
										: `${process.env.PUBLIC_URL}/img/heart-disabled.svg`
								}
								alt='favorite'
							/>
						)}
					</div>
					<img
						width={133}
						height={112}
						alt='sneakers'
						src={process.env.PUBLIC_URL + imgUrl}
					/>
					<h5 className={styles.cardTitle}>{name}</h5>
					<div className={styles.cardBottomBlock}>
						<div className={styles.cardPrice}>
							<p>Цена:</p>
							<b>{price} руб.</b>
						</div>
						<div className={styles.cardAddBtn} onClick={onClickPlus}>
							{onPlus && (
								<img
									width={32}
									height={32}
									alt='add'
									src={
										isItemAdded(id)
											? `${process.env.PUBLIC_URL}/img/checked.svg`
											: `${process.env.PUBLIC_URL}/img/add-btn.svg`
									}
								/>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Card;
