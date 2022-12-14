import { FaSearch, FaUserAlt } from 'react-icons/fa';
import { MdOutlineSportsHandball } from 'react-icons/md';
import { SiNba } from 'react-icons/si';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';
import SignIn from '../SignIn';

const Navbar = () => {
	const navigate = useNavigate();
	return (
		<>
			<Container>
				<Logo>
					<Nav to={'/'}>
						<h2>
							Game Time <MdOutlineSportsHandball size={25} />
						</h2>
					</Nav>
				</Logo>
				<ItemContainer>
					<List>
						<Item>
							<Nav to={'/score'}>Score</Nav>
						</Item>
						<Item>
							<Nav to={'/schedule'}>Schedule</Nav>
						</Item>
						<Item>
							<Nav to={'/team'}>Players</Nav>
						</Item>
						<Item>
							<Nav to={'/teamcreation'}>Team creation</Nav>
						</Item>
						<Item>
							<Nav to={'/archive'}>Archive</Nav>
						</Item>
					</List>
				</ItemContainer>
				<BtnContainer>
					<BtnIcons>
						<Nav to={'/profile'}>
							<FaUserAlt size={25} />
						</Nav>
					</BtnIcons>
					<SignIn />
				</BtnContainer>
			</Container>
		</>
	);
};

const Container = styled.div`
	display: flex;
	color: white;
	justify-content: space-between;
`;
const Logo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: #082032;
`;
const BtnContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-right: 10px;
`;
const ItemContainer = styled.div`
	display: flex;
	justify-content: space-around;
`;

const List = styled.div`
	display: flex;
	text-decoration: none;
	list-style: none;
	align-items: center;
`;

const Item = styled.li`
	color: #082032;
	text-decoration: none;
	margin-left: 2rem;
	font-weight: bold;
	justify-content: center;
	display: flex;
`;

const BtnIcons = styled.button`
	color: #a9a9a9;
	background-color: #f3f4f9;
	border: none;
	cursor: pointer;
	&:hover {
		color: #082032;
		cursor: pointer;
	}
	&.active {
		color: #082032;
	}
`;
const Nav = styled(NavLink)`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	text-decoration: none;
	color: #a9a9a9;
	padding: 1rem;

	&:hover {
		color: #082032;
		cursor: pointer;
	}
	&.active {
		color: #082032;
	}
`;

export default Navbar;
