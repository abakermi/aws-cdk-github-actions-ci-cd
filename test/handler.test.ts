
import {handle} from "../lib/functions/handler"

describe('handler function', () => { 

    it('should return dummy user info the required fields ', async() => {

        const {body}=await handle({},{})
        const jsonBody=JSON.parse(body)
        
        expect(jsonBody).toHaveProperty('phone')
        expect(jsonBody).toHaveProperty('email')
        expect(jsonBody).toHaveProperty('age')

    });
 })