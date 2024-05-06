import * as ActionTypes from './actionTypes'
let lastId = 0;

export default function reducer(state = [], action) {
    if(action.type === ActionTypes.PLAYER_ADD)
        return[
            ...state,
            {
                id: ++lastId,
                name: action.payload.name,
                jerseyNumber: action.payload.jerseyNumber,
                position: action.payload.position,
                age: action.payload.age,
                affiliation: action.payload.affiliation,
                phoneNumber: action.payload.phoneNumber
            }
        ];
    else if(action.type === ActionTypes.PLAYER_REMOVED)
        return state.filter(player => player.id !== aution.payload.id);

    return state;
}

/*
    1. Name
    2. Jersey Number
    3. Position?
    4. Age?
    5. Affliction? (#hashtags)
    6. Phone Number?
    7. Batch Number?
*/