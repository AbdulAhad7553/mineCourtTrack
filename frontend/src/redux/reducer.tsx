// import * as ActionTypes from './actionTypes'
// let lastId = 0;


// export default function reducer(state = [], action) {
//     if(action.type === ActionTypes.PLAYER_ADD)
//         return[
//             ...state,
//             {
//                 id: ++lastId,
//                 name: action.payload.name,
//                 jerseyNumber: action.payload.jerseyNumber,
//                 position: action.payload.position,
//                 age: action.payload.age,
//                 affiliation: action.payload.affiliation,
//                 phoneNumber: action.payload.phoneNumber
//             }
//         ];
//     else if(action.type === ActionTypes.PLAYER_REMOVED)
//         return state.filter(player => player.id !== action.payload.id);

//     return state;
// }


import * as ActionTypes from './actionTypes';
let lastId = 0;
// Define the type for a single player
interface Player {
  id: number;
  name: string;
  jerseyNumber: number;
  position: string;
  age: number;
  affiliation: string;
  phoneNumber: string;
}

// Define the type for the state array
interface State {
  players: Player[];
}

// Initial state
const initialState: State = {
  players: [],
};

// Reducer function
export default function reducer(state: State = initialState, action: any) {
  if (action.type === ActionTypes.PLAYER_ADD)
    return {
      ...state,
      players: [
        ...state.players,
        {
          id: ++lastId,
          name: action.payload.name,
          jerseyNumber: action.payload.jerseyNumber,
          position: action.payload.position,
          age: action.payload.age,
          affiliation: action.payload.affiliation,
          phoneNumber: action.payload.phoneNumber,
        },
      ],
    };
  else if (action.type === ActionTypes.PLAYER_REMOVED)
    return {
      ...state,
      players: state.players.filter((player) => player.id !== action.payload.id),
    };

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