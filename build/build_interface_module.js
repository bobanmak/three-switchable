const rollup  = require('rollup');
const resolve =require('rollup-plugin-node-resolve');
const buble = require('rollup-plugin-buble');
const replace = require("./replace.js");
const async = require("async");

const transforms = {
    arrow: false,
    classes: true,
    letConst : false
};

const build_presetable = function( done ){
    rollup.rollup({
        input : 'src/Switchable.module.js',
        external: ['../node_modules/three/build/three.module.js', '../../node_modules/three/build/three.module.js'],

        plugins: [ 
            resolve(),
            buble({
				transforms: transforms
            })
            
        ]
    }).then(( bundle ) => { 
        bundle.write({
            file: './dist/Switchable.es.js' ,
            plugins:[
                
                replace({
                    "../node_modules/three/" : "../../three/"
                })
            ],
            format: 'es',
            name: 'three',
            exports: 'named' 
          });
          done( );
    }).catch(
        ( err ) => {
            done( err );
        }
    );
};

const build_interface = function( done ){
    async.series([
        build_presetable
    
    ], function( err, data ){
        done();
    });
};

module.exports = build_interface;