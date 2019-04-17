import React, { Component, useState, useEffect } from 'react';
import * as io from 'socket.io-client';
import logo from './logo.svg';
import './App.scss';

export function Members(props: any) {
    const tempUsername = Math.random().toString(36).substring(7)
    const [members, setMembers] = useState<string[]>([])
    const [username, setUsername] = useState<string>(tempUsername)
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
      socket.emit('whoami', {username})
      socket.on('user_connected', addUser)
      socket.on('user_disconnected', removeUser)
      socket.on('current_users', setCurrentMembers)
    }, []);

    return (
      <div id="wrapper">
        <div id="members">
          <span id="members_title">Current Members</span>
          <div id="members_list">
            {members.map((value, index) => {
              return <div className="member_row">{value}</div>
            })}
          </div>
        </div>
        <div id="identity">
          <h1>Logged in as { username }</h1>
        </div>
      </div>
    ) 

}

export default function App(props: any) {


    return (
      <div className="App">
        <Members />
      </div>
    )
  }

