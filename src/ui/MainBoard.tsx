import {useEffect, useState} from "react";
import { useGetUsers } from "../hooks/useGetUsers.ts";
import { User } from "../models/types.ts";
import {UserCard} from "./UserCard.tsx";
import styles from '../styles/styles.module.scss'

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
    const { queryUsers, setUsersCount, usersCount } = useGetUsers()

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
            setUsersCount(newUsersCount)
        }, 3000)

        return () => {
            clearInterval(updateUsers)
        }
    }, []);

    return <div className={styles.mainBoard}>
        {users?.map((user, index) => {
            return <UserCard key={`${user.id.value}-${index}`} userData={user} idx={index + 1} />
        })}
    </div>
}