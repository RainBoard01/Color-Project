import { useMutation, useQueryClient } from 'react-query';
import { executeQuery } from './executeQuery';

export const useDeletePalette = () => {
	const queryClient = useQueryClient();
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
