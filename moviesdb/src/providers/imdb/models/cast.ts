
const imageUrlPrefix: string = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

class Cast {

    id: number = 0;
    name: string = "";
    character: string = "";
    gender: number = 0;
    order: number = 0;
    profilePath: string = "";

    get profileUrl() : string {
        return `${imageUrlPrefix}${this.profilePath}`;
    }

}

namespace Cast {

    /**
     * Build a Cast object from the json entry returned by the TMDB Api.
     * @param json 
     */
    export function fromJson(json: any) : Cast {
        const cast = new Cast();
        cast.id = json["id"];
        cast.name = json["name"];
        cast.character = json["character"];
        cast.gender = json["gender"];
        cast.order = json["order"];
        cast.profilePath = json["profile_path"];
        return cast;
    }

}

export { Cast };
