import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const Searchbar = () => {
	return (
		<Wrapper>
			<SearchContainer>
				<StyledForm>
					<StyledLabel for='searchright'></StyledLabel>
					<StyledInput
						className='search expandright'
						id='searchright'
						type='search'
						placeholder='Search'
					></StyledInput>
					<button type='submit'>
						<FaSearch size={25} />
					</button>
				</StyledForm>
			</SearchContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div``;

const SearchContainer = styled.div``;

const StyledForm = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledLabel = styled.label`
	cursor: pointer;
	&:hover {
		color: #082032;
	}
`;

const StyledInput = styled.input`
	display: flex;
	border-radius: 15px;
	background-color: white;
	outline: none;
	border: none;
	padding: 10px;
	margin: 4px 2px;
	height: 50%;
	width: 30%;
	font-size: large;
`;
export default Searchbar;
