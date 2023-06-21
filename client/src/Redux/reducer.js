
const initialState = {
  allDogs: [],
  dogs: [],
  allTemperaments: [],
  detail:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DOGS':

      return {
        ...state,
        allDogs: action.payload,
        dogs: action.payload
      }
    case 'FILTER_DOGS':
      const allDogs = state.allDogs;
      const dogsFiltered = allDogs.filter(el => {
        let aux = el.temperament?.split(', ')
        if (aux?.find(name => name === action.payload)) {
          return el
        }
      })
      return {
        ...state,
        allDogs: dogsFiltered
      };
    case "FILTER_ORIGEN":
      const allDogs2 = state.allDogs
      const origenFilter = action.payload === 'creados' ? allDogs2.filter(el => el.createdInDb) : allDogs2.filter(el => !el.createdInDb)
      return {
        ...state,
        allDogs: action.payload === 'all' ? state.allDogs : origenFilter
      }
    case "ORDER":
      const cambio1 = function (num) {
        let aux = num.split('-')
        return Number(aux[0])
      }
      const cambio2 = function (num) {
        let aux = num.split('-')
        return Number(aux[1])
      }
      let sortedArr = action.payload === 'nameAsc' ?
        state.allDogs.sort(function (a, b) {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          return 0;
        }) :
        action.payload === 'nameDesc' ?
          state.allDogs.sort(function (a, b) {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
          }) :
          action.payload === 'pesoAsc' ?
            state.allDogs.sort(function (a, b) {
              if (cambio1(a.weight) > cambio1(b.weight)) return 1;
              if (cambio1(a.weight) < cambio1(b.weight)) return -1;
              return 0;
            }) :
            state.allDogs.sort(function (a, b) {
              if (cambio2(a.weight) > cambio2(b.weight)) return -1;
              if (cambio2(a.weight) < cambio2(b.weight)) return 1;
              return 0;
            })

      return {
        ...state,
        allDogs: sortedArr
      }
    case 'GET_ALL_TEMPS':
      return {
        ...state,
        allTemperaments: action.payload
      };
    case "GET_NAME":
      return {
        ...state,
        allDogs: action.payload,

      };
      case "POST_DOGS":
      return{
        ...state
      }
      case "GET_DETAILS":
       return{
        ...state,
        detail:action.payload
      }
              


    default:
      return { ...state };
  }
};

export default reducer;