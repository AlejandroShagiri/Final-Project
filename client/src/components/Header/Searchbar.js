import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const Searchbar = () => {
	return (
		<Wrapper>
			<SearchContainer>
				<form action='/search'>
					<StyledLabel for='searchright'>
						<FaSearch size={25} />
					</StyledLabel>
					<input
						className='search expandright'
						id='searchright'
						type='search'
						placeholder='Search'
					></input>
				</form>
			</SearchContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div``;

// Search bar to show up when clicked
const SearchContainer = styled.div`
	position: relative;
	margin: 4px 2px;
	height: 50px;
	width: 50px;
	vertical-align: bottom;
	border-radius: 15px;

	.search {
		border-radius: 15px;
		position: absolute;
		left: 49px;
		background-color: white;
		outline: none;
		border: none;
		padding: 0;
		width: 0;
		height: 50%;

		// I used this code pen to help with the transitions https://codepen.io/k185/pen/PQajXE
		transition-duration: 0.4s;
		-moz-transition-duration: 0.4s;
		-webkit-transition-duration: 0.4s;
		-o-transition-duration: 0.4s;
	}

	.search:focus {
		width: 363px;
		padding: 0 16px 0 0;
	}

	.expandright {
		left: auto;
		right: 49px;
	}

	.expandright:focus {
		padding: 0 0 0 16px;
	}
`;

const StyledLabel = styled.label`
	cursor: pointer;
	&:hover {
		color: #082032;
	}
`;
export default Searchbar;
