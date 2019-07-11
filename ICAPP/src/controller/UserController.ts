import {getConnection} from "typeorm";
import {User} from "../entity/User";
import {ResultVo} from "../vo/ResultVo";

export class UserController {
    static getHeroes = async (req, res) => {
        const {start_index, page_size} = req.query;
        console.log("1");
        const options = {};
        options['select'] = ["UID"];
        console.log("2");
        //options['order'] = {id: 'DESC'};
        if (start_index) {
            options['skip'] = start_index;
            console.log("3");
        }
        if (page_size) {
            options['take'] = page_size;
            console.log("4");
        }

        //options['select'] = ["id", "name", "email", "photo"];

        const heroes = await getConnection().getRepository(User).find(options);
        console.log("5");
        const total = await getConnection().getRepository(User).count();
        console.log("6");
        const result = new ResultVo(0, "success");
        console.log("7");
        result.data = heroes;
        result.total = total;
        res.send(result);
    }
}