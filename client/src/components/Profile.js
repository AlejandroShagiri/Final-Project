import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const Profile = ({ email }) => {
	const [profile, setProfile] = useState({});
	const [favouriteTeam, setFavouriteTeam] = useState([]);
	const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
	//mongo email key to be able to change stuff
	useEffect(() => {
		fetch(`/api/user/${user.email}`)
			.then((res) => res.json())
			.then((data) => {
				setProfile(data.data);
			});
	}, [user]);

	useEffect(() => {
		fetch(`/api/favourite`)
			.then((res) => res.json())
			.then((data) => {
				setFavouriteTeam(data.data);
			});
	}, []);

	const modifyUserProfile = () => {
		fetch(`/api/user/${user.email}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(profile),
		})
			.then((res) => res.json())
			.then((data) => {
				setProfile(data.data);
			});
	};

	const handleChange = (e, type) => {
		if (type === 'nickname') {
			let updatedProfile = profile;
			profile.nickname = e.target.value;
			setProfile(updatedProfile);
		}
	};

	const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		fetch(`/api/user/${user.email}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(email),
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
			{profile && <Title>Genral Account Information</Title>}
			<MainDiv>
				<Container>
					<form>
						<SubTitleStyling>Name : </SubTitleStyling>
						<PatchDiv>
							{profile.given_name} {profile.family_name}
						</PatchDiv>
						<SubTitleStyling>Email : </SubTitleStyling>
						<PatchDiv>{profile.email}</PatchDiv>
						<SubTitleStyling>Username: </SubTitleStyling>
						<PatchDiv>
							{profile.nickname}
							<InputDiv>
								<label htmlFor='newName'></label>
								<InputStyling
									placeholder='Insert new username...'
									onChange={(e) => {
										handleChange(e, 'nickname');
									}}
								></InputStyling>
								<BtnStyling
									onClick={(event) => {
										modifyUserProfile();
										event.preventDefault();
										event.stopPropagation();
									}}
								>
									Update Username
								</BtnStyling>
							</InputDiv>
						</PatchDiv>
					</form>
					<div>
						<SubTitleStyling>Favourite Team: </SubTitleStyling>
						{favouriteTeam.length !== 0 &&
							favouriteTeam.map((favourite) => {
								return (
									<>
										<FavDiv>
											<NameDiv>{favourite.team.name}</NameDiv>
											<ImgStyling src={favourite.team.logo} />
										</FavDiv>
									</>
								);
							})}
					</div>
					<BtnDiv>
						<DeleteBtnStyle
							onClick={(event) => {
								handleClick();
							}}
						>
							Delete Account
						</DeleteBtnStyle>
					</BtnDiv>
				</Container>
			</MainDiv>
		</>
	);
};

const MainDiv = styled.div`
	display: flex;
	justify-content: center;
`;
const Container = styled.div`
	margin-top: 20px;
	width: 70%;
	background-color: #d8e3e9;
	border-radius: 15px;
	padding: 10px;
`;
const Title = styled.h1`
	font-size: x-large;
	margin-left: 20px;
	text-decoration: underline;
`;
const DeleteBtnStyle = styled.button`
	border: none;
	outline: none;
	border-radius: 30px;
	background-color: lightgray;
	padding: 10px 15px;
	cursor: pointer;
	&:hover {
		color: white;
		background-color: red;
	}
`;
const BtnDiv = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const InputDiv = styled.div``;

const PatchDiv = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 10px 0px 20px 0px;
`;

const InputStyling = styled.input`
	width: 300px;
	border: none;
	outline: none;
	border-radius: 30px;
	background-color: lightgray;
	padding: 10px 15px;
`;

const BtnStyling = styled.button`
	margin-left: 10px;
	width: 150px;
	border: none;
	outline: none;
	border-radius: 30px;
	background-color: lightgray;
	padding: 10px 15px;
	cursor: pointer;
	&:hover {
		color: white;
		background-color: #3ec70b;
	}
`;

const SubTitleStyling = styled.h1``;

const ImgStyling = styled.img`
	width: 50px;
	margin-top: 5px;
`;

const FavDiv = styled.div`
	display: grid;
	flex-direction: column;
	padding-top: 10px;
`;
const NameDiv = styled.div``;
export default Profile;
