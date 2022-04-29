import { useMutation, useQueryClient } from 'react-query';
import { executeQuery } from './executeQuery';
import { useResetPaletteList } from './useResetPaletteList';

export const useDeletePalette = () => {
	const queryClient = useQueryClient();
	const { mutate } = useResetPaletteList();
	const query = id => `
		mutation {
			deletePalette(id: "${id}"){
			id
			}
		}
  	`;
	return useMutation(_id => executeQuery(query(_id)), {
		onMutate: async _id => {
			await queryClient.cancelQueries('palettes');
			const previousValue = queryClient.getQueryData('palettes');

			queryClient.setQueryData('palettes', old => ({
				data: {
					allPalettes: [
						...old.data.allPalettes.filter(palette => palette._id !== _id)
					]
				}
			}));

			if (queryClient.getQueryData('palettes').data.allPalettes.length === 0) {
				mutate();
			}

			return previousValue;
		},
		onError: (err, variables, previousValue) => {
			console.log(err);
			return queryClient.setQueryData('palettes', previousValue);
		},
		onSettled: () => {
			queryClient.invalidateQueries('palettes');
		}
	});
};
