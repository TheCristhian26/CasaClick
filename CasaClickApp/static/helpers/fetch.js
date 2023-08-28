export const getFetch = async (url) => {
    const res = await fetch(url)
    return await res.json()
}

export const getFetchAuth = async (url, token) => {
    const res = await fetch(url, {
        method: 'GET',
        cache: 'no-cache',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return await res.json()
}

export const postFetchAuth = async (url, body, token) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    return await res.json()
}

export const postFetchFormAuth = async (url, body, token) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${token}`
        },
        body: body
    })
    return await res.json()
}

export const postFetch = async (url, body) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    return await res.json()
}

export const putFetchAuth = async (url, body, token) => {
    const res = await fetch(url, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    return await res.json()
}

export const deleteFetchAuth = async (url, token) => {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return await res.json()
}