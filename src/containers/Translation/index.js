import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from './store/'
import { Redirect } from 'react-router-dom'
import styles from './style.css'
import withStyle from '../../withStyle'

class Translation extends Component {
  //   componentDidMound 在服务端不执行
  componentDidMount() {
    if (!this.props.list.length) {
      this.props.getTranslationList()
    }
  }

  getList() {
    const { list } = this.props
    return list.map(item => <div className={styles.item} key={item.id}>{item.title}</div>)
  }

  render() {
    return this.props.login ? <div className={styles.container}>{this.getList()}</div> : <Redirect to="/" />
  }
}

const mapStateToProps = state => ({
  list: state.translation.translationList,
  login: state.header.login
})

const mapDispatchToProps = dispatch => ({
  getTranslationList() {
    dispatch(actions.getTranslationList())
  }
})

const ExportTranslation = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyle(Translation, styles))

ExportTranslation.loadData = store => {
  return store.dispatch(actions.getTranslationList())
}
export default ExportTranslation
