import io from 'socket.io-client';
import React, { Component } from 'react';
import {connect} from 'react-redux';

const socketUrl = "http://83.227.100.168:42132";

class Forum extends Component {

   
    state = {
        socket: null,
    }

   

    componentDidMount(){

        const socket = io.connect(socketUrl);
        this.setState({socket: socket});

        socket.on('connect', function() {
           let connect = "J connected";
           socket.emit('create_socket', connect);
        });

        socket.on('test response', function(data) {
            console.log(data)
         });

 
    }

    sendMessage = () =>{
        let socket = this.state.socket;
        socket.emit('incoming data', "hej från J" );

    }

   

    render () {

        return (
            <div>
           <h4>Discussion forum</h4>
           <button onClick={this.sendMessage}>Send</button>
           </div>
        )
    }
}

//To acess the redux store's state in this component
const mapStateToProps = (state) => {

    return{
      profile: state.firebase.profile
    }

}

export default connect(mapStateToProps)(Forum);