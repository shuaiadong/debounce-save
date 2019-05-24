module.exports = function (api) {

    const env = api.env();
    
    api.cache(true);
    
    const presets = [
        ['@babel/preset-env', {
            // useBuiltIns: 'entry' 'usage'
        }],
        ['@babel/preset-react']
    ];

    const plugins = [
        ['@babel/plugin-proposal-decorators', { 'legacy': true }], // @
        ['@babel/plugin-proposal-class-properties', { 'loose' : true }], // class
        ['@babel/plugin-transform-react-jsx'], // jsx 
    ];


    const babelConfig = {
        presets,
        plugins
    };

return babelConfig;
}