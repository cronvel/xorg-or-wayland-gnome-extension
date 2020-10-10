/*
	Sacred Times

	Copyright (c) 2020 Cédric Ronvel

	The MIT License (MIT)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

"use strict" ;

/* global imports */
/* exported init */

/*
	Interesting references:
	https://github.com/julio641742/gnome-shell-extension-reference/blob/master/REFERENCE.md

	See also the Argos extensions that transform shell command into extensions:
	https://github.com/p-e-w/argos
*/



const GLib = imports.gi.GLib ;
const St = imports.gi.St ;
const Main = imports.ui.main ;
//const Tweener = imports.ui.tweener ;
//const Mainloop = imports.mainloop ;



class Extension {
	constructor() {
		this.button = new St.Bin( {
			style_class: 'panel-button' ,
			reactive: false ,
			can_focus: false ,
			x_fill: true ,
			y_fill: false ,
			track_hover: false
		} ) ;

		var env = get_env() ;

		this.type = env.XDG_SESSION_TYPE ;

		switch ( this.type.toLowerCase() ) {
			case 'x11' :
				this.labelText = '[Xorg]' ;
				break ;
			case 'wayland' :
				this.labelText = '[Wayland]' ;
				break ;
			default :
				this.labelText = "[" + this.type + "]" ;
		}

		var label = new St.Label( { text: this.labelText } ) ;
		this.button.set_child( label ) ;
	}



	enable() {
		Main.panel._rightBox.insert_child_at_index( this.button , 0 ) ;
	}



	disable() {
		Main.panel._rightBox.remove_child( this.button ) ;
	}
}



function init() {
	return new Extension() ;
}



function get_env() {
	var env = {} ;

	GLib.get_environ().forEach( raw => {
		var key , value ,
			index = raw.indexOf( '=' ) ;

		if ( index > 0 ) {
			key = raw.slice( 0 , index ) ;
			value = raw.slice( index + 1 ) ;
			env[ key ] = value ;
		}
	} ) ;

	return env ;
}

