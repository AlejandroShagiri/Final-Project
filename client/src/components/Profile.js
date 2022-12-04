import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const Profile = ({ email }) => {
	const [profile, setProfile] = useState([]);
	const [favouriteTeam, setFavouriteTeam] = useState([]);
	const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
	//mongo email key to be able to change stuff
	useEffect(() => {
		fetch(`/api/user/${user.email}`)
			.then((res) => res.json())
			.then((data) => {
				setProfile(data.data);
			});
	}, []);

	useEffect(() => {
		fetch(`/api/favourite`)
			.then((res) => res.json())
			.then((data) => {
				setFavouriteTeam(data.data);
			});
	}, []);

	const modifyUserName = (nickname) => {
		fetch(`/api/user/${user.email}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ nickname: nickname }),
		})
			.then((res) => res.json())
			.then((data) => {
				setProfile(data.data);
			});
	};

	const handleClick = () => {
		fetch(`/api/user/${user.email}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (!!data && data.deletedCount === 1) {
					const index = profile.findIndex((e) => e.user.email === user.email);
					profile.splice(index, 1);
					window.location.reload();
				}
			});
	};

	return (
		<>
			{profile && <div>Genral Account Information</div>}
			<form>
				<div>
					Name : {user.given_name} {user.family_name}
				</div>
				<div>
					{' '}
					Username: {user.nickname}
					<label htmlFor='newName'></label>
					<input placeholder='Insert new username...' name='userName'></input>
					<button onClick={modifyUserName}>Update Username</button>
				</div>
			</form>
			<div>
				{favouriteTeam.length !== 0 &&
					favouriteTeam.map((favourite) => {
						return (
							<>
								<div>Favourite Team : {favourite.team.name}</div>
							</>
						);
					})}
			</div>
			<BtnStyle onClick={handleClick}>Delete Account</BtnStyle>
		</>
	);
};

const BtnStyle = styled.button`
	&:hover {
		background-color: red;
		border: none;
		padding: 20px;
	}
`;
export default Profile;
