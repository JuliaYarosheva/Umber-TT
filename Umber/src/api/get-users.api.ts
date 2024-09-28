import axios, { AxiosPromise } from 'axios'
import {UserData} from "../models/models.ts";

export const apiGetUsers = (usersCount: number): AxiosPromise<UserData> => {
    return axios.get(
        `https://randomuser.me/api/?results=${usersCount}`,
    )
}