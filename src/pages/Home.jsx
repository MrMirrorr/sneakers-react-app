import Card from '../components/Card';

function Home({
	items,
	searchValue,
	onChangeSearchInput,
	onFavorite,
	onAddToCart,
	isLoading,
}) {
	const renderItems = () => {
		const filteredItems = items.filter(item =>
			item.name.toLowerCase().includes(searchValue.toLowerCase())
		);
		return (isLoading ? [...Array(8)] : filteredItems).map((item, i) => (
			<Card
				key={i}
				onFavorite={obj => onFavorite(obj)}
				onPlus={obj => onAddToCart(obj)}
				loading={isLoading}
				{...item}
			/>
		));
	};

	return (
		<div className='content'>
			<div className='content__header'>
				<h1 className='content__header-title'>
					{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}
				</h1>
				<div className='content__header-search'>
					<img src={process.env.PUBLIC_URL + '/img/search.svg'} alt='search' />
					<input
						value={searchValue}
						onChange={onChangeSearchInput}
						type='text'
						placeholder='Поиск...'
					/>
				</div>
			</div>

			<div className='sneakers'>{renderItems()}</div>
		</div>
	);
}

export default Home;
