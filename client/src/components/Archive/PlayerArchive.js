import { useState } from 'react';

const PlayerArchive = (allPlayers) => {
	return (
		<>
			{allPlayers.length !== 0 &&
				allPlayers.data.map((players) => {
					return (
						<div>
							{players.first_name} {players.last_name} {players.position}
							{players.team.full_name}
						</div>
					);
				})}
		</>
	);
};

export default PlayerArchive;
