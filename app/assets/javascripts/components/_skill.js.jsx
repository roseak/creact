var Skill = React.createClass({
  getInitialState() {
    return { editable: false }
  },
  handlelevelChange(action) {
    let levels = ['bad', 'halfbad', 'fantastic'];
    let name = this.props.skill.name;
    let details = this.props.skill.details;
    let level = this.props.skill.level;
    let index = levels.indexOf(level);

    if (action === 'up' && index < 2) {
      let newLevel = levels[index + 1];
      this.props.handleUpdate({id: this.props.skill.id, name: name, details: details, level: newLevel})
    } else if (action === 'down' && index > 0){
      let newLevel = levels[index - 1];
      this.props.handleUpdate({id: this.props.skill.id, name: name, details: details, level: newLevel})
    }
  },
  onUpdate() {
    if (this.state.editable) {
      let id = this.props.skill.id;
      let name = this.refs.name.value;
      let details = this.refs.details.value;
      let level = this.props.skill.level;
      let skill = {id: id, name: name, details: details, level: level}

      this.props.handleUpdate(skill);
    }
    this.setState({ editable: !this.state.editable })
  },
  render() {
    var name = this.state.editable ? <input type='text' ref='name' defaultValue={this.props.skill.name} />
                                   : <h3>{this.props.skill.name}</h3>

    let details = this.state.editable ? <textarea type='text' ref='details' defaultValue={this.props.skill.details}></textarea>
                                      : <p>{this.props.skill.details}</p>
    return (
      <div>
        {name}
        {details}
        <div className='skill-level'>
          <button type='button'
                  className='btn btn-default btn-sm'
                  onClick={this.handlelevelChange.bind(this, 'down')}>
            <span className='glyphicon glyphicon-triangle-bottom'></span>
          </button>
          <button type='button'
                  className='btn btn-default btn-sm'
                  onClick={this.handlelevelChange.bind(this, 'up')}>
            <span className='glyphicon glyphicon-triangle-top'></span>
          </button>
          <p><strong>Level:</strong> {this.props.skill.level}</p>

        </div>
        <div className='major-buttons'>
          <button className='btn btn-primary' onClick={this.props.handleDelete}>Delete</button>
          <button className='btn btn-primary' onClick={this.onUpdate}>{this.state.editable ? 'Submit' : 'Edit'}</button>
        </div>
      </div>
    )
  }
});
