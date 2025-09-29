import React, { Component } from 'react'

export class States extends Component {
    constructor(){
        super();

        this.state = {
            counter : 10
        }

        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState((prevState) => {
          return {
            counter: prevState.counter + 1
          };
        });
      
      }
  render() {
    return (
      <>
        <div>States : {this.state.counter}</div>
        <button onClick={this.handleClick}>Click</button>
      </>
    )
  }
}

export default States