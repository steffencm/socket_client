import React, { useEffect } from 'react'

export const Canvas =(props: {members: string[]}) => {

    useEffect(() => {
        const canvas: HTMLCanvasElement = (document.getElementById('canvas') as HTMLCanvasElement)
        const ctx = (canvas.getContext('2d') as any)
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(300, 300, 50, 50);
    })

    return (
        <canvas id="canvas" width={640} height={425} />
    )
}