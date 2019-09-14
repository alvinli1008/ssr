import React, { Component } from 'react'

// 这个函数，返回一个组件
export default (DecoratedComponent, styles) => {
    //返回这个的组件，叫做高阶组件
  return class NewComponent extends Component {
    componentWillMount() {
      // console.log(this.props.staticContext)  // 服务器 {} 客户端 undefiend
      if (this.props.staticContext) {
        this.props.staticContext.css.push(styles._getCss())
      }
    }

    render() {
        return <DecoratedComponent {...this.props} />
    }
  }
}
