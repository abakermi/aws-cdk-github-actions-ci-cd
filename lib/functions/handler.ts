
import {Chance} from "chance"


const chance = new Chance()


/**
 * 
 * Generate dummy user info
 * 
 * @param event ApiGateway request
 * @param ctx 
 */
export const handle =async (event: any, ctx: any) => {

    // user info
    const info = {
        email: chance.email(),
        name: chance.name(),
        age: chance.age(),
        country: chance.country(),
        phone: chance.phone()

    }

    return { statusCode: 200, body: JSON.stringify(info) };
}