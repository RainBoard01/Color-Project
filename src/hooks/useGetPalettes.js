import { useQuery } from 'react-query';
import { executeQuery } from './executeQuery';

export const useGetPalettes = (key, config) => {
	const query = `
		{
			allPalettes {
				_id
				paletteName
				id
				emoji
				colors {
					_id
					name
					color
				}
			}
		}
	`;

	return useQuery(key, () => executeQuery(query), config);
};
