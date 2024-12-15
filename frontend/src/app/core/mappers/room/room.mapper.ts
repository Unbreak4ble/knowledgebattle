import { IAlternativeResult } from "../../interfaces/room/alternatives_result.interface";

export function convertToAlternativesResult(data:any):IAlternativeResult {
    let alternatives_result = {};

    if(data == null) {
      return alternatives_result;
    }

    const alternatives = data.alternatives || [];
    const pickers = data.players || [];
    const pickers_count = pickers.length;

    const keys = Object.keys(alternatives).map(x => x.replace('id_', ''));

    const alternatives_arr = keys.map(x => ({[+x]: {
      count: alternatives['id_'+x],
      percent: Math.floor(100/pickers_count*alternatives['id_'+x])
    }}));

    for(let alt of alternatives_arr)
      alternatives_result = {...alternatives_result, ...alt};

    return alternatives_result;
}