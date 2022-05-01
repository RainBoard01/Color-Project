import { useQuery } from 'react-query';
import { executeQuery } from './executeQuery';

export const useGetColors = (key, id, config) => {
	const query = id
		? `
   	{
    		allColors (paletteId: "${id}") {
        		name
        		color
    		}
		}
	`
		: `
		{
    		allColors {
        		name
        		color
    		}
		}
	`;

	return useQuery(key, () => executeQuery(query), config);
};
