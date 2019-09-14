import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from './store/'
import styles from './style.css'
import withStyles from '../../withStyle'

class Header extends Component {
  render() {
    const { login, handleLogin, handleLogout } = this.props
    return (
      <div className={styles.container}>
        <Link className={styles.item} to="/">首页</Link>
        {login ? (
          <Fragment>
            <Link className={styles.item} to="/translation">翻译列表</Link>
            <div className={styles.item} onClick={handleLogout}>退出</div>
          </Fragment>
        ) : (
          <div className={styles.item} onClick={handleLogin}>登录</div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  login: state.header.login
})

const mapDispatch = dispatch => ({
  handleLogin() {
    dispatch(actions.login())
  },
  handleLogout() {
    dispatch(actions.logout())
  }
})

export default connect(
  mapState,
  mapDispatch
)(withStyles(Header, styles))
