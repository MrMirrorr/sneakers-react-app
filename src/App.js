import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import axios from 'axios';
import Drawer from './components/Drawer';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';

function App() {
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [cartOpened, setCartOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const [cartResponse, favoritesResponse, itemsResponse] =
					await Promise.all([
						axios.get('https://6461393a185dd9877e399c4d.mockapi.io/cart'),
						axios.get('https://6461393a185dd9877e399c4d.mockapi.io/favorites'),
						axios.get('https://6461393a185dd9877e399c4d.mockapi.io/items'),
					]);

				setIsLoading(false);
				setCartItems(cartResponse.data);
				setFavorites(favoritesResponse.data);
				setItems(itemsResponse.data);
			} catch (error) {
				alert('упс, на сервере что-то пошло не так =(');
				console.error(error);
			}
		}
		fetchData();
	}, []);

	const onAddToCart = async obj => {
		const findItem = cartItems.find(item => item.parentId === obj.id);
		try {
			if (findItem) {
				setCartItems(prev => prev.filter(item => item.parentId !== obj.id));
				await axios.delete(
					`https://6461393a185dd9877e399c4d.mockapi.io/cart/${findItem.id}`
				);
			} else {
				setCartItems(prev => [...prev, obj]);
				const { data } = await axios.post(
					'https://6461393a185dd9877e399c4d.mockapi.io/cart',
					obj
				);
				setCartItems(prev =>
					prev.map(item =>
						item.parentId === data.parentId ? { ...item, id: data.id } : item
					)
				);
			}
		} catch (error) {
			alert('не удалось добавить в корзину');
			console.error(error);
		}
	};

	const onRemoveItem = id => {
		try {
			axios.delete(`https://6461393a185dd9877e399c4d.mockapi.io/cart/${id}`);
			setCartItems(prev => prev.filter(item => item.id !== id));
		} catch (error) {
			alert('не удалось удалить из корзины');
			console.error(error);
		}
	};

	const onFavorite = async obj => {
		try {
			if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
				axios.delete(
					`https://6461393a185dd9877e399c4d.mockapi.io/favorites/${obj.id}`
				);
				setFavorites(prev =>
					prev.filter(item => Number(item.id) !== Number(obj.id))
				);
			} else {
				const { data } = await axios.post(
					'https://6461393a185dd9877e399c4d.mockapi.io/favorites',
					obj
				);
				setFavorites(prev => [...prev, data]);
			}
		} catch (error) {
			alert('не удалось добавить в фавориты');
			console.error(error);
		}
	};

	const onChangeSearchInput = e => {
		setSearchValue(e.target.value);
	};

	const isItemAdded = id => {
		return cartItems.some(obj => obj.parentId === id);
	};

	// const isItemFavorite = id => {
	// 	return favorites.some(obj => obj.parentId === id);
	// };

	return (
		<AppContext.Provider
			value={{
				items,
				cartItems,
				favorites,
				isItemAdded,
				onFavorite,
				onAddToCart,
				setCartOpened,
				setCartItems,
				isLoading,
			}}
		>
			<div className='wrapper'>
				<Drawer
					items={cartItems}
					onClose={() => setCartOpened(false)}
					onRemove={onRemoveItem}
					opened={cartOpened}
				/>

				<Header onClickCart={() => setCartOpened(true)} />

				<Routes>
					<Route
						path='/'
						element={
							<Home
								items={items}
								cartItems={cartItems}
								searchValue={searchValue}
								onChangeSearchInput={onChangeSearchInput}
								onFavorite={onFavorite}
								onAddToCart={onAddToCart}
								isLoading={isLoading}
							/>
						}
					/>
					<Route path='/favorites' element={<Favorites />} />
					<Route path='/orders' element={<Orders />} />
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
