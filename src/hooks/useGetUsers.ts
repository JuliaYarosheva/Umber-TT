import { useQuery } from '@tanstack/react-query'
import { apiGetUsers } from "../api/get-users.api.ts";

export const useGetUsers = (usersCount: number) => {
    const { data: queryUsers} = useQuery({
        queryKey: ['users', usersCount],
        queryFn: async () => {
            const response = await apiGetUsers(usersCount)
            return response.data.results
        }
    })

    return { queryUsers }
}