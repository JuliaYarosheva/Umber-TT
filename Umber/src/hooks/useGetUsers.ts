import { useQuery } from '@tanstack/react-query'
import { apiGetUsers } from "../api/get-users.api.ts";
import { useState } from "react";

export const useGetUsers = () => {
    const [usersCount, setUsersCount] = useState(10)

    const { data: queryUsers} = useQuery({
        queryKey: ['users', usersCount],
        queryFn: async () => {
            const response = await apiGetUsers(usersCount)
            return response.data.results
        }
    })

    return { queryUsers, setUsersCount, usersCount }
}