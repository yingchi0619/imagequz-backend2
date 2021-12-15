import {posts, gets} from './axios';

export function login(data){
    return posts({
        url: '/login',
        params: data
    })
}

export function signup(data){
    return posts({
        url: '/signup',
        params: data
    })
}
