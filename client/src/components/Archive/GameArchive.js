import { useState } from 'react';
import moment from 'moment';
const GameArchive = (allGames) => {
	return (
		<>
			{allGames.length !== 0 &&
				allGames.data.map((games) => {
					return (
						<div>
							{moment(games.date).format(`YYYY-MM-DD`)}
							{games.home_team.full_name} {games.home_team_score} vs{' '}
							{games.visitor_team.full_name} {games.visitor_team_score}
						</div>
					);
				})}
		</>
	);
};

export default GameArchive;
