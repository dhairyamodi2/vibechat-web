import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const server_socket = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    cluster: process.env.PUSHER_CLUSTER!,
    secret: process.env.PUSHER_SECRET!,
    key: process.env.PUSHER_KEY!,
    useTLS: true
})


export const client_socket = new PusherClient(
    'ee24d17414dc47c372fd',
    {
        channelAuthorization: {
            endpoint: '/api/pusher/auth',
            transport: 'ajax',
        },
        cluster: 'ap2'
    }
)