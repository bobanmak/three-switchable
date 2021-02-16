// 6.2.21 Boban J.
import * as THREE from "../../node_modules/three/build/three.module.js";


const Switchable = {

    interface: {
        initSwitchable : function( opts ){
            // console.log("Opts: ", opts );
            this.states  = this.states || {};
            
            let defaults = {
                castShadow: true,
                shadow: {
                    camera:{
                        near: 0.01,
                        far: 15,
                        fov: 45,
                    },
                    mapSize:{
                        width: 1024,
                        height: 1024
                    },
                    bias: 0
                }
            };
    
            this.options = Object.assign( {}, defaults, opts );
            Object.assign( this.states, { intensity: this.intensity, active: true })
        },
    
        getInfo: function(){
            console.log( "interface - switchable: ", this );
        },
    
        turnOn: function(){
            
            if ( this.states.active ) return;
    
            this.intensity  = this.states.intensity;
            this.visible    = true;
            this.states.active = true;
            console.log( "Lights on!");
    
            if ( this.shadowCameraHelper ){
             this.shadowCameraHelper.visible = true;
            }
        },
    
        turnOff: function(){
    
            if ( !this.states.active ) return;
    
            this.states.intensity = this.intensity;
            this.intensity = 0;
            this.visible = false;
            this.states.active = false;
            console.log( "Lights off!");
    
            
            if ( this.shadowCameraHelper ){
                this.shadowCameraHelper.visible = false;
            }
        },
        
        toggle: function(){
            if ( this.states.active ){
                this.turnOff();
            } 
            else {
                this.turnOn();
            }
        },
    
        setShadow : function( opts ){
    
            let opt = Object.assign( {}, this.options, opts );
            this.shadow.camera.near	= opt.shadow.camera.near;
            this.shadow.camera.far	= opt.shadow.camera.far;
            this.shadow.camera.fov	= opt.shadow.camera.fov;
    
            this.shadow.mapSize.width	= opt.shadow.mapSize.width;
            this.shadow.mapSize.height	= opt.shadow.mapSize.height;
            this.shadow.bias = opt.shadow.bias;
            
        },
    
        enableShadow: function(){
            this.castShadow	= true;
        },
    
        disableShadow: function(){
            this.castShadow	= false;
        },
    
        addHelpersToScene: function( scene ){
    
            this.shadowCameraHelper = new THREE.CameraHelper( this.shadow.camera );
    
            if ( this.target ) scene.add( this.target );
            scene.add( this.shadowCameraHelper );
    
        }
    },

    implement: function( instance ){
        Object.assign( instance, Switchable.interface );
        instance.initSwitchable();
    }
}

export {Switchable};
export default Switchable;