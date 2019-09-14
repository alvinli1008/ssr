import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from './store/'
import styles from './style.css'
import withStyle from '../../withStyle'

class Home extends Component {
  // componentDidMound 在服务端不执行
  componentDidMount() {
    if (!this.props.list.length) {
      this.props.getHomeList()
    }
  }

  getList() {
    const { list } = this.props
    return list.map(item => (
      <div className={styles.item} key={item.id}>
        {item.title}
      </div>
    ))
  }

  render() {
    return <div className={styles.container}>{this.getList()}</div>
  }
}

const mapStateToProps = state => ({
  list: state.home.newList
})

const mapDispatchToProps = dispatch => ({
  getHomeList() {
    dispatch(actions.getHomeList())
  }
})

const ExportHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyle(Home, styles))

ExportHome.loadData = store => {
  // 这个函数，负责在服务器端渲染之前，把这个路由需要的数据提前加载好
  return store.dispatch(actions.getHomeList())
}

export default ExportHome
