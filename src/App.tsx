import React, { useState, useEffect } from 'react'
import { Members } from './Members'
import { User, Identity } from './Identity'
import { Canvas } from './Canvas'
import * as io from 'socket.io-client'
import './App.scss'

export default function App(props: any) {
  
    const tempUsername = Math.random().toString(36).substring(7)
    const [members, setMembers] = useState<string[]>([])
    const [user, setUser] = useState<User>({
      userName: tempUsername
    })
    
    const [socket, setSocket]  = useState()

    function addUser(user: string) {
        setMembers(oldMembers => [...oldMembers, user])
    }

    function removeUser(user: string) {
      setMembers(oldMembers => {
        console.log(`removing user ${user}`)
        console.log(oldMembers)
        const index = oldMembers.indexOf(user)
        console.log(index)
        if(index > -1){
          oldMembers.splice(index, 1)
          return oldMembers.slice()
        }
        return oldMembers
      })
    }

    function setCurrentMembers(users: string[]){
      console.log('setting current members')
      setMembers(users)
    }
    
    function handleKeyEvent(event: KeyboardEvent) {
        console.log(event)
        socket.emit('keyEvent', event.key);
    }

    useEffect(() => {
      document.addEventListener('keydown', handleKeyEvent)
      return function(){ document.removeEventListener('keydown', handleKeyEvent)}
    })

    useEffect(()  => {
      const socket = io.connect('http://localhost:50824')
      setSocket(socket)
      socket.emit('whoami', {username: user.userName})
      socket.on('user_connected', addUser)
      socket.on('user_disconnected', removeUser)
      socket.on('current_users', setCurrentMembers)
    }, []);

    return (
      <div id="wrapper">
        <div className="App">
          <Members members={members}/>
        </div>
        <Identity user={user} />
        <Canvas members={members}/>
      </div>
    )

  }

