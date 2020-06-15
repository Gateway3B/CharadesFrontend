export class Session {
    sessionId: string
    currentTeam: boolean
    readyOne: boolean
    readyTwo: boolean
    started: boolean
    scoreboard: boolean

    currentIndexOne: number
    currentInexTwo: number

    currentWord: string
    currentUser: string

    usersTeamOne: User[]
    usersTeamTwo: User[]

    teamOneWords: string[]
    teamTwoWords: string[]

    wordTimeOne: Word[]
    wordTimeTwo: Word[]

}

export class User {
    username: string
    team: boolean
    owner: boolean
}

export class Word {
    word: string
    time: number
    user: User
}
