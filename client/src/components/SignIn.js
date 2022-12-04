import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
const SignIn = () => {
	const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
	const [userData, setUserData] = useState([]);

	useEffect(() => {
		if (isAuthenticated) {
			fetch(`/api/users`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: user.email,
					given_name: user.given_name,
					family_name: user.family_name,
					nickname: user.nickname,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setUserData(data);
				})
				.catch((error) => {
					window.alert(error);
				});
		}
	}, [isAuthenticated]);

	return (
		<BtnStyling
			onClick={() => {
				if (isAuthenticated) {
					logout({ returnTo: window.location.origin });
				} else {
					loginWithRedirect();
				}
			}}
		>
			{isAuthenticated ? 'Sign Out' : 'Sign In'}{' '}
		</BtnStyling>
	);
};

const BtnStyling = styled.button`
	font-size: large;
	font-weight: 550;
	border-radius: 15px;
	padding: 7px;
	background-color: #f3f4f9;
	border: none;
	color: #a9a9a9;
	&:hover {
		color: #082032;
	}
`;
export default SignIn;
