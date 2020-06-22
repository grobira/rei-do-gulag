

const commands = {
    update(){
        return "Updating Database"
    },
    rank(commandArgs){
        return "Fetching memers ranks"
    },
    addMemer(commandArgs){
        const [name, tag, type, ] = commandArgs;

        console.log(name, tag, type)
        return "New memers added"
    },
    commandList(){
        return Object.keys(commands)
    }
}

module.exports = commands;