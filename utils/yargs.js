
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

export const getParameters = () => {
    try {
        const argv = yargs(hideBin(process.argv))
            .option('name', {
                alias: 'n',
                description: 'Name of the product to search for',
                type: 'string',
                demandOption: true,
            })
            .help()
            .alias('help', 'h')
            .argv;
        if(!argv?.name){
            return null
        }
        return argv?.name;
    } catch (error) {
        console.error("error in getting parametrs", error)
        return false
    }
}