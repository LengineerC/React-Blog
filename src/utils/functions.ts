/**
 * Generate random integer in [min, max]
 * @param min 
 * @param max 
 * @returns {number}
 */
export const genRandomInt=(min:number, max:number):number=>
    Math.floor(Math.random()*(max-min+1))+min;

/**
 * Generate random boolean
 * @returns {boolean}
 */
export const genRandomBool = () => Math.random() >= 0.5;