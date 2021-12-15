import {posts, gets} from './axios';

export function FLOWS(data){
    return gets({
        url: '/FLOWS',
        params: data
    })
}

export function Test(data){
    return gets({
        url: '/Test',
        params: data
    })
}
export function Quz(data){
    return gets({
        url: '/Quz',
        params: data
    })
}
export function Score(data){
    return posts({
        url: '/Score',
        params: data
    })
}
