/**
 * Functions used to construct routes are using the pattern make[Method][RouteName].
 * Dependencies need to be passed by the dependency object of the route factory. 
 */

/**
 * Make the index route for the GET method.
 * 
 * @param {{}} dependencies The dependencies used by this route
 */
const makeGetIndex = ({} = {}) => (req, res) => {
    return res.send('Hello world')
}

module.exports = {
    makeGetIndex
}