import {useEffect, useRef, useState} from "react";
import { useGetUsers } from "../hooks/useGetUsers.ts";
import { User } from "../models/types.ts";
import {UserCard} from "./UserCard.tsx";
import styles from '../styles/styles.module.scss'

const usersCount = 10

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

function getRandomIndexes(numberOfIndexes) {
    let randomIndexes = []

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
    // const [newFetchedUsers, setNewFetchedUsers] = useState<User[] | undefined>([])


    useEffect(() => {
        if (queryUsers && users?.length === 0) {
            setUsers(queryUsers)
        }
    }, [queryUsers]);

    useEffect(() => {
        if (users && users?.length !== 0) {
            const usersCopy = [...users]
            const randomIndexes = getRandomIndexes(usersCount)
            randomIndexes.forEach((randomIndex, index) => {
                if (queryUsers) {
                    usersCopy[randomIndex] = queryUsers[index]
                }
            })

            console.log(usersCopy)
            setUsers(usersCopy)
        }

    }, [queryUsers]);

    const getNewUsers = () => {
        //new users count
        // setNewFetchedUsers(users)
        //get array with random indexes

        //copy to prevent mutation in existUsers from useState

    }


    useEffect(() => {
        const updateUsers = setInterval(() => {
            const newUsersCount = getRandomInt(usersCount)
            setUsersCount(newUsersCount)
        }, 3000)

        return () => {
            clearInterval(updateUsers)
        }
    }, []);

    console.log(users)
    return <div className={styles.mainBoard}>
        {users?.map((user, index) => {
            return <UserCard key={user.id.value} userData={user} idx={index + 1} />
        })}
    </div>
}