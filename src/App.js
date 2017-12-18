import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
  background: gray;
  font-size:25px;
  line-height:40px;
  
`

class App extends React.Component {
  state = {
    textEdit: '',
    todoafteredit: '',
    editIndex: null,
    toggleEdit: false,
    statetosave: '',
    todo: '',
    todolists: []
  }
  changeAdd = (e) => {
    this.setState({ todo: e.target.value })
  }
  changeAddToEdit = (e) => {
    console.log(e.target.value)
    this.setState({ textEdit: e.target.value })
  }
  handleClick = () => {
    window.localStorage.setItem('lists', JSON.stringify(this.state.todolists))
    this.setState({ todolists: [...this.state.todolists, this.state.todo] })
  }
  handleToggleEdit = (index) => {
    console.log(index)
    this.setState({ editIndex: index, toggleEdit: true, textEdit: this.state.todolists[index] })
  }
  handleToggleDelete = (index) => {
    let deltodolists = this.state.todolists
    deltodolists.splice(index, 1)
    this.setState({ deltodolists })
  }
  handleEditTextToSave= () => {
    let newTodolists = this.state.todolists
    newTodolists[this.state.editIndex] = this.state.textEdit
    this.setState({ newTodolists, toggleEdit: false })
  }
  setValueAfterEdit = () => {
    console.log(this.state.todolists[this.state.editIndex])
  }
  componentDidMount () {
    let localStorageData = JSON.parse(window.localStorage.getItem('lists'))
    if (localStorageData) {
      this.setState({ todolists: localStorageData })
    }
  }
  render () {
    return (
      <div>
        <Header>
          To-Do-Lists
        </Header>
        <input type='text' onChange={this.changeAdd} />
        <input type='submit' onClick={this.handleClick} value='submit' />
        {
          this.state.todolists.map((todo, index) => (
            <div key={index}>
              {todo}
              <input type='submit' value='edit' onClick={() => this.handleToggleEdit(index)} />
              <input type='submit' value='delete' onClick={() => this.handleToggleDelete(index)} />
            </div>
          ))
        }
        {
          this.state.toggleEdit ? <div>
            <input type='text' value={this.state.textEdit} onChange={this.changeAddToEdit} />
            <input type='submit' value='save' onClick={this.handleEditTextToSave} />
          </div> : null
        }
      </div>
    )
  }
}
export default App
