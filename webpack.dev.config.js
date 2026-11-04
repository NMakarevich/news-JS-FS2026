import path from 'node:path';

const __dirname = import.meta.dirname;

export default {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, './dist'),
    },
};
