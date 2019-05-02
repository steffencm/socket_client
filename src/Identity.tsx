import React from 'react'

export type User = {
    userName: string
}

export const Identity = (props: {user: User}) =>{

    return (
        <div id="identity">
          <h1>Logged in as {props.user.userName}</h1>
        </div>
    )
}