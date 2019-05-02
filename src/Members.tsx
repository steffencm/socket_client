
import React from 'react';

export function Members(props: {members: string[]}) {

    return (
    <div id="members">
        <span id="members_title">Current Members</span>
        <div id="members_list">
        {props.members.map((value: string, index: number) => {
            return <div className="member_row">{value}</div>
        })}
        </div>
    </div>
    ) 

}