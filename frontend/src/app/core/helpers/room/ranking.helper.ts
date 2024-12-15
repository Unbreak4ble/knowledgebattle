

export function toRankingList(live_questions:any, correct_questions:any){
    const top:any[] = [];
    const correct_pickers:any = {};
    (live_questions?.map((x:any) => x.players.map((y:any) => ({[y.player_id]:0}))) || []).forEach((x:any)=>{
        x.forEach((y:any)=>{
            Object.assign(correct_pickers, y);
        });
    });

    for(const question of live_questions){
        const players = question.players;
        
        for(const player of players){
            if(player.alternative_id != correct_questions[question.id]?.alternative_id) continue;

            ++correct_pickers[player.player_id];
        }
    }

    let pickers_count = Object.keys(correct_pickers).length;

    const sort = () =>{
        for(const picker in correct_pickers){
            let count = 0;

            for(const also_picker in correct_pickers){
                if(correct_pickers[picker] >= correct_pickers[also_picker]) ++count;
            }

            if(count >= pickers_count){
                top.push({id: picker, count: correct_pickers[picker]});
                delete correct_pickers[picker];
                --pickers_count;
                sort();
                break;
            }
        }
    };
    sort();

    return top;
}