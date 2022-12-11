import {format} from 'date-fns'
interface IChatMessage {
    username: string
    text: string
    date: string
}

export function formatMessage(from: string, text: string): IChatMessage {
    return {
        date: format(new Date(),  'mm:ss'),
        text,
        username: from
    }
}

