import { useQuery } from 'react-query';
import { executeQuery } from './executeQuery';

export const useGetPalette = (key, id, config) => {
	const query = `
		{
    		findPaletteByID(id: "${id}") {
      		_id
        		id
        		paletteName
        		emoji
    		}
		}
	`;
	return useQuery(key, () => executeQuery(query), config);
};
