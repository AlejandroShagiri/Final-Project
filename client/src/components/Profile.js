import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Profile = () => {
	const [profile, setProfile] = useState([]);
	//mongo email key to be able to change stuff
	console.log(profile);
	useEffect(() => {
		fetch(`/api/users`)
			.then((res) => res.json())
			.then((data) => {
				setProfile(data.data);
				// console.log(data);
			});
	}, []);
	return (
		<>
			hello
			{profile.length !== 0 &&
				console.log(profile) &&
				profile.map((user) => {
					return <div>Welcome {user.nickname}</div>;
				})}
			<BtnStyle>Delete Account</BtnStyle>
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
