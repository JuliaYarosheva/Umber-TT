import { useEffect, useState } from "react";
import { useGetUsers } from "../hooks/useGetUsers.ts";
import { User } from "../models/types.ts";
import { UserCard } from "./UserCard.tsx";
import '../styles/styles.scss'
import { useQueryClient } from "@tanstack/react-query";

const usersCount = 10

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
}

function getRandomIndexes(numberOfIndexes: number) {
    let randomIndexes: number[] = []

    while (randomIndexes.length < numberOfIndexes) {
        let randomIndex = getRandomInt(usersCount)

        if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex)
        }
    }

    return randomIndexes
}

export const MainBoard = () => {
    const queryClient = useQueryClient()
    const [usersCount, setUsersCount] = useState(10)
    const { queryUsers  } = useGetUsers(usersCount)

    const [users, setUsers] = useState<User[]>( [])

    useEffect(() => {
        // for initial set
        if (queryUsers && users?.length === 0) {
            setUsers(queryUsers)
        }
    }, [queryUsers]);

    useEffect(() => {
        if (queryUsers && users && users?.length !== 0) {
            const usersCopy = [...users]
            const randomIndexes = getRandomIndexes(usersCount)

            randomIndexes.forEach((randomIndex, index) => {
                usersCopy[randomIndex] = queryUsers[index]
            })

            setUsers(usersCopy)
        }

    }, [queryUsers]);

    useEffect(() => {
        const updateUsers = setInterval(() => {
            const newUsersCount = getRandomInt(usersCount)
            queryClient.invalidateQueries({ queryKey: ['users'] })
            setUsersCount(newUsersCount)
        }, 3000)

        return () => {
            clearInterval(updateUsers)
        }
    }, []);

    return <div className='mainBoard'>
        <div className='boardContainer'>
            {users?.map((user, index) => {
                return <UserCard key={`${user.id.value}-${index}`} userData={user} idx={index + 1} />
            })}
        </div>
    </div>
}